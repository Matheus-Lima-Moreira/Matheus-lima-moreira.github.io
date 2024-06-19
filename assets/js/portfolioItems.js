import portfolioItems from './data.json'

const portfolioItemModel = document.querySelector('#portfolio-item');
portfolioItems.forEach(project => {
  const portfolioItem = document.importNode(portfolioItemModel.content, true);
  portfolioItem.querySelector('.portfolio-img').src = project.image;
  portfolioItem.querySelector('.portfolio-title').innerHTML = project.title;

  if(typeof project.category === 'array') {
    let category = '';
    project.category.forEach((item, index) => {
      category += item;
      if(index < project.category.length - 1) {
        category += ', ';
      }
    });
    portfolioItem.querySelector('.portfolio-filter').innerHTML = category;
  } else {
    portfolioItem.querySelector('.portfolio-filter').innerHTML = project.category;
  }

  portfolioItem.querySelector('.portfolio-item').classList.add(`filter-${project.category}`);
  portfolioItem.querySelector('.portfolio-links .portfolioGallery').setAttribute('href', project.image);
  portfolioItem.querySelector('.portfolio-links .portfolioGallery').setAttribute('title', project.title);
  document.querySelector('.portfolio-container').appendChild(portfolioItem);
});