const productCatalog = new Map();
const productHistory = new WeakMap();
let productIdCounter = 1;

// Оновлення таблиці
function updateTable() {
    const tbody = document.querySelector("#productTable tbody");
    tbody.innerHTML = "";

    for (let [id, product] of productCatalog.entries()) {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${id}</td>
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.quantity}</td>
      <td>
        <button onclick="removeProduct(${id})">❌</button>
        <button onclick="placeOrder(${id})">🛒</button>
      </td>
    `;
        tbody.appendChild(row);
    }
}

// Додавання продукту з UI
function addProductUI() {
    const name = document.getElementById("name").value.trim();
    const price = parseFloat(document.getElementById("price").value);
    const quantity = parseInt(document.getElementById("quantity").value);

    if (!name || isNaN(price) || isNaN(quantity)) return alert("Некоректні дані!");

    const product = { id: productIdCounter++, name, price, quantity };
    productCatalog.set(product.id, product);
    productHistory.set(product, [`Створено: ${new Date().toLocaleString()}`]);
    updateTable();

    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("quantity").value = "";
}

// Видалення продукту
function removeProduct(id) {
    productCatalog.delete(id);
    updateTable();
}

// Замовлення (імітація)
function placeOrder(id) {
    const product = productCatalog.get(id);
    if (!product || product.quantity <= 0) {
        alert("Недоступно");
        return;
    }
    product.quantity--;
    const history = productHistory.get(product);
    history.push(`Замовлення: -1 (${new Date().toLocaleString()})`);
    updateTable();
}

// Пошук продукту
function searchProductUI() {
    const name = document.getElementById("searchName").value.trim().toLowerCase();
    let found = false;
    for (let product of productCatalog.values()) {
        if (product.name.toLowerCase() === name) {
            document.getElementById("searchResult").innerText =
                ` Знайдено: ${product.name}, Ціна: ${product.price}, Кількість: ${product.quantity}`;
            found = true;
            break;
        }
    }
    if (!found) {
        document.getElementById("searchResult").innerText = " Продукт не знайдено";
    }
}

updateTable(); // Початкове оновлення
