// listener for submit
document.getElementById('loan-form').addEventListener('submit', function(e){

    // hide results if existing 
    document.getElementById('results').style.display = 'none';

    // show loading screen
    document.getElementById('loading').style.display = 'block';

    // timeout to run the compute function
    setTimeout(calculateResults, 1500);

    e.preventDefault();
});

// function for calculateResults 
function calculateResults(){

    // Defining the UI variables 
    const amountInput = document.getElementById('amount');
    const interestInput = document.getElementById('interest');
    const yearsInput = document.getElementById('years');
    const monthlyPaymentOutput = document.getElementById('monthly-payment');
    const totalPaymentOutput = document.getElementById('total-payment');
    const totalInterestOutput = document.getElementById('total-interest');

    // Defining computational variables 
    const principal = parseFloat(amountInput.value);
    const calculatedInterest = parseFloat(interestInput.value) / 100 / 12;
    const calculatedPayments = parseFloat(yearsInput.value) * 12;

    // compute monthly payment 
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    // compute total payments 
    const total = monthly * calculatedPayments;

    // compute total interst 
    const totalInterest = (monthly * calculatedPayments) - principal;

    // converting the float into a 2 decimal check 
    if(isFinite(monthly)) {
        monthlyPaymentOutput.value = monthly.toFixed(2);
        totalPaymentOutput.value = total.toFixed(2);
        totalInterestOutput.value = totalInterest.toFixed(2);

        // show results if existing 
        document.getElementById('results').style.display = 'block';

        // hide loading screen
        document.getElementById('loading').style.display = 'none';

    } else {
        showError('Please check your numbers');
    }
}

// defining the show error function 
function showError(error){

    // hide results  
    document.getElementById('results').style.display = 'none';

    // hide loading screen
    document.getElementById('loading').style.display = 'none';

    // create the div that has to be inserted in the dom 
    const errorDiv = document.createElement('div');

    // get elements where the div must be inserted
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // add class name for the div created 
    errorDiv.className = 'alert alert-danger';

    // create and append the text node (error message) to the created div
    errorDiv.appendChild(document.createTextNode(error));

    // insert above elements defined 
    card.insertBefore(errorDiv, heading);

    // call the clear error function 
    setTimeout(clearError, 3000);

}

function clearError(){
    document.querySelector('.alert').remove();
}
