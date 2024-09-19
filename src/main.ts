import "./style.css";
import data from "../data.json";
document.addEventListener("DOMContentLoaded", () => {
  let currentIndex = 0;

  const updateSlides = () => {
    const sectionsContainer = document.getElementById("sections-container");
    if (sectionsContainer) {
      const navigation = document.getElementById("navigation");
      if (navigation && window.innerWidth > 992) {
        navigation.style.transform = `translateX(-${20 * (currentIndex + 1)}%) translateY(-50%)`;
      } else {
        navigation!.style.transform = ``;
      }
      document.getElementById(currentIndex.toString())?.classList.add("current-author");
      sectionsContainer.style.transform = `translateX(-${currentIndex * 100}vw)`;
      applyAboutSectionData(currentIndex);
    }
  };

  const controls = document.querySelectorAll(".control");
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      if (currentIndex === data.length - 1) {
        return;
      }
      document.getElementById(currentIndex.toString())?.classList.remove("current-author");
      currentIndex++;
      updateSlides();
    }
    if (e.key === "ArrowLeft") {
      if (currentIndex === 0) {
        return;
      }
      document.getElementById(currentIndex.toString())?.classList.remove("current-author");
      currentIndex--;
      updateSlides();
    }
  });

  if (controls) {
    controls.forEach((control) => {
      control.addEventListener("click", () => {
        document.getElementById(currentIndex.toString())?.classList.remove("current-author");
        const id = control.getAttribute("id");
        if (id) {
          currentIndex = +id;
          updateSlides();
        }
      });
    });
  }

  // Initialize first slide
  applyAboutSectionData(0);
});

function applyAboutSectionData(currentIndex: number) {
  const aboutSection = document.getElementById("about");
  if (aboutSection) {
    const currentData = data[currentIndex];
    const nextAuthor = currentIndex + 1 < data.length ? data[currentIndex + 1].publication.author : "End of list";

    aboutSection.innerHTML = `
    <div class="about-general">
      <h4 class="about-author">${currentData.publication.author}</h4>
      <h2 class="about-book">${currentData.book_info.title}</h2>
      <div class="designer-info">
        <img src="./public/icons/Mansvg.svg" width="40px" height="40px" />
        <div class="designer-social">
          <p class="name">${currentData.publication.cover_by}</p>
          <p class="email">${currentData.publication.cover_author_email}</p>
        </div>
      </div>
      <div class="more-info">
        <div class="more-autor">
          <div>
            <span>Art Direction</span>
            <span>${currentData.publication.art_direction}</span>
          </div>
          <div>
            <span>Influenced By</span>
            <span>${currentData.publication.influenced_by}</span>
          </div>
          <div>
            <span>Year</span>
            <span>${currentData.publication.year}</span>
          </div>
        </div>
        <p>${currentData.book_info.text}</p>
        <div class="more-arrow">
          <span>
            <span></span>
            <span></span>
          </span>
          <span><a>0${currentIndex + 1 + 1}. ${nextAuthor}</a></span>
        </div>
      </div>
    </div>
    <div class="about-gallery">
      <img src=${currentData.images?.first_prewiev} width="256px" height="350px" />
      <img class="extra" src=${currentData.images?.second_prewiev} width="256px" height="350px" />
      <img class="small" src=${currentData.images?.third_prewiev} width="256px" height="350px" />
    </div>`;
  }
}
