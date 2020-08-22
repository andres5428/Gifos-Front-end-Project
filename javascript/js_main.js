/**
 * Imports
 */
import load_Data from './js_services.js';
import { get_Storage_Favorites } from './js_favorites.js';

/**
 * Global variables
 */
export let check_expand_misGifos = {check: false};
export const API_KEY = "9tHSL6e91Az0MShaJAR49KV8EzwUKi3H";
const URL = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}`;
const URL_AUTOCOMPLETE = `https://api.giphy.com/v1/gifs/search/tags?api_key=${API_KEY}`;
const URL_TRENDING = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=12`;
const URL_TRENDING_SUGGESTIONS = `https://api.giphy.com/v1/trending/searches?api_key=${API_KEY}`;
const STORAGE_NAME = 'Favorites';
let LIMIT = 12;
let OFFSET = 0;


/**
 * Variable storage from search iterations
 */
export let fullscreen_Favorite = { url: '', username: '', gifTitle: '', id: '' };
export let temporal_Id = '';

/**
  * DOM variables
  */

const input_Text = document.querySelector('.text_Input');
const section_Search = document.querySelector('.search_Section');
const ul_List_AutoComplete = document.querySelector('.list_AutoComplete');
const icon_Search = document.querySelector('.icon_Search');
const icon_Close_Search = document.querySelector('.icon_Close_Search');
const img_BottomSection_Container = document.querySelector('.trending_Container');
const back_slide = document.querySelector('.back_Slide');
const forward_slide = document.querySelector('.forward_Slide');
const trending_Container = document.querySelector('.trending_Container');
const save_Favorite_ExpandedGif_Button = document.querySelector('.save_Favorite_ExpandedGif');
const bottom_Section = document.querySelector('.bottom_Section');
const close_Button = document.querySelector('.close_ExpandedGif');
const gif_Expanded = document.querySelector('.gif_Expanded');
const footer = document.querySelector('.footer');
const modal = document.querySelector('.expand_Gif_Container');
const gif_Username_ExpandedGif = document.querySelector('.username_ExpandedGif');
const gif_Title_ExpandedGif = document.querySelector('.gif_Title_ExpandedGif');
const a_Download_ExpandedGif = document.querySelector('.a_Download_ExpandedGif');
const expand_Content = document.querySelector('.expand_Content');
const p_Main_Container = document.querySelector('.p_Main_Container');
const icon_Fav_Expanded = document.querySelector('.icon_Fav_Expanded');
const icon_Active_Search = document.querySelector('.icon_Active_Search');
const li_line = document.querySelector('.li_line');

/**
 * @method load
 * @description Realizar el fetch al activarse un evento
 */

const load = (() => {
    const input_Value = input_Text.value;
    const URL_Modified = `${URL}&limit=${LIMIT}&offset=${OFFSET}&q=${input_Value}`;
    reset(); 
    load_Data(URL_Modified).then((json) => {
        console.log(json);
        get_Gifos(json.data);
    }).catch((error) => {
        console.log(error);
    })
});

/**
 * @method reset
 * @description Reiniciar el html cuando se realice una nueva búsqueda
 */
const reset = (() => {

    while (section_Search.firstChild) section_Search.removeChild(section_Search.firstChild)
})


/**
 * @method get_Gifos
 * @description Imprimir los gifs
 * @param {array} resultados de búsqueda
 * @returns
 */

