document.addEventListener('DOMContentLoaded', function () {
    var arrows = document.querySelectorAll('.list_arrow');
    console.log(arrows);
    arrows.forEach(function (arrow) {
        arrow.addEventListener('click', function () {
            this.nextElementSibling.style.display = 'block';
        })
    })
    var productTypes = document.querySelectorAll('.drop_down_list:first-child li');
    var productColors = document.querySelectorAll('.drop_down_list:nth-child(2) li');
    var productFabrics = document.querySelectorAll('.drop_down_list:nth-child(3) li');
    var checklistItems = document.querySelectorAll('.drop_down_list li');
    console.log(checklistItems);
    var chosenType = ''
        , chosenColor = ''
        , chosenFabric = ''
        , transport = false;

    function handleDropdown(element) {
        element.parentElement.parentElement.firstElementChild.innerText = element.innerText;
        element.parentElement.parentElement.firstElementChild.classList.add('chosen');
        element.parentElement.style.display = 'none';
    }

    function handleCustomerChoice(element, category) {
        category = element.innerText;
        console.log(category);
    }
    productTypes.forEach(function (type) {
        type.addEventListener('click', function () {
            handleCustomerChoice(this, chosenType)
        })
    });
    productColors.forEach(function (color) {
        color.addEventListener('click', function () {
            handleCustomerChoice(this, chosenFabric)
        })
    });
    productFabrics.forEach(function (fabric) {
        fabric.addEventListener('click', function () {
            handleCustomerChoice(this, chosenColor)
        })
    });
    checklistItems.forEach(function (checklistItem) {
        checklistItem.addEventListener('click', function () {
            handleDropdown(this);
        })
    });
});