const backgroundInput = document.getElementById('backgroundInput');
const backgroundSizeSelect = document.getElementById('backgroundSize');
const clearBackgroundBtn = document.getElementById('clearBackgroundBtn');
const categoriesList = document.getElementById('categoriesList');
const addCategoryBtn = document.getElementById('addCategoryBtn');
const newCategoryInput = document.getElementById('newCategory');
const categorySelect = document.getElementById('category');
const uploadForm = document.getElementById('uploadForm');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const mediaInput = document.getElementById('media');

// إعدادات الخلفية
backgroundInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const background = {
        imageUrl: reader.result,
        size: backgroundSizeSelect.value
      };
      localStorage.setItem('background', JSON.stringify(background));
    };
    reader.readAsDataURL(file);
  }
});

backgroundSizeSelect.addEventListener('change', () => {
  const background = JSON.parse(localStorage.getItem('background'));
  if (background) {
    background.size = backgroundSizeSelect.value;
    localStorage.setItem('background', JSON.stringify(background));
  }
});

clearBackgroundBtn.addEventListener('click', () => {
  localStorage.removeItem('background');
});

// إدارة الأصناف
let categories = JSON.parse(localStorage.getItem('categories')) || [];
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
    });
    li.appendChild(deleteBtn);
    categoriesList.appendChild(li);
  });
}

addCategoryBtn.addEventListener('click', () => {
  const newCategory = newCategoryInput.value.trim();
  if (newCategory && !categories.includes(newCategory)) {
    categories.push(newCategory);
    localStorage.setItem('categories', JSON.stringify(categories));
    renderCategories();
  }
});

// إضافة الأخبار
let newsItems = JSON.parse(localStorage.getItem('newsItems')) || [];
uploadForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const news = {
    title: titleInput.value,
    category: categorySelect.value,
    description: descriptionInput.value,
    media: Array.from(mediaInput.files).map(file => URL.createObjectURL(file)),
  };
  newsItems.push(news);
  localStorage.setItem('newsItems', JSON.stringify(newsItems));
  uploadForm.reset();
});

// تحميل الأصناف
function updateCategorySelect() {
  categorySelect.innerHTML = '';
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}

renderCategories();
updateCategorySelect();
