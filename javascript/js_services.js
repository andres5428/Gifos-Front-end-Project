/** Función para realizar la petición al servidor */
const load_Data = (URL) => {
    return new Promise((resolve, reject) => {
        fetch(URL)
            .then((response) =>
                resolve(response.json())).catch((error) => reject(error));
    })

};

export default load_Data;
