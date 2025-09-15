document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('imageInput');
    const imageUploadArea = document.getElementById('imageUploadArea');
    const uploadedImage = document.getElementById('uploadedImage');
    const uploadPrompt = document.getElementById('uploadPrompt');
    const uploadButton = document.getElementById('uploadButton');
    const supermasksButton = document.getElementById('supermasksButton');
    const downloadButton = document.getElementById('downloadButton');
    const statusMessage = document.getElementById('statusMessage');

    let currentImage = null;

    function triggerFileInput() {
        imageInput.click();
    }

    imageUploadArea.addEventListener('click', triggerFileInput);
    uploadButton.addEventListener('click', triggerFileInput);

    imageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadedImage.src = e.target.result;
                uploadedImage.style.display = 'block';
                uploadPrompt.style.display = 'none'; // Directly hide the prompt
                currentImage = e.target.result;
                statusMessage.textContent = 'Image uploaded successfully!';
                statusMessage.style.color = 'green';
                
                // Reset filter in case an old one was applied
                uploadedImage.style.filter = 'none'; 
            };
            reader.readAsDataURL(file);
        }
    });

    supermasksButton.addEventListener('click', () => {
        if (!currentImage) {
            statusMessage.textContent = 'Error: Please upload an image first.';
            statusMessage.style.color = 'red';
            return;
        }

        statusMessage.textContent = 'Applying Supermasks...';
        statusMessage.style.color = '#333';
        supermasksButton.disabled = true;
        downloadButton.disabled = true;

        setTimeout(() => {
            uploadedImage.style.filter = 'sepia(100%) saturate(150%) hue-rotate(20deg)';
            
            statusMessage.textContent = 'Supermasks applied!';
            statusMessage.style.color = 'green';
            supermasksButton.disabled = false;
            downloadButton.disabled = false;
        }, 2500);
    });

    downloadButton.addEventListener('click', () => {
        if (!uploadedImage.src || uploadedImage.src === '#') {
            statusMessage.textContent = 'Error: No image to download.';
            statusMessage.style.color = 'red';
            return;
        }

        const link = document.createElement('a');
        link.href = uploadedImage.src;
        link.download = 'supermasks-image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        statusMessage.textContent = 'Download complete!';
        statusMessage.style.color = 'green';
    });
});
