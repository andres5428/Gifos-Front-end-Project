/**
 * Imports
 */
import { API_KEY } from './js_main.js';
import load_Data from './js_services.js';
import { download_Gif } from './js_main.js';
import { expand_Gif } from './js_main.js';
import { fullscreen_Favorite } from './js_main.js';
import { check_expand_misGifos } from './js_main.js';

/**
 * Variables globales
 */
const URL = `https://api.giphy.com/v1/gifs?api_key=${API_KEY}`;
const STORAGE_GIF = 'Mis_GIFOS'

/**
 * Variables del DOM
 */
const misGifos_Link = document.querySelector('.misGifos_Link');
const top_Section = document.querySelector('.top_Section');
const search_Section = document.querySelector('.search_Section');
const favorite_Section = document.querySelector('.favorite_Section');
const misGifos_Create_Section = document.querySelector('.misGifos_Create_Section');
const misGifos_Section = document.querySelector('.misGifos_Section');
const misGifos_Saved_Container = document.querySelector('.misGifos_Saved_Container');
const btn_CreateGif = document.querySelector('.btn_CreateGif');
const a_Download_ExpandedGif = document.querySelector('.a_Download_ExpandedGif');
const begin_Button = document.querySelector('.begin_Button');
const step_3 = document.querySelector('.step_3');
const p_1 = document.querySelector('.p_1');
const p_2 = document.querySelector('.p_2');
const p_3 = document.querySelector('.p_3');
const p_4 = document.querySelector('.p_4');
const video_Tag = document.querySelector('.video_Tag');
const video_Container = document.querySelector('.video_Container');
const img_CreateGif = document.querySelector('.img_CreateGif');
const p_Uploading_Container = document.querySelector('.p_Uploading_Container');
const hamMenu_Input = document.querySelector('#hamid');
const icon_Fav_Expanded = document.querySelector('.icon_Fav_Expanded');
const bottom_Section = document.querySelector('.bottom_Section');



/**
 * @method change_misGifos_Page
 * @description Cambiar a la sección mis Gifos
 */
const change_misGifos_Page = () => {

    if (misGifos_Section.className === 'misGifos_Section') {
        misGifos_Section.classList.toggle('misGifos_Section--show');
    }

    if (favorite_Section.className === 'favorite_Section favorite_Section--show') {
        favorite_Section.classList.toggle('favorite_Section--show');
    }

    if (search_Section.className === 'search_Section') {
        search_Section.classList.toggle('search_Section--hidden');
    }
    if (top_Section.className === 'top_Section') {
        top_Section.classList.toggle('top_Section--hidden');
    }

    if (misGifos_Create_Section.className === 'misGifos_Create_Section misGifos_Create_Section--show') {
        misGifos_Create_Section.classList.toggle('misGifos_Create_Section--show');
    }

    if (btn_CreateGif.className === 'btn_CreateGif btn_CreateGif--active') {
        btn_CreateGif.classList.toggle('btn_CreateGif--active');
    }
    if (img_CreateGif.className === 'icon-button-crear-gifo img_CreateGif img_CreateGif--active') {
        img_CreateGif.classList.toggle('img_CreateGif--active');
    }

    if (bottom_Section.className === 'bottom_Section bottom_Section--hidden') {
        bottom_Section.classList.toggle('bottom_Section--hidden');
    }

    if (p_1.className === 'p_CreateGif p_1 p_1--hidden') {
        p_1.textContent = 'Aquí podrás';
        p_1.classList.toggle('p_1--hidden');
    }
    if (p_2.className === 'p_CreateGif p_2 p_2--hidden') {
        p_2.textContent = 'crear tus propios';
        p_2.classList.toggle('p_2--hidden');
    }
    if (p_3.className === 'p_CreateGif p_3 p_3--hidden') {
        p_3.textContent = '¡Crea tu GIFO en sólo 3 pasos!';
        p_3.classList.toggle('p_3--hidden');
    }
    if (p_4.className === 'p_CreateGif p_4 p_4--hidden') {
        p_4.textContent = '(sólo necesitas una cámara para grabar un video)';
        p_4.classList.toggle('p_4--hidden');
    }

    if (video_Container.className === 'video_Container video_Container--show') {
        video_Container.classList.toggle('video_Container--show');
    }

    if (step_3.className === 'step step_3 step--filled') {
        step_3.classList.toggle('step--filled');
    }
    if (begin_Button.className === 'begin_Button begin_Button--hidden') {
        begin_Button.classList.toggle('begin_Button--hidden');
    }

    if (p_1.className === 'p_1 p_1--hidden') {
        p_1.classList.toggle('p_1--hidden');
    }
    if (p_2.className === 'p_2 p_2--hidden') {
        p_2.classList.toggle('p_2--hidden');
    }
    if (p_3.className === 'p_3 p_3--hidden') {
        p_3.classList.toggle('p_3--hidden');
    }
    if (p_4.className === 'p_4 p_4--hidden') {
        p_4.classList.toggle('p_4--hidden');
    }

    if (video_Tag.className === 'video_Tag video_Tag--uploading') {
        video_Tag.classList.toggle('video_Tag--uploading');
    }
    while (p_Uploading_Container.firstChild) {
        p_Uploading_Container.removeChild(p_Uploading_Container.firstChild)
    }
}

