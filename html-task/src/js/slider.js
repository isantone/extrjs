function setActive(slide) {
  document.getElementsByClassName("slider__big-image")[0].classList.add("disp");
  document.getElementsByClassName("slider__preview-image_active")[0].classList.remove("slider__preview-image_active");

  slide.classList.add("slider__preview-image_active");

  document.getElementsByClassName("slider__big-image")[0].src = slide.src.slice(0, -6) + ".jpg";

}

function nextSlide() {
  let activeSlide = document.getElementsByClassName("slider__preview-image_active")[0];

  let allSlides = document.getElementsByClassName("slider__preview-image");

  let indexOfActiveSlide = [].indexOf.call(allSlides, activeSlide);

  if (++indexOfActiveSlide < allSlides.length) {
    setActive(allSlides[indexOfActiveSlide]);
  }
  else {
    setActive(allSlides[0]);
  }
}

function previousSlide() {
  let activeSlide = document.getElementsByClassName("slider__preview-image_active")[0];

  let allSlides = document.getElementsByClassName("slider__preview-image");

  let indexOfActiveSlide = [].indexOf.call(allSlides, activeSlide);

  if (indexOfActiveSlide > 0) {
    setActive(allSlides[indexOfActiveSlide - 1]);
  }
  else {
    setActive(allSlides[allSlides.length - 1]);
  }
}

//setInterval(nextSlide, 4000);
document.getElementById("activeImage").addEventListener("load", () => {document.getElementById("activeImage").classList.remove("disp");});