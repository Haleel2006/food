
document.querySelectorAll('.nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== "Order Now" Button Alert =====
document.querySelector('.order-btn').addEventListener('click', function () {
  alert('Redirecting to Order Page (Coming Soon!)');
});

// ===== Order List and Cart Functionality =====
const orderList = document.getElementById('order-list');
const addButtons = document.querySelectorAll('.price-row button');
let orders = [];

addButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const itemName = btn.closest('.card').querySelector('h4').textContent;
    alert(`✅ "${itemName}" has been added to your cart!`);
    orders.push(itemName);
    updateOrderList();
  });
});

// ===== Update Order List Display =====
function updateOrderList() {
  orderList.innerHTML = "";

  if (orders.length === 0) {
    orderList.innerHTML = "<li>No items added yet.</li>";
    return;
  }

  orders.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${item}`;

    // Add delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener('click', () => {
      orders.splice(index, 1);
      updateOrderList();
    });

    li.appendChild(deleteBtn);
    orderList.appendChild(li);
  });
}

// ===== Buy Now Button =====
document.getElementById('buy-now').addEventListener('click', () => {
  if (orders.length === 0) {
    alert("🛒 Your cart is empty!");
    return;
  }

  alert(`🛍️ You have ordered ${orders.length} item(s):\n- ${orders.join('\n- ')}\n\nThank you for your purchase!`);
  orders = [];
  updateOrderList();
});

// ===== Clear All Orders Button =====
document.getElementById('clear-orders').addEventListener('click', () => {
  if (orders.length === 0) {
    alert("❌ Your order list is already empty.");
    return;
  }

  if (confirm("Are you sure you want to clear your cart?")) {
    orders = [];
    updateOrderList();
  }
});
const upiButtons = document.querySelectorAll('.upi-btn');

upiButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const method = btn.getAttribute('data-method');

    if (orders.length === 0) {
      alert("⚠️ Please add items to your cart before proceeding to payment.");
      return;
    }

    const confirmPay = confirm(`Pay using ${method}?\nTotal items: ${orders.length}`);

    if (confirmPay) {
      alert(`✅ Payment successful via ${method}!\n🍽️ Your food is on the way!`);
      orders = [];  // Clear cart
      updateOrderList();
    }
  });
});