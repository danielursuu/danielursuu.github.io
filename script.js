let colWidth = document.querySelector(".grid-item").clientWidth;

window.onresize = function () {
  colWidth = document.querySelector(".grid-item").clientWidth;
};

const masonryOptions = {
  itemSelector: ".grid-item",
  columnWidth: ".grid-item",
  gutter: 15,
  fitWidth: true,
};

const grid = document.querySelector(".grid");
const masonry = new Masonry(grid, masonryOptions);

const images = grid.querySelectorAll("img");
let imagesLoaded = 0;

images.forEach((image) => {
  const updateLayout = () => {
    imagesLoaded++;
    if (imagesLoaded === images.length) {
      masonry.layout();
      animateGridItems();
    }
  };

  if (image.complete) {
    updateLayout();
  } else {
    image.addEventListener("load", updateLayout);
  }
});

function animateGridItems() {
  const gridItems = grid.querySelectorAll(".grid-item");
  gsap.set(gridItems, { autoAlpha: 0 });
  gsap.to(gridItems, {
    autoAlpha: 1,
    duration: 1,
    stagger: 0.15,
    ease: "power2.out",
  });
}

function animateHeader() {
  const header = document.querySelector("header");
  gsap.from(header, {
    y: -50,
    autoAlpha: 0,
    duration: 1,
    ease: "power2.out",
  });
}

// Call the animateHeader function to animate the header
animateHeader();
