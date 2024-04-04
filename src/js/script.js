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

  jobContainer.innerHTML = jobList
    .map(
      (job) => `
    <a href="${job.url}" target="_blank">
      <div class="job p-4 border border-gray-300 rounded-md shadow-sm flex flex-col justify-center items-center ">
        <div id="desc" class="flex flex-row gap-3 items-center">
            <img src="${job.companyLogo}" alt="logo" class="hidden md:flex md:w-[120px] md:h-[120px]">
          <div class="">
            <h1 class="text-2xl">${job.jobTitle}</h1>
            <h2 class="xl">${job.companyName}</h2>
            <span class="px-2 rounded bg-gray-200 my-2 text-sm">
              ${job.jobType}
            </span>
            <p class="text-sm text-gray-800">${job.jobExcerpt}</p>
          </div>
        </div>
      </div>
    </a>
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
