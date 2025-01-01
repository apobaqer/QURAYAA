document.addEventListener('DOMContentLoaded', () => {
  const savedBackground = JSON.parse(localStorage.getItem('background'));
  if (savedBackground) {
    document.body.style.backgroundImage = `url(${savedBackground.imageUrl})`;
    document.body.style.backgroundSize = savedBackground.size;
  }

  const categories = JSON.parse(localStorage.getItem('categories')) || [];
  const categoryFilter = document.getElementById('categoryFilter');
  const newsContainer = document.getElementById('newsContainer');
  const newsItems = JSON.parse(localStorage.getItem('newsItems')) || [];

  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  function renderNews(filter = 'all') {
    newsContainer.innerHTML = '';
    newsItems.forEach(news => {
      if (filter === 'all' || news.category === filter) {
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `<h3>${news.title}</h3><p>${news.description}</p>`;
        newsContainer.appendChild(newsDiv);
      }
    });
  }

  categoryFilter.addEventListener('change', () => {
    renderNews(categoryFilter.value);
  });

  renderNews();
});
