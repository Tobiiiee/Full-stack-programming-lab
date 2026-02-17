function addColor(inputId) {
  const input = document.getElementById(inputId);
  const color = input.value.trim();

  if (!color) {
    alert('Please enter a color value.');
    return;
  }

  const box = document.createElement('div');
  box.classList.add('color-box');
  box.style.backgroundColor = color;
  box.textContent = color;

  document.getElementById('box-area').appendChild(box);
  input.value = '';

  showBOMInfo();
}

function clearBoxes() {
  document.getElementById('box-area').innerHTML = '';
}

function showBOMInfo() {
  const info = document.getElementById('bom-info');
  info.innerHTML =
    '<strong>Browser Info (BOM):</strong><br>' +
    'Window Width: ' + window.innerWidth + 'px<br>' +
    'Window Height: ' + window.innerHeight + 'px<br>' +
    'Browser: ' + navigator.appName + '<br>' +
    'Screen: ' + screen.width + ' x ' + screen.height;
}