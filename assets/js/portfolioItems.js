async function loadPortfolioItems() {
  try {
    const response = await fetch('./assets/js/data.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const portfolioItems = await response.json();

    const portfolioItemModel = document.querySelector('#portfolio-item');
    portfolioItems.forEach(project => {
      const portfolioItem = document.importNode(portfolioItemModel.content, true);
      portfolioItem.querySelector('.portfolio-img').src = project.image;
      portfolioItem.querySelector('.portfolio-title').innerText = project.title;

      if (Array.isArray(project.category)) {
        portfolioItem.querySelector('.portfolio-filter').innerText = project.category.join(', ');
      } else {
        portfolioItem.querySelector('.portfolio-filter').innerText = project.category;
      }

      portfolioItem.querySelector('.portfolio-item').classList.add(`filter-${project.category}`);
      portfolioItem.querySelector('.portfolio-links .portfolioGallery').setAttribute('href', project.image);
      portfolioItem.querySelector('.portfolio-links .portfolioGallery').setAttribute('title', project.title);
      document.querySelector('.portfolio-container').appendChild(portfolioItem);
    });
  } catch (error) {
    console.error('Failed to load portfolio items:', error);
  }
}

loadPortfolioItems();
