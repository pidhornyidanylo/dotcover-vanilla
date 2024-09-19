import { applyAboutSectionData } from "./about/about.ts";
import data from "../data.json";
import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
	let currentIndex = 0;
	handleScroll();
	updateSlides(currentIndex);
	handleKeyDowns(currentIndex);
	handleControls(currentIndex);
	applyAboutSectionData(0);
});

function handleScroll() {
	document.addEventListener("scroll", () => {
		const navigation = document.getElementById("navigation-container");
		const sectionOverlay = document.getElementById("hero-overlay");
		const aboutSection = document.getElementById("about");
		const conditionalAccess = navigation && sectionOverlay && aboutSection;
		if (conditionalAccess) {
			if (window.scrollY > 270) {
				navigation.style.opacity = "0";
				sectionOverlay.style.backgroundColor = "rgba(0,0,0,.23)";
				aboutSection.style.opacity = "1";
			} else {
				navigation.style.opacity = "1";
				aboutSection.style.opacity = "0";
				sectionOverlay.style.backgroundColor = "rgba(0,0,0,.12)";
			}
		}
	});
}

function handleKeyDowns(currentIndex: number) {
	document.addEventListener("keydown", (e) => {
		if (e.key === "ArrowRight") {
			if (currentIndex === data.length - 1) {
				return;
			}
			document
				.getElementById(currentIndex.toString())
				?.classList.remove("current-author");
			currentIndex++;
			updatePageLinkTitle(currentIndex);
		}
		if (e.key === "ArrowLeft") {
			if (currentIndex === 0) {
				return;
			}
			document
				.getElementById(currentIndex.toString())
				?.classList.remove("current-author");
			currentIndex--;
			updatePageLinkTitle(currentIndex);
		}
	});
}

function handleControls(currentIndex: number) {
	const controls = document.querySelectorAll(".control");
	if (controls) {
		controls.forEach((control) => {
			control.addEventListener("click", () => {
				document
					.getElementById(currentIndex.toString())
					?.classList.remove("current-author");
				const id = control.getAttribute("id");
				if (id) {
					currentIndex = +id;
					updatePageLinkTitle(currentIndex);
				}
			});
		});
	}
}

export function updateSlides(currentIndex: number) {
	const sectionsContainer = document.getElementById("hero-slides");
	if (sectionsContainer) {
		const navigation = document.getElementById("navigation-container");
		if (navigation && window.innerWidth > 992) {
			navigation.style.transform = `translateX(-${
				20 * (currentIndex + 1)
			}%) translateY(-50%)`;
		} else {
			navigation!.style.transform = ``;
		}
		document
			.getElementById(currentIndex.toString())
			?.classList.add("current-author");
		sectionsContainer.style.transform = `translateX(-${currentIndex * 100}vw)`;
		applyAboutSectionData(currentIndex);
	}
}

function updatePageLinkTitle(currentIndex: number) {
	const pageTitle = document.querySelector(".page-route");
	pageTitle!.innerHTML = `Home > <a href="book.html?index=${currentIndex}">${
		data[currentIndex].publication.author.split(" ")[1]
	}</a>`;
	updateSlides(currentIndex);
}
