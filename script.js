// script.js
const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');

fileInput.addEventListener('change', e => {
  const file = e.target.files[0];
  if (file) {
    preview.src = URL.createObjectURL(file);
  }
});

function applyMask() {
  alert("Supermask effect placeholder");
}

function downloadImage() {
  if (!preview.src) return;
  const link = document.createElement('a');
  link.href = preview.src;
  link.download = 'supermask.png';
  link.click();
}
