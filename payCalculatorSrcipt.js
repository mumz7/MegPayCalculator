document.querySelector(".submitPayCalculator").addEventListener("click", function (event) {
    event.preventDefault();

    // Fetch inputs
    const subscription = document.querySelector("input[name='subscription']:checked")?.value;
    const basicPay = parseFloat(document.querySelector("#basicPay").value) || 0;
    const da = parseFloat(document.querySelector("#da").value) || 0;
    const placeOfPosting = document.querySelector("input[name='placeOfPosting']:checked")?.value || "others";
    const winterAllowance = document.querySelector("input[name='winterAllowance']:checked")?.value === "yes" ? 600 : 0;
    const nursingAllowance = document.querySelector("#nursingAllowanceYes")?.checked ? 1000 : 0;
    const kitMaintenance = parseFloat(document.querySelector("#kitMaintenance").value) || 0;

    const medicalAllowance = 1000;
    const hillAllowance = 500;

    const daAmount = (basicPay * da) / 100;

    let hraAmount = 0;
    if (placeOfPosting === "shillong") {
        hraAmount = Math.min(basicPay * 0.15, 8000);
    } else if (placeOfPosting === "districtHQ") {
        hraAmount = Math.min(basicPay * 0.125, 6000);
    } else {
        hraAmount = Math.min(basicPay * 0.1, 5000);
    }

    const grossPay = basicPay + daAmount + hraAmount + winterAllowance + nursingAllowance + medicalAllowance + hillAllowance + kitMaintenance;

    let npsAmount = 0;
    if (subscription === "nps") {
        npsAmount = (basicPay + daAmount) * 0.1;
    }

    const netPay = grossPay - npsAmount;

    //Handle alerts
    if (basicPay === 0) {
        alert("Basic Pay cannot be empty.");
        return;
    }else if (basicPay < 17400 || basicPay > 151700) {
        alert("Basic Pay must be between ₹17,400 and ₹1,51,700.");
        return;
    }

    if (da === 0) {
        alert("DA cannot be empty.");
        return;
    }else if (da < 0 || da > 100) { 
        alert("DA must be between 0 and 100.");
        return;
    }
    alert(`Pay Details:
        \nBasic Pay: ₹${basicPay}
        \nDA: ${da}%
        \nHRA: ₹${hraAmount}
        \nMedical Allowance: ₹${medicalAllowance}
        \nHill Allowance: ₹${hillAllowance}
        \nWinter Allowance: ₹${winterAllowance}
        \nNursing Allowance: ₹${nursingAllowance}
        \nKit Maintenance: ₹${kitMaintenance}
        \nGross Pay: ₹${grossPay}
        \nNPS Deduction: ₹${npsAmount.toFixed(0)} 
        \nNet Pay: ₹${netPay}`);
    // Update the result content
   
    const resultContent = `
        <strong>Pay Details:</strong><br>
        Basic Pay: ₹${basicPay.toFixed(2)}<br>
        DA Amount: ₹${daAmount.toFixed(2)}<br>
        HRA Amount: ₹${hraAmount.toFixed(2)}<br>
        Winter Allowance: ₹${winterAllowance}<br>
        Nursing Allowance: ₹${nursingAllowance}<br>
        Kit Maintenance: ₹${kitMaintenance.toFixed(2)}<br>
        Medical Allowance: ₹${medicalAllowance}<br>
        Hill Allowance: ₹${hillAllowance}<br>
        <br>
        <strong>Gross Pay:</strong> ₹${grossPay.toFixed(2)}<br>
        <strong>NPS Deduction:</strong> ₹${npsAmount.toFixed(2)}<br>
        <strong>Net Pay:</strong> ₹${netPay.toFixed(2)}
    `;

    document.getElementById("resultContent").innerHTML = resultContent;

    // Show the result overlay
    document.getElementById("result").style.display = "flex";
});

// Close the overlay
document.getElementById("closeResult").addEventListener("click", function () {
    document.getElementById("result").style.display = "none";
});