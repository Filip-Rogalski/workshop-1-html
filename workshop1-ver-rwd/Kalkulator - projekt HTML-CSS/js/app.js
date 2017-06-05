document.addEventListener('DOMContentLoaded', function () {
    /* Handle dropdown */
    var arrows = document.querySelectorAll('.list_arrow');
    arrows.forEach(function (arrow) {
        arrow.addEventListener('click', function () {
            this.classList.toggle('turn_up');
            if (this.nextElementSibling.style.display == 'block') {
                this.nextElementSibling.style.display = 'none';
            }
            else {
                this.nextElementSibling.style.display = 'block';
            }
        })
    })

    function handleDropdown(element) {
        var choiceLabel = element.parentElement.parentElement.firstElementChild;
        choiceLabel.innerText = element.innerText;
        choiceLabel.classList.add('chosen');
    }
    var checklistItems = document.querySelectorAll('.drop_down_list li');
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
    var transport = document.getElementById('transport')
        , summaryTransportLabel = panelLeft.querySelector('.transport')
        , summaryTransportPrice = panelRight.querySelector('.transport');

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

    function putTransportOnPricelist() {
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
            putTransportOnPricelist();
        })
        /* Handle product Type */
    var productTypes = document.querySelectorAll('.drop_down_list:first-child li')
        , productColors = document.querySelectorAll('.drop_down_list:nth-child(2) li')
        , productFabrics = document.querySelectorAll('.drop_down_list:nth-child(3) li');
    var panelLeft = document.querySelector('.panel_left')
        , panelRight = document.querySelector('.panel_right');
    var summaryTypeLabel = panelLeft.querySelector('.title')
        , summaryTypePrice = panelRight.querySelector('.title')
        , summaryColorLabel = panelLeft.querySelector('.color')
        , summaryColorPrice = panelRight.querySelector('.color')
        , summaryFabricLabel = panelLeft.querySelector('.pattern')
        , summaryFabricPrice = panelRight.querySelector('.pattern')
        , summarySum = document.querySelector('.sum').firstElementChild;
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