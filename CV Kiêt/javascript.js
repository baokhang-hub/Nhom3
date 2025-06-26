// Cuộn mượt khi click navbar
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Thêm thông báo khi click GitHub
document.querySelectorAll('a[href*="github.com"]').forEach(link => {
  link.addEventListener('click', function () {
    alert("Bạn đang mở liên kết GitHub dự án.");
  });
});

// Hiệu ứng khi cuộn đến từng phần (chỉ khai báo 1 lần)
const sections = document.querySelectorAll("section");
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      sectionObserver.unobserve(entry.target); // chỉ xuất hiện 1 lần
    }
  });
}, {
  threshold: 0.15 // Hiển thị khi 15% phần tử vào vùng nhìn
});

sections.forEach(section => {
  section.classList.add('hidden'); // ẩn ban đầu
  sectionObserver.observe(section);
});

// Nút cuộn lên đầu
const scrollBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  scrollBtn.style.display = window.scrollY > 500 ? 'block' : 'none';
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Highlight nav link khi scroll đến section tương ứng
const navLinks = document.querySelectorAll("nav ul li a");
const navSections = Array.from(navLinks).map(link => {
  const id = link.getAttribute("href");
  return document.querySelector(id);
});

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY + window.innerHeight / 3;

  navSections.forEach((section, index) => {
    if (section && section.offsetTop <= scrollY &&
        section.offsetTop + section.offsetHeight > scrollY) {
      navLinks.forEach(link => link.classList.remove("active"));
      navLinks[index].classList.add("active");
    }
  });

  // Nút cuộn lên đầu vẫn giữ nguyên
  scrollBtn.style.display = window.scrollY > 500 ? 'block' : 'none';
});


// Custom cursor
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursor-trail');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  trail.style.left = e.clientX + 'px';
  trail.style.top = e.clientY + 'px';
});

// Gửi form
const form = document.querySelector(".contact-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const data = new FormData(form);

  fetch(form.action, {
    method: "POST",
    body: data,
    headers: {
      Accept: "application/json",
    },
  }).then(response => {
    if (response.ok) {
      alert("Gửi thành công! Cảm ơn bạn đã liên hệ.");
      form.reset();
    } else {
      alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  });
});

// Hiệu ứng tilt
VanillaTilt.init(document.querySelectorAll(".tilt"), {
  max: 15,
  speed: 400,
  glare: true,
  "max-glare": 0.3
});

// Floating dots
const container = document.getElementById('floating-container');

function createFloatingDot() {
  const dot = document.createElement('div');
  dot.classList.add('floating-dot');
  dot.style.top = Math.random() * window.innerHeight + 'px';
  dot.style.left = Math.random() * window.innerWidth + 'px';

  const dx = (Math.random() - 0.5) * 500 + 'px';
  const dy = (Math.random() - 0.5) * 500 + 'px';
  dot.style.setProperty('--dx', dx);
  dot.style.setProperty('--dy', dy);

  const duration = Math.random() * 10 + 5;
  dot.style.animationDuration = `${duration}s`;

  container.appendChild(dot);

  setTimeout(() => dot.remove(), duration * 1000);
}

setInterval(createFloatingDot, 300);

// Slide
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;
let autoSlide;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

function startAutoSlide() {
  autoSlide = setInterval(nextSlide, 4000);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

prevBtn.addEventListener("click", () => {
  prevSlide();
  stopAutoSlide();
  startAutoSlide();
});

nextBtn.addEventListener("click", () => {
  nextSlide();
  stopAutoSlide();
  startAutoSlide();
});

showSlide(currentIndex);
startAutoSlide();

// Parallax
document.addEventListener('mousemove', function (e) {
  const banner = document.getElementById('parallax-banner');
  const x = (e.clientX / window.innerWidth - 0.5) * 50;
  const y = (e.clientY / window.innerHeight - 0.5) * 50;
  banner.style.backgroundPosition = `${100 + x}% ${10 + y}%`;
});

// Audio
document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("bg-music");
  const playToggle = document.getElementById("play-toggle");
  const volumeControl = document.getElementById("volume-control");

  let isPlaying = false;

  function toggleAudio() {
    if (!isPlaying) {
      audio.play().then(() => {
        playToggle.textContent = "🔇 Tắt Nhạc";
        isPlaying = true;
      }).catch(err => {
        console.error("Không thể phát nhạc:", err);
      });
    } else {
      audio.pause();
      playToggle.textContent = "🔊 Bật Nhạc";
      isPlaying = false;
    }
  }

  playToggle.addEventListener("click", toggleAudio);

  volumeControl.addEventListener("input", () => {
    audio.volume = volumeControl.value;
  });

  window.addEventListener("click", function enableAudioOnce() {
    if (!isPlaying) {
      audio.play().then(() => {
        isPlaying = true;
        playToggle.textContent = "🔇 Tắt Nhạc";
      }).catch(() => { });
    }
    window.removeEventListener("click", enableAudioOnce);
  });
});

const banner = document.getElementById('parallax-banner');
const title = banner.querySelector('h1');

banner.addEventListener('mousemove', e => {
  const { width, height, left, top } = banner.getBoundingClientRect();
  const x = (e.clientX - left - width/2) / width;
  const y = (e.clientY - top - height/2) / height;
  const depth = 20;

  banner.style.transform = `translate3d(${x*depth}px, ${y*depth}px, 0)`;
  title.style.transform = `translate3d(${x*depth*1.5}px, ${y*depth*1.5}px, 0)`;
});

banner.addEventListener('mouseleave', () => {
  banner.style.transform = 'translate3d(0,0,0)';
  title.style.transform = 'translate3d(0,0,0)';
});

const canvas = document.getElementById('banner-canvas');
const ctx = canvas.getContext('2d');
let w, h, particles = [];

function resize() {
  w = canvas.width = banner.clientWidth;
  h = canvas.height = banner.clientHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random()*w;
    this.y = Math.random()*h;
    this.size = Math.random()*2 + 0.5;
    this.speedX = (Math.random()-0.5)*0.5;
    this.speedY = (Math.random()-0.5)*0.5;
    this.alpha = Math.random()*0.5 + 0.3;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if(this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
    ctx.fill();
  }
}

for(let i=0; i<100; i++) particles.push(new Particle());

function animate() {
  ctx.clearRect(0,0,w,h);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}
animate();