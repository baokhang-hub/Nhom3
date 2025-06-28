// nút ở mục tiêu nghề nghiệp
const arrowRight = document.querySelector('.arrow-right');
const arrowLeft = document.querySelector('.arrow-left');
const imgSlide = document.querySelector('.img-slide');

let index = 0;
const totalImages = imgSlide.children.length;

// Cập nhật trạng thái nút điều hướng
const updateButtons = () => {
  if (index === 0) {
    arrowLeft.classList.add('disabled');
  } else {
    arrowLeft.classList.remove('disabled');
  }

  if (index === totalImages - 1) {
    arrowRight.classList.add('disabled');
  } else {
    arrowRight.classList.remove('disabled');
  }
};

// Cập nhật slide ảnh
const activePortfolio = () => {
  imgSlide.style.transform = `translateX(-${index * 100}%)`;
  updateButtons();
};

// Xử lý click phải
arrowRight.addEventListener('click', () => {
  if (index < totalImages - 1) {
    index++;
    activePortfolio();
  }
});

// Xử lý click trái
arrowLeft.addEventListener('click', () => {
  if (index > 0) {
    index--;
    activePortfolio();
  }
});

// Gọi lần đầu
updateButtons();


// nút ở project
const projects = [
  {
    title: "Game Robot tìm đường",
    desc: "Ứng dụng thuật toán Greedy Best-First Search để tìm đường hiệu quả trong môi trường đơn giản.",
    img: "./Ảnh/robot.jpg"
  },
  {
    title: "Hệ thống thu phí tự động bằng Python",
    desc: "Sử dụng AI nhận diện biển số xe, giao diện bằng Tkinter và xuất hóa đơn.",
    img: "./Ảnh/pj.png"
  }
];

let projectIndex = 0;

const titleEl = document.querySelector(".project-title");
const descEl = document.querySelector(".project-desc");
const imgEl = document.querySelector(".project-image");

const updateProject = () => {
  const project = projects[projectIndex];
  titleEl.textContent = project.title;
  descEl.textContent = project.desc;
  imgEl.src = project.img;
};

document.getElementById("prev-project").addEventListener("click", () => {
  if (projectIndex > 0) {
    projectIndex--;
    updateProject();
  }
});

document.getElementById("next-project").addEventListener("click", () => {
  if (projectIndex < projects.length - 1) {
    projectIndex++;
    updateProject();
  }
});

updateProject(); // chạy lần đầu

// nut chuyển trang

const pageTurnBtn = document.querySelectorAll('.nextprev-btn');

pageTurnBtn.forEach((el,index) => {
  el.onclick = () => {
    const pageTurnId = el.getAttribute('data-page');
    const pageTurn = document.getElementById(pageTurnId);

    if (pageTurn.classList.contains('turn')){
        pageTurn.classList.remove('turn');
        setTimeout(() => {
          pageTurn.style.zIndex = 20 - index;
        }, 500);
    }
    else{
      pageTurn.classList.add('turn');
      setTimeout(() => {
        pageTurn.style.zIndex = 20 + index;
      }, 500);
    }
  }
});

//nut chuyen den contact
const pages = document.querySelectorAll('.book-page.page-right');
const contactMeBtn = document.querySelector('.btn.contact-me');

contactMeBtn.onclick = () => {
  for (let i = 0; i < 2; i++) { // chỉ lật 2 trang
    setTimeout(() => {
      pages[i].classList.add('turn');

      setTimeout(() => {
        pages[i].style.zIndex = 20 + i;
      }, 500);
    }, (i + 1) * 200 + 100);
  }
};

let totalPages = pages.length;
let pageNumber = 0; 

function reverseIndex() {
  pageNumber--;
  if (pageNumber < 0){
    pageNumber = totalPages -1;
  }
}

//nut quay tro lai profile
const backProfileBtn = document.querySelector('.back-profile');

backProfileBtn.onclick = () => {
  const total = pages.length;

  for (let i = total - 1; i >= 0; i--) {
    setTimeout(() => {
      pages[i].classList.remove('turn');

      setTimeout(() => {
        pages[i].style.zIndex = 10 + (total - i);
      }, 500);
    }, (total - i) * 300);
  }

  // Reset lại z-index sau toàn bộ animation
  setTimeout(() => {
    pages.forEach((page, i) => {
      page.style.zIndex = 10 - i;
    });
  }, total * 300 + 600);
};

//opening animation
window.addEventListener('DOMContentLoaded', () => {
  const reversedPages = [...pages].reverse();

  setTimeout(() => {
    reversedPages.forEach((page, i) => {
      setTimeout(() => {
        page.classList.remove('turn');

        setTimeout(() => {
          page.style.zIndex = 10 + i;
        }, 500);
      }, i * 250); // thời gian giữa các trang
    });
  }, 1200); // đợi animation hiện sách xong mới lật
});
