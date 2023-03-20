var express = require('express');
var router = express.Router();
var ToDo = require('../controllers/todo');

function renderHomePage(res, date, edit) {
    ToDo.getToDo()
        .then((todo) => {
            ToDo.getDone()
                .then((done) => {
                    if (edit)
                        res.render('index', {
                            todo: todo,
                            d: date,
                            done: done,
                            edit: edit,
                        });
                    else
                        res.render('index', {
                            todo: todo,
                            d: date,
                            done: done,
                        });
                })
                .catch((err) => {
                    res.render('error', { error: err });
                });
        })
        .catch((err) => {
            res.render('error', { error: err });
        });
}

/* GET home page. */
router.get('/', function (req, res, next) {
    const date = new Date().toISOString().substring(0, 16);
    renderHomePage(res, date);
});

router.post('/', function (req, res, next) {
    const date = new Date().toISOString().substring(0, 16);

    switch (req.body.type) {
        case 'NEW':
            const todo = {
                what: req.body.what,
                who: req.body.who,
                dateDued: req.body.dateDued,
            };

            ToDo.postToDo(todo).then((response) => {
                renderHomePage(res, date);
            });
            break;

        case 'DONE':
            ToDo.toDoDone(req.body.id).then((response) => {
                renderHomePage(res, date);
            });

            break;

        case 'UNDONE':
            ToDo.toDoUndone(req.body.id).then((response) => {
                renderHomePage(res, date);
            });

            break;

        case 'REMOVEU':
            ToDo.removeToDo(req.body.id).then((response) => {
                renderHomePage(res, date);
            });

            break;

        case 'REMOVED':
            ToDo.removeDone(req.body.id).then((response) => {
                renderHomePage(res, date);
            });

            break;

        case 'EDITD':
            ToDo.editDone(req.body.id).then((done) => {
                renderHomePage(res, date, {
                    type: 'EDITD',
                    what: done.what,
                    id: done.id,
                    who: done.who,
                    dateDued: done.dateDued,
                });
            });

            break;

        case 'EDITU':
            ToDo.editToDo(req.body.id).then((todo) => {
                renderHomePage(res, date, {
                    type: 'EDITU',
                    what: todo.what,
                    id: todo.id,
                    who: todo.who,
                    dateDued: todo.dateDued,
                });
            });

            break;

        case 'EDITUC':
            const todoN = {
                id: req.body.id,
                what: req.body.what,
                who: req.body.who,
                dateDued: req.body.dateDued,
            };

            ToDo.updateToDo(todoN).then((response) => {
                renderHomePage(res, date);
            });

            break;

        case 'EDITDC':
            const doneN = {
                id: req.body.id,
                what: req.body.what,
                who: req.body.who,
                dateDued: req.body.dateDued,
            };

            ToDo.updateDone(doneN).then((response) => {
                renderHomePage(res, date);
            });

            break;
    }
});

module.exports = router;
