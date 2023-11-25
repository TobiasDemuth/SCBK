document.addEventListener('DOMContentLoaded', function() {
  let menu = document.querySelector('#menu');
  let navbar = document.querySelector('.navbar');

  menu.onclick = () => {
      navbar.classList.toggle('open');
      menu.classList.toggle('hover-effect', navbar.classList.contains('open'));
  }
});