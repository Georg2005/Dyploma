const urlParams = new URLSearchParams(window.location.search);
const categoryParam = urlParams.get("category");

const jsonUrl = "ads.json";

fetch(jsonUrl)
  .then((response) => response.json())
  .then((ads) => {
    const filteredAds = ads.filter((ad) => ad.category === categoryParam);

    renderAds(filteredAds);
  })
  .catch((error) => {
    console.error("Помилка завантаження JSON", error);
    document.getElementById("ads-container").innerHTML =
      "<p>Не вдалося завантажити оголошення.</p>";
  });

function renderAds(ads) {
  const container = document.getElementById("ads-container");
  container.innerHTML = "";

  if (ads.length === 0) {
    container.innerHTML = "<p>Немає оголошень у цій категорії.</p>";
    return;
  }

  ads.forEach((ad) => {
    const card = document.createElement("div");
    card.className = "ad-card";

    let sliderImages = ad.images
      .map(
        (img, index) => `
       <img src="${img}" class="${
          index === 0 ? "active" : ""
        }" alt="Фото оголошення">
     `
      )
      .join("");

    const slider = `
       <div class="ad-slider" data-current="0">
         ${sliderImages}
         <div class="ad-slider-buttons">
           <button class="prev-btn">&#10094;</button>
           <button class="next-btn">&#10095;</button>
         </div>
       </div>
     `;

    const content = `
       <div class="ad-card-content">
         <div class="ad-title">${ad.title}</div>
         <div class="ad-description">${ad.description}</div>
         <div class="ad-contact">Контакт: ${ad.contact}</div>
         <div class="ad-contactPhone">Контактний телефон: ${ad.contactPhone}</div>
       </div>
     `;

    card.innerHTML = slider + content;
    container.appendChild(card);
  });

  document.querySelectorAll(".ad-slider").forEach((slider) => {
    const images = slider.querySelectorAll("img");
    let current = 0;

    function showImage(index) {
      images.forEach((img) => img.classList.remove("active"));
      images[index].classList.add("active");
    }

    slider.querySelector(".prev-btn").addEventListener("click", () => {
      current = (current - 1 + images.length) % images.length;
      showImage(current);
    });

    slider.querySelector(".next-btn").addEventListener("click", () => {
      current = (current + 1) % images.length;
      showImage(current);
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    navLinks.classList.toggle("active");
  });
});
