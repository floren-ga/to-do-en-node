//--------------------------------------------
// Fecha: 21/06/2020
// Autor: Floren
//--------------------------------------------

const fs = require('fs');

let listadoPorHacer = [];


// db -> en este caso es el fichero db/data.json
// Grabar en db
const grabarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar en la BD', err);
    });
}

const leerDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = []
    }


}

const getListado = () => {
    leerDB();
    return listadoPorHacer;

}


const actualizar = (descripcion, completado = true) => {
    leerDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        grabarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {

    leerDB();

    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion)

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado; //Quedan todas las tareas menos la borrada
        grabarDB();
        return true;
    }
}

// Esta función recibirá una descripción y creará una tarea que añadirá al array listadoPorHacer
const crear = (descripcion) => {

    leerDB();

    let to_do = {
        descripcion,
        completado: false
    }

    //Se envía la tarea al array
    listadoPorHacer.push(to_do);

    //Se graba en el fichero
    grabarDB();

    return to_do;
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}