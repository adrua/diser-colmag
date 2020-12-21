const fs = require('fs');
const axios = require('axios');
const { argv0 } = require('process');

//makes TLS connections and HTTPS requests insecure by disabling certificate verification.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

console.log(`Colegio Magia - Import Data`);

const urlColegiosBackend = 'https://localhost:5001'
const token ="ABC123";

results = (res) => {

    const data = res.data;

    data.forEach((personaje) => {
        personajeAggregar(personaje);
    });

};

resultsError = (err) => {
    if (err.response) {
        if(Array.isArray(err.response.data)) {
        err.response.data.forEach((x) => console.log(`Client Error: ${x.Source}: ${x.Message}`))
        } else {
        console.log(`Client Error: ${err.response.data}`);
        }
    } else if (err.request) {
        console.error(`Network Error: ${err.code} - ${err.Message} - Axios(${err.isAxiosError})`);
    } else {
        console.error(`Other Error: ${err}`);
    }    
};

resultAdd = (res) => {
    console.log(`personaje aggregada ${res.data.ColMagPersonajeNombre}`);
};

resultAddError = (err) => {
    if (err.response) {
        if(Array.isArray(err.response.data)) {
            err.response.data.forEach((x) => console.log(`Client Error: ${x.Source}: ${x.Message}`))
        } else {
            console.log(`Client Error: ${err.response.data}`);
        }
    } else if (err.request) {
        console.error(`Network Error: ${err.code} - ${err.Message} - Axios(${err.isAxiosError})`);
    } else {
        console.error(`Other Error: ${err}`);
    }    
}; 

let casas = {
    "Gryffindor": 1,
    "Huffepluf": 2,
    "Ravenclaw": 3,
    "Slytherin": 4
};

let id = 0 

let personajeAggregar = async (personaje) => {
    let [dia, mes, ano] = personaje.dateOfBirth.split("-");
    let fecha  = (dia) ? `${ano}-${mes}-${dia}` : null;
    ++id;
    const _personaje = {
        //ColMagPersonajeId: ++id,
        ColMagPersonajeNombre: personaje.name,
        ColMagPersonajeEspecie: personaje.species,
        Genero: personaje.gender,
        ColmagCasaId: casas[personaje.house] || 4,
        ColMagPersonajeFechaNacimiento: fecha,
        ColMagPersonajeAnoNacimiento: personaje.yearOfBirth || 0,
        ColMagPersonajeAscendencia: personaje.ancestry,
        ColMagPersonajeColorOjos: personaje.eyeColour,
        ColMagPersonajeColorCabello: personaje.hairColour,
        ColMagPersonajePatronus: personaje.patronus,
        ColMagPersonajeEstudiante: personaje.hogwartsStudent,
        ColMagPersonajeProfesor: personaje.hogwartsStaff,
        ColMagPersonajeActor: personaje.actor,
        ColMagPersonajeVive: personaje.alive,
        ColMagPersonajeImagen: personaje.image,
        ColMagVaritaMagica: [
            {
                ColMagPersonajeId: id,
                //ColMagVaritaMagicaId: id,
                ColMagVaritaMagicaMadera: personaje.wand.wood,
                ColMagVaritaMagicaAlma: personaje.wand.core,
                ColMagVaritaMagicaLongitud: personaje.wand.length || 0           
            }
        ]
    };

    try {
        let response =  await axios.post(`${urlColegiosBackend}/odata/ColmagPersonajes`, _personaje);

        resultAdd(response);
    } catch(err) {
        resultAddError(err);
    }
}

let cargarPersonajes = async () => {
    try {
        let response =  await axios.get(`http://hp-api.herokuapp.com/api/characters/students`);
        results(response);
    } catch(err) {
        resultsError(err);
    }
}

cargarPersonajes();
