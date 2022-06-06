//? https://www.youtube.com/watch?v=6A51fI5QoUM&t=539s

let addTask = document.querySelector('.message'), //Берем элкмент по class
   addTaskBtn = document.querySelector('#new-task-submit'); //Берем элемент по id
let todo = document.querySelector('.todo'); //Получаем список тасков по class

let = todoList = []; //Создаем массив для тасков

//* [LOCALSTOR#2] Подтягиваем из localStorage данные на страницу. Иначе, после обновления страницы они пропадут с нее.
//Преобразуем из JSON формата (в localStorage тоько он) в массив переданный объект с ключем todo
if (localStorage.getItem('todo')) {
   todoList = JSON.parse(localStorage.getItem('todo'));
   displayMessage(); // Выводим данные из localStorage на страницу
}

//! Добавляем обработчик событий при нажатии на кнопку
addTaskBtn.addEventListener('click', function () {
   if (!addTask.value) return; //Нельзя добавить пустую строку. Если значения нет -> return
   //Каждый новый таск будем записыавть в объект newTodo{} и добавлять его в массив todoList[]
   let newTodo = {
      todo: addTask.value,
      checked: false,
      important: false,
      readonly: false,
   };

   todoList.push(newTodo); //Добавляем в массив созданный объект newTodo
   displayMessage(); //Вызываем функцию каждый раз после клика 'Add task'

   //* [LOCALSTOR#1] Сохраняем массив в localStorage
   //Создаем ключ todo:, преобразуем строку в JSON формат по переданному массиву
   localStorage.setItem('todo', JSON.stringify(todoList));
   addTask.value = ''; //* После клика по 'Add Task' очищается input field в пустую строку
});

//! Создаем функцию для перебора массива и вывода на экран в виде тэгов li
function displayMessage() {
   let displayMessage = '';
   if (todoList.length === 0) todo.innerHTML = ''; //Если массив равен 0, то выводит пустую строку, чтобы удалялся последний элемент списка
   todoList.forEach(function (item, i) {
      //Добавляем верстку, строки в список li. Каждая строка с уникальным id.
      //В label описание из свойства объекта todo
      displayMessage += `
	 <li>
		<input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
		<label for='item_${i}' class="${item.important ? 'important' : ''}">${item.todo}</label>
	 </li>
  `; //Строковая интерполяция
      //Получаем список todo и добавляем в него верстку
      todo.innerHTML = displayMessage;
   });
}

//! Чекбоксы
//Навешиваем событие ('change' если что-то внутри будет меняться) на весь список ul. Чтобы не получать все элеленты каждый раз
//Сохраниение галочек чекбокса. checkbox: true/false
todo.addEventListener('change', function (event) {
   let idInput = event.target.getAttribute('id'); //event.target - элемент, который вызвал событие
   let forLabel = todo.querySelector('[for=' + idInput + ']');
   let valueLabel = forLabel.innerHTML;

   //Находим значение valueLabel среди значений объектов todoList
   todoList.forEach(function (item) {
      if (item.todo === valueLabel) {
         //item.todo - это введенное сообщение в todoList
         item.checked = !item.checked; //Сравнивается c текстом элементов массива. При совпадении будет меняться checked на противоположный (инвертироваться)
         localStorage.setItem('todo', JSON.stringify(todoList)); //Записываем эти данные в localStorge
      }
   });
});

//!Выделение важного таска / удаление. important: true/false
//Ф-я принимает один параметр. contextmenu - это ПКМ
todo.addEventListener('contextmenu', function (event) {
   event.preventDefault(); //Отменияем стандартное поведение браузера. Кликая ПКМ на элементы - ничкго не происходит
   //При клике ПКМ перебирается масссив. При совпадении будет инвертироваться important (меняться цвет текста)
   todoList.forEach(function (item, i) {
      if (item.todo === event.target.innerHTML) {
         //event.target - наш label
         //inner.HTML - текст внутри label. Сравнивается c текстом элементов массива. Значит мы кликнули на эдементе, который у нас в массиве.
         //! Удаление таска. cmd + ПКМ
         if (event.ctrlKey || event.metaKey) {
            todoList.splice(i, 1); //При зажатой кнопке ctrl or cmd + ПКМ удаляем один элемент i из массива
         } else {
            item.important = !item.important; //Eсли не зажата кнопка, то помечаем важным
         }
         localStorage.setItem('todo', JSON.stringify(todoList));
         displayMessage(item.important); //Выводми на экран, ф-я находит item.important и добавляет ему новый класс
      }
   });
});
