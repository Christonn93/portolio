let observerOptions = {
    rootMargin: "-49%",
    threshold: 0
  };
  
  var observer = new IntersectionObserver(observerCallback, observerOptions);
  
  function observerCallback(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("Intersecting with " + entry.target.id);
        let targetNav = document.getElementById(entry.target.id + "-nav");
        targetNav.classList.add("active");
      } else {
        let targetNav = document.getElementById(entry.target.id + "-nav");
        targetNav.classList.remove("active");
      }
    });
  }
  
  let target = ".section";
  document.querySelectorAll(target).forEach((i) => {
    if (i) {
      observer.observe(i);
    }
  });
  