const get_Gifos = ((data) => {
    if (data.length !== 0) {
        const title_Search = document.createElement('h2');
        const input_Value_temporal = input_Text.value;
        title_Search.textContent = "Resultado de tu búsqueda: " + input_Value_temporal;
        title_Search.classList.add('title_Search');
        section_Search.appendChild(title_Search);
        let listener = [];
        let listener_Download = [];
        let listener_Fullscreen = [];
        data.forEach((gifo, index) => {
            const gif_URL_Source = gifo.images.original.url;
            const id_Gifo = gifo.id;
            const is_Favorite = check_Favorite(id_Gifo);
            const div_img = document.createElement('div');
            div_img.classList.add(`img_Container_SearchSection`);
            div_img.id = `search_Gif${index}`;
            section_Search.appendChild(div_img);
            create_Img(gif_URL_Source, div_img);
            create_Username(gifo, div_img);
            create_Gif_Title(gifo, div_img);
            const icon_Hover_Like = document.createElement('button');
            create_Icon_Hover_Like(icon_Hover_Like, div_img);
            const icon_Hover_Like_i = document.createElement('i');
            icon_Hover_Like_i.id = id_Gifo;
            icon_Hover_Like.appendChild(icon_Hover_Like_i);
            if (is_Favorite === true) {
                icon_Hover_Like_i.classList.add('icon-icon-fav-active');
            }
            else {
                icon_Hover_Like_i.classList.add('icon-icon-fav-hover');
            }
            listener.push({ gifImg: gif_URL_Source, favoriteimge: icon_Hover_Like, username: gifo.username, gifTitle: gifo.title, index: index, id: div_img.id, id_Gifo: id_Gifo });
            const a_Download = document.createElement('a');
            a_Download.classList.add('a_download');
            div_img.appendChild(a_Download);
            listener_Download.push({ gifImg: gif_URL_Source, a_download: a_Download })
            const icon_Hover_Download = document.createElement('img');
            create_Icon_Hover_Download(icon_Hover_Download, div_img);
            const icon_Hover_Fullscreen = document.createElement('img');
            icon_Hover_Fullscreen.id = `Expand_${index}`;
            create_Icon_Hover_Fullscreen(icon_Hover_Fullscreen, div_img);
            listener_Fullscreen.push({ gifImg: gif_URL_Source, fullscreenButton: icon_Hover_Fullscreen.id, username: gifo.username, gifTitle: gifo.title, id: div_img.id, index: index, id_Gifo: id_Gifo })
        });
        create_Listener(listener);

        if (data.length !== 0) {
            create_MoreGifs_Button(section_Search);
        }

        create_Listener_Download(listener_Download);
        create_Listener_Fullscreen(listener_Fullscreen);
    }
    else {
        const div_NoSearch = document.createElement('div');
        div_NoSearch.classList.add('div_NoSearch');
        section_Search.appendChild(div_NoSearch);
        const line_NoSearch = document.createElement('div');
        line_NoSearch.classList.add('line_NoSearch');
        div_NoSearch.appendChild(line_NoSearch);
        const h2_NoSearch = document.createElement('h2');
        h2_NoSearch.classList.add('h2_NoSearch');
        h2_NoSearch.textContent = "Lorem Ipsum";
        div_NoSearch.appendChild(h2_NoSearch);
        const i_NoSearch = document.createElement('img');
        i_NoSearch.classList.add('icon_NoSearch');
        i_NoSearch.setAttribute('src', 'recursos/assets/icon-busqueda-sin-resultado.svg');
        div_NoSearch.appendChild(i_NoSearch);
        const h3_NoSearch = document.createElement('h3');
        h3_NoSearch.classList.add('h3_NoSearch');
        h3_NoSearch.textContent = 'Intenta con otra búsqueda.';
        div_NoSearch.appendChild(h3_NoSearch);
    }
})

/**
 * @method create_Img
 * @description Crear cada GIF con su respectiva URL
 */
const create_Img = (gif_URL, div_img) => {
    const imge = document.createElement("img");
    imge.classList.add('imge');
    imge.src = gif_URL;
    div_img.appendChild(imge);
}

/**
 * @method create_Gif_Title
 * @description Crear el titulo de cada gif según la fuente
 */

const create_Gif_Title = (gifo, div_Img) => {
    const p_Gif_Title = document.createElement('p');
    p_Gif_Title.classList.add('p_gif_title');
    const gif_Title = gifo.title;
    p_Gif_Title.textContent = gif_Title;
    div_Img.appendChild(p_Gif_Title);
}

/**
 * @method create_Icon_Hover_Like
 * @description Crear el icono de favoritos para cada GIF
 */

const create_Icon_Hover_Like = (icon_hover_like, div_img) => {
    icon_hover_like.classList.add('icon_hover_like');
    div_img.appendChild(icon_hover_like);
}

/**
 * @method create_Listener
 * @description Crea el evento para cada imagen de favoritos
 * @param {*} listeners 
 */
const create_Listener = (listeners) => {
    listeners.forEach((listener) => {
        listener.favoriteimge.addEventListener("click", () => {
            if (document.getElementById(listener.id_Gifo).className === 'icon-icon-fav-hover') {
                document.getElementById(listener.id_Gifo).classList.remove('icon-icon-fav-hover');
                document.getElementById(listener.id_Gifo).classList.toggle('icon-icon-fav-active');
                save_Favorite(listener.gifImg, listener.username, listener.gifTitle, listener.id, document.getElementById(listener.id_Gifo), listener.id_Gifo);
                get_Storage_Favorites();
            }

            else {
                remove_Favorite_Search(listener.id_Gifo);
                document.getElementById(listener.id_Gifo).classList.remove('icon-icon-fav-active');
                document.getElementById(listener.id_Gifo).classList.toggle('icon-icon-fav-hover');

            }

        })

    })
}

