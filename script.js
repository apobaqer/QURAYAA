// تحميل الأخبار والأصناف عند فتح الصفحة
document.addEventListener("DOMContentLoaded", () => {
  // تحميل الخلفية
  const savedBackground = JSON.parse(localStorage.getItem("background"));
  if (savedBackground) {
    document.body.style.backgroundImage = `url(${savedBackground.imageUrl})`;
    document.body.style.backgroundSize = savedBackground.size;
  }

  // تحميل لون خانة اسم الموقع
  const savedColor = localStorage.getItem("siteNameColor");
  if (savedColor) {
    document.getElementById("site-name").style.color = savedColor;
  }

  // تحميل الأصناف
  loadCategories();

  // تحميل الأخبار
  loadNews();
});

// تحميل الأصناف
function loadCategories() {
  const categories = JSON.parse(localStorage.getItem("categories")) || ["محلية", "عالمية", "رياضة", "ثقافة"];
  const categoryFilter = document.getElementById("categoryFilter");

  categoryFilter.innerHTML = "";
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// تحميل الأخبار
function loadNews() {
  const news = JSON.parse(localStorage.getItem("news")) || [];
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