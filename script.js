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

const updateLayout = () => {
  imagesLoaded++;
  if (imagesLoaded === images.length) {
    masonry.layout();
  }
};

images.forEach((image) => {
  if (image.complete) {
    updateLayout();
  } else {
    image.addEventListener("load", updateLayout);
  }
});
