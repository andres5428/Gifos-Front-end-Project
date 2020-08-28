/**
 * imports
 */

import { API_KEY } from './js_main.js';


/**
 * Global variables
 */
const Gif_Username = 'ACJA';
const STORAGE_GIF = 'Mis_GIFOS';
export let mediaStream_Status;
let start_Date_Chrono;
let chrono;

/**
 * DOM Global variables
 */
const misGifos_Create_Section = document.querySelector('.misGifos_Create_Section');
const btn_CreateGif = document.querySelector('.btn_CreateGif');
const top_Section = document.querySelector('.top_Section');
const search_Section = document.querySelector('.search_Section');
const bottom_Section = document.querySelector('.bottom_Section');
const favorite_Section = document.querySelector('.favorite_Section');
const misGifos_Section = document.querySelector('.misGifos_Section');
const begin_Button = document.querySelector('.begin_Button');
const step_1 = document.querySelector('.step_1');
const step_2 = document.querySelector('.step_2');
const step_3 = document.querySelector('.step_3');
const p_1 = document.querySelector('.p_1');
const p_2 = document.querySelector('.p_2');
const p_3 = document.querySelector('.p_3');
const p_4 = document.querySelector('.p_4');
const video_Tag = document.querySelector('.video_Tag');
const video_Container = document.querySelector('.video_Container')
const record_Button = document.querySelector('.record_Button');
const stop_Record_Button = document.querySelector('.stop_Record_Button');
const upload_Gifo_button = document.querySelector('.upload_Gifo_button');
const misGifos_Create_Container = document.querySelector('.misGifos_Create_Container');
const home_Link = document.querySelector('.logo_Gifos');
const p_Uploading_Container = document.querySelector('.p_Uploading_Container');
const img_CreateGif = document.querySelector('.img_CreateGif');
const repeat_Container = document.querySelector('.repeat_Container');
export const chronometerTime = document.querySelector('.chronometerTime');


/**
 * @method change_MisGifos_CreatePage
 * @description Cambiar a la sección de creación de Gifs
 */
const change_MisGifos_CreatePage = () => {

    if (misGifos_Create_Section.className === 'misGifos_Create_Section') {
        misGifos_Create_Section.classList.toggle('misGifos_Create_Section--show');
    }

    if (bottom_Section.className === 'bottom_Section') {
        bottom_Section.classList.toggle('bottom_Section--hidden');
    }


    if (search_Section.className === 'search_Section') {
        search_Section.classList.toggle('search_Section--hidden');
    }
    if (top_Section.className === 'top_Section') {
        top_Section.classList.toggle('top_Section--hidden');
    }

    if (favorite_Section.className === 'favorite_Section favorite_Section--show') {
        favorite_Section.classList.toggle('favorite_Section--show');

    }

}

/**
 * Añadir el evento de click al botón de crear gifs
 */

