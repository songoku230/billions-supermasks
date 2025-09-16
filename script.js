const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');
const frame = document.getElementById('frame');
const placeholder = document.getElementById('placeholder');

const btnUpload = document.getElementById('btnUpload');
const btnMask = document.getElementById('btnMask');
const btnDownload = document.getElementById('btnDownload');
const btnReset = document.getElementById('btnReset');

// Upload via button
btnUpload.addEventListener('click', () => fileInput.click());

// Handle file input change
fileInput.addEventListener('change', e => {
  const file = e.target.files[0];
  if (file) loadImage(file);
});

// Drag-and-drop support
frame.addEventListener('dragover', e => {
  e.preventDefault();
  frame.classList.add('dragover');
});
frame.addEventListener('dragleave', () => frame.classList.remove('dragover'));
frame.addEventListener('drop', e => {
  e.preventDefault();
  frame.classList.remove('dragover');
  if (e.dataTransfer.files.length) {
    const file = e.dataTransfer.files[0];
    if (file.type.startsWith('image/')) loadImage(file);
  }
});

// Load image and resize frame
function loadImage(file) {
  const url = URL.createObjectURL(file);
  preview.src = url;
  preview.style.display = 'block';
  placeholder.style.display = 'none';

  // Resize frame to match image aspect ratio
  const img = new Image();
  img.src = url;
  img.onload = () => {
    const aspectRatio = img.width / img.height;
    const maxWidth = Math.min(460, window.innerWidth * 0.92);
    const width = maxWidth;
    const height = width / aspectRatio;
    frame.style.width = width + 'px';
    frame.style.height = height + 'px';
  };
}

// Supermask effect
function applyMask() {
  if (!preview.src) return;
  preview.classList.toggle('masked');
}

// Download image
function downloadImage() {
  if (!preview.src) return;
  const link = document.createElement('a');
  link.href = preview.src;
  link.download = 'supermask.png';
  link.click();
}

// Reset image and frame
btnReset.addEventListener('click', () => {
  preview.removeAttribute('src');
  preview.style.display = 'none';
  preview.classList.remove('masked');
  placeholder.style.display = 'block';
  fileInput.value = '';

  // Reset frame to square default
  frame.style.width = 'min(460px, 92vw)';
  frame.style.height = 'auto';
});