/**
 * Añadir evento de click al link de mis Gifos
 */
misGifos_Link.addEventListener('click', () => {
    change_misGifos_Page();
    hamMenu_Input.checked = false;
    if (JSON.parse(localStorage.getItem('Mis_GIFOS') !== null)) {
        get_Storage_MisGifos();
    }
    else {
        print_Storage_MisGifos([]);
    }

});

/**
 * @method get_Storage_MisGifos
 * @description Extraer la información de los gifs almacenados en el localStorage
 */

const get_Storage_MisGifos = () => {
    while (misGifos_Saved_Container.firstChild) misGifos_Saved_Container.removeChild(misGifos_Saved_Container.firstChild);
    const MisGifos_Storage = JSON.parse(localStorage.getItem('Mis_GIFOS'));
    console.log(MisGifos_Storage)
    let array_MisGifos = [];
    MisGifos_Storage.forEach((miGifo) => {
        array_MisGifos.push(miGifo.id);
    })
    if (array_MisGifos.length !== 0) {
        const URL_MODIFIED = `${URL}&ids=${array_MisGifos}`;
        load_Data(URL_MODIFIED).then((json) => {
            console.log(json);
            let view_Index = 0;
            print_Storage_MisGifos(json.data, view_Index);
        });
    }
    else {
        print_Storage_MisGifos([]);
    }
}

/**
 * @method print_Storage_MisGifos
 * @description Imprimir la información extraída del localStorage y crear la tarjeta
 */

