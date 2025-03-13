// 動態加載IRR計算機
document.addEventListener("DOMContentLoaded", () => {
  const irrCalculator = document.createElement("div");
  irrCalculator.innerHTML = `
    <h3>IRR計算機</h3>
    <input type="number" id="investment" placeholder="投資金額">
    <input type="number" id="return" placeholder="回報金額">
    <button onclick="calculateIRR()">計算</button>
    <p id="result"></p>
  `;
  document.querySelector(".service-section:last-child .service-details").appendChild(irrCalculator);
});

function calculateIRR() {
  const investment = parseFloat(document.getElementById("investment").value);
  const returnAmount = parseFloat(document.getElementById("return").value);
  if (isNaN(investment) || isNaN(returnAmount)) {
    alert("請輸入有效的數字！");
    return;
  }
  const irr = ((returnAmount - investment) / investment) * 100;
  document.getElementById("result").innerText = `IRR: ${irr.toFixed(2)}%`;
}
