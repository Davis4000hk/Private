// 引入 Chart.js 庫
const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/chart.js";
document.head.appendChild(script);

// IRR 計算函數
function calculateIRR() {
  // 獲取輸入值
  const contributionYears = parseInt(document.getElementById("contribution-years").value);
  const annualInvestment = parseFloat(document.getElementById("annual-investment").value);
  const returnYears = parseInt(document.getElementById("return-years").value);
  const totalReturn = parseFloat(document.getElementById("total-return").value);

  // 驗證輸入
  if (isNaN(contributionYears) || isNaN(annualInvestment) || isNaN(returnYears) || isNaN(totalReturn)) {
    alert("請填寫所有欄位！");
    return;
  }

  // 計算現金流
  const cashFlows = [];
  for (let i = 0; i < contributionYears; i++) {
    cashFlows.push(-annualInvestment); // 每年投入金額（負值）
  }
  for (let i = 0; i < returnYears; i++) {
    cashFlows.push(totalReturn / returnYears); // 每年回報金額（正值）
  }

  // 計算 IRR
  const irr = getIRR(cashFlows);
  document.getElementById("irr-result").textContent = (irr * 100).toFixed(2);

  // 繪製圖表
  renderChart(cashFlows);
}

// IRR 計算邏輯
function getIRR(cashFlows) {
  let rate = 0.1; // 初始猜測值
  let precision = 0.00001; // 精度
  let maxIterations = 1000; // 最大迭代次數

  for (let i = 0; i < maxIterations; i++) {
    let npv = 0;
    let dNpv = 0;
    for (let t = 0; t < cashFlows.length; t++) {
      npv += cashFlows[t] / Math.pow(1 + rate, t + 1);
      dNpv += (-t - 1) * cashFlows[t] / Math.pow(1 + rate, t + 2);
    }
    const newRate = rate - npv / dNpv;
    if (Math.abs(newRate - rate) < precision) {
      return newRate;
    }
    rate = newRate;
  }
  return rate;
}

// 圖表繪製函數
function renderChart(cashFlows) {
  const ctx = document.getElementById("irr-chart").getContext("2d");
  if (window.irrChart) {
    window.irrChart.destroy(); // 銷毀舊圖表
  }
  window.irrChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: cashFlows.map((_, i) => `第 ${i + 1} 年`),
      datasets: [{
        label: "現金流",
        data: cashFlows,
        borderColor: "#C5A47E",
        fill: false,
      }],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "金額 (HKD)",
          },
        },
        x: {
          title: {
            display: true,
            text: "年份",
          },
        },
      },
    },
  });
}
