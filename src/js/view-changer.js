export default function changeView() {
  let allDomElements;

  allDomElements = document.getElementsByClassName("product");

  [].forEach.call(allDomElements, (domElement) => {
    domElement.classList.toggle("product_grid");
  });

  allDomElements = document.getElementsByClassName("product__wrapper");

  [].forEach.call(allDomElements, (domElement) => {
    domElement.classList.toggle("product__wrapper_grid");
  });

  allDomElements = document.getElementsByClassName("product__description");

  [].forEach.call(allDomElements, (domElement) => {
    domElement.classList.toggle("product__description_grid");
  });
}