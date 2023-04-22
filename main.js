function main() {
  const gridItems = document.querySelectorAll(".grid-item");
  const cursor = document.querySelector(".custom-cursor");

  gridItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      document.body.classList.add("custom-cursor-enabled");
    });

    item.addEventListener("mouseleave", () => {
      document.body.classList.remove("custom-cursor-enabled");
    });
  });

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.pageX + "px";
    cursor.style.top = e.pageY + "px";
    const gridItemHovered = document.elementsFromPoint(e.clientX, e.clientY).some((element) => element.classList.contains("grid-item"));
    cursor.style.display = gridItemHovered ? "block" : "none";
  });

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
        animateGridItems();
        masonry.layout();
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

  animateHeader();
}

const gridItems = document.querySelectorAll(".grid-item");

function animateFullScreen(originalImg, initialRect) {
  const img = originalImg.cloneNode(true);
  const imgAspectRatio = img.naturalWidth / img.naturalHeight;

  let targetWidth = window.innerWidth;
  let targetHeight = targetWidth / imgAspectRatio;

  if (targetHeight > window.innerHeight) {
    targetHeight = window.innerHeight;
    targetWidth = targetHeight * imgAspectRatio;
  }

  gsap.set(img, {
    x: initialRect.left,
    y: initialRect.top,
    width: initialRect.width,
    height: initialRect.height,
    position: "fixed",
    objectFit: "contain",
    zIndex: 9999,
  });

  gsap.to(img, {
    x: (window.innerWidth - targetWidth) / 2,
    y: (window.innerHeight - targetHeight) / 2,
    width: targetWidth,
    height: targetHeight,
    duration: 0.5,
    ease: "power2.out",
  });

  const removeFullScreen = (e) => {
    if (e) {
      e.stopPropagation();
    }
    gsap.to(img, {
      x: initialRect.left,
      y: initialRect.top,
      width: initialRect.width,
      height: initialRect.height,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        document.body.removeChild(img);
        document.body.classList.remove("no-scroll");
        gsap.set(img, { clearProps: "all" });
      },
    });
  };

  document.addEventListener("click", removeFullScreen);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      removeFullScreen(e);
    }
  });
}

function resetGridItems() {
  const gridItems = document.querySelectorAll(".grid-item img");
  gridItems.forEach((item) => {
    gsap.set(item, { clearProps: "all" });
  });
}

function handleLongPress(e, item) {
  e.preventDefault();
  const img = item.querySelector("img");
  const initialRect = img.getBoundingClientRect();
  const imgCopy = img.cloneNode();

  imgCopy.classList.add("full-screen");
  document.body.appendChild(imgCopy);

  animateFullScreen(imgCopy, initialRect);

  const removeFullScreen = () => {
    gsap.to(imgCopy, {
      x: initialRect.left,
      y: initialRect.top,
      width: initialRect.width,
      height: initialRect.height,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        document.body.removeChild(imgCopy);
        gsap.set(imgCopy, { clearProps: "all" });
        resetGridItems();
      },
    });
  };

  const endEvent = () => {
    removeFullScreen();
  };

  imgCopy.addEventListener("mouseup", endEvent);
  imgCopy.addEventListener("touchend", endEvent);
  imgCopy.addEventListener("touchcancel", endEvent);
}

gridItems.forEach((item) => {
  let timer;

  const startEvent = (e) => {
    timer = setTimeout(() => handleLongPress(e, item), 200);
  };

  const endEvent = (e) => {
    clearTimeout(timer);
  };

  // Mouse events
  item.addEventListener("mousedown", startEvent);
  item.addEventListener("mouseup", endEvent);
  item.addEventListener("mouseleave", endEvent);

  // Touch events
  item.addEventListener("touchstart", startEvent);
  item.addEventListener("touchend", endEvent);
  item.addEventListener("touchcancel", endEvent);
});
