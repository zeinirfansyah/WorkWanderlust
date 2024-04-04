// navbar toggle button
const toggleMenu = () => {
  const menu = document.getElementById("menu");
  menu.classList.toggle("hidden");
};

// navbar on scroll behavior: change background color
function updateNavbarStyle() {
  const navbar = document.querySelector("header");
  const isNavbarAtTop = window.scrollY === 0;

  navbar.style.transition = "background-color 0.5s ease, box-shadow 0.5s ease";

  navbar.style.backgroundColor = isNavbarAtTop ? "#000" : "#fff";
  navbar.style.boxShadow = isNavbarAtTop
    ? "none"
    : "0 2px 4px rgba(0, 0, 0, 0.1)";
  navbar.style.color = isNavbarAtTop ? "#fff" : "#000";
}

window.addEventListener("scroll", updateNavbarStyle);
updateNavbarStyle(); // Call on initial load

window.addEventListener("scroll", updateNavbarStyle);

updateNavbarStyle();

// main background parallax effect
window.addEventListener("scroll", function () {
  let scroll = window.scrollY;
  let parallax = document.getElementById("hero");
  parallax.style.backgroundPositionY = scroll / 1.5 + "px";
});

// Smooth scroll behavior when clicking on link id
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetElement = document.querySelector(this.getAttribute("href"));
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
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
    const { jobs } = await response.json();

    // Hide loading message or spinner and display the data
    displayJob(jobs);
    displayFilter(jobs);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const displayJob = (jobList) => {
  const jobContainer = document.getElementById("job-container");
  const likedJobs = JSON.parse(localStorage.getItem('likedJobs')) || [];

  jobContainer.innerHTML = jobList
    .map(
      (job) => `
      <div class="job p-4 border border-gray-300 rounded-md shadow-sm flex flex-col justify-center items-center ${likedJobs.includes(job.id) ? 'bg-blue-100 border-blue-500' : ''}">
      <div id="desc" class="flex flex-row gap-3 items-center">
          <img
          src="${job.companyLogo}"
          alt="${job.companyName}"
          class="hidden md:flex w-[120px] h-[120px] object-cover rounded-full" 
          />
        <div class="">
          <div class="flex flex-row justify-between items-center gap-2">
           <a href="${job.url}" target="_blank" class="text-xl font-bold"><p class="hover:text-blue-400 transition-all duration-500">${job.jobTitle}</p></a>
            <button class="like-btn px-4 py-2 border" onclick="saveLikedJob('${job.id}', this)">${likedJobs.includes(job.id) ? 'Liked' : 'Like'}</button>
          </div>
          <h2 class="xl">${job.companyName}</h2>
          <span class="px-2 rounded bg-gray-200 my-2 text-sm">
            ${job.jobType}
          </span>
          <p class="text-sm text-gray-800">${job.jobExcerpt}</p>
        </div>
      </div>
    </div>
    `
    )
    .join("");
};




const displayFilter = (filter) => {
  const filterContainer = document.getElementById("filter-container");
  
  const uniqueJobGeos = new Set();
  filter.forEach(f => uniqueJobGeos.add(f.jobGeo));

  const optionsHTML = Array.from(uniqueJobGeos)
    .map(
      (jobGeo) => `
    <option value="${jobGeo}">${jobGeo}</option>
    `
    )
    .join("");

  filterContainer.innerHTML = optionsHTML;

  // Add event listener for filtering
  filterContainer.addEventListener("change", () => {
    const selectedGeo = filterContainer.value;
    const filteredJobs = filter.filter(job => job.jobGeo === selectedGeo);
    displayJob(filteredJobs);
  });
}

const searchJobs = () => {
  const searchInput = document.getElementById("search-input");
  const searchTerm = searchInput.value.toLowerCase();
  const jobTitles = document.querySelectorAll("#job-container a h1");

  jobTitles.forEach(title => {
    const jobTitle = title.textContent.toLowerCase();
    const jobContainer = title.parentElement.parentElement.parentElement;

    if (jobTitle.includes(searchTerm)) {
      jobContainer.style.display = "block";
    } else {
      jobContainer.style.display = "none";
    }
  });
}

fetchData();

// Add event listener for search input
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", searchJobs);

// like feature (local storage implementation)
const saveLikedJob = (jobId, button) => {
  let likedJobs = JSON.parse(localStorage.getItem('likedJobs')) || [];

  // Check if the job is already saved as liked
  if (!likedJobs.includes(jobId)) {
    // If not, add the job ID to the list of liked jobs
    likedJobs.push(jobId);

    // Update the local storage with the new list of liked jobs
    localStorage.setItem('likedJobs', JSON.stringify(likedJobs));

    // Change the button text to "Liked"
    button.textContent = 'Liked';
    button.style.color = '#0070f3';
  }
};



// Function to update the countdown timer (math implementation)
function updateCountdown() {
  const now = new Date();
  const targetDate = new Date('2025-01-01T00:00:00');

  const timeDifference = targetDate - now;

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  const countdownDiv = document.getElementById('countdown');
  countdownDiv.innerHTML = `<p class="text-center"> Countdown to 2025:<br>${days} days ${hours} hours ${minutes} minutes ${seconds} seconds </p>`;
}

// Function to display the date and time in WIB timezone (date implementation)
function updateClock() {
  const now = new Date();
  const jakartaTime = now.toLocaleString('en-US', {
    timeZone: 'Asia/Jakarta',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  });
  const jakartaDate = now.toLocaleDateString('en-US', {
    timeZone: 'Asia/Jakarta',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const clockDiv = document.getElementById('clock');
  clockDiv.textContent = `${jakartaDate} - ${jakartaTime}`;
}

// Update the countdown and clock immediately and start the intervals
updateCountdown();
updateClock();
setInterval(updateCountdown, 1000);
setInterval(updateClock, 1000);