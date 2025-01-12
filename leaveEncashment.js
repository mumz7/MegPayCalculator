document.querySelector(".submitLeaveEnchasment").addEventListener("click", function(event) {
    event.preventDefault();

    //Fetch inuputs
    const basicPay = parseFloat(document.querySelector("#basicPay").value) || 0;
    const da = parseFloat(document.querySelector("#da").value) || 0;
    const numberOfDays = parseFloat(document.querySelector("#numberOfDays").value) || 0;

    const daAmount = da / 100 * basicPay
    const leaveEncashment = (basicPay + daAmount) * numberOfDays  / 300


    //Handle Alerts
    if (basicPay === 0){
        alert("Pleas enter Basic Pay.")
        return
    }else if (basicPay <= 17400 || basicPay >= 151700){
        alert ("Basic Pay cannot less than ₹17,400 or greater than ₹1,51,700")
        return
    }

    if (da === 0){
        alert("Please enter DA")
        return
    }else if (da<0 || da>100){
        alert("Enter valide DA")
        return
    }

    if (numberOfDays === 0){
        alert("Enter Number of leave days")
        return
    }else if (numberOfDays >300){
        alert("Total number of leave days is limited to 300")
        return
    }

    alert(`Leave Encashment
            -----------------------
            Basic Pay: ₹${basicPay}
            DA: ${da}%
            Number of days: ${numberOfDays}
            -----------------------
            Total: ₹${leaveEncashment}
        `)
})