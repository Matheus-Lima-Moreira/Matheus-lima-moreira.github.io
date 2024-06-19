let portfolioItems;

fetch("./assets/js/data.json")
  .then((response) => response.json())
  .then((value) => {
    portfolioItems = value;
    initializePortfolioLightbox();
  })
  .catch((error) => console.error("Error loading the portfolio items:", error));

function initializePortfolioLightbox() {
  const portfolioDetailsLightbox = GLightbox({
    selector: ".portfolio-details-lightbox",
    width: "90%",
    height: "90vh",
  });

  portfolioDetailsLightbox.on("slide_before_change", ({ prev, current }) => {
    setTimeout(() => {
      const index = current.index;
      const iframe = portfolioDetailsLightbox.activeSlide.querySelector("iframe").contentDocument.querySelector("#portfolio-details");
      const portfolioItem = portfolioItems[index];

      iframe.querySelector("#portfolio-title").innerHTML = portfolioItem.title;
      iframe.querySelector("#technologies").innerHTML = portfolioItem.technologies;
      iframe.querySelector("#link").setAttribute("href", portfolioItem.link);
      iframe.querySelector("#link").innerHTML = portfolioItem.link;
      iframe.querySelector("#description").innerHTML = portfolioItem.description;
      iframe.querySelector("#github").setAttribute("href", portfolioItem.github);
      iframe.querySelector("#github").innerHTML = portfolioItem.github;

      const imageItemModel = iframe.querySelector("#imageTemplate");
      portfolioItem.images.forEach((image, index) => {
        const imageItem = document.importNode(imageItemModel.content, true);
        imageItem.querySelector("img").setAttribute("src", image);
        imageItem.querySelector("img").setAttribute("width", "100%");
        imageItem.querySelector("img").setAttribute("height", "auto");
        iframe.querySelector("#images").appendChild(imageItem);
      });
    }, 100);
  });

  portfolioDetailsLightbox.on("slide_after_load", (data) => {
    const { slideIndex, slideNode, slideConfig, player, trigger } = data;
    const iframe = slideNode.querySelector("iframe").contentDocument.querySelector("#portfolio-details");
    const portfolioItem = portfolioItems[slideIndex];

    iframe.querySelector("#portfolio-title").innerHTML = portfolioItem.title;
    iframe.querySelector("#technologies").innerHTML = portfolioItem.technologies;
    iframe.querySelector("#link").setAttribute("href", portfolioItem.link);
    iframe.querySelector("#link").innerHTML = portfolioItem.link;
    iframe.querySelector("#description").innerHTML = portfolioItem.description;
    iframe.querySelector("#github").setAttribute("href", portfolioItem.github);
    iframe.querySelector("#github").innerHTML = portfolioItem.github;

    const imageItemModel = iframe.querySelector("#imageTemplate");
    portfolioItem.images.forEach((image, index) => {
      const imageItem = document.importNode(imageItemModel.content, true);
      imageItem.querySelector("img").setAttribute("src", image);
      imageItem.querySelector("img").setAttribute("width", "100%");
      imageItem.querySelector("img").setAttribute("height", "auto");
      iframe.querySelector("#images").appendChild(imageItem);
    });
  });
}

/**
* Template Name: Personal
* Updated: Mar 10 2023 with Bootstrap v5.2.3
  /**
   * Easy selector helper function
   */
const select = (el, all = false) => {
  el = el.trim();
  if (all) {
    return [...document.querySelectorAll(el)];
  } else {
    return document.querySelector(el);
  }
};

/**
 * Easy event listener function
 */
const on = (type, el, listener, all = false) => {
  let selectEl = select(el, all);

  if (selectEl) {
    if (all) {
      selectEl.forEach((e) => e.addEventListener(type, listener));
    } else {
      selectEl.addEventListener(type, listener);
    }
  }
};

/**
 * Scrolls to an element with header offset
 */
