function changeView() {
  //let allDomElementsArray;
  let allDomElements;
  allDomElements = document.getElementsByClassName("product");

  [].forEach.call(allDomElements, function(domElement){
    domElement.classList.toggle("product_grid");
  });

  allDomElements = document.getElementsByClassName("product__wrapper");

  [].forEach.call(allDomElements, function(domElement){
    domElement.classList.toggle("product__wrapper_grid");
  });

  allDomElements = document.getElementsByClassName("product__description");

  [].forEach.call(allDomElements, function(domElement){
    domElement.classList.toggle("product__description_grid");
  });
}