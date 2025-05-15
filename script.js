document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("infiniteCarousel");
  const slides = document.querySelectorAll(".carousel-slide");

  if (carousel && !carousel.dataset.cloned) {
    slides.forEach((slide) => {
      const clone = slide.cloneNode(true);
      carousel.appendChild(clone);
    });
    carousel.dataset.cloned = true;
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  document.querySelector(".add-ad").addEventListener("click", function () {
    location.href = "#add-ads";
  });

  const form = document.getElementById("adForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const imageInputs = document.querySelectorAll(
        '.photo-slot input[type="file"]'
      );
      const images = Array.from(imageInputs)
        .filter((input) => input.files && input.files[0])
        .map((input) => input.files[0].name);

      const formData = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        category: document.getElementById("category").value,
        contact: document.getElementById("contact").value,
        phone: document.getElementById("contactPhone").value,
        images: images,
      };

      console.log("Form data:", formData);
      alert("Оголошення збережено!");
    });

    document
      .querySelectorAll('.photo-slot input[type="file"]')
      .forEach((input) => {
        input.addEventListener("change", function (e) {
          const slot = this.closest(".photo-slot");
          const defaultIcon = slot.querySelector(".default-icon");
          const uploadedImage = slot.querySelector(".uploaded-image");

          if (this.files && this.files[0]) {
            const reader = new FileReader();

            reader.onload = function (e) {
              uploadedImage.src = e.target.result;
              uploadedImage.style.display = "block";
              defaultIcon.style.display = "none";
            };

            reader.readAsDataURL(this.files[0]);
          } else {
            uploadedImage.style.display = "none";
            defaultIcon.style.display = "block";
          }
        });
      });

    document.getElementById("resetForm").addEventListener("click", function () {
      form.reset();

      document.querySelectorAll(".photo-slot").forEach((slot) => {
        const defaultIcon = slot.querySelector(".default-icon");
        const uploadedImage = slot.querySelector(".uploaded-image");

        uploadedImage.src = "";
        uploadedImage.style.display = "none";

        defaultIcon.src = "https://img.icons8.com/ios/50/camera--v1.png";
        defaultIcon.style.display = "block";
        defaultIcon.style.width = "30px";
        defaultIcon.style.height = "30px";
        defaultIcon.style.opacity = "0.5";
      });
    });
  }
});
