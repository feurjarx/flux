var View = (function() {

    var VIEW_UPDATE_TODO_LIST = 'todo-list-update';

    var SELECTOR_INPUT_TODO_NAME = '.todo-name-input';
    var SELECTOR_BUTTON_TODO_ADD = '.btn-create-todo';
    var SELECTOR_BUTTON_TODO_REMOVE = '.btn-remove-todo';
    var SELECTOR_LIST_TODO = '.todo-list';

    var root = document.getElementById('root');

    getAddTodoBtn().addEventListener('click', onAddTodoBtnClick);

    Dispatcher.subscribe(VIEW_UPDATE_TODO_LIST, renderTodoList);

    function onAddTodoBtnClick() {
        var todoNameInput = getTodoNameInput();
        if (todoNameInput.value) {
            Actions.createNewTodo({
                name: todoNameInput.value
            });

            todoNameInput.value = '';
        }
    }

    function getAddTodoBtn() {
        return root.querySelector(SELECTOR_BUTTON_TODO_ADD);
    }

    function getTodoNameInput() {
        return root.querySelector(SELECTOR_INPUT_TODO_NAME);
    }

    function createTodoElem(todo) {

        var span = document.createElement('span');
        span.innerText = todo.name;
        span.style.setProperty('margin-right', '10px');

        var removeBtn = document.createElement('button');
        removeBtn.classList.add(SELECTOR_BUTTON_TODO_REMOVE.slice(1));
        removeBtn.innerText = 'x';

        var li = document.createElement('li');
        li.appendChild(span);
        li.appendChild(removeBtn);

        removeBtn.addEventListener('click', function (event) {
            Actions.removeTodo(+event.currentTarget.dataset.key);
        });

        return li;
    }

    function renderTodoList() {
        var todoListElem = root.querySelector(SELECTOR_LIST_TODO);

        todoListElem.innerHTML = '';

        Store.TodoList.todos.forEach(function (todo, i) {
            var li = createTodoElem(todo);
            var removeBtn = li.querySelector(SELECTOR_BUTTON_TODO_REMOVE);
            removeBtn.dataset.key = i;
            todoListElem.appendChild(li);
        });
    }

    return {
        VIEW_UPDATE_TODO_LIST: VIEW_UPDATE_TODO_LIST
    }
})();