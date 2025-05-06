const tg = window.Telegram.WebApp;
tg.expand();

const form = document.getElementById("orderForm");
const ordersDiv = document.getElementById("orders");
let orders = [];

form.addEventListener("submit", function(event) {
  event.preventDefault();
  const order = {
    from: document.getElementById("from").value,
    to: document.getElementById("to").value,
    date: document.getElementById("date").value,
    cargo: document.getElementById("cargo").value,
    weight: document.getElementById("weight").value,
    price: document.getElementById("price").value,
    reference: document.getElementById("reference").value,
    tva: Math.round(document.getElementById("price").value * 0.21 * 100) / 100,
    dueDate: new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  };

  orders.push(order);
  renderOrders();

  // 👇 Отправка заявки в Telegram бота
  console.log("📤 Отправка данных в Telegram:", order);
  tg.sendData(JSON.stringify(order));
});

function renderOrders() {
  ordersDiv.innerHTML = "";
  orders.forEach((order) => {
    const el = document.createElement("div");
    el.innerHTML = `
      <strong>${order.from} → ${order.to}</strong><br>
      Дата: ${order.date}<br>
      Вес: ${order.weight} кг<br>
      Цена: €${order.price} + TVA: €${order.tva}<br>
      Дата оплаты: ${order.dueDate}<hr>
    `;
    ordersDiv.appendChild(el);
  });
}