/**
 * @method remove_Favorite_Search
 */

export const remove_Favorite_Search = (id_Gif) => {
    const new_Favorites_Search = [];
    const array_Favorites = JSON.parse(localStorage.getItem('Favorites')) || [];
    array_Favorites.forEach((gif) => {
        if (gif.id_Gifo !== id_Gif) {
            new_Favorites_Search.push(gif);
        }
    })
    localStorage.removeItem('Favorites');
    localStorage.setItem(STORAGE_NAME, JSON.stringify(new_Favorites_Search));
    get_Storage_Favorites();
}

/**
 * @method create_Listener_Download
 * @description
 */

const create_Listener_Download = (listeners) => {
    listeners.forEach((listener) => {
        download_Gif(listener.gifImg, listener.a_download)
    })
}

/**
 * @method create_Listener_Fullscreen  
 */

const create_Listener_Fullscreen = (listeners) => {
    listeners.forEach((listener) => {
        document.getElementById(listener.fullscreenButton).addEventListener("click", () => {
            fullscreen_Favorite.url = listener.gifImg;
            fullscreen_Favorite.username = listener.username;
            fullscreen_Favorite.gifTitle = listener.gifTitle;
            fullscreen_Favorite.id = listener.id_Gifo;
            temporal_Id = listener.id_Gifo;
            if (check_expand_misGifos.check === true){
                check_expand_misGifos.check = false;
            }
            console.log(check_expand_misGifos.check)
            if (document.getElementById(temporal_Id).className === 'icon-icon-fav-hover') {
                icon_Fav_Expanded.classList.remove('icon-icon-fav-hover')
                icon_Fav_Expanded.classList.remove('icon-icon-fav-active');
                icon_Fav_Expanded.classList.add('icon-icon-fav-hover');
            }
            else {
                icon_Fav_Expanded.classList.remove('icon-icon-fav-hover')
                icon_Fav_Expanded.classList.remove('icon-icon-fav-active');
                icon_Fav_Expanded.classList.add('icon-icon-fav-active');
            }

            expand_Gif(fullscreen_Favorite.url, fullscreen_Favorite.username, fullscreen_Favorite.gifTitle, fullscreen_Favorite.id);
            download_Gif(fullscreen_Favorite.url, a_Download_ExpandedGif);

        })
    })
}

/**
 * @method expand_Gif
 */

export const expand_Gif = (url_Gif, gifUsername, gifTitle, id_div) => {
    hide_Expanded_Gif();
    create_Expanded_Img(url_Gif, gifUsername, gifTitle, id_div);
    hide_Sections();
}

/**
 * hide_Sections
 */

export const hide_Sections = () => {
    section_Search.classList.toggle('search_Section--hidden');
    bottom_Section.classList.toggle('bottom_Section--hidden');
    footer.classList.toggle('footer--hidden');
}


/**
 * @method hide_Expanded_Gif
 */

export const hide_Expanded_Gif = () => {
    modal.classList.toggle('expand_Gif_Container--hidden');
}

/**
 * Añadir evento al botón de salir en el gif expandido
 */

close_Button.addEventListener('click', () => {
    hide_Expanded_Gif();
    hide_Sections();
    check_expand_misGifos.check = false;
    console.log(check_expand_misGifos)
});


/**
 * Añadir evento de guardado en el local storage
 */
