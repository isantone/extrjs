function displayLocationValues() {
  document.getElementById("hashValue").innerHTML = location.hash;
  document.getElementById("searchValue").innerHTML = location.search;
  document.getElementById("hostnameValue").innerHTML = location.hostname;
  document.getElementById("hrefValue").innerHTML = location.href;
  document.getElementById("pathnameValue").innerHTML = location.pathname;

  var showingTooltip;
  
  document.onmouseover = function(e) {
    var target = e.target;

    var tooltip = target.getAttribute('data-tooltip');
    if (!tooltip) return;

    var tooltipElem = document.createElement('div');
    tooltipElem.className = 'tooltip';
    tooltipElem.innerHTML = tooltip;
    document.body.appendChild(tooltipElem);

    var coords = target.getBoundingClientRect();

    var left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
    if (left < 0) left = 0; // не вылезать за левую границу окна

    var top = coords.top - tooltipElem.offsetHeight - 5;
    if (top < 0) { // не вылезать за верхнюю границу окна
      top = coords.top + target.offsetHeight + 5;
    }

    tooltipElem.style.left = left + 'px';
    tooltipElem.style.top = top + 'px';

    showingTooltip = tooltipElem;
  };

  document.onmouseout = function(e) {

    if (showingTooltip) {
      document.body.removeChild(showingTooltip);
      showingTooltip = null;
    }

  };
}

displayLocationValues();