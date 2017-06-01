document.addEventListener('DOMContentLoaded', function () {
    var orderForm = document.getElementById('order-form')
        , chairType = document.getElementById('chair-type')
        , chairColor = document.getElementById('chair-color')
        , chairFabric = document.getElementById('chair-fabric')
        , transport = document.querySelector('[name=transport]')
        , summaryContent = document.getElementById('summary-content');
    
    
    var updateSummary = function () {
        summaryContent.innerHTML = '';
        var itemsChosen = document.createElement('p');
        itemsChosen.innerHTML = chairType.value + '<br /><span>' + chairColor.value + '</span><br /><span>' + chairFabric.value + '</span><br />';
        if (transport.checked) {
            itemsChosen.innerHTML += '<span>Transport</span>';
        };
        summaryContent.appendChild(itemsChosen);
    }
    orderForm.addEventListener('change', function () {
        updateSummary();
    });
    
    
});