function addRow() {
  const table = document.getElementById("invoiceBody");
  const row = table.insertRow();
  row.innerHTML = `
    <td><input type="text" class="desc"></td>
    <td><input type="number" class="qty" value="1" onchange="calculate()"></td>
    <td><input type="number" class="rate" value="0" onchange="calculate()"></td>
    <td class="amount">0</td>
    <td><button onclick="removeRow(this)">🗑️</button></td>
  `;
}

function removeRow(btn) {
  const row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
  calculate();
}

function calculate() {
  let subtotal = 0;
  const rows = document.querySelectorAll("#invoiceBody tr");

  rows.forEach(row => {
    const qty = parseFloat(row.querySelector(".qty")?.value || 0);
    const rate = parseFloat(row.querySelector(".rate")?.value || 0);
    const amount = qty * rate;
    row.querySelector(".amount").innerText = amount.toFixed(2);
    subtotal += amount;
  });

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  document.getElementById("subtotal").innerText = subtotal.toFixed(2);
  document.getElementById("tax").innerText = tax.toFixed(2);
  document.getElementById("total").innerText = total.toFixed(2);
}

// Auto-calculate when any qty/rate is updated
document.addEventListener("input", function (e) {
  if (e.target.classList.contains("qty") || e.target.classList.contains("rate")) {
    calculate();
  }
});