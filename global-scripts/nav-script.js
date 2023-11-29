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
    const menu = document.querySelector('#menu');
    const navbar = document.querySelector('.navbar');
    let timeout;

    function flyOutHeader() {
        header.style.transform = 'translateY(-98.5%)';
        header.style.transition = 'transform 1s ease';
    }

    function flyInHeader() {
        header.style.transform = 'translateY(0)';
        header.style.transition = 'transform 0.5s ease';
    }

    function resetTimeout() {
        clearTimeout(timeout);
        timeout = setTimeout(flyOutHeader, 3000);
    }

    function handleMouseMove(event) {
        const isMouseOverHeader = event.clientY <= header.clientHeight + 20;

        if (isMouseOverHeader) {
            flyInHeader();
            resetTimeout();
        } else {
            flyOutHeader();
        }
    }

    function handleScroll() {
        if (window.scrollY <= 50) {
            flyInHeader();
            resetTimeout();
        } else {
            flyOutHeader();
        }
    }

    function closeMenu() {
        navbar.classList.remove('open');
        menu.classList.remove('hover-effect');
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('scroll', handleScroll);

    header.addEventListener('mouseenter', function () {
        flyInHeader();
    });

    header.addEventListener('mouseleave', function () {
        resetTimeout();
    });

    menu.addEventListener('click', function () {
        navbar.classList.toggle('open');
        menu.classList.toggle('hover-effect', navbar.classList.contains('open'));
    });

    document.addEventListener('click', function (event) {
        if (!navbar.contains(event.target) && event.target !== menu) {
            closeMenu();
        }
    });

    resetTimeout();
});