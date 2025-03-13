/**
 * 高级IRR计算器逻辑
 */

/**
 * 计算内部回报率 (IRR)
 * @param {number} paymentYears - 供款年数
 * @param {number} annualPayment - 每年供款金额
 * @param {number} withdrawalStart - 开始提取年份
 * @param {number} withdrawalTimes - 提取次数
 * @param {number} withdrawalAmount - 每次提取金额
 * @param {number} finalYear - 回报年份
 * @param {number} finalAmount - 最终回报金额
 * @returns {number} - 内部回报率 (IRR)
 */
function calculateIRR(paymentYears, annualPayment, withdrawalStart, withdrawalTimes, withdrawalAmount, finalYear, finalAmount) {
    // 输入验证
    const withdrawalEnd = withdrawalStart + withdrawalTimes - 1;
    if (withdrawalEnd > finalYear) {
        throw new Error("提取结束年份不得大于总年数！");
    }

    // 构建现金流数组
    const cashFlows = Array.from({ length: finalYear }, () => 0); // 初始化为0

    // 供款期：第1年到第paymentYears年
    for (let i = 1; i <= paymentYears; i++) {
        cashFlows[i] = -annualPayment;
    }

    // 提取期：第withdrawalStart年到第withdrawalEnd年
    for (let i = withdrawalStart; i <= withdrawalEnd; i++) {
        cashFlows[i] = withdrawalAmount;
    }

    // 最終年：第finalYear年
    cashFlows[finalYear] = finalAmount;

    console.log("修正后现金流数组:", cashFlows);

    // 计算IRR
    return precisionIRRCalculation(cashFlows);
}

/**
 * 优化后的IRR算法
 * @param {number[]} cashFlows - 现金流数组
 * @returns {number} - 内部回报率 (IRR)
 */
function precisionIRRCalculation(cashFlows) {
    let rate = 0.05; // 初始猜测值调整为5%
    const precision = 1e-8;
    const maxIterations = 1000;

    for (let i = 0; i < maxIterations; i++) {
        let npv = 0.0, derivative = 0.0;
        cashFlows.forEach((cf, t) => {
            const discountFactor = 1 / Math.pow(1 + rate, t);
            npv += cf * discountFactor;
            derivative += -cf * t * discountFactor / (1 + rate);
        });

        if (Math.abs(npv) < precision) break;
        rate -= npv / derivative;
    }
    return rate;
}

// 示例：如何调用
// calculateIRR(5, 12810, 6, 14, 3843, 20, 65620).then(irr => {
//     console.log(`内部回报率 (IRR): ${(irr * 100).toFixed(2)}%`);
// });
