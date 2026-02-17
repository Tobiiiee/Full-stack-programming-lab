
function calculate() {
  var num1      = document.getElementById('num1').value;
  var num2      = document.getElementById('num2').value;
  var operation = document.getElementById('operation').value;
  var resultBox = document.getElementById('result-box');
  var resultEl  = document.getElementById('result');

  if (num1 === '' || num2 === '') {
    resultEl.textContent = 'Please enter both numbers.';
    resultBox.className  = '';
    return;
  }

  var a = parseFloat(num1);
  var b = parseFloat(num2);
  var result;

  if (operation === 'divide' && b === 0) {
    resultEl.textContent = 'Error: Cannot divide by zero.';
    resultBox.className  = '';
    return;
  }

  if (operation === 'add') {
    result = a + b;
  } else if (operation === 'subtract') {
    result = a - b;
  } else if (operation === 'multiply') {
    result = a * b;
  } else if (operation === 'divide') {
    result = a / b;
  }

  resultEl.textContent = 'Result: ' + result;

  resultBox.classList.remove('positive', 'negative', 'zero');

  if (result > 0) {
    resultBox.classList.add('positive');
  } else if (result < 0) {
    resultBox.classList.add('negative');
  } else {
    resultBox.classList.add('zero');
  }
}

function resetCalculator() {
  document.getElementById('num1').value        = '';
  document.getElementById('num2').value        = '';
  document.getElementById('operation').value   = 'add';
  document.getElementById('result').textContent = 'Result will appear here.';
  document.getElementById('result-box').className = '';
}