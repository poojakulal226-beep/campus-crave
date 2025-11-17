// Elements
const checkboxes = document.querySelectorAll(".food-item");
const totalSpan = document.getElementById("totalAmount");
const placeOrderBtn = document.getElementById("placeOrderBtn");
const orderInfo = document.getElementById("orderInfo");

// Update total dynamically
checkboxes.forEach(cb => cb.addEventListener("change", updateTotal));

function updateTotal() {
    let total = 0;
    checkboxes.forEach(cb => {
        if(cb.checked) total += parseInt(cb.value);
    });
    totalSpan.innerText = total;
}

// Place order
placeOrderBtn.addEventListener("click", function() {
    const className = document.getElementById("className").value.trim();
    const studentName = document.getElementById("studentName").value.trim();

    if(!className || !studentName) {
        alert("Please enter Class and Name.");
        return;
    }

    const selectedItems = [];
    checkboxes.forEach(cb => {
        if(cb.checked) selectedItems.push(cb.parentElement.innerText);
    });

    if(selectedItems.length === 0) {
        alert("Please select at least one food item.");
        return;
    }

    const total = totalSpan.innerText;

    const order = {
        className,
        studentName,
        items: selectedItems,
        total
    };

    // Save order in localStorage
    let allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    allOrders.push(order);
    localStorage.setItem("orders", JSON.stringify(allOrders));

    // Display order confirmation
    orderInfo.innerHTML = `<h3>Order Placed!</h3>
                           <p><strong>Class:</strong> ${className}</p>
                           <p><strong>Name:</strong> ${studentName}</p>
                           <p><strong>Items:</strong> ${selectedItems.join(", ")}</p>
                           <p><strong>Total:</strong> ₹${total}</p>`;

    // Reset form
    checkboxes.forEach(cb => cb.checked = false);
    totalSpan.innerText = "0";
    document.getElementById("className").value = "";
    document.getElementById("studentName").value = "";
});
