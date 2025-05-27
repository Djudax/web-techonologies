// Масив для зберігання товарів
let products = [];
// Категорії товарів
const categories = ["Електроніка", "Одяг", "Книги"];
// Змінні для фільтрації та сортування
let sortMethod = null, filterCategory = null;

// Збір елементів з HTML в зручний об'єкт
const elements = {
    list: document.querySelector('.product-list'),
    total: document.querySelector('.total'),
    modal: document.getElementById('productModal'),
    toast: document.getElementById('toast'),
    filters: document.querySelector('.filters'),
    form: document.getElementById('productForm'),
    addButton: document.getElementById('addProductBtn')
};

// Відкрити модальне вікно при натисканні "Додати товар"
elements.addButton.addEventListener('click', () => openModal());

// Обробка форми при додаванні або редагуванні товару
elements.form.addEventListener('submit', (event) => submitProduct(event));

// Оновлення загальної вартості товарів
const updateTotal = () => {
    const sum = products.reduce((acc, p) => acc + Number(p.price), 0);
    elements.total.textContent = `Загальна вартість: ${sum}₴`;
};

// Створення HTML-картки товару
const createCard = (product) => {
    const li = document.createElement('li');
    li.className = 'product-card';
    li.innerHTML = `
    <div>ID: ${product.id}</div>
    <div>${product.name}</div>
    <div>${product.price}₴</div>
    <div>${product.category}</div>
    <img src="${product.image}" alt="${product.name}">
    <button class="edit">Редагувати</button>
    <button class="delete">Видалити</button>
  `;
    // Встановлюємо події для кнопок
    li.querySelector('.delete').onclick = () => deleteProduct(product.id, li);
    li.querySelector('.edit').onclick = () => openModal(product);
    return li;
};

// Відображення товарів на сторінці
const render = () => {
    elements.list.innerHTML = '';
    let displayProducts = [...products];

    // Фільтрація по категорії
    if (filterCategory) displayProducts = displayProducts.filter(p => p.category === filterCategory);

    // Сортування товарів
    if (sortMethod) {
        displayProducts.sort((a, b) => {
            if (sortMethod === 'price') return a.price - b.price;
            if (sortMethod === 'created') return new Date(a.created) - new Date(b.created);
            if (sortMethod === 'updated') return new Date(a.updated) - new Date(b.updated);
        });
    }

    // Якщо товарів немає — показуємо текст
    if (!displayProducts.length) {
        elements.list.innerHTML = '<p>Наразі список товарів пустий. Додайте новий товар.</p>';
    } else {
        // Інакше додаємо картки в список
        displayProducts.forEach(p => elements.list.appendChild(createCard(p)));
    }

    updateTotal(); // Підрахунок загальної вартості
};

// Видалення товару з масиву і з DOM
const deleteProduct = (id, card) => {
    card.style.animation = 'fadeOut 0.4s forwards';
    setTimeout(() => {
        products = products.filter(p => p.id !== id);
        render(); // Перемальовуємо список
        showToast(`Товар з ID ${id} видалено.`); // Показуємо сповіщення
    }, 400);
};

// Відкриття модального вікна для додавання або редагування товару
const openModal = (product = null) => {
    elements.form.reset();
    elements.form.id.value = product?.id || '';
    elements.form.name.value = product?.name || '';
    elements.form.price.value = product?.price || '';
    elements.form.category.value = product?.category || '';
    elements.form.image.value = product?.image || '';
    elements.modal.classList.add('active');
};

// Додавання або оновлення товару після відправки форми
const submitProduct = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(elements.form));

    if (data.id) {
        // Якщо товар вже існує — оновлюємо
        products = products.map(p => p.id === data.id ? { ...p, ...data, updated: new Date().toISOString() } : p);
        showToast(`Товар ID:${data.id} оновлено (${data.name})`);
    } else {
        // Якщо нового товару немає — створюємо
        const newProduct = { ...data, id: Date.now().toString(), created: new Date().toISOString(), updated: new Date().toISOString() };
        products = [...products, newProduct];
        showToast(`Товар ${data.name} додано!`);
    }

    elements.modal.classList.remove('active'); // Закриваємо модальне вікно
    render(); // Оновлюємо відображення
};

// Відображення "спливаючого" повідомлення
const showToast = (message) => {
    elements.toast.textContent = message;
    elements.toast.classList.add('show');
    setTimeout(() => elements.toast.classList.remove('show'), 3000);
};

// Створення кнопок фільтрації та сортування
const createFilters = () => {
    elements.filters.innerHTML = '';

    // Кнопки фільтрації по категоріях
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.textContent = cat;
        btn.onclick = () => { filterCategory = cat; render(); };
        elements.filters.appendChild(btn);
    });

    // Кнопка скидання фільтра
    const reset = document.createElement('button');
    reset.textContent = 'Скинути фільтр';
    reset.onclick = () => { filterCategory = null; render(); };
    elements.filters.appendChild(reset);

    // Кнопки сортування
    ['Ціна', 'Дата створення', 'Дата оновлення'].forEach((label, i) => {
        const sortBtn = document.createElement('button');
        const methods = ['price', 'created', 'updated'];
        sortBtn.textContent = `Сортувати за ${label}`;
        sortBtn.onclick = () => { sortMethod = methods[i]; render(); };
        elements.filters.appendChild(sortBtn);
    });

    // Кнопка скидання сортування
    const resetSort = document.createElement('button');
    resetSort.textContent = 'Скинути сортування';
    resetSort.onclick = () => { sortMethod = null; render(); };
    elements.filters.appendChild(resetSort);
};

// Запуск фільтрів та рендера при завантаженні
createFilters();
render();