save_Favorite_ExpandedGif_Button.addEventListener("click", () => {


    if (icon_Fav_Expanded.className === 'icon_Fav_Expanded icon-icon-fav-hover' && check_expand_misGifos.check === false) {
        document.getElementById(temporal_Id).classList.remove('icon-icon-fav-hover');
        document.getElementById(temporal_Id).classList.remove('icon-icon-fav-active');
        document.getElementById(temporal_Id).classList.add('icon-icon-fav-active');
        icon_Fav_Expanded.classList.remove('icon-icon-fav-hover');
        icon_Fav_Expanded.classList.remove('icon-icon-fav-active');
        icon_Fav_Expanded.classList.add('icon-icon-fav-active');
        save_Favorite(fullscreen_Favorite.url, fullscreen_Favorite.username, fullscreen_Favorite.gifTitle, fullscreen_Favorite.id, '', temporal_Id);
        get_Storage_Favorites();
    } 
    else if (icon_Fav_Expanded.className === 'icon_Fav_Expanded icon-icon-fav-active' && check_expand_misGifos.check === false) {
        remove_Favorite_Search(fullscreen_Favorite.id);
        document.getElementById(temporal_Id).classList.remove('icon-icon-fav-active');
        document.getElementById(temporal_Id).classList.remove('icon-icon-fav-hover');
        document.getElementById(temporal_Id).classList.add('icon-icon-fav-hover');
        icon_Fav_Expanded.classList.remove('icon-icon-fav-hover');
        icon_Fav_Expanded.classList.remove('icon-icon-fav-active');
        icon_Fav_Expanded.classList.add('icon-icon-fav-hover');
    }

    if (icon_Fav_Expanded.className === 'icon_Fav_Expanded icon-icon-fav-hover' && check_expand_misGifos.check === true) {
        icon_Fav_Expanded.classList.remove('icon-icon-fav-hover');
        icon_Fav_Expanded.classList.remove('icon-icon-fav-active');
        icon_Fav_Expanded.classList.add('icon-icon-fav-active');
        save_Favorite(fullscreen_Favorite.url, fullscreen_Favorite.username, fullscreen_Favorite.gifTitle, fullscreen_Favorite.id, '',fullscreen_Favorite.id);
        get_Storage_Favorites();

    } else if (icon_Fav_Expanded.className === 'icon_Fav_Expanded icon-icon-fav-active' && check_expand_misGifos.check === true) {
        remove_Favorite_Search(fullscreen_Favorite.id);
        icon_Fav_Expanded.classList.remove('icon-icon-fav-hover');
        icon_Fav_Expanded.classList.remove('icon-icon-fav-active');
        icon_Fav_Expanded.classList.add('icon-icon-fav-hover');
    }


});


/**
 * @method create_Expanded_Img
 */

export const create_Expanded_Img = (url_Gif, gifUsername, gifTitle, id_div) => {
    gif_Expanded.src = url_Gif;
    gif_Title_ExpandedGif.textContent = gifTitle;
    gif_Username_ExpandedGif.textContent = gifUsername;
    expand_Content.id = id_div;
    icon_Fav_Expanded.id = '';


}

/**
 * @method download_Gif
 * @description
 */

export const download_Gif = (URL_download, a_Download) => {
    async function download_Gif_asyncfunction() {
        const response = await fetch(URL_download)
        if (response.ok) {
            const blob = response.blob();
            return blob;
        }
        else {
            throw new error("error");
        }
    }
    const response = download_Gif_asyncfunction(URL_download);
    response.then((blob) => {
        a_Download.setAttribute('download', blob.type);
        const objectURL = window.URL.createObjectURL(blob);
        a_Download.setAttribute('href', objectURL);
    })
}

/**
 * @method create_Icon_Hover_Download
 * @description Crear el icono de descarga para cada GIF
 */

const create_Icon_Hover_Download = (icon_hover_download, div_img) => {
    icon_hover_download.classList.add('icon_hover_download');
    icon_hover_download.setAttribute('src', "recursos/assets/icon-download.svg")
    div_img.appendChild(icon_hover_download);
}

/**
 * @method create_Icon_Hover_Fullscreen
 * @description Crear el icono para ampliar el tamaño para cada GIF
 */
const create_Icon_Hover_Fullscreen = (icon_Hover_Fullscreen, div_img) => {
    icon_Hover_Fullscreen.classList.add('icon_hover_fullscreen');
    icon_Hover_Fullscreen.setAttribute('src', "recursos/assets/icon-max.svg")
    div_img.appendChild(icon_Hover_Fullscreen);
}

/**
 * @method create_MoreGifs_Button
 * @description Crea el botón de "ver más", le añade el evento click para aumentar el número de GIFS
 */

const create_MoreGifs_Button = (section_Search) => {
    const moreGifs_Container = document.createElement('div');
    moreGifs_Container.classList.add('moreGifs_Container');
    section_Search.appendChild(moreGifs_Container);
    const moreGifs = document.createElement("div");
    moreGifs.classList.add('btn_MoreGifs');
    moreGifs.textContent = "Ver más";
    moreGifs_Container.appendChild(moreGifs);
    moreGifs.addEventListener("click", () => {
        //LIMIT += 12;
        OFFSET += 12;
        load();
    })
}



