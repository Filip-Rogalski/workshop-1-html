document.addEventListener('DOMContentLoaded', function () {
    var headerImages = document.querySelectorAll('.big-image');
    var headerImageToggler = function () {
        headerImages.forEach(function (image) {
            image.classList.toggle('invisible');
        });
    };
    var bigScreen = window.matchMedia("screen and (min-width: 769px)")
    if (bigScreen.matches) {
        setInterval(headerImageToggler, 3000);
        //Tutaj zainstalować slider:
        //1. załadować ramki ze zdjęciami;
        //2. dodać ptaszki nawigacyjne;
    }
    else {
        console.log('small screen!');
        //Do nothing!
    }
});