const scrollto = (el) => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

/**
 * Mobile nav toggle
 */
on("click", ".mobile-nav-toggle", function (e) {
  select("#navbar").classList.toggle("navbar-mobile");
  this.classList.toggle("bi-list");
  this.classList.toggle("bi-x");
});

/**
 * Scrool with ofset on links with a class name .scrollto
 */
on(
  "click",
  "#navbar .nav-link",
  function (e) {
    let section = select(this.hash);
    if (section) {
      e.preventDefault();

      let navbar = select("#navbar");
      let header = select("#header");
      let sections = select("section", true);
      let navlinks = select("#navbar .nav-link", true);

      navlinks.forEach((item) => {
        item.classList.remove("active");
      });

      this.classList.add("active");

      if (navbar.classList.contains("navbar-mobile")) {
        navbar.classList.remove("navbar-mobile");
        let navbarToggle = select(".mobile-nav-toggle");
        navbarToggle.classList.toggle("bi-list");
        navbarToggle.classList.toggle("bi-x");
      }

      if (this.hash == "#header") {
        header.classList.remove("header-top");
        sections.forEach((item) => {
          item.classList.remove("section-show");
        });
        return;
      }

      if (!header.classList.contains("header-top")) {
        header.classList.add("header-top");
        setTimeout(function () {
          sections.forEach((item) => {
            item.classList.remove("section-show");
          });
          section.classList.add("section-show");
        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove("section-show");
        });
        section.classList.add("section-show");
      }

      scrollto(this.hash);
    }
  },
  true
);

/**
 * Activate/show sections on load with hash links
 */
window.addEventListener("load", () => {
  if (window.location.hash) {
    let initial_nav = select(window.location.hash);

    if (initial_nav) {
      let header = select("#header");
      let navlinks = select("#navbar .nav-link", true);

      header.classList.add("header-top");

      navlinks.forEach((item) => {
        if (item.getAttribute("href") == window.location.hash) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });

      setTimeout(function () {
        initial_nav.classList.add("section-show");
      }, 350);

      scrollto(window.location.hash);
    }
  }
});

/**
 * Skills animation
 */
let skilsContent = select(".skills-content");
if (skilsContent) {
  new Waypoint({
    element: skilsContent,
    offset: "80%",
    handler: function (direction) {
      let progress = select(".progress .progress-bar", true);
      progress.forEach((el) => {
        el.style.width = el.getAttribute("aria-valuenow") + "%";
      });
    },
  });
}

/**
 * Testimonials slider
 */
new Swiper(".testimonials-slider", {
  speed: 600,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  slidesPerView: "auto",
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },

    1200: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
});

/**
 * Porfolio isotope and filter
 */
window.addEventListener("load", () => {
  let portfolioContainer = select(".portfolio-container");
  if (portfolioContainer) {
    let portfolioIsotope = new Isotope(portfolioContainer, {
      itemSelector: ".portfolio-item",
      layoutMode: "fitRows",
    });

    let portfolioFilters = select("#portfolio-flters li", true);

    on(
      "click",
      "#portfolio-flters li",
      function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove("filter-active");
        });
        this.classList.add("filter-active");

        portfolioIsotope.arrange({
          filter: function (el) {
            const categories = el.querySelector(".portfolio-filter").innerText.trim().toUpperCase();
            const filterActive = document.querySelector("#portfolio-flters li.filter-active").innerText.trim().toUpperCase();

            if (filterActive == "ALL") return true;

            return categories.includes(filterActive);
          },
        });
      },
      true
    );
  }
});

/**
 * Initiate portfolio lightbox
 */
const portfolioLightbox = GLightbox({
  selector: ".portfolio-lightbox",
});

/**
 * Portfolio details slider
 */
new Swiper(".portfolio-details-slider", {
  speed: 400,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },
});

/**
 * Initiate Pure Counter
 */
new PureCounter();
