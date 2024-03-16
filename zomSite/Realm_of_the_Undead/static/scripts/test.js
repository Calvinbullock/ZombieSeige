const showImageButton = document.getElementById('showImageButton');
const hiddenImage = document.getElementById('hiddenImage');

const data = document.currentScript.dataset;
const file = data.img;

showImageButton.addEventListener('click', function() {
  hiddenImage.src = file; 
  hiddenImage.style.display = 'block';
});
