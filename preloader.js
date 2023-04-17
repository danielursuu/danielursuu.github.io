document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const percentageElem = document.getElementById("percentage");

  let currentPercentage = 0;

  const updatePercentage = () => {
    if (currentPercentage < 100) {
      currentPercentage++;
      percentageElem.textContent = currentPercentage;
      requestAnimationFrame(updatePercentage);
    } else {
      preloader.style.opacity = "0";
      preloader.style.visibility = "hidden";
      showPage();
    }
  };

  updatePercentage();
});
