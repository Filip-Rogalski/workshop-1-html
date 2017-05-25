document.addEventListener('DOMContentLoaded', function () {
    console.log('hej');
    var bigScreen = window.matchMedia("screen and (min-width: 769px) ")
    if (bigScreen.matches) {
        console.log('big screen!');
        
        //Tutaj zainstalować slider:
        //1. załadować ramki ze zdjęciami;
        //2. dodać ptaszki nawigacyjne;
        
    }
    else {
        console.log('small screen!');
        //Do nothing!
    }
});