const print_Storage_MisGifos = ((data, view_Index) => {
    if (data.length !== 0) {
        let listener_Fullscreen = [];
        const array_data = data.slice(view_Index, view_Index + 12);
        array_data.forEach((MiGifo, index) => {
            const gif_URL_Source = MiGifo.images.original.url;
            const container_MisGifos = document.createElement('div');
            container_MisGifos.id = MiGifo.id;
            container_MisGifos.classList.add(`container_Gifos`);
            misGifos_Saved_Container.appendChild(container_MisGifos);
            create_Img_MisGifos(container_MisGifos, gif_URL_Source);
            create_Username_MisGifos(MiGifo, container_MisGifos);
            const icon_Hover_Trash_MisGifos = document.createElement('button');
            create_Icon_Hover_Trash_MisGifos(icon_Hover_Trash_MisGifos, container_MisGifos);
            const Button_Hover_Download_MisGifos = document.createElement('button');
            const a_Download_MisGifos = document.createElement('a');
            a_Download_MisGifos.classList.add('a_MisGifos');
            Button_Hover_Download_MisGifos.appendChild(a_Download_MisGifos);
            create_Icon_Hover_Download_MisGifos(Button_Hover_Download_MisGifos, container_MisGifos, gif_URL_Source, a_Download_MisGifos);
            const icon_Hover_Fullscreen_MisGifos = document.createElement('button');
            icon_Hover_Fullscreen_MisGifos.id = `Expand_Fav${index}`;
            create_Icon_Hover_Fullscreen_Favorite(icon_Hover_Fullscreen_MisGifos, container_MisGifos);
            listener_Fullscreen.push({ gifImg: gif_URL_Source, fullscreenButton: icon_Hover_Fullscreen_MisGifos, username: MiGifo.username, id: container_MisGifos.id });
        });
        view_Index += 12;
        create_Listener_MisGifos_Fullscreen(listener_Fullscreen);
        if (data.length >= 12 && view_Index < data.length) {
            const moreGifs_Container_Favorite = document.createElement('div');
            moreGifs_Container_Favorite.classList.add('moreGifs_Container_Favorite');
            misGifos_Saved_Container.appendChild(moreGifs_Container_Favorite);
            const moreGifs_Favorite = document.createElement("div");
            moreGifs_Favorite.classList.add('btn_MoreGifs_Favorite');
            moreGifs_Favorite.textContent = "Ver más";
            moreGifs_Container_Favorite.appendChild(moreGifs_Favorite);
            moreGifs_Favorite.addEventListener("click", () => {
                misGifos_Saved_Container.removeChild(moreGifs_Container_Favorite);
                print_Storage_MisGifos(data, view_Index);
            })
        }

    }
    else {
        while (misGifos_Saved_Container.firstChild) misGifos_Saved_Container.removeChild(misGifos_Saved_Container.firstChild);
        const div_NoGifo = document.createElement('div');
        div_NoGifo.classList.add('div_NoGifo');
        misGifos_Saved_Container.appendChild(div_NoGifo);
        const img_NoGifos = document.createElement('img');
        img_NoGifos.classList.add('img_NoGifos');
        img_NoGifos.setAttribute('src', 'recursos/assets/icon-mis-gifos-sin-contenido.svg')
        div_NoGifo.appendChild(img_NoGifos);
        const h2_NoGifos = document.createElement('h2');
        h2_NoGifos.classList.add('h2_NoGifo');
        h2_NoGifos.textContent = '"¡Anímate a crear tu primer GIFO!"';
        div_NoGifo.appendChild(h2_NoGifos);

    }
})

/**
 * @method create_Icon_Hover_Download_MisGifos
 * @description Crear iconos de descarga y su funcionalidad
 */

const create_Icon_Hover_Download_MisGifos = (Button_Hover_Download_MisGifos, container_MisGifos, gif_URL_Source, a_Download_MisGifos) => {
    Button_Hover_Download_MisGifos.classList.add('button_Download_MisGifos');
    const img_Download_img = document.createElement('img');
    img_Download_img.classList.add('img_Download_img');
    img_Download_img.setAttribute('src', 'recursos/assets/icon-download.svg');
    Button_Hover_Download_MisGifos.appendChild(img_Download_img);
    container_MisGifos.appendChild(Button_Hover_Download_MisGifos);
    download_Gif(gif_URL_Source, a_Download_MisGifos);

};

/**
 * @method create_Icon_Hover_Fullscreen_Favorite
 * @description Crear iconos de expansión de Gif
 */

const create_Icon_Hover_Fullscreen_Favorite = (icon_Hover_Fullscreen_MisGifos, container_MisGifos) => {
    icon_Hover_Fullscreen_MisGifos.classList.add('button_Hover_Fullscreen_MisGifos');
    const img_Fullscreen_MisGifos = document.createElement('img');
    img_Fullscreen_MisGifos.classList.add('img_Fullscreen_MisGifos');
    img_Fullscreen_MisGifos.setAttribute('src', 'recursos/assets/icon-max.svg');
    icon_Hover_Fullscreen_MisGifos.appendChild(img_Fullscreen_MisGifos);
    container_MisGifos.appendChild(icon_Hover_Fullscreen_MisGifos);
}

/**
 * @method create_Img_MisGifos
 * @description Crear cada imagen que contiene el Gif
 */


