const header = document.querySelector('.navbar');

window.onscroll = function() {
    var top = window.scrollY;
    if(top >=100) {
        header.classList.add('navbarDark');
    }
    else {
        header.classList.remove('navbarDark');
    }
}
document.getElementById("uploadForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var formData = new FormData();
    var fileInput = document.getElementById("photo");
    formData.append("file", fileInput.files[0]);
    
    fetch("/predict", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        var resultElement = document.getElementById("predictionResult");
        resultElement.innerHTML = "<p>Prediction: " + data.class + "</p>";
    })
    .catch(error => {
        console.error("Error:", error);
    });
});

function previewImage(event) {
var fileInput = event.target;
var file = fileInput.files[0];
var preview = document.getElementById('previewImage');

if (file) {
    var reader = new FileReader();

    reader.onload = function(event) {
        preview.src = event.target.result;
        preview.style.display = 'block';
    };

    reader.readAsDataURL(file);
} else {
    preview.src = '#';
    preview.style.display = 'none';
}
}