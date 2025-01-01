const categoriesList = document.getElementById('categoriesList');
const addCategoryBtn = document.getElementById('addCategoryBtn');
const newCategoryInput = document.getElementById('newCategory');
const backgroundInput = document.getElementById('backgroundInput');
const backgroundSizeSelect = document.getElementById('backgroundSize');
const clearBackgroundBtn = document.getElementById('clearBackgroundBtn');
const siteNameColorInput = document.getElementById('siteNameColor');
const titleInput = document.getElementById('title');
const categorySelect = document.getElementById('category');
const descriptionInput = document.getElementById('description');
const mediaInput = document.getElementById('media');
const uploadForm = document.getElementById('uploadForm');
const newsContainer = document.getElementById('newsContainer');

// استرجاع البيانات من localStorage إذا كانت موجودة
let categories = JSON.parse(localStorage.getItem('categories')) || [];
let newsItems = JSON.parse(localStorage.getItem('newsItems')) || [];
let backgroundImage = localStorage.getItem('backgroundImage') || '';
let siteNameColor = localStorage.getItem('siteNameColor') || '#ffffff';

// إدارة الأصناف
addCategoryBtn.addEventListener('click', () => {
  const newCategory = newCategoryInput.value.trim();
  if (newCategory && !categories.includes(newCategory)) {
    categories.push(newCategory);
    newCategoryInput.value = '';
    localStorage.setItem('categories', JSON.stringify(categories));
    renderCategories();
    updateCategorySelect();
  }
});

// تحديث عرض الأصناف
function renderCategories() {
  categoriesList.innerHTML = '';
  categories.forEach((category, index) => {
    const li = document.createElement('li');
    li.textContent = category;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'حذف';
    deleteBtn.addEventListener('click', () => {
      categories.splice(index, 1);
      localStorage.setItem('categories', JSON.stringify(categories));
      renderCategories();
      updateCategorySelect();
    });
    li.appendChild(deleteBtn);
    categoriesList.appendChild(li);
  });
}

// تحديث خيارات الصنف في النموذج
function updateCategorySelect() {
  categorySelect.innerHTML = '';
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}

// تغيير الخلفية
backgroundInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      backgroundImage = reader.result;
      localStorage.setItem('backgroundImage', backgroundImage);
      document.body.style.backgroundImage = `url(${backgroundImage})`;
      document.body.style.backgroundSize = backgroundSizeSelect.value;
    };
    reader.readAsDataURL(file);
  }
});

// تغيير حجم الخلفية
backgroundSizeSelect.addEventListener('change', () => {
  document.body.style.backgroundSize = backgroundSizeSelect.value;
});

// إزالة الخلفية
clearBackgroundBtn.addEventListener('click', () => {
  document.body.style.backgroundImage = '';
  localStorage.removeItem('backgroundImage');
});

// تغيير لون خانة اسم الموقع
siteNameColorInput.addEventListener('input', (e) => {
  siteNameColor = e.target.value;
  localStorage.setItem('siteNameColor', siteNameColor);
  document.querySelector('header h1').style.backgroundColor = siteNameColor;
});

// إضافة الخبر
uploadForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newNews = {
    title: titleInput.value,
    category: categorySelect.value,
    description: descriptionInput.value,
    media: Array.from(mediaInput.files).map(file => URL.createObjectURL(file)),
  };
  newsItems.push(newNews);
  localStorage.setItem('newsItems', JSON.stringify(newsItems));
  renderNews();
  uploadForm.reset();
});

// عرض الأخبار
function renderNews() {
  newsContainer.innerHTML = '';
  newsItems.forEach(news => {
    const newsDiv = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = news.title;
    const category = document.createElement('p');
    category.textContent = `الصنف: ${news.category}`;
    const description = document.createElement('p');
    description.textContent = news.description;
    const mediaContainer = document.createElement('div');
    news.media.forEach(mediaUrl => {
      const mediaElement = document.createElement('img');
      mediaElement.src = mediaUrl;
      mediaElement.alt = 'Media';
      mediaContainer.appendChild(mediaElement);
    });

    newsDiv.appendChild(title);
    newsDiv.appendChild(category);
    newsDiv.appendChild(description);
    newsDiv.appendChild(mediaContainer);
    newsContainer.appendChild(newsDiv);
  });
}

renderCategories();
updateCategorySelect();

// تطبيق التغييرات عند تحميل الصفحة
document.body.style.backgroundImage = backgroundImage ? `url(${backgroundImage})` : '';
document.body.style.backgroundSize = backgroundSizeSelect.value;
document.querySelector('header h1').style.backgroundColor = siteNameColor;
