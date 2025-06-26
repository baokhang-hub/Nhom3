// === Hiển thị ảnh chứng chỉ khi nhấp (popup) ===
document.addEventListener("DOMContentLoaded", () => {
  const popupImgs = document.querySelectorAll('.popup-img');
  const popupContainer = document.getElementById('popup');
  const popupImage = document.getElementById('popupImage');

  popupImgs.forEach(img => {
    img.addEventListener('click', () => {
      popupImage.src = img.src;
      popupContainer.style.display = 'flex';
    });
  });

  document.querySelector('.popup-close').addEventListener('click', () => {
    popupContainer.style.display = 'none';
  });

  // === Hiệu ứng cuộn vào ra mỗi lần (zoomIn) ===
  const sections = document.querySelectorAll('.cv-section');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show'); // xoá khi ra khỏi tầm nhìn
      }
    });
  }, {
    threshold: 0.2
  });

  sections.forEach(section => observer.observe(section));
});

// button
document.addEventListener("DOMContentLoaded", () => {
  const skillsBtn = document.getElementById("skillsBtn");
  const toolsBtn = document.getElementById("toolsBtn");
  const skillsGroup = document.getElementById("skillsGroup");
  const toolsGroup = document.getElementById("toolsGroup");

  skillsBtn.addEventListener("click", () => {
    skillsBtn.classList.add("active");
    toolsBtn.classList.remove("active");
    skillsGroup.classList.remove("hidden");
    toolsGroup.classList.add("hidden");
  });

  toolsBtn.addEventListener("click", () => {
    toolsBtn.classList.add("active");
    skillsBtn.classList.remove("active");
    toolsGroup.classList.remove("hidden");
    skillsGroup.classList.add("hidden");
  });
});
