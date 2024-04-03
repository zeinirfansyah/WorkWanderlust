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

  // main background parallax effect
window.addEventListener('scroll', function() {
    let scroll = window.scrollY;
    let parallax = document.getElementById('hero');
    parallax.style.backgroundPositionY = scroll / 1.5 + 'px';
});

// Smooth scroll behavior when clicking on link id
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
  
      const targetElement = document.querySelector(this.getAttribute('href'));
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
  

  // fetch data
const fetchData = async () => {
    try {
      // Display loading message or spinner
      const jobContainer = document.getElementById("job-container");
      jobContainer.innerHTML = `
      <div class="h-screen flex justify-center items-center">
        <img src="./assets/loading.gif" />
      </div>`;
  
      const response = await fetch("https://jobicy.com/api/v2/remote-jobs");
      const {jobs} = await response.json();
  
      // Hide loading message or spinner and display the data
      displayJob(jobs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const displayJob = (jobList) => {
    const jobContainer = document.getElementById("job-container");
  
    jobContainer.innerHTML = jobList.map(job => `
    <div class="job p-4 border border-gray-300 rounded-md shadow-sm flex flex-col justify-center items-center bg-slate-400">
    
      <div id="desc">
        <h1>Judul: ${job.jobTitle}</h1>
      </div>
    </div>
    `).join('')
  }
  
  fetchData();