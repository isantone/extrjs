import forEach from 'lodash/forEach';

function changeView() {
  //let allDomElementsArray;
  let allDomElements;
  allDomElements = document.getElementsByClassName("product");

  // [].forEach.call(allDomElements, function(domElement){
  //   domElement.classList.toggle("product_grid");
  // });

  /*_.*/forEach(allDomElements, function(domElement) {
    domElement.classList.toggle("product_grid");
  });

  allDomElements = document.getElementsByClassName("product__wrapper");

  /*_.*/forEach(allDomElements, function(domElement) {
    domElement.classList.toggle("product__wrapper_grid");
  });

  allDomElements = document.getElementsByClassName("product__description");

  /*_.*/forEach(allDomElements, function(domElement) {
    domElement.classList.toggle("product__description_grid");
  });
}

export default changeView;