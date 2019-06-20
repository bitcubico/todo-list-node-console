const isEmpty = require('is-empty');
const datetime = require('node-datetime');
const colors = require('colors');

const dao = require('../dao/tasks.dao');

let taskList = [];

const AddAsync = async(description) => {
    if (isEmpty(description))
        throw new Error('Por favor especifique una descripción para la tarea');

    taskList = GetAll();
    let date = datetime.create();
    let dateFormated = date.format('Y-m-d H:M:S');

    let task = {
        id: taskList.length + 1,
        description,
        completed: false,
        creationDate: dateFormated
    };

    taskList.push(task);
    return dao.SaveAll(taskList) ? task : null;
}

const UpdateAsync = async(id, description) => {
    if (!Number(id))
        throw new Error('El parametro [id] debe ser de tipo numérico y positivo');

    if (isEmpty(description))
        throw new Error('El parametro [description] debe contar con información');

    if (!TaskExist(id))
        throw new Error(`La tarea con id [${id}] no existe`);

    let data = GetAll();
    let index = data.findIndex(task => task.id === id);

    if (data[index].completed)
        throw new Error(`La tarea con id [${id}] no se puede actualizar porque ya esta marcada como completada`);

    data[index].description = description;
    return dao.SaveAll(data);
}

const DeleteAsync = async(id) => {
    if (!Number(id))
        throw new Error('El parametro [id] debe ser de tipo numérico y positivo');

    if (!TaskExist(id))
        throw new Error(`La tarea con id [${id}] no existe`);

    let data = GetAll();
    let index = data.findIndex(task => task.id === id);

    if (data[index].completed)
        throw new Error(`La tarea con id [${id}] no se puede eliminar porque ya esta marcada como completada`);

    let resp = data.filter(task => {
        return task.id !== id;
    });

    return dao.SaveAll(resp);
}

const SetCompleteAsync = async(id) => {
    if (!Number(id))
        throw new Error('El parametro [id] debe ser de tipo numérico y positivo');

    if (!TaskExist(id))
        throw new Error(`La tarea con id [${id}] no existe`);

    let data = GetAll();
    let index = data.findIndex(task => task.id === id);

    if (data[index].completed)
        return false;

    data[index].completed = true;
    return dao.SaveAll(data);
}

const GetById = (id) => {
    if (!Number(id))
        throw new Error('El parametro [id] debe ser de tipo numérico y positivo');

    if (!TaskExist(id))
        return null;

    let data = GetAll();
    let index = data.findIndex(task => task.id === id);

    return data[index];
}

const GetAll = () => dao.GetAll();

const GetAllPendingTask = () => {
    let data = GetAll();
    if (isEmpty(data))
        return null;

    let resp = [];
    data.forEach(task => {
        if (!task.completed)
            resp.push(task);
    });

    return resp;
}

const GetAllCompleteTask = () => {
    let data = GetAll();
    if (isEmpty(data))
        return null;

    let resp = [];
    data.forEach(task => {
        if (task.completed)
            resp.push(task);
    });

    return resp;
}

const TaskExist = (id) => {
    if (!Number(id))
        throw new Error('El parametro [id] debe ser de tipo numérico y positivo');

    let data = GetAll();
    if (isEmpty(data))
        return false;

    let index = data.findIndex(task => task.id === id);
    return index > 0;
}

module.exports = {
    AddAsync,
    UpdateAsync,
    DeleteAsync,
    SetCompleteAsync,
    GetAllPendingTask,
    GetAllCompleteTask,
}