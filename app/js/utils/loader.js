  // loading the page
  
  const mainLayout = document.querySelector(".layout");
  mainLayout.classList.add("hidden");
  
  const loader = document.querySelector(".loader");

  // Removing loader and adding the page content
  function showLayout() {
    mainLayout.classList.remove("hidden");
    loader.style = "display: none;";
  }
  
  // The timeout set on the loading
  setTimeout(() => {
    showLayout();
  }, 3500); // set to 5000 before release
  