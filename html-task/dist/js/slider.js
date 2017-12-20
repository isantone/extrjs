function setActive(slide) {
  document.getElementsByClassName("slider__preview-image_active")[0].classList.remove("slider__preview-image_active");

  slide.classList.add("slider__preview-image_active");

  document.getElementsByClassName("slider__big-image")[0].src = slide.src.slice(0, -6) + ".jpg";
}

function nextSlide() {
  let activeSlide = document.getElementsByClassName("slider__preview-image_active")[0];

  let allSlidesCol = document.getElementsByClassName("slider__preview-image");
  let allSlides = [].slice.call(allSlidesCol);

  let indexOfActiveSlide = allSlides.indexOf(activeSlide);

  if (++indexOfActiveSlide < allSlides.length) {
    setActive(allSlides[indexOfActiveSlide]);
  }
  else {
    setActive(allSlides[0]);
  }
}

function previousSlide() {
  let activeSlide = document.getElementsByClassName("slider__preview-image_active")[0];

  let allSlidesCol = document.getElementsByClassName("slider__preview-image");
  let allSlides = [].slice.call(allSlidesCol);

  let indexOfActiveSlide = allSlides.indexOf(activeSlide);

  if (indexOfActiveSlide > 0) {
    setActive(allSlides[indexOfActiveSlide - 1]);
  }
  else {
    setActive(allSlides[allSlides.length - 1]);
  }
}