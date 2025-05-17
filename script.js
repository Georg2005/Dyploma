if (!("scrollBehavior" in document.documentElement.style)) {
  import("smoothscroll-polyfill").then((module) => {
    module.polyfill();
  });
}

function smoothScrollTo(targetElement, offset = 0) {
  if (!targetElement) return;

  try {
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  } catch (error) {
    console.error("Smooth scroll error:", error);
    targetElement.scrollIntoView();
  }
}

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
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerOffset = document.querySelector("header") ? 80 : 0;
        smoothScrollTo(targetElement, headerOffset);
      }
    });
  });

  document.querySelector(".add-ad").addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector("#add-ads");
    if (target) {
      smoothScrollTo(target, 80);
    }
  });

  const form = document.getElementById("adForm");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const imageInputs = document.querySelectorAll(
        '.photo-slot input[type="file"]'
      );

      const images = await Promise.all(
        Array.from(imageInputs)
          .filter((input) => input.files && input.files[0])
          .map((input) => readFileAsBase64(input.files[0]))
      );

      const formData = {
        id: Date.now(),
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        category: document.getElementById("category").value,
        contact: document.getElementById("contact").value,
        contactPhone: document.getElementById("contactPhone").value,
        images: images,
        createdAt: new Date().toISOString(),
      };

      saveAdToLocalStorage(formData);

      alert("Оголошення збережено!");
      form.reset();
    });
  }

  function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function saveAdToLocalStorage(adData) {
    let ads = JSON.parse(localStorage.getItem("ads")) || [];
    ads.push(adData);
    localStorage.setItem("ads", JSON.stringify(ads));
  }

  const resetBtn = document.getElementById("resetForm");
  resetBtn?.addEventListener("click", () => {
    form.reset();
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
});

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    navLinks.classList.toggle("active");
  });
});
