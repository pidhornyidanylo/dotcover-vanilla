import data from "../../data.json";
import { updateSlides } from "../main";
import "./about.css";

export function applyAboutSectionData(currentIndex: number) {
  const aboutSection = document.getElementById("about");
  if (aboutSection) {
    const currentData = data[currentIndex];
    const nextAuthor =
      currentIndex + 1 < data.length
        ? "0" +
          (currentIndex + 1 + 1) +
          ". " +
          data[currentIndex + 1].publication.author
        : "End of list";

    aboutSection.innerHTML = `
      <div>
        <h4 class="about-author">${currentData.publication.author}</h4>
        <h2 class="about-bookTitle">${currentData.book_info.title}</h2>
        <div class="designer-info">
          <img src="./public/icons/Mansvg.svg" width="40px" height="40px" />
          <div class="designer-social">
            <p>${currentData.publication.cover_by}</p>
            <p class="designer-email">${currentData.publication.cover_author_email}</p>
          </div>
        </div>
        <div class="about-additionalInfo">
          <div class="publish-info">
            <div>
              <span class="info-field">Art Direction</span>
              <span class="info-content">${currentData.publication.art_direction}</span>
            </div>
            <div>
              <span class="info-field">Influenced By</span>
              <span class="info-content">${currentData.publication.influenced_by}</span>
            </div>
            <div>
              <span class="info-field">Year</span>
              <span class="info-content">${currentData.publication.year}</span>
            </div>
          </div>
          <p class="about-text">${currentData.book_info.text}</p>
          <div class="about-footer">
            <div class="about-arrow">
              <span class="arrow-up"></span>
              <span class="arrow-down"></span>
            </div>
            <span class="next-author"><a id="next-author">${nextAuthor}</a></span>
          </div>
        </div>
      </div>
      <div class="about-gallery">
        <img src=${currentData.images?.first_prewiev} width="256px" height="350px" />
        <img class="extra" src=${currentData.images?.second_prewiev} width="256px" height="350px" />
        <img class="small" src=${currentData.images?.third_prewiev} width="256px" height="350px" />
      </div>`;
  }
  const nextAuthor = document.getElementById("next-author");
  if (nextAuthor) {
    nextAuthor.addEventListener("click", () => {
      console.log("click");
      updateSlides(
        currentIndex < data.length - 1 ? currentIndex + 1 : currentIndex
      );
      applyAboutSectionData(
        currentIndex < data.length - 1 ? currentIndex + 1 : currentIndex
      );
      if (currentIndex < data.length - 1) {
        document
          .getElementById(currentIndex.toString())
          ?.classList.remove("current-author");
        currentIndex++;
      } else {
        return;
      }
    });
  }
}
