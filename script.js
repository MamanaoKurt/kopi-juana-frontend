const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('.sound-toggle').forEach(button => {
  const video = document.getElementById(button.dataset.video);
  if (!video) return;

  const setLabel = () => {
    button.textContent = video.muted ? 'Turn sound on' : 'Sound is on';
  };

  setLabel();
  video.play().catch(() => {});

  button.addEventListener('click', async () => {
    try {
      video.muted = !video.muted;
      await video.play();
      setLabel();
    } catch (error) {
      video.muted = true;
      setLabel();
    }
  });
});
