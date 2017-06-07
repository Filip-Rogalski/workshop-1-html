document.addEventListener('DOMContentLoaded', function () {

    /* Pobieram elementy z DOM-u */
    
    const arrows = document.querySelectorAll('.list_arrow')
        , checklistItems = document.querySelectorAll('.drop_down_list li')
        , form = document.querySelector('#calculator .form')
        , panelLeft = document.querySelector('.panel_left')
        , panelRight = panelLeft.nextElementSibling;
    
    /* Handle dropdown */
    
    function handleArrow(arrow){
        arrow.classList.toggle('turn_up');
            if (arrow.nextElementSibling.style.display == 'block') {
                arrow.nextElementSibling.style.display = 'none';
            }
            else {
                arrow.nextElementSibling.style.display = 'block';
            }
    }
    
    arrows.forEach(function (arrow) {
        arrow.addEventListener('click', function () {
            handleArrow(this);
        })
    })

    
    function handleDropdown(element) {
        let choiceLabel = element.parentElement.parentElement.firstElementChild;
        choiceLabel.innerText = element.innerText;
        choiceLabel.classList.add('chosen');
    }
    checklistItems.forEach(function (checklistItem) {
        checklistItem.addEventListener('click', function () {
            handleDropdown(this);
        })
    });
    
    /* Handle order sum */
    
    var transportPrice = 0
        , productPrice = 0
        , fabricFactor = 1
        , sum = 0;

    function updateSum() {
        sum = (productPrice * fabricFactor) + transportPrice;
        summarySum.innerText = sum;
    }
    /* Handle transport checkbox and summary */
    const transport = form.lastElementChild.firstElementChild
        , summaryTransportLabel = panelLeft.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling
        , summaryTransportPrice = panelRight.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling;

    function putTransportOnSummaryPanel() {
        if (transport.checked) {
            summaryTransportLabel.innerHTML = 'Transport';
            summaryTransportPrice.innerHTML = transport.dataset.transportPrice;
        }
        else {
            summaryTransportLabel.innerHTML = '';
            summaryTransportPrice.innerHTML = '';
        }
    }

    function handleTransportCost() {
        if (transport.checked) {
            transportPrice = parseInt(transport.dataset.transportPrice);
            updateSum();
        }
        else {
            transportPrice = 0;
            updateSum();
        }
    }
    transport.addEventListener('click', function () {
            putTransportOnSummaryPanel();
            handleTransportCost();
        });
    
    /* Handle product Type */
    
    const productTypes = [checklistItems[0], checklistItems[1], checklistItems[2]]
        , productColors = [checklistItems[3], checklistItems[4], checklistItems[5]]
        , productFabrics = [checklistItems[6], checklistItems[7]]
        , summaryTypeLabel = panelLeft.firstElementChild
        , summaryTypePrice = panelRight.firstElementChild
        , summaryColorLabel = panelLeft.firstElementChild.nextElementSibling
        , summaryColorPrice = panelRight.firstElementChild.nextElementSibling
        , summaryFabricLabel = panelLeft.firstElementChild.nextElementSibling.nextElementSibling
        , summaryFabricPrice = panelRight.firstElementChild.nextElementSibling.nextElementSibling
        , summarySum = panelRight.nextElementSibling.nextElementSibling;
    
    productTypes.forEach(function (type) {
        type.addEventListener('click', function () {
            productPrice = parseInt(this.dataset.price);
            summaryTypeLabel.innerText = this.innerText;
            summaryTypePrice.innerText = this.dataset.price;
            updateSum();
        })
    });
    
    productColors.forEach(function (color) {
        color.addEventListener('click', function () {
            summaryColorLabel.innerText = this.innerText;
            summaryColorPrice.innerText = 0;
        })
    });
    
    productFabrics.forEach(function (fabric) {
        fabric.addEventListener('click', function () {
            fabricFactor = parseFloat(this.dataset.factor);
            updateSum();
            summaryFabricLabel.innerText = this.innerText;
            summaryFabricPrice.innerText = 'x ' + this.dataset.factor;
        })
    });
});