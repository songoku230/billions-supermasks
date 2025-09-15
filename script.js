document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('imageInput');
    const imageUploadArea = document.getElementById('imageUploadArea');
    const uploadedImage = document.getElementById('uploadedImage');
    const uploadPrompt = document.getElementById('uploadPrompt');
    const uploadButton = document.getElementById('uploadButton');
    const supermasksButton = document.getElementById('supermasksButton');
    const downloadButton = document.getElementById('downloadButton');

    let currentImage = null; // To store the image data for processing

    // Function to trigger the hidden file input
    function triggerFileInput() {
        imageInput.click();
    }

    // Event listener for clicking the upload area
    imageUploadArea.addEventListener('click', triggerFileInput);

    // Event listener for clicking the "Upload image" button
    uploadButton.addEventListener('click', triggerFileInput);

    // Event listener for when a file is selected
    imageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadedImage.src = e.target.result;
                uploadedImage.style.display = 'block';
                uploadPrompt.style.display = 'none'; // Hide prompt
                currentImage = e.target.result; // Store the base64 image data
            };
            reader.readAsDataURL(file); // Read the image as a data URL (base64)
        }
    });

    // Event listener for the "Supermasks" button (placeholder functionality)
    supermasksButton.addEventListener('click', () => {
        if (currentImage) {
            alert('Applying supermasks! (This is a placeholder, real image processing would happen here)');
            // In a real app, you would send `currentImage` to a server or
            // use a client-side library to apply effects and update `uploadedImage.src`
            // For now, let's just make a simple visual change as a placeholder
            uploadedImage.style.filter = 'grayscale(50%) hue-rotate(90deg)'; // Example filter
            setTimeout(() => {
                alert('Supermasks applied!');
            }, 1000);
        } else {
            alert('Please upload an image first!');
        }
    });

    // Event listener for the "Download" button
    downloadButton.addEventListener('click', () => {
        if (uploadedImage.src && uploadedImage.src !== '#') {
            const link = document.createElement('a');
            link.href = uploadedImage.src;
            link.download = 'supermasks-image.png'; // Name of the downloaded file
            document.body.appendChild(link); // Append to body (required for Firefox)
            link.click(); // Programmatically click the link to trigger download
            document.body.removeChild(link); // Clean up
        } else {
            alert('No image to download!');
        }
    });
});
