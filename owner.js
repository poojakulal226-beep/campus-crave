const ordersBox = document.getElementById("ordersBox");
const clearBtn = document.getElementById("clearOrdersBtn");

// Display all orders
function displayOrders() {
    let allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    if(allOrders.length === 0) {
        ordersBox.innerHTML = "<p>No orders placed yet.</p>";
        return;
    }

    let html = "";
    allOrders.forEach((order, index) => {
        html += `<div class="order">
                    <strong>Order ${index + 1}</strong><br>
                    Name: ${order.studentName}<br>
                    Class: ${order.className}<br>
                    Items:<br>`;
        order.items.forEach(item => {
            html += ` - ${item}<br>`;
        });
        html += `<strong>Total: ₹${order.total}</strong>
                </div>`;
    });
    ordersBox.innerHTML = html;
}

// Clear all orders
clearBtn.addEventListener("click", function() {
    if(confirm("Are you sure you want to clear all orders?")) {
        localStorage.removeItem("orders");
        displayOrders();
    }
});

// Display orders on page load
displayOrders();
