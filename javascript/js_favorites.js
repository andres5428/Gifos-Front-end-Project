/**
 * Import
 */
import { download_Gif } from './js_main.js';
import { fullscreen_Favorite } from './js_main.js';
import { expand_Gif } from './js_main.js';
import { remove_Favorite_Search } from './js_main.js';


const top_Section = document.querySelector('.top_Section');
const favorite_link = document.querySelector('.favorite_link');
const hamMenu_Input = document.querySelector('#hamid');
const home_Link = document.querySelector('.logo_Gifos');
const search_Section = document.querySelector('.search_Section');
const favorite_Section = document.querySelector('.favorite_Section');
const favorite_Gif_container = document.querySelector('.favorite_Gif_Container');
const a_Download_ExpandedGif = document.querySelector('.a_Download_ExpandedGif');
const bottom_Section = document.querySelector('.bottom_Section');
const misGifos_Create_Section = document.querySelector('.misGifos_Create_Section');
const misGifos_Section = document.querySelector('.misGifos_Section');
const btn_CreateGif = document.querySelector('.btn_CreateGif');
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

const STORAGE_NAME = 'Favorites'

/**
 * @method change_FavoritePage
 * @description Cambiar de sección a favoritos
 */

const change_FavoritePage = () => {
    hamMenu_Input.checked = false;

    if (misGifos_Section.className === 'misGifos_Section misGifos_Section--show') {
        misGifos_Section.classList.toggle('misGifos_Section--show');
    }
    if (favorite_Section.className === 'favorite_Section') {
        favorite_Section.classList.toggle('favorite_Section--show');
    }

    if (bottom_Section.className === 'bottom_Section bottom_Section--hidden') {
        bottom_Section.classList.toggle('bottom_Section--hidden');
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

favorite_link.addEventListener('click', () => {
    change_FavoritePage();
    get_Storage_Favorites();
})


/**
 * @method get_Storage_Favorites
 * @description Extraer la información de los favoritos del localStorage
 */

export const get_Storage_Favorites = () => {
    let view_Index = 0;
    while (favorite_Gif_container.firstChild) favorite_Gif_container.removeChild(favorite_Gif_container.firstChild);
    const array_Favorites = JSON.parse(localStorage.getItem('Favorites')) || [];
    print_Storage_Favorites(array_Favorites, view_Index);
}

/**
 * @method print_Storage_Favorites
 * @description Imprimir la información de los favoritos almacenados en el localStorage
 */

const print_Storage_Favorites = (array_Favorites, view_Index) => {
    if (array_Favorites.length !== 0) {
        // if (array_Favorites.length <= 12) {
        const array_Favorites_2 = array_Favorites.slice(view_Index, view_Index + 12);
        let listener_Fullscreen_Favorites = [];
        array_Favorites_2.forEach((favorite_Gif, index) => {
            const container_Favorite_Gif = document.createElement('div');
            container_Favorite_Gif.id = favorite_Gif.id;
            const id_unique = favorite_Gif.id_Gifo;
            container_Favorite_Gif.classList.add('container_Favorite_Gif');
            favorite_Gif_container.appendChild(container_Favorite_Gif);
            create_Img_Favorite_Gif(favorite_Gif, container_Favorite_Gif);
            create_Username_Favorite(favorite_Gif, container_Favorite_Gif);
            create_Title_Favorite(favorite_Gif, container_Favorite_Gif);
            const icon_Hover_like_Favorite = document.createElement('button');
            const i_Favorite = document.createElement('i');
            create_i_favorites(i_Favorite, icon_Hover_like_Favorite, favorite_Gif.icon_id);
            create_Icon_Hover_Like_Favorite(icon_Hover_like_Favorite, container_Favorite_Gif, container_Favorite_Gif.id, i_Favorite, id_unique);
            const icon_Hover_Download_Favorite = document.createElement('button');
            const a_Download_Favorites = document.createElement('a');
            a_Download_Favorites.classList.add('a_Download_Favorites');
            container_Favorite_Gif.appendChild(a_Download_Favorites);
            create_Icon_Hover_Download_Favorite(icon_Hover_Download_Favorite, container_Favorite_Gif, favorite_Gif.gif_Src, a_Download_Favorites);
            const icon_Hover_Fullscreen_Favorite = document.createElement('button');
            create_Icon_Hover_Fullscreen_Favorite(icon_Hover_Fullscreen_Favorite, container_Favorite_Gif);
            icon_Hover_Fullscreen_Favorite.id = `Expand_Fav${index}`;
            listener_Fullscreen_Favorites.push({ gifImg: favorite_Gif.gif_Src, fullscreenButton: icon_Hover_Fullscreen_Favorite.id, username: favorite_Gif.username, gifTitle: favorite_Gif.title, id: container_Favorite_Gif.id });
        })
        create_Listener_Favorite_Fullscreen(listener_Fullscreen_Favorites);
        view_Index += 12;
        if (array_Favorites.length >= 12 && view_Index < array_Favorites.length) {
            const moreGifs_Container_Favorite = document.createElement('div');
            moreGifs_Container_Favorite.classList.add('moreGifs_Container_Favorite');
            favorite_Gif_container.appendChild(moreGifs_Container_Favorite);
            const moreGifs_Favorite = document.createElement("div");
            moreGifs_Favorite.classList.add('btn_MoreGifs_Favorite');
            moreGifs_Favorite.textContent = "Ver más";
            moreGifs_Container_Favorite.appendChild(moreGifs_Favorite);
            moreGifs_Favorite.addEventListener("click", () => {
                favorite_Gif_container.removeChild(moreGifs_Container_Favorite);
                print_Storage_Favorites(array_Favorites,view_Index);
            })
        }

    }
    else {
        const div_NoFavorite = document.createElement('div');
        div_NoFavorite.classList.add('div_NoFavorite');
        favorite_Gif_container.appendChild(div_NoFavorite);
        const img_NoFavorite = document.createElement('img');
        img_NoFavorite.classList.add('img_NoFavorite');
        img_NoFavorite.setAttribute('src', 'recursos/assets/fav-no-content.fw.png')
        div_NoFavorite.appendChild(img_NoFavorite);
        const div_h2_Container_NoFavorite = document.createElement('div');
        div_h2_Container_NoFavorite.classList.add('div_h2_Container_NoFavorite');
        div_NoFavorite.appendChild(div_h2_Container_NoFavorite);
        const h2_NoFavorite = document.createElement('h2');
        h2_NoFavorite.classList.add('h2_NoFavorite');
        h2_NoFavorite.textContent = '"¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!"';
        div_h2_Container_NoFavorite.appendChild(h2_NoFavorite);
    }
}



/**
 * @method create_Img_Favorite_Gif
 * @description crear cada GIF que va a ser mostrado en favoritos
 */
const create_Img_Favorite_Gif = (favorite_Gif, container_Favorite_Gif) => {

    const img_Favorite_Gif = document.createElement('img');
    img_Favorite_Gif.classList.add('img_Favorite_Gif');
    img_Favorite_Gif.src = favorite_Gif.gif_Src;
    container_Favorite_Gif.appendChild(img_Favorite_Gif);

}

/**
 * @method create_Username_Favorite
 * @description Crear el nombre de usuario para cada GIF favorito
 */

const create_Username_Favorite = (favorite_Gif, container_Favorite_Gif) => {
    const p_Username_Favorite = document.createElement('p');
    p_Username_Favorite.classList.add('p_Username_Favorite');
    p_Username_Favorite.textContent = favorite_Gif.username;
    container_Favorite_Gif.appendChild(p_Username_Favorite);
}

/**
 * @method create_Title_Favorite
 * @description Crear el título para cada Gif favorito
 */

const create_Title_Favorite = (favorite_Gif, container_Favorite_Gif) => {
    const p_Title_Favorite = document.createElement('p');
    p_Title_Favorite.classList.add('p_Title_Favorite');
    p_Title_Favorite.textContent = favorite_Gif.title;
    container_Favorite_Gif.appendChild(p_Title_Favorite);
}

/**
 * @method create_Icon_hover_Like_Favorite
 * @description Crear cada icono de favorito de la sección favoritos
 */

const create_Icon_Hover_Like_Favorite = (icon_Hover_like_Favorite, container_Favorite_Gif, id, i_Favorite, id_unique) => {
    icon_Hover_like_Favorite.classList.add('button_Like_Favorite');
    container_Favorite_Gif.appendChild(icon_Hover_like_Favorite);
    icon_Hover_like_Favorite.addEventListener("click", () => {
        remove_Favorite_Search(id_unique);
        document.getElementById(id_unique).classList.remove('icon-icon-fav-active');
        document.getElementById(id_unique).classList.toggle('icon-icon-fav-hover');

    })
}

/**
 * @method create_i_favorites
 * @description Crear el tag <i> para añadirle la clase que corresponde al icono de favoritos
 */

const create_i_favorites = (i_Favorite, button_favorite, icon_id) => {
    i_Favorite.classList.add('icon-icon-fav-active');
    i_Favorite.id = icon_id;
    button_favorite.appendChild(i_Favorite);
}

/**
 * @method create_Icon_Hover_Download_Favorite
 * @description Crear cada icono de descargar de la sección de favoritos
 */

const create_Icon_Hover_Download_Favorite = (icon_Hover_Download_Favorite, container_Favorite_Gif, gif_URL, a_Download) => {
    icon_Hover_Download_Favorite.classList.add('button_Download_Favorite');
    const i_Download_Favorite = document.createElement('i');
    i_Download_Favorite.classList.add('icon-icon-download');
    icon_Hover_Download_Favorite.appendChild(i_Download_Favorite);
    container_Favorite_Gif.appendChild(icon_Hover_Download_Favorite);
    download_Gif(gif_URL, a_Download);
}

/**
 * @method create_Icon_Hover_Fullscreen_Favorite
 * @description Crear cada icono de expansión del Gif
 */

const create_Icon_Hover_Fullscreen_Favorite = (icon_Hover_Fullscreen_Favorite, container_Favorite_Gif) => {
    icon_Hover_Fullscreen_Favorite.classList.add('button_Hover_Fullscreen_Favorite');
    const i_Fullscreen_Favorite = document.createElement('i');
    i_Fullscreen_Favorite.classList.add('icon-icon-max');
    icon_Hover_Fullscreen_Favorite.appendChild(i_Fullscreen_Favorite);
    container_Favorite_Gif.appendChild(icon_Hover_Fullscreen_Favorite);
}

/**
 * @method create_Listener_Favorite_Fullscreen
 * @description crear los eventos a cada icono de expansión de Gif
 */

const create_Listener_Favorite_Fullscreen = (listeners) => {
    listeners.forEach((listener) => {
        document.getElementById(listener.fullscreenButton).addEventListener('click', () => {
            fullscreen_Favorite.url = listener.gifImg;
            fullscreen_Favorite.username = listener.username;
            fullscreen_Favorite.gifTitle = listener.gifTitle;
            fullscreen_Favorite.id = listener.id;
            download_Gif(fullscreen_Favorite.url, a_Download_ExpandedGif);
            expand_Gif(fullscreen_Favorite.url, fullscreen_Favorite.username, fullscreen_Favorite.gifTitle, fullscreen_Favorite.id);
        })
    })
}

/**
 * @method remove_Favorite
 * @description remover los gifs favoritos
 */

const remove_Favorite = (index, array_Favorites) => {
    array_Favorites.splice(index, 1);
    console.log(array_Favorites)
    localStorage.clear();
    localStorage.setItem(STORAGE_NAME, JSON.stringify(array_Favorites))
    favorite_Section.removeChild(document.getElementById(`trending_Gif${index}`));
}

/**
 * Función para establecer la página home y ocultar las demás
 */
const change_HomePage = () => {

    if (misGifos_Section.className === 'misGifos_Section misGifos_Section--show') {
        misGifos_Section.classList.toggle('misGifos_Section--show');
    }

    if (favorite_Section.className === 'favorite_Section favorite_Section--show') {
        favorite_Section.classList.toggle('favorite_Section--show');

    }

    if (top_Section.className === 'top_Section top_Section--hidden') {
        top_Section.classList.toggle('top_Section--hidden');

    }
    if (search_Section.className === 'search_Section search_Section--hidden') {
        search_Section.classList.toggle('search_Section--hidden');
    }


    if (bottom_Section.className === 'bottom_Section bottom_Section--hidden') {
        bottom_Section.classList.toggle('bottom_Section--hidden');
    }

    if (misGifos_Create_Section.className === 'misGifos_Create_Section misGifos_Create_Section--show') {
        misGifos_Create_Section.classList.toggle('misGifos_Create_Section--show');
    }

}

home_Link.addEventListener('click', change_HomePage)