btn_CreateGif.addEventListener('click', () => {
    change_MisGifos_CreatePage();
    btn_CreateGif.classList.toggle('btn_CreateGif--active');
    img_CreateGif.classList.toggle('img_CreateGif--active');

    if (misGifos_Section.className === 'misGifos_Section misGifos_Section--show') {
        misGifos_Section.classList.toggle('misGifos_Section--show');
    }

    if (begin_Button.className === 'begin_Button begin_Button--hidden' && record_Button.className === 'record_Button') {
        begin_Button.classList.toggle('begin_Button--hidden');
    }

    if (btn_CreateGif.className === 'btn_CreateGif btn_CreateGif--active') {

        btn_CreateGif.classList.toggle('btn_CreateGif--active');

        if (img_CreateGif.className === 'icon-button-crear-gifo img_CreateGif img_CreateGif--active') {
            img_CreateGif.classList.toggle('img_CreateGif--active');
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
    
        if (record_Button.className === 'record_Button record_Button--show') {
            record_Button.classList.toggle('record_Button--show');
        }
    
        if (upload_Gifo_button.className === 'upload_Gifo_button upload_Gifo_button--show') {
            upload_Gifo_button.classList.toggle('upload_Gifo_button--show');
        }
    
        if (stop_Record_Button.className === 'stop_Record_Button stop_Record_Button--show') {
            stop_Record_Button.classList.toggle('stop_Record_Button--show');
        }
    
        if (step_1.className === 'step step_1 step--filled')
            step_1.classList.toggle('step--filled');
    
        if (step_2.className === 'step step_2 step--filled')
            step_2.classList.toggle('step--filled');
    
        if (step_3.className === 'step step_1 step--filled')
            step_3.classList.toggle('step--filled');
            
        if (mediaStream_Status === true){
            mediaStream_Video.stop();
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
    
        if (repeat_Container.className === 'repeat_Container repeat_Container--show') {
            repeat_Container.classList.toggle('repeat_Container--show');
        }
    
        if (video_Tag.className === 'video_Tag video_Tag--uploading') {
            video_Tag.classList.toggle('video_Tag--uploading');
        }

        if (chronometerTime.className === 'chronometerTime chronometerTime--show'){
            chronometerTime.classList.toggle('chronometerTime--show');
        }

        while (p_Uploading_Container.firstChild) {
            p_Uploading_Container.removeChild(p_Uploading_Container.firstChild)
        }
    }


})

/**
 * @method begin_Create_Gifo
 * @description funciones del botón de "comenzar" el proceso de grabación
 */

const begin_Create_Gifo = () => {

    step_1.classList.toggle('step--filled');
    begin_Button.classList.toggle('begin_Button--hidden');
    p_1.textContent = '¿Nos das acceso';
    p_2.textContent = 'a tu cámara?';
    p_3.textContent = 'El acceso a tu cámara será válido sólo';
    p_4.textContent = 'por el tiempo en el que estés creando el GIFO.';
    mediaStream_Video = {};
}

const constraints_Active = {
    video: { width: 480, height: 320 },
    audio: false
}


export let mediaStream_Video = {};
let form_Data= '';

/**
 * @method camera_Permission
 * @description Función para solicitar los permisos de la cámara del usuario
 */

const camera_Permission = () => {

    navigator.mediaDevices.getUserMedia(constraints_Active).then((MediaStream) => {
        console.log(MediaStream);
        mediaStream_Video = MediaStream;
        video_Tag.srcObject = MediaStream;
        video_Tag.play();
        video_Container.classList.toggle('video_Container--show');
        p_1.classList.toggle('p_1--hidden');
        p_2.classList.toggle('p_2--hidden');
        p_3.classList.toggle('p_3--hidden');
        p_4.classList.toggle('p_4--hidden');
        step_1.classList.toggle('step--filled');
        step_2.classList.toggle('step--filled');
        record_Button.classList.toggle('record_Button--show');
        mediaStream_Status = true;
        recorder =
            RecordRTC(mediaStream_Video, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,
                onGifRecordingStarted: function () {
                    console.log('started');
                },
            });
    }).catch((error) => {
        console.log(error);
        alert('No aceptaste los permisos o tienes problemas con tu cámara');
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
    })

}
/**
 * añadir el evento de click al botón de "comenzar" el proceso de grabación
 */
begin_Button.addEventListener('click', () => {
    begin_Create_Gifo();
    camera_Permission(constraints_Active);

});

let recorder = {};
let array_Gif_Data = [];
let form = new FormData();

/**
 * añadir el evento de click al botón de iniciar la grabación a través de la librería recordRTC
 */

record_Button.addEventListener('click', () => {
    chronometerTime.innerHTML= '00:00';
    recorder.startRecording();
    record_Button.classList.toggle('record_Button--show');
    stop_Record_Button.classList.toggle('stop_Record_Button--show');
    chronometer_Init();
    chronometerTime.classList.toggle('chronometerTime--show');
});

/**
 * añadir el evento de click al botón de detener la grabación través de la librería recordRTC
 */
stop_Record_Button.addEventListener('click', () => {
    chronometer_Stop();
    mediaStream_Status = false;
    recorder.stopRecording(function () {
        let blob = recorder.getBlob();
        const ObjectUrl = window.URL.createObjectURL(blob);
        form.append('file', blob, 'myGif.gif');
        form_Data = form.get('file');
    });
    upload_Gifo_button.classList.toggle('upload_Gifo_button--show');
    stop_Record_Button.classList.toggle('stop_Record_Button--show');
    repeat_Container.classList.toggle('repeat_Container--show');
    chronometerTime.classList.toggle('chronometerTime--show');
    video_Tag.pause();
    mediaStream_Video.stop();
});

/**
 * Añadir el evento de click al botón de subi el gif a la API de Giphy
 */

upload_Gifo_button.addEventListener('click', () => {
    step_2.classList.toggle('step--filled');
    step_3.classList.toggle('step--filled');
    repeat_Container.classList.toggle('repeat_Container--show');
    upload_Gifo_button.classList.toggle('upload_Gifo_button--show');
    const img_Loading = document.createElement('img');
    img_Loading.classList.add('img_Loading');
    img_Loading.setAttribute('src', '/recursos/assets/ajax-loader.gif');
    p_Uploading_Container.appendChild(img_Loading);
    const p_Uploading = document.createElement('p');
    p_Uploading.classList.add('p_Uploading');
    p_Uploading.textContent = 'Estamos subiendo tu GIFO';
    p_Uploading_Container.appendChild(p_Uploading);
    video_Tag.classList.toggle('video_Tag--uploading');
    const URL_UPLOAD_GIF = `https://upload.giphy.com/v1/gifs?api_key=${API_KEY}&username=${Gif_Username}&file=${form}`
    upload_Gif_Gifos(URL_UPLOAD_GIF, InitialObj_idRequest).then((json) => {
        array_Gif_Data.push(json.data);
        save_Created_Gif();
        p_Uploading.textContent = 'Gifo subido con éxito';
        img_Loading.setAttribute('src', '/recursos/assets/check.svg');
        form.delete('file');
    })
})

const InitialObj_idRequest = {
    method: 'POST',
    body: form
}

/**
 * @method upload_Gif_Gifos
 * @description Petición a la API de Giphy para subir los gifs creados por el usuario
 */

const upload_Gif_Gifos = (URL_UPLOAD_GIF, InitialObj) => {
    return new Promise((resolve, reject) => {
        fetch(URL_UPLOAD_GIF, InitialObj)
            .then((response) =>
                resolve(response.json())).catch((error) => reject(error));
    })
}

/**
 * @method save_Created_Gif
 * @description Guardar los Gifs creados por el usuario en el localStorage
 */
const save_Created_Gif = () => {
    localStorage.setItem(STORAGE_GIF, JSON.stringify(array_Gif_Data));
}


/**
 * @method chronometer_Init
 * @description Start recording timer
 */
function chronometer_Init() {
    start_Date_Chrono = new Date().getTime();
    chrono = setInterval(refresh_Time_Chronometer, 1000);
}

/**
 * @method refresh_Time_Chronometer
 * @description Calculate redording time and show it in UI
 */
function refresh_Time_Chronometer() {
    const elapsedTimeInMilliseconds = new Date().getTime() - start_Date_Chrono;
    const elapsedTime = calculate_Duration(elapsedTimeInMilliseconds / 1000);
    chronometerTime.textContent = elapsedTime;
}

/**
 * @method chronometer_Stop
 * @description Stop recording timer
 */
function chronometer_Stop() {
    start_Date_Chrono = null;
    chronometerTime.innerHTML = '00:00';
    clearInterval(chrono);
}

function calculate_Duration(secs) {
    let hr = Math.floor(secs / 3600);
    let min = Math.floor((secs - (hr * 3600)) / 60);
    let sec = Math.floor(secs - (hr * 3600) - (min * 60));

    if (min < 10) {
        min = "0" + min;
    }

    if (sec < 10) {
        sec = "0" + sec;
    }

    if (hr <= 0) {
        return min + ':' + sec;
    }

    return hr + ':' + min + ':' + sec;
}

/**
 * @method
 * @description
 */

repeat_Container.addEventListener('click', ()=>{
    record_Button.classList.toggle('record_Button--show');
    repeat_Container.classList.toggle('repeat_Container--show');
    upload_Gifo_button.classList.toggle('upload_Gifo_button--show');
    Repeat_Capture(constraints_Active);
})

const Repeat_Capture = () => {

    navigator.mediaDevices.getUserMedia(constraints_Active).then((MediaStream) => {
        form.delete('file');
        mediaStream_Status = true;
        mediaStream_Video = MediaStream;
        video_Tag.srcObject = MediaStream;
        video_Tag.play();
        recorder =
            RecordRTC(mediaStream_Video, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,
                onGifRecordingStarted: function () {
                    console.log('started');
                },
            });
    }).catch((error) => {
        console.log(error);
    })
}



