const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");

fileInput.addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => preview.src = ev.target.result;
  reader.readAsDataURL(file);
});

// Example effect for Supermask
function applyMask() {
  if (!preview.src) {
    alert("Upload an image first");
    return;
  }
  // Toggle filter effect
  if (preview.style.filter) {
    preview.style.filter = "";
  } else {
    preview.style.filter = "grayscale(100%) contrast(150%)";
  }
}

function downloadImage() {
  if (!preview.src) {
    alert("Upload an image first");
    return;
  }

  // Create a canvas to capture image + filter
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = preview.src;

  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.filter = preview.style.filter || "none";
    ctx.drawImage(img, 0, 0);
    const link = document.createElement("a");
    link.download = "supermask.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };
}
