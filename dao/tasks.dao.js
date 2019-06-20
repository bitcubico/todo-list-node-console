const fs = require('fs');
const isEmpty = require('is-empty');

let db = '../../tuto/05-Proyect-TODO-list/db/tasks.json';

const SaveAll = (data) => {
    if (isEmpty(data))
        throw new Error('El parametro [data] debe contener información para guardar');

    let jsonData = JSON.stringify(data);
    fs.writeFile(db, jsonData, (err) => {
        if (err)
            throw new Error(err.message);
    });

    return true;
}

const GetAll = () => {
    try {
        return require('../db/tasks.json');
    } catch (error) {
        return [];
    }
}

module.exports = {
    SaveAll,
    GetAll
}