const create_Img_MisGifos = (container_MisGifos, gif_URL_Source) => {
    const img_MiGifo = document.createElement('img');
    img_MiGifo.classList.add('img_MiGifo');
    img_MiGifo.src = gif_URL_Source;
    container_MisGifos.appendChild(img_MiGifo);

}

/**
 * @method create_Username_MisGifos
 * @description Crear cada nombre de usuario del Gif
 */

const create_Username_MisGifos = (MiGifo, container_MisGifos) => {
    const p_Username_MisGifos = document.createElement('p');
    p_Username_MisGifos.classList.add('p_Username_MisGifos');
    p_Username_MisGifos.textContent = MiGifo.username;
    container_MisGifos.appendChild(p_Username_MisGifos);

}

/**
 * @method create_Icon_Hover_Trash_MisGifos
 * @description Crear cada icono de eliminar Gif
 */

const create_Icon_Hover_Trash_MisGifos = (icon_Hover_Trash_MisGifos, container_MisGifos) => {
    icon_Hover_Trash_MisGifos.classList.add('button_Trash_MisGifos');
    const img_Trash = document.createElement('img');
    img_Trash.classList.add('img_Trash');
    img_Trash.setAttribute('src', '/recursos/assets/icon_trash.svg')
    icon_Hover_Trash_MisGifos.appendChild(img_Trash);
    container_MisGifos.appendChild(icon_Hover_Trash_MisGifos);
    icon_Hover_Trash_MisGifos.addEventListener('click', () => {

        remove_MisGifos(container_MisGifos.id);
    })
}

/**
 * @method create_Listener_MisGifos_Fullscreen
 * @description Crear las funciones de descarga y expansión del Gif de la sección MisGifos
 */


const create_Listener_MisGifos_Fullscreen = (listeners) => {
    listeners.forEach((listener) => {
        listener.fullscreenButton.addEventListener('click', () => {
            fullscreen_Favorite.url = listener.gifImg;
            fullscreen_Favorite.username = listener.username;
            fullscreen_Favorite.gifTitle = '';
            fullscreen_Favorite.id = listener.id;
            if (check_expand_misGifos.check === false) {
                check_expand_misGifos.check = true;
            }
            const is_Favorite = check_Favorite(listener.id);
            if (is_Favorite === true) {
                icon_Fav_Expanded.classList.remove('icon-icon-fav-active');
                icon_Fav_Expanded.classList.remove('icon-icon-fav-hover');
                icon_Fav_Expanded.classList.add('icon-icon-fav-active');
            }
            else {
                icon_Fav_Expanded.classList.remove('icon-icon-fav-active');
                icon_Fav_Expanded.classList.remove('icon-icon-fav-hover');
                icon_Fav_Expanded.classList.add('icon-icon-fav-hover');
            }
            console.log(check_expand_misGifos)
            download_Gif(fullscreen_Favorite.url, a_Download_ExpandedGif);
            expand_Gif(fullscreen_Favorite.url, fullscreen_Favorite.username, fullscreen_Favorite.gifTitle, fullscreen_Favorite.id);
        })
    })
}

const check_Favorite = (gifo_Id) => {
    let check_is_Favorite = false;
    const check_Array_Favorite = JSON.parse(localStorage.getItem('Favorites')) || [];
    check_Array_Favorite.forEach((gif) => {
        if (gif.id_Gifo === gifo_Id) {
            check_is_Favorite = true;
            return check_is_Favorite;
        }
    })
    return check_is_Favorite;
}

/**
 * @method remove_MisGifos
 * @description Remover los Gifs al oprimir el botón de eliminar
 */

const remove_MisGifos = (id_Gif) => {
    const new_MisGifos = [];
    const array_MisGifos = JSON.parse(localStorage.getItem('Mis_GIFOS'));
    console.log(array_MisGifos)
    array_MisGifos.forEach((gif) => {
        if (gif.id !== id_Gif) {
            console.log(gif.id);
            new_MisGifos.push(gif);
        }
    });
    localStorage.removeItem('Mis_GIFOS');
    localStorage.setItem(STORAGE_GIF, JSON.stringify(new_MisGifos));
    get_Storage_MisGifos();
}