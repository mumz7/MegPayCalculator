document.querySelector(".submitTransferTA").addEventListener("click", function(event) {
    event.preventDefault();

    // Fetch inputs
    const grade = document.querySelector("input[name='grade']:checked")?.value;
    const family = document.querySelector("input[name='family-members']:checked")?.value;
    const placeOfPosting = document.querySelector("input[name='placeOfPosting']:checked")?.value;
    const basicPay = parseFloat(document.querySelector("#basicPay").value) || 0;
    const distance = parseFloat(document.querySelector("#distance").value) || 0;
    const numberOfFamilyMembers = parseFloat(document.querySelector("#numberOfFamilyMembers").value) || 0;
    const numberOfChildren = parseFloat(document.querySelector("#numberOfChildren").value) || 0;

    //Composite Grant
    const compositeGrant = 0.8 * basicPay;

    //Daily Allowance
    let dailyAllowance = 0;
    if (placeOfPosting === "within-state") {
        if (grade === "grade1") {
            dailyAllowance = 360;
        }else if (grade === "grade2") {
            dailyAllowance = 270;
        }else if (grade === "grade3") {
            dailyAllowance = 240;
        }else{
            dailyAllowance = 200;
        }
    }else if (placeOfPosting === "within-ne") {
        if (grade === "grade1") {
            dailyAllowance = 600;
        }else if (grade === "grade2") {
            dailyAllowance = 450;
        }else if (grade === "grade3") {
            dailyAllowance = 400;
        }else{
            dailyAllowance = 360;
        }
    }else if (placeOfPosting === "outside-ne") {
        if (grade === "grade1") {
            dailyAllowance = 900;
        }else if (grade === "grade2") {
            dailyAllowance = 700;
        }else if (grade === "grade3") {
            dailyAllowance = 600;
        }else{
            dailyAllowance = 560;
        }
    }else{
            dailyAllowance = 0;
        }

        //Personal Efects in kilograms
        let personalEffects = 0
        if (grade === "grade1"){
            if (family === "with-family"){ 
                personalEffects = 6000;
            }else{
                personalEffects = 3000;
            }

        }else if (grade === "grade2"){
            if (family === "with-family"){ 
                personalEffects = 4000;
            }else{
                personalEffects = 2000;
            }
        }else if (grade === "grade3"){
            if (family === "with-family"){ 
                personalEffects = 2000;
            }else{
                personalEffects = 1000;
            }
        }else if (grade === "grade4"){
            if (family === "with-family"){ 
                personalEffects = 1000;
            }else{
                personalEffects = 500;
            }
        }else{
            personalEffects = 0;
        }

        
        let personalEffectsAmount = (0.4 * distance * personalEffects) / 100;

        //Family Allowance
        let familyAllowance = 0
        if (family ==="with-family"){
            familyAllowance = (numberOfFamilyMembers * dailyAllowance) + (0.5 * numberOfChildren * dailyAllowance)
        }else{
            familyAllowance = 0
        }
        //compute total Tranfer TA

    // Handle alerts
    if (basicPay === 0) {
        alert("Basic Pay cannot be empty.");
        return;
    } else if (basicPay < 17400 || basicPay > 151700) {
        alert("Basic Pay must be between ₹17,400 and ₹1,51,700.");
        return;
    }

    if (distance === 0) {
        alert("Distance cannot be empty.");
        return;
    }

    if (family !== "with-family" && (numberOfFamilyMembers > 0 || numberOfChildren > 0)) {
        alert("Are you sure you travlled with family members?");
        return;
    }


    // print results
    alert(`Transfer TA Details:
        Basic Pay: ₹${basicPay}
        Composite Grant (80% of Basic Pay) : ₹${compositeGrant}
        Distance: ${distance} km
        Daily Allowance: ₹${dailyAllowance}
        Number of Family Members: ${numberOfFamilyMembers}
        Number of Children: ${numberOfChildren}
        Family Allowance: ${familyAllowance}
        Weighs Applicable: ₹${personalEffects} Kg
        Carriage Personal Effects  = ₹${personalEffectsAmount}
        \nTotal Transfer TA: ₹${compositeGrant + dailyAllowance + personalEffectsAmount}
        `);
});