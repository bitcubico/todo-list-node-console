let description = {
    alias: 'd',
    demand: true,
    type: 'string',
    desc: 'Descripción de la tarea que se desea crear'
}

let taskId = {
    alias: 'id',
    demand: true,
    type: 'integer',
    desc: 'Identificador principal de la tarea'
};

let optAdd = {
    description: description
};

let optComplete = {
    taskId: taskId
}

let optUpd = {
    taskId: taskId,
    description: description
};

const argv = require('yargs')
    .command('add', 'Agrega una nueva tarea a la cola de la lista', optAdd)
    .command('upd', 'Actualiza la descripción de una nueva tarea pendiente por hacer', optUpd)
    .command('del', 'Elimina una tarea pendiente por hacer', optComplete)
    .command('set-complete', 'Marca una tarea pendiente como realizada', optComplete)
    .command('get-all-pending', 'Obtiene todas las tareas pendientes')
    .command('get-all-complete', 'Obtiene todas las tareas completadas', )
    .help()
    .argv;

module.exports = {
    argv
}