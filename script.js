// تحميل الأخبار والأصناف عند فتح الصفحة
document.addEventListener("DOMContentLoaded", () => {
  loadNews();
  loadCategories();
});

// تحميل الأخبار
function loadNews() {
  const news = JSON.parse(localStorage.getItem("newsItems")) || [];
  const newsContainer = document.getElementById("newsContainer");

  newsContainer.innerHTML = "";
  news.forEach((newsItem) => {
    const newsElement = document.createElement("div");
    newsElement.classList.add("news-item");

    const title = document.createElement("h3");
    title.textContent = newsItem.title;
    newsElement.appendChild(title);

    const description = document.createElement("p");
    description.textContent = newsItem.description;
    newsElement.appendChild(description);

    if (newsItem.media.length > 0) {
      newsItem.media.forEach((file) => {
        const mediaElement = document.createElement("div");
        const media = document.createElement("img");
        media.src = file;
        mediaElement.appendChild(media);
        newsElement.appendChild(mediaElement);
      });
    }

    newsContainer.appendChild(newsElement);
  });
}

// تحميل الأصناف
function loadCategories() {
  const categories = JSON.parse(localStorage.getItem("categories")) || [];
  const categoryFilter = document.getElementById("categoryFilter");

  categoryFilter.innerHTML = "";
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}
