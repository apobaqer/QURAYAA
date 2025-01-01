const categoriesList = document.getElementById("categoriesList");
const addCategoryBtn = document.getElementById("addCategoryBtn");
const newCategoryInput = document.getElementById("newCategory");
const backgroundInput = document.getElementById("backgroundInput");
const backgroundSizeSelect = document.getElementById("backgroundSize");
const clearBackgroundBtn = document.getElementById("clearBackgroundBtn");
const siteNameColorInput = document.getElementById("siteNameColor");
const titleInput = document.getElementById("title");
const categorySelect = document.getElementById("category");
const descriptionInput = document.getElementById("description");
const mediaInput = document.getElementById("media");
const uploadForm = document.getElementById("uploadForm");
const newsContainerAdmin = document.getElementById("newsContainerAdmin");

let categories = JSON.parse(localStorage.getItem("categories")) || [];
let newsItems = JSON.parse(localStorage.getItem("newsItems")) || [];

// إضافة صنف جديد
addCategoryBtn.addEventListener("click", () => {
  const newCategory = newCategoryInput.value.trim();
  if (newCategory && !categories.includes(newCategory)) {
    categories.push(newCategory);
    localStorage.setItem("categories", JSON.stringify(categories));
    loadCategories();
    newCategoryInput.value = ""; // Clear input field
  }
});

// تحميل الأصناف
function loadCategories() {
  categoriesList.innerHTML = "";
  categories.forEach((category) => {
    const listItem = document.createElement("li");
    listItem.textContent = category;
    categoriesList.appendChild(listItem);
  });
}

// تحميل الخلفية
backgroundInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onloadend = () => {
    document.body.style.backgroundImage = `url(${reader.result})`;
    document.body.style.backgroundSize = backgroundSizeSelect.value;
  };
  if (file) {
    reader.readAsDataURL(file);
  }
});

// إزالة الخلفية
clearBackgroundBtn.addEventListener("click", () => {
  document.body.style.backgroundImage = "";
});

// نشر الخبر
uploadForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newNewsItem = {
    title: titleInput.value,
    category: categorySelect.value,
    description: descriptionInput.value,
    media: Array.from(mediaInput.files).map((file) => URL.createObjectURL(file)),
  };

  newsItems.push(newNewsItem);
  localStorage.setItem("newsItems", JSON.stringify(newsItems));

  // Clear form after submission
  titleInput.value = "";
  categorySelect.value = "";
  descriptionInput.value = "";
  mediaInput.value = "";

  loadNews();
});

// تحميل الأخبار المنشورة في صفحة الإعدادات
function loadNews() {
  newsContainerAdmin.innerHTML = "";
  newsItems.forEach((newsItem, index) => {
    const newsElement = document.createElement("div");
    newsElement.classList.add("news-item-admin");

    const title = document.createElement("h3");
    title.textContent = newsItem.title;
    newsElement.appendChild(title);

    const description = document.createElement("p");
    description.textContent = newsItem.description;
    newsElement.appendChild(description);

    newsItem.media.forEach((file) => {
      const media = document.createElement("img");
      media.src = file;
      newsElement.appendChild(media);
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "حذف الخبر";
    deleteButton.addEventListener("click", () => {
      newsItems.splice(index, 1);
      localStorage.setItem("newsItems", JSON.stringify(newsItems));
      loadNews();
    });

    newsElement.appendChild(deleteButton);
    newsContainerAdmin.appendChild(newsElement);
  });
}

loadNews();
