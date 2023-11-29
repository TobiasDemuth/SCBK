document.addEventListener('DOMContentLoaded', function() {
  let menu = document.querySelector('#menu');
  let navbar = document.querySelector('.navbar');

  menu.onclick = () => {
      navbar.classList.toggle('open');
      menu.classList.toggle('hover-effect', navbar.classList.contains('open'));
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector('header');

  function flyOutHeader() {
      header.style.transform = 'translateY(-98.5%)';
      header.style.transition = 'transform 1s ease';
  }

  function flyInHeader() {
      header.style.transform = 'translateY(0)';
      header.style.transition = 'transform 0.5s ease';
  }

  function handleMouseMove(event) {
      const isMouseOverHeader = event.clientY <= header.clientHeight +20;

      if (isMouseOverHeader) {
          flyInHeader();
      } else {
          flyOutHeader();
      }
  }

  function handleScroll() {
      if (window.scrollY == 0) {
          flyInHeader();
      } else {
          flyOutHeader();
      }
  }

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('scroll', handleScroll);

  header.addEventListener('mouseenter', function () {
      flyInHeader();
  });

  header.addEventListener('mouseleave', function () {
      flyOutHeader();
  });
});