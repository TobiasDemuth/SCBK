document.addEventListener('click', function (event) {
    var menu = document.querySelector('.menu');
    if (!menu.contains(event.target)) {
      var submenu = menu.querySelector('.submenu');
      submenu.style.maxHeight = 0;
    }
  });