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

// Toggle Right Panel
document.getElementById('btn-right').onclick = () => {
  document.getElementById('right-panel').classList.toggle('open');
};

// List of masks
const masks = [
  '/assets/masks/mask1.png',
  '/assets/masks/mask2.png',
  '/assets/masks/mask3.png'
];

const maskList = document.getElementById('mask-list');

// Display masks in the panel
masks.forEach(src => {
  const img = document.createElement('img');
  img.src = src;
  img.addEventListener('click', () => addMaskToCanvas(src));
  maskList.appendChild(img);
});

// Add mask to canvas
function addMaskToCanvas(src) {
  const canvas = document.getElementById('canvas-container');
  const mask = document.createElement('img');
  mask.src = src;
  mask.classList.add('mask-layer');
  mask.style.top = '50px';
  mask.style.left = '50px';
  canvas.appendChild(mask);

  // Make mask draggable & resizable using Interact.js
  interact(mask).draggable({
    modifiers: [interact.modifiers.restrictRect({ restriction: canvas })],
    listeners: { move: dragMoveListener }
  }).resizable({
    edges: { left:true, right:true, bottom:true, top:true },
    listeners: { move: resizeMoveListener },
    modifiers: [interact.modifiers.restrictEdges({ outer: canvas })]
  });
}

// Drag function
function dragMoveListener(event) {
  const target = event.target;
  const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
  const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
  target.style.transform = `translate(${x}px, ${y}px)`;
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

// Resize function
function resizeMoveListener(event) {
  const target = event.target;
  target.style.width = event.rect.width + 'px';
  target.style.height = event.rect.height + 'px';
}

