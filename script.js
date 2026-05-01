const tabLinks = Array.from(document.querySelectorAll('.tab-link'));
const years = Array.from(document.querySelectorAll('.current-year'));

const now = new Date().getFullYear();
years.forEach((yearNode) => {
  yearNode.textContent = String(now);
});

// Enable smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const tabNav = document.querySelector('.tab-nav');

if (menuToggle && tabNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    tabNav.classList.toggle('dropdown-open');
  });

  // Close dropdown when a tab link is clicked
  tabLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      tabNav.classList.remove('dropdown-open');
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !tabNav.contains(e.target)) {
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      tabNav.classList.remove('dropdown-open');
    }
  });

  // Close dropdown on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      tabNav.classList.remove('dropdown-open');
    }
  });
}

tabLinks.forEach((link, index) => {
  link.setAttribute('role', 'link');

  link.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
      return;
    }

    event.preventDefault();
    const step = event.key === 'ArrowRight' ? 1 : -1;
    const next = (index + step + tabLinks.length) % tabLinks.length;
    tabLinks[next].focus();
  });
});

const rail = document.createElement('div');
rail.className = 'progress-rail';
rail.innerHTML = '<div class="progress-fill"></div>';
document.body.appendChild(rail);

const fill = rail.querySelector('.progress-fill');

function updateProgress() {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollHeight > 0 ? Math.min(1, scrollTop / scrollHeight) : 0;
  fill.style.width = `${Math.round(ratio * 100)}%`;
}

window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const revealItems = Array.from(document.querySelectorAll('.reveal'));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  },
  { threshold: 0.15 }\n);
);

revealItems.forEach((item) => revealObserver.observe(item));

const tiltCards = Array.from(document.querySelectorAll('.tilt-card'));

tiltCards.forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rx = ((y / rect.height) - 0.5) * -3;
    const ry = ((x / rect.width) - 0.5) * 3;

    card.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px) scale(1.01)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
  });
});

for (let i = 0; i < 12; i += 1) {
  const dot = document.createElement('span');
  dot.className = 'float-dot';
  dot.style.left = `${Math.random() * 100}%`;
  dot.style.top = `${Math.random() * 100}%`;
  dot.style.setProperty('--dur', `${4 + Math.random() * 7}s`);
  document.body.appendChild(dot);
}

const openingStage = document.querySelector('#opening-stage');
const openingOrbs = Array.from(document.querySelectorAll('.opening-orb'));

if (openingStage) {
  const openingHeight = openingStage.offsetHeight || 1;

  function updateOpeningState() {
    const top = window.scrollY;
    const ratio = Math.min(1, top / openingHeight);

    openingStage.style.opacity = `${1 - ratio * 0.42}`;
    openingStage.style.transform = `translateY(${ratio * -16}px)`;

    openingOrbs.forEach((orb, idx) => {
      const depth = (idx + 1) * 6;
      orb.style.transform = `translate3d(${ratio * depth}px, ${ratio * -depth}px, 0)`;
    });

    if (top > openingHeight * 0.28) {
      document.body.classList.add('home-entered');
    } else {
      document.body.classList.remove('home-entered');
    }
  }

  window.addEventListener('scroll', updateOpeningState, { passive: true });
  window.addEventListener('resize', updateOpeningState);
  updateOpeningState();
}
