const change_Mode = document.querySelector('.change_Mode');
const logo_Img = document.querySelector('.logo_Img');
const hamMenu_Input = document.querySelector('#hamid');
const body = document.querySelector('body');
const misGifos_Camera = document.querySelector('.misGifos_Camera');
const misGifos_Movie = document.querySelector('.misGifos_Movie');
const topLeft_Icon = document.querySelector('.topLeft-Icon');
const topRight_Icon = document.querySelector('.topRight-Icon');
const bottomLeft_Icon = document.querySelector('.bottomLeft-Icon');
const bottomRight_Icon = document.querySelector('.bottomRight-Icon');

change_Mode.addEventListener('click', () => {
    change_Mode.classList.toggle('dark_Mode');
    body.classList.toggle('body_Dark_Mode');
    if (change_Mode.className === 'li_Elem change_Mode dark_Mode') {
        hamMenu_Input.checked = false;
        logo_Img.setAttribute('src', 'recursos/assets/logo-desktop-modo-noc.svg');
        misGifos_Camera.setAttribute('src', 'recursos/assets/camara-modo-noc.svg')
        misGifos_Movie.setAttribute('src', 'recursos/assets/pelicula-modo-noc.svg')
        change_Mode.textContent = 'Modo diurno';
        topLeft_Icon.setAttribute('src', 'recursos/assets/top_left_dark.fw.png');
        topRight_Icon.setAttribute('src', 'recursos/assets/top_right_dark.fw.png');
        bottomLeft_Icon.setAttribute('src', 'recursos/assets/bottom_left_dark.fw.png');
        bottomRight_Icon.setAttribute('src', 'recursos/assets/bottom_right_dark.fw.png');
    }
    if (change_Mode.className === 'li_Elem change_Mode') {
        change_Mode.textContent = 'Modo nocturno';
        logo_Img.setAttribute('src', 'recursos/assets/logo-mobile.svg');
        misGifos_Movie.setAttribute('src', 'recursos/assets/pelicula.svg')
        misGifos_Camera.setAttribute('src', 'recursos/assets/camara.svg')
        hamMenu_Input.checked = false;
        topLeft_Icon.setAttribute('src', 'recursos/assets/top_Left.png');
        topRight_Icon.setAttribute('src', 'recursos/assets/top_Right.png');
        bottomLeft_Icon.setAttribute('src', 'recursos/assets/bottom_Left.png');
        bottomRight_Icon.setAttribute('src', 'recursos/assets/bottom_Right.png');
    }

});

