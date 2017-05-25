var ACTION_NEW_TODO = 'new_todo';
var ACTION_REMOVE_TODO = 'del_todo';

var ACTIONS_TODO_LIST = 'todo-list-actions';

var Actions = {
    createNewTodo: function (todo) {
        Dispatcher.dispatch(ACTIONS_TODO_LIST, ACTION_NEW_TODO, {
            todo: todo
        });
    },
    removeTodo: function (idx) {
        Dispatcher.dispatch(ACTIONS_TODO_LIST, ACTION_REMOVE_TODO, {
            idx: idx
        });
    }
};
