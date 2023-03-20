const axios = require('axios');

module.exports.getDone = () => {
    return axios
        .get('http://localhost:3000/done')
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err;
        });
};

module.exports.getToDo = () => {
    return axios
        .get('http://localhost:3000/todo')
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err;
        });
};

module.exports.postToDo = (todo) => {
    return axios
        .post('http://localhost:3000/todo', todo)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err;
        });
};

module.exports.toDoDone = (id) => {
    return axios.get('http://localhost:3000/todo/' + id).then((response) => {
        var todo = response.data;

        axios.delete('http://localhost:3000/todo/' + id).then((response) => {
            axios
                .post('http://localhost:3000/done', {
                    what: todo.what,
                    who: todo.who,
                    dateDued: todo.dateDued,
                })
                .then((response) => {
                    return response.data;
                });
        });
    });
};

module.exports.toDoUndone = (id) => {
    return axios.get('http://localhost:3000/done/' + id).then((response) => {
        var done = response.data;

        axios.delete('http://localhost:3000/done/' + id).then((response) => {
            axios
                .post('http://localhost:3000/todo', {
                    what: done.what,
                    who: done.who,
                    dateDued: done.dateDued,
                })
                .then((response) => {
                    return response.data;
                });
        });
    });
};

module.exports.removeToDo = (id) => {
    return axios.delete('http://localhost:3000/todo/' + id).then((response) => {
        return response.data;
    });
};

module.exports.removeDone = (id) => {
    return axios.delete('http://localhost:3000/done/' + id).then((response) => {
        return response.data;
    });
};

module.exports.editDone = (id) => {
    return axios.get('http://localhost:3000/done/' + id).then((response) => {
        return response.data;
    });
};

module.exports.editToDo = (id) => {
    return axios.get('http://localhost:3000/todo/' + id).then((response) => {
        return response.data;
    });
};

module.exports.updateDone = (done) => {
    return axios.put('http://localhost:3000/done/' + done.id, done).then((response) => {
        return response.data;
    });
};

module.exports.updateToDo = (todo) => {
    return axios.put('http://localhost:3000/todo/' + todo.id, todo).then((response) => {
        return response.data;
    });
};
