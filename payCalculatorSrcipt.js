document.querySelector(".submitPayCalculator").addEventListener("click", function (event) {
    event.preventDefault();

    // Fetch inputs
    const subscription = document.querySelector("input[name='subscription']:checked")?.value;
    const basicPay = parseFloat(document.querySelector("#basicPay").value) || 0;
    const da = parseFloat(document.querySelector("#da").value) || 0;
    const placeOfPosting = document.querySelector("input[name='placeOfPosting']:checked")?.value || "other";
    const winterAllowance = document.querySelector("input[name='winterAllowance']:checked")?.value === "yes" ? 600 : 0;
    const nursingAllowance = document.querySelector("#nursingAllowanceYes")?.checked ? 1000 : 0;
    const kitMaintenance = parseFloat(document.querySelector("#kitMaintenance").value) || 0;

    // Fixed allowances
    const medicalAllowance = 1000;
    const hillAllowance = 500;

    // DA calculation
    const daAmount = (basicPay * da) / 100;

    // HRA calculation
    let hraAmount = 0;
    if (placeOfPosting === "shillong") {
        hraAmount = Math.min(basicPay * 0.15, 8000);
    } else if (placeOfPosting === "districtHQ") {
        hraAmount = Math.min(basicPay * 0.125, 6000);
    } else if (placeOfPosting === "others") {
        hraAmount = Math.min(basicPay * 0.1, 5000);
    }

    // Gross pay calculation
    const grossPay = basicPay + daAmount + hraAmount + winterAllowance + nursingAllowance + medicalAllowance + hillAllowance + kitMaintenance;

    // NPS calculation
    let npsAmount = 0;
    if (subscription === "nps") {
        npsAmount = (basicPay + daAmount) * 0.1;
    }

    // Alerts for input validation
    if (basicPay === 0) {
        alert("Basic Pay cannot be empty");
        return;
    } else if (basicPay < 17400) {
        alert("Basic pay cannot be less than ₹17,400");
        return;
    } else if (basicPay > 151700) {
        alert("Basic pay cannot be more than ₹1,51,700");
        return;
    }

    if (da < 0) {
        alert("DA cannot be negative");
        return;
    } else if (da === 0) {
        alert("DA cannot be empty");
        return;
    } else if (da > 100) {
        alert("DA cannot be more than 100%");
        return;
    }

    // Result Display
    const netPay = grossPay - npsAmount;

    // Populate the result grid
    const resultGrid = document.querySelector(".result-grid");
    resultGrid.innerHTML = `
        <div>Basic Pay:</div><div>₹${basicPay.toFixed(0)}</div>
        <div>DA:</div><div>₹${daAmount.toFixed(0)}</div>
        <div>HRA:</div><div>₹${hraAmount.toFixed(0)}</div>
        <div>Medical Allowance:</div><div>₹${medicalAllowance.toFixed(0)}</div>
        <div>Hill Allowance:</div><div>₹${hillAllowance.toFixed(0)}</div>
        <div>Winter Allowance:</div><div>₹${winterAllowance.toFixed(0)}</div>
        <div>Nursing Allowance:</div><div>₹${nursingAllowance.toFixed(0)}</div>
        <div>Kit Maintenance:</div><div>₹${kitMaintenance.toFixed(0)}</div>
        <div><strong>Gross Pay:</strong></div><div><strong>₹${grossPay.toFixed(0)}</strong></div>
        <div>NPS Deduction:</div><div>₹${npsAmount.toFixed(0)}</div>
        <div><strong>Net Pay:</strong></div><div><strong>₹${netPay.toFixed(0)}</strong></div>
    `;
    document.querySelector("#resultContainer").style.display = "block"; // Show the result container
});