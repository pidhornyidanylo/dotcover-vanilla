import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  let currentIndex = 0;

  const updateSlides = () => {
    console.log(window.innerWidth)
    const sectionsContainer = document.getElementById("sections-container");
    if (sectionsContainer) {
      const navigation = document.getElementById("navigation");
      if (navigation&&window.innerWidth > 992) {
        navigation.style.transform = `translateX(-${
          20 * (currentIndex + 1)
        }%) translateY(-50%)`;
      } else {
        navigation!.style.transform = ``;
      }
      document
        .getElementById(currentIndex.toString())!
        .classList.add("current-author");
      sectionsContainer.style.transform = `translateX(-${
        currentIndex * 100
      }vw)`;
    }
  };

  const controls = document.querySelectorAll(".control");
  document.addEventListener("keydown", (e) => {
    console.log(e.key);
    if (e.key === "ArrowRight") {
      if (currentIndex === 3) {
        return;
      }
      document
        .getElementById(currentIndex.toString())!
        .classList.remove("current-author");
      currentIndex++;
      updateSlides();
    }
    if (e.key === "ArrowLeft" ) {
      if (currentIndex === 0) {
        return;
      }
      document
        .getElementById(currentIndex.toString())!
        .classList.remove("current-author");
      currentIndex--;
      updateSlides();
    }
  });
  if (controls) {
    controls.forEach((control) => {
      if (control) {
        control.addEventListener("click", () => {
          document
            .getElementById(currentIndex.toString())!
            .classList.remove("current-author");
          const id = control.getAttribute("id");
          if (id) {
            currentIndex = +id;
            updateSlides();
          }
        });
      }
    });
  }
});
