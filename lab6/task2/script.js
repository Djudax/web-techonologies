// Массив для зберігання всіх завдань
let tasks = [];

// Функція для створення нового завдання
const createTask = (text) => ({
    id: Date.now(), // використовується час як унікальний ідентифікатор
    text,
    completed: false, // завдання спочатку не виконане
    createdAt: Date.now(), // час створення завдання
    updatedAt: Date.now()  // час останнього оновлення
});

// Функція для додавання завдання в список
const addTask = (tasks, task) => [...tasks, task];

// Функція для видалення завдання зі списку
const deleteTask = (tasks, id) => tasks.filter(task => task.id !== id);

// Функція для зміни стану виконання завдання (позначити виконаним/невиконаним)
const toggleTask = (tasks, id) => tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed, updatedAt: Date.now() } : task
);

// Функція для редагування тексту завдання
const editTask = (tasks, id, newText) => tasks.map(task =>
    task.id === id ? { ...task, text: newText, updatedAt: Date.now() } : task
);

// Функція для сортування завдань
const sortTasks = (tasks, criterion) => {
    switch (criterion) {
        case 'completed': // сортування за станом виконання
            return [...tasks].sort((a, b) => a.completed - b.completed);
        case 'updated': // сортування за датою оновлення
            return [...tasks].sort((a, b) => b.updatedAt - a.updatedAt);
        default: // сортування за датою додавання
            return [...tasks].sort((a, b) => b.createdAt - a.createdAt);
    }
};

// Функція для рендерингу завдань на сторінці
const renderTasks = (tasks) => {
    const list = document.getElementById('task-list');
    list.innerHTML = ''; // очищаємо список перед рендером

    tasks.forEach(task => {
        const li = document.createElement('li'); // створення елемента списку
        if (task.completed) li.classList.add('completed'); // додаємо клас, якщо завдання виконане

        const span = document.createElement('span');
        span.textContent = task.text; // текст завдання

        const actions = document.createElement('div');
        actions.className = 'actions'; // кнопки редагування та видалення

        // Кнопка для редагування завдання
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Редагувати';
        editBtn.onclick = () => {
            const newText = prompt('Введіть новий текст завдання:', task.text);
            if (newText !== null && newText.trim() !== '') {
                tasks = editTask(tasks, task.id, newText.trim()); // редагуємо завдання
                rerender();
            }
        };

        // Кнопка для зміни стану виконання завдання
        const completeBtn = document.createElement('button');
        completeBtn.classList.add('complete');
        completeBtn.textContent = task.completed ? 'Не виконано' : 'Виконано';
        completeBtn.onclick = () => {
            tasks = toggleTask(tasks, task.id); // змінюємо статус виконання
            rerender();
        };

        // Кнопка для видалення завдання
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete');
        deleteBtn.textContent = 'Видалити';
        deleteBtn.onclick = () => {
            li.classList.add('removing'); // додаємо анімацію видалення
            setTimeout(() => {
                tasks = deleteTask(tasks, task.id); // видаляємо завдання
                rerender();
            }, 300);
        };

        actions.append(editBtn, completeBtn, deleteBtn); // додаємо кнопки в елемент
        li.append(span, actions); // додаємо текст і кнопки до елемента списку
        list.appendChild(li); // додаємо елемент до списку
    });
};

// Функція для повторного рендерингу завдань після зміни
const rerender = () => {
    const criterion = document.getElementById('sort-tasks').value; // отримуємо критерій сортування
    renderTasks(sortTasks(tasks, criterion)); // сортуємо і рендеримо завдання
};

// Обробка події додавання нового завдання
document.getElementById('task-form').onsubmit = (e) => {
    e.preventDefault(); // відміняємо стандартну поведінку форми
    const input = document.getElementById('task-input');
    const newTask = createTask(input.value.trim()); // створюємо нове завдання
    tasks = addTask(tasks, newTask); // додаємо завдання до списку
    input.value = ''; // очищуємо поле вводу
    rerender(); // оновлюємо відображення списку завдань
};

// Обробка зміни сортування
document.getElementById('sort-tasks').onchange = rerender;

// Ініціалізація рендерингу завдань при завантаженні сторінки
rerender();
