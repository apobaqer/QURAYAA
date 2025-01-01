// كلمة المرور
const correctPassword = "313PoELQURAYANEWS";  // كلمة المرور التي سيستخدمها المسؤول

// جلب العناصر من الصفحة
const passwordSection = document.getElementById("password-section");
const passwordInput = document.getElementById("passwordInput");
const submitPasswordBtn = document.getElementById("submitPasswordBtn");
const adminContent = document.getElementById("admin-content");

// جلب العناصر الخاصة بالإعدادات
const backgroundInput = document.getElementById("backgroundInput");
const backgroundSize = document.getElementById("backgroundSize");
const clearBackgroundBtn = document.getElementById("clearBackgroundBtn");
const siteNameColor = document.getElementById("siteNameColor");
const newCategoryInput = document.getElementById("newCategory");
const addCategoryBtn = document.getElementById("addCategoryBtn");
const categoriesList = document.getElementById("categoriesList");
const uploadForm = document.getElementById("uploadForm");
const titleInput = document.getElementById("title");
const categorySelect = document.getElementById("category");
const descriptionInput = document.getElementById("description");
const mediaInput = document.getElementById("media");
const newsContainer = document.getElementById("newsContainer");

// المتغيرات لتخزين البيانات
let categories = [];
let news = [];

// الدوال للتحقق من كلمة المرور
submitPasswordBtn.addEventListener("click", function () {
  const enteredPassword = passwordInput.value;
  if (enteredPassword === correctPassword) {
    passwordSection.style.display = "none";  // إخفاء صفحة كلمة المرور
    adminContent.style.display = "block";   // عرض صفحة الإدارة
  } else {
    alert("كلمة المرور غير صحيحة. حاول مرة أخرى.");
  }
});

// دالة لتغيير الخلفية
backgroundInput.addEventListener("change", function () {
  const file = backgroundInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.body.style.backgroundImage = `url(${e.target.result})`;
      document.body.style.backgroundSize = backgroundSize.value;
    };
    reader.readAsDataURL(file);
  }
});

// دالة لإزالة الخلفية
clearBackgroundBtn.addEventListener("click", function () {
  document.body.style.backgroundImage = "";
  document.body.style.backgroundSize = "";
});

// دالة لتغيير لون خانة اسم الموقع
siteNameColor.addEventListener("input", function () {
  document.querySelector("header h1").style.backgroundColor = siteNameColor.value;
});

// دالة لإضافة صنف جديد
addCategoryBtn.addEventListener("click", function () {
  const categoryName = newCategoryInput.value.trim();
  if (categoryName) {
    categories.push(categoryName);
    newCategoryInput.value = "";
    updateCategoryList();
  } else {
    alert("الرجاء إدخال اسم صنف.");
  }
});

// دالة لتحديث قائمة الأصناف
function updateCategoryList() {
  categoriesList.innerHTML = "";
  categories.forEach(function (category, index) {
    const li = document.createElement("li");
    li.textContent = category;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "حذف";
    deleteBtn.addEventListener("click", function () {
      categories.splice(index, 1);
      updateCategoryList();
    });
    li.appendChild(deleteBtn);
    categoriesList.appendChild(li);

    // تحديث قائمة الأصناف في قائمة تحديد الصنف لإضافة الخبر
    categorySelect.innerHTML = "";
    categories.forEach(function (category) {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categorySelect.appendChild(option);
    });
  });
}

// دالة لإضافة خبر جديد
uploadForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const category = categorySelect.value;
  const description = descriptionInput.value.trim();
  const media = mediaInput.files;

  if (title && category && description) {
    const newsItem = {
      title: title,
      category: category,
      description: description,
      media: Array.from(media).map(file => URL.createObjectURL(file)),
    };
    news.push(newsItem);
    updateNewsList();
    uploadForm.reset();
  } else {
    alert("يرجى ملء جميع الحقول.");
  }
});

// دالة لتحديث قائمة الأخبار المنشورة
function updateNewsList() {
  newsContainer.innerHTML = "";
  news.forEach(function (item) {
    const newsItemDiv = document.createElement("div");
    const titleElement = document.createElement("h3");
    titleElement.textContent = item.title;
    const categoryElement = document.createElement("p");
    categoryElement.textContent = `الصنف: ${item.category}`;
    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = item.description;
    const mediaElement = document.createElement("div");
    item.media.forEach(function (mediaFile) {
      const mediaTag = document.createElement("img");
      mediaTag.src = mediaFile;
      mediaElement.appendChild(mediaTag);
    });

    newsItemDiv.appendChild(titleElement);
    newsItemDiv.appendChild(categoryElement);
    newsItemDiv.appendChild(descriptionElement);
    newsItemDiv.appendChild(mediaElement);
    newsContainer.appendChild(newsItemDiv);
  });
}