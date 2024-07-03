(() => {
    'use strict'
    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    })
  })()

  document.addEventListener('DOMContentLoaded', function () {
    const smallImages = document.querySelectorAll('.small-image');
    const largeImage = document.querySelector('.large-image');
    const initialImageSrc = smallImages[0].getAttribute('src');
    largeImage.setAttribute('src', initialImageSrc);
    smallImages.forEach(image => {
      image.addEventListener('click', function () {
        const imageUrl = this.getAttribute('src');
        smallImages.forEach(img => img.classList.remove('active'));
        this.classList.add('active');
        largeImage.setAttribute('src', imageUrl);
      });
    });
  });