/**
 * @method create_Username
 * @description Crear e imprimir el nombre de usuario del GIF
 */
const create_Username = (gifo, div_img) => {
    const p_Username = document.createElement('p');
    p_Username.classList.add('p_Username');
    const user_Name = gifo.username;
    p_Username.textContent = user_Name;
    div_img.appendChild(p_Username);
}

const reset_icon = () => {

    if (icon_Search.className === 'icon-icon-search icon_Search icon_Search--hidden') {
        icon_Search.classList.toggle('icon_Search--hidden');
    }

    if (icon_Close_Search.className === 'icon-close icon_Close_Search icon_Close_Search--show') {
        icon_Close_Search.classList.toggle('icon_Close_Search--show');
    }
}

const icon_click = () => {
    LIMIT = 12;
    load();
    reset_List();
    reset_icon();


    if (icon_Active_Search.className === 'icon-icon-search icon_Active_Search icon_Active_Search--show') {
        icon_Active_Search.classList.toggle('icon_Active_Search--show');
    }

    if (li_line.className === 'li_line li_line--show') {
        li_line.classList.toggle('li_line--show');
    }

}

// Click en el ícono del search y activar la búsqueda
icon_Search.addEventListener("click", icon_click);

icon_Close_Search.addEventListener('click', () => {
    input_Text.value = '';
    while (ul_List_AutoComplete.firstChild) ul_List_AutoComplete.removeChild(ul_List_AutoComplete.firstChild)

    if (icon_Search.className === 'icon-icon-search icon_Search icon_Search--hidden') {
        icon_Search.classList.toggle('icon_Search--hidden');
    }

    if (icon_Close_Search.className === 'icon-close icon_Close_Search icon_Close_Search--show') {
        icon_Close_Search.classList.toggle('icon_Close_Search--show');
    }

    if (li_line.className === 'li_line li_line--show') {
        li_line.classList.toggle('li_line--show');
    }

    if (icon_Active_Search.className === 'icon-icon-search icon_Active_Search icon_Active_Search--show') {
        icon_Active_Search.classList.toggle('icon_Active_Search--show');
    }

})

// Evento para realizar la búsqueda oprimiendo enter
const enterpress = (event) => {
    if (event.keyCode == 13) {
        LIMIT = 12;
        reset_List();;
        load();
        reset_icon();


        if (icon_Active_Search.className === 'icon-icon-search icon_Active_Search icon_Active_Search--show') {
            icon_Active_Search.classList.toggle('icon_Active_Search--show');
        }

        if (li_line.className === 'li_line li_line--show') {
            li_line.classList.toggle('li_line--show');
        }
    }
}
input_Text.addEventListener("keypress", enterpress);

/**
 * @method trending_Gifs
 * @description Resolver la promesa con la URL de trending
 */

const trending_Gifs = (() => {
    load_Data(URL_TRENDING).then((json) => {
        console.log(json);
        get_Trending_Gifs(json.data)
    }).catch((error) => {
        console.log(error);
    })
})

trending_Gifs();
/**
 * @method get_Trending_Gifs
 * @description Extraer la información necesaria de la URL trending
 */

