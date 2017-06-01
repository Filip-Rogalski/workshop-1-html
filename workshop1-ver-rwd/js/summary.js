document.addEventListener('DOMContentLoaded', function () {
    var orderForm = document.getElementById('order-form')
        , chairType = document.getElementById('chair-type')
        , chairColor = document.getElementById('chair-color')
        , chairFabric = document.getElementById('chair-fabric')
        , transport = document.querySelector('[name=transport]')
        , summaryContent = document.getElementById('summary-content')
        , summaryPricelist = document.getElementById('summary-pricelist')
        , summaryTotalSum = document.getElementById('summary-total-sum');
    var updateSummary = function () {
        summaryContent.innerHTML = '';
        var itemsChosen = document.createElement('p');
        itemsChosen.innerHTML = chairType.value + '<br /><span>' + chairColor.value + '</span><br /><span>' + chairFabric.value + '</span><br />';
        if (transport.checked) {
            itemsChosen.innerHTML += '<span>Transport</span>';
        };
        summaryContent.appendChild(itemsChosen);
    }
    
    var updatePricelist = function(){
        summaryPricelist.innerHTML = '';
        var typePrice = getOptionPrice(chairType);
        var priceList = document.createElement('p');
        priceList.innerHTML = typePrice + ' PLN<br /><br /><br />';
        if (transport.checked) {
            priceList.innerHTML += 90 + ' PLN';
        }
        summaryPricelist.appendChild(priceList);
    }
    
    var getTotal = function(){
        return parseInt(getOptionPrice(chairType)) + parseInt((transport.checked) * 90);
    }
    
    var updateTotal = function(){
        summaryTotalSum.innerHTML = '';
        var totalSum = document.createElement('p');
        var total = getTotal();
        totalSum.innerHTML = total + ' PLN';
        summaryTotalSum.appendChild(totalSum);
    }
    
    orderForm.addEventListener('change', function () {
        updateSummary();
        updatePricelist();
        updateTotal();
    });
    var getOptionPrice = function (element) {
        var elementValue = element.value;
        var elementOptions = element.list.options;
        for (var i = 0; i < elementOptions.length; i++) {
            if (elementOptions[i].value == elementValue) {
                return elementOptions[i].dataset.price;
            }
        }
    }
});