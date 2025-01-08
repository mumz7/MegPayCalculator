document.querySelector(".submitDaArrear").addEventListener("click", function (event) {
    event.preventDefault();

    // Fetch inputs
    const subscription = document.querySelector("input[name='subscription']:checked")?.value;
    const basicPay = parseFloat(document.querySelector("#basicPay").value) || 0;
    const incrementPercent = parseFloat(document.querySelector("#incrementPercentage").value) || 0;
    const numberOfMonths = parseFloat(document.querySelector("#months").value) || 0;

    // Input validation
    if (basicPay === 0) {
        alert("Basic Pay cannot be empty.");
        return;
    } else if (basicPay < 17400 || basicPay > 151700) {
        alert("Basic Pay must be between ₹17,400 and ₹1,51,700.");
        return;
    }
    if (incrementPercent <= 0) {
        alert("Increment Percentage must be greater than 0.");
        return;
    }else if (incrementPercent > 12){
        alert("Too large increment percentage. Please enter a value less than 12.");
    }
    if (numberOfMonths <= 0) {
        alert("Number of Months must be greater than 0.");
        return;
    }else if (numberOfMonths > 12){
        alert("Too large number of months. Please enter a value less than 12.");
    }

    // DA calculation
    const daAmount = (basicPay * incrementPercent) / 100;
    const daArrearAmount = daAmount * numberOfMonths;
    const npsAmount = subscription === "nps" ? daArrearAmount * 0.1 : 0;

    // Format results
    const formattedDaAmount = daAmount.toFixed(0);
    const formattedDaArrear = daArrearAmount.toFixed(0);
    const formattedNpsAmount = npsAmount.toFixed(0);

    // Display results
    alert(`
    DA ARREAR CALCULATION
    -----------------------------------
    Increment Percentage:   ${incrementPercent}%
    Number of Months:       ${numberOfMonths}
    DA Amount per Month:    ₹${formattedDaAmount}
    -----------------------------------
    NPS Deduction:          ₹${formattedNpsAmount}
    -----------------------------------
    Total DA Arrear:        ₹${formattedDaArrear}
    `);
});