const get_Trending_Gifs = (data) => {
    let listener_Trending = [];
    let listener_Trending_Download = [];
    let listener_Trending_Fullscreen = [];
    console.log(data);
    data.forEach((trendingGIF, index) => {
        const URL_Trending_Gif = trendingGIF.images.original.url;
        const trending_Gifo_Id = trendingGIF.id;
        const is_Favorite = check_Favorite(trending_Gifo_Id);
        const div_img_bottom = document.createElement('div');
        div_img_bottom.id = `trending_Gif${index}`;
        div_img_bottom.classList.add('div_img_bottom');
        img_BottomSection_Container.appendChild(div_img_bottom);
        create_Img_Trending(trendingGIF, div_img_bottom);
        create_Username_Trending(trendingGIF, div_img_bottom);
        create_Gif_Title_Trending(trendingGIF, div_img_bottom);
        const icon_Hover_Like_Trending = document.createElement('button');
        create_Icon_Hover_Like_Trending(icon_Hover_Like_Trending, div_img_bottom);
        const icon_Hover_Like_Trending_i = document.createElement('i');
        if (is_Favorite === true) {
            icon_Hover_Like_Trending_i.classList.add('icon-icon-fav-active');
        }
        else {
            icon_Hover_Like_Trending_i.classList.add('icon-icon-fav-hover');
        }
        icon_Hover_Like_Trending_i.id = trending_Gifo_Id;
        icon_Hover_Like_Trending.appendChild(icon_Hover_Like_Trending_i);
        listener_Trending.push({ gifImgTrending: URL_Trending_Gif, favoriteimge_Trending: icon_Hover_Like_Trending, username_Trending: trendingGIF.username, title_Trending: trendingGIF.title, index: index, id: div_img_bottom.id, trending_Gifo_Id: trending_Gifo_Id })
        const a_Download_Trending = document.createElement('a');
        a_Download_Trending.classList.add('a_Download');
        div_img_bottom.appendChild(a_Download_Trending);
        const icon_Hover_Download_Trending = document.createElement('img');
        create_Icon_Hover_Download_Trending(icon_Hover_Download_Trending, div_img_bottom);
        listener_Trending_Download.push({ gifImgTrending: URL_Trending_Gif, downloadImg: a_Download_Trending })
        const icon_Hover_Fullscreen_Trending = document.createElement('img');
        create_Icon_Hover_Fullscreen_Trending(icon_Hover_Fullscreen_Trending, div_img_bottom);
        listener_Trending_Fullscreen.push({ gifImg: URL_Trending_Gif, fullscreenButton: icon_Hover_Fullscreen_Trending, username: trendingGIF.username, gifTitle: trendingGIF.title, id: div_img_bottom.id, index: index, id_Gifo: trending_Gifo_Id });
    });
    create_Listener_Trending_Like(listener_Trending);
    create_Listener_Trending_Download(listener_Trending_Download);
    create_Listener_Trending_Fullscreen(listener_Trending_Fullscreen);
}

/**
 * @method check_Favorite
 * @description Revisar si los Gifs están en el localStorage
 */

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
 * @method create_Listener_Trending_Like
 * @description Crear el evento para cada icono de favorito del trending GIF
*/

const create_Listener_Trending_Like = (listeners) => {
    listeners.forEach((listener) => {
        listener.favoriteimge_Trending.addEventListener('click', () => {

            if (document.getElementById(listener.trending_Gifo_Id).className === 'icon-icon-fav-hover') {
                document.getElementById(listener.trending_Gifo_Id).classList.remove('icon-icon-fav-hover');
                document.getElementById(listener.trending_Gifo_Id).classList.toggle('icon-icon-fav-active');
                icon_Fav_Expanded.classList.remove('icon-icon-fav-hover');
                icon_Fav_Expanded.classList.toggle('icon-icon-fav-active');
                save_Favorite(listener.gifImgTrending, listener.username_Trending, listener.title_Trending, listener.id, '', listener.trending_Gifo_Id);
                get_Storage_Favorites();

            }
            else {
                remove_Favorite_Trending(listener.trending_Gifo_Id);
                icon_Fav_Expanded.classList.remove('icon-icon-fav-active');
                icon_Fav_Expanded.classList.toggle('icon-icon-fav-hover');
                document.getElementById(listener.trending_Gifo_Id).classList.remove('icon-icon-fav-active');
                document.getElementById(listener.trending_Gifo_Id).classList.toggle('icon-icon-fav-hover');


            }
        })
    })
}
/**
 * @method save_Favorite
 * @param {*} gif_Src 
 * @description Añade el array que contiene la URL del GIF en el local storage
 */

const save_Favorite = (gif_Src, username, title, id_Gif, icon_id, id_Gifo) => {

    const array_Favorites = JSON.parse(localStorage.getItem('Favorites')) || [];
    if (array_Favorites.length !== 0) {
        let check = false;
        array_Favorites.forEach((gif) => {
            if (gif.id_Gifo === id_Gif) {
                check = true;
            }
        });
        if (check) {
            return
        }
        array_Favorites.push({ gif_Src: gif_Src, username: username, title: title, id: id_Gif, icon_id: icon_id, id_Gifo: id_Gifo });
        localStorage.setItem(STORAGE_NAME, JSON.stringify(array_Favorites));

    }
    else {
        array_Favorites.push({ gif_Src: gif_Src, username: username, title: title, id: id_Gif, icon_id: icon_id, id_Gifo: id_Gifo });
        localStorage.setItem(STORAGE_NAME, JSON.stringify(array_Favorites));
    }
}

