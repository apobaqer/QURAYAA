document.addEventListener('DOMContentLoaded', () => {
  // عرض الخلفية
  const savedBackground = JSON.parse(localStorage.getItem('background'));
  if (savedBackground) {
    document.body.style.backgroundImage = `url(${savedBackground.imageUrl})`;
    document.body.style.backgroundSize = savedBackground.size;
  }

  // عرض الأخبار
  const categoryFilter = document.getElementById('categoryFilter');
  const newsContainer = document.getElementById('newsContainer');
  const newsItems = JSON.parse(localStorage.getItem('newsItems')) || [];

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