/**
 * @method change_HomePage
 * @description Cambiar a la section principal y reestablecer todas las funciones de la sección de creación
 */

const change_HomePage = () => {

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

    if (record_Button.className === 'record_Button record_Button--show') {
        record_Button.classList.toggle('record_Button--show');
    }

    if (upload_Gifo_button.className === 'upload_Gifo_button upload_Gifo_button--show') {
        upload_Gifo_button.classList.toggle('upload_Gifo_button--show');
    }

    if (stop_Record_Button.className === 'stop_Record_Button stop_Record_Button--show') {
        stop_Record_Button.classList.toggle('stop_Record_Button--show');
    }

    if (step_1.className === 'step step_1 step--filled')
        step_1.classList.toggle('step--filled');

    if (step_2.className === 'step step_2 step--filled')
        step_2.classList.toggle('step--filled');

    if (step_3.className === 'step step_1 step--filled')
        step_3.classList.toggle('step--filled');

    if (mediaStream_Status === true){
        mediaStream_Video.stop();
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

    if (repeat_Container.className === 'repeat_Container repeat_Container--show') {
        repeat_Container.classList.toggle('repeat_Container--show');
    }

    if (video_Tag.className === 'video_Tag video_Tag--uploading') {
        video_Tag.classList.toggle('video_Tag--uploading');
    }
   
    if (chronometerTime.className === 'chronometerTime chronometerTime--show'){
        chronometerTime.classList.toggle('chronometerTime--show');
    }

    while (p_Uploading_Container.firstChild) {
        p_Uploading_Container.removeChild(p_Uploading_Container.firstChild)
    }


}
/**
 * Añadir el evento de click al logo de Gifos para cambiar a la sección principal
 */
home_Link.addEventListener('click', change_HomePage);