/**
 * @method remove_Favorite_Trending
 */

const remove_Favorite_Trending = (id_Gif) => {
    const new_Favorites_Trending = [];
    const array_Favorites = JSON.parse(localStorage.getItem('Favorites'));
    array_Favorites.forEach(gif => {
        if (gif.id_Gifo !== id_Gif) {
            new_Favorites_Trending.push(gif);
        }
    });
    localStorage.removeItem('Favorites');
    localStorage.setItem(STORAGE_NAME, JSON.stringify(new_Favorites_Trending));
    get_Storage_Favorites();
}

/** 
 * @method create_Listener_Trending_Download
 * @description Crear el evento para cada icono de descarga del trending GIF
*/

const create_Listener_Trending_Download = (listeners) => {
    listeners.forEach((listener) => {
        download_Gif(listener.gifImgTrending, listener.downloadImg)
    })
}

/**
 * @method create_Listener_Trending_Fullscreen
 */

const create_Listener_Trending_Fullscreen = (listeners) => {
    listeners.forEach((listener) => {
        listener.fullscreenButton.addEventListener("click", () => {
            fullscreen_Favorite.url = listener.gifImg;
            fullscreen_Favorite.username = listener.username;
            fullscreen_Favorite.gifTitle = listener.gifTitle;
            fullscreen_Favorite.id = listener.id_Gifo;
            temporal_Id = listener.id_Gifo;
            if (check_expand_misGifos.check === true){
                check_expand_misGifos.check = false;
            }
            if (document.getElementById(temporal_Id).className === 'icon-icon-fav-hover') {
                icon_Fav_Expanded.classList.remove('icon-icon-fav-hover');
                icon_Fav_Expanded.classList.remove('icon-icon-fav-active');
                icon_Fav_Expanded.classList.add('icon-icon-fav-hover');
            }
            else {
                icon_Fav_Expanded.classList.remove('icon-icon-fav-hover');
                icon_Fav_Expanded.classList.remove('icon-icon-fav-active');
                icon_Fav_Expanded.classList.add('icon-icon-fav-active');
            }

            expand_Gif(fullscreen_Favorite.url, fullscreen_Favorite.username, fullscreen_Favorite.gifTitle, fullscreen_Favorite.id);
            download_Gif(fullscreen_Favorite.url, a_Download_ExpandedGif);
        })
    })
}

/**
 * @method create_Img_Trending
 * @description Crea cada GIF de trending
 */

const create_Img_Trending = (TrendingGIF, div_img_bottom) => {
    const img_Trending = document.createElement('img');
    img_Trending.classList.add(`img_Trending`);
    img_Trending.setAttribute("src", TrendingGIF.images.original.url)
    div_img_bottom.appendChild(img_Trending);
}

/**
 * @method create_Username_Trending
 */
const create_Username_Trending = (trendingGIF, div_img_bottom) => {
    const p_Username_Trending = document.createElement('p');
    p_Username_Trending.classList.add('p_Username_Trending');
    const userName_Trending = trendingGIF.username;
    p_Username_Trending.textContent = userName_Trending;
    div_img_bottom.appendChild(p_Username_Trending);
}

/**
 * @method create_Gif_Title
 * @description
 */

const create_Gif_Title_Trending = (trendingGIF, div_Img_Bottom) => {
    const p_Gif_Title_Trending = document.createElement('p');
    p_Gif_Title_Trending.classList.add('gif_title_trending');
    const gif_Title_Trending = trendingGIF.title;
    p_Gif_Title_Trending.textContent = gif_Title_Trending;
    div_Img_Bottom.appendChild(p_Gif_Title_Trending);

}

/**
 * @method create_Icon_Hover_Like_Trending
 * @description Crear el icono de favorito para cada Trending GIF
 */

const create_Icon_Hover_Like_Trending = (icon_hover_like_Trending, div_Img_Bottom) => {
    icon_hover_like_Trending.classList.add('icon_hover_like_trending');
    div_Img_Bottom.appendChild(icon_hover_like_Trending);
}

/**
 * @method create_Icon_Hover_Download_Trending
 * @description Crear el icono de descarga para cada Trending GIF
 */

const create_Icon_Hover_Download_Trending = (icon_hover_download_Trending, div_Img_Bottom) => {
    icon_hover_download_Trending.classList.add('icon_hover_download_trending');
    icon_hover_download_Trending.setAttribute('src', "recursos/assets/icon-download.svg")
    div_Img_Bottom.appendChild(icon_hover_download_Trending);
}

