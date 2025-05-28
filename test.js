document.addEventListener("DOMContentLoaded", () => {
  // Код для бургер-меню
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Завантаження даних з JSON
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const aboutDiv = document.getElementById("about");
      aboutDiv.innerHTML = `
        <h2>${data.aboutUs.title}</h2>
        <p>${data.aboutUs.content}</p>
      `;

      const rulesDiv = document.getElementById("rules");
      rulesDiv.innerHTML = `
        <h2>${data.termsOfUse.title}</h2>
        <p>${data.termsOfUse.content}</p>
      `;

      const policyDiv = document.getElementById("politicy");
      policyDiv.innerHTML = `
        <h2>${data.privacyPolicy.title}</h2>
        <p>${data.privacyPolicy.content}</p>
      `;

      const toolsDiv = document.getElementById("design-tools");
      const toolsList = data.designTools.items
        .map(
          (tool) => `
            <div class="tool-item">
              <h3>${tool.name}</h3>
              <p>${tool.description}</p>
            </div>
          `
        )
        .join("");
      toolsDiv.innerHTML = `
        <h2>${data.designTools.title}</h2>
        ${toolsList}
      `;
    })
    .catch((error) => console.error("Помилка завантаження JSON:", error));
});
