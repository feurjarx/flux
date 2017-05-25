var Store = (function () {

    var TodoList = {
        todos: [],
        addTodo: function(todo) {
            this.todos.push(todo);
        },
        removeTodoByIdx: function (idx) {
            this.todos = this.todos.filter(function (todo, i) {
                return i !== idx;
            })
        }
    };

    Dispatcher.subscribe(ACTIONS_TODO_LIST, onTodoListActions);

    function onTodoListActions(type, data) {
        switch (type) {
            case ACTION_NEW_TODO:
                TodoList.addTodo(data.todo);
                break;
            case ACTION_REMOVE_TODO:
                TodoList.removeTodoByIdx(data.idx);
                break;
            default:
        }

        Dispatcher.dispatch(View.VIEW_UPDATE_TODO_LIST);
    }

    return {
        TodoList: TodoList
    }
}());