/**
 * @method create_Icon_Hover_Fullscreen_Trending
 * @description Crear el icono de descarga para cada Trending GIF
 */

const create_Icon_Hover_Fullscreen_Trending = (icon_hover_fullscreen_Trending, div_Img_Bottom) => {
    icon_hover_fullscreen_Trending.classList.add('icon_hover_fullscreen_trending');
    icon_hover_fullscreen_Trending.setAttribute('src', "recursos/assets/icon-max.svg")
    div_Img_Bottom.appendChild(icon_hover_fullscreen_Trending);
}

/**
 * @method create_EventListener_Slides
 */

const create_EventListener_Slides = (() => {
    forward_slide.addEventListener("click", () => {
        trending_Container.scrollLeft += 270;
    })

    back_slide.addEventListener("click", () => {
        trending_Container.scrollLeft += -270;
    })
}
)
create_EventListener_Slides();
/**
 * @method auto_Complete
 * @description Realizar fetch al EndPoint de autocompletar
 * @returns {array} resultados de autocompletado
 */

const auto_Complete = (() => {
    const URL_Modified_AutoComplete = `${URL_AUTOCOMPLETE}&q=${input_Text.value}`;
    load_Data(URL_Modified_AutoComplete).then((json) => {
        console.log(json);
        get_AutoComplete(json.data);
    }).catch((error) => {
        console.log(error);
    })
});

const get_AutoComplete = (data) => {
    ul_List_AutoComplete.innerHTML = '';
    for (let auto_Complete of data) {
        const li_autoComplete = document.createElement('li');
        li_autoComplete.classList.add('li_AutoComplete');
        const name = auto_Complete.name;
        li_autoComplete.textContent = auto_Complete.name;
        const icon_AutoComplete = document.createElement('i');
        icon_AutoComplete.classList.add('icon-icon-search', 'icon_AutoComplete');
        ul_List_AutoComplete.appendChild(icon_AutoComplete);
        ul_List_AutoComplete.appendChild(li_autoComplete);
        li_autoComplete.addEventListener("click", () => {
            input_Text.value = name;
            load();
            reset_List();
            reset_icon();

            if (icon_Active_Search.className === 'icon-icon-search icon_Active_Search icon_Active_Search--show') {
                icon_Active_Search.classList.toggle('icon_Active_Search--show');
            }

            if (li_line.className === 'li_line li_line--show') {
                li_line.classList.toggle('li_line--show');
            }
        });

    }
}


const reset_List = () => {
    while (ul_List_AutoComplete.firstChild) ul_List_AutoComplete.removeChild(ul_List_AutoComplete.firstChild)
}

// Evento Keypress
input_Text.addEventListener("keypress", () => {
    if (event.keyCode !== 13) {
        auto_Complete();

        if (icon_Search.className === 'icon-icon-search icon_Search') {
            icon_Search.classList.toggle('icon_Search--hidden');
        }

        if (icon_Close_Search.className === 'icon-close icon_Close_Search') {
            icon_Close_Search.classList.toggle('icon_Close_Search--show');
        }


        if (icon_Active_Search.className === 'icon-icon-search icon_Active_Search') {
            icon_Active_Search.classList.toggle('icon_Active_Search--show');
        }

        if (li_line.className === 'li_line') {
            li_line.classList.toggle('li_line--show');
        }

    }

});

const trending_Gif_Suggestions = (() => {
    load_Data(URL_TRENDING_SUGGESTIONS).then((json) => {
        console.log(json);
        get_Trending_Gif_Suggestions(json.data)
    }).catch((error) => {
        console.log(error);
    })
})
trending_Gif_Suggestions();
let last_P = '';
const get_Trending_Gif_Suggestions = (data) => {
    let cont = 0;
    data.forEach((suggest, index) => {
        if (cont < 5) {
            cont += 1;
            const p_Suggestion = document.createElement('p');
            p_Suggestion.classList.add(`p_Main`);
            p_Suggestion.textContent = `${suggest}, `;
            last_P = suggest;
            p_Main_Container.appendChild(p_Suggestion);
            p_Suggestion.addEventListener('click', () => {
                input_Text.value = suggest;
                load();
            })
        }
    })
    p_Main_Container.lastChild.textContent = `${last_P}`;
}