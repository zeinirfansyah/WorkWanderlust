// navbar toggle button
const toggleMenu = () => {
    const menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
};

// navbar on scroll behavior: change background color
function updateNavbarStyle() {
    const navbar = document.querySelector('header');
    const isNavbarAtTop = window.scrollY === 0;
  
    navbar.style.transition = 'background-color 0.5s ease, box-shadow 0.5s ease';
  
    navbar.style.backgroundColor = isNavbarAtTop ? '#000' : '#fff';
    navbar.style.boxShadow = isNavbarAtTop ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.1)';
    navbar.style.color = isNavbarAtTop ? '#fff' : '#000';
  }
  
  window.addEventListener('scroll', updateNavbarStyle);
  updateNavbarStyle(); // Call on initial load
  
  window.addEventListener('scroll', updateNavbarStyle);
  
  updateNavbarStyle();