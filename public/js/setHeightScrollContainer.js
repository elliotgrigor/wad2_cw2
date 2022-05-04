function resizeScrollContainer(event) {
  const header = document.querySelector('#container-header');
  const scroll = document.querySelector('#container-scroll');

  const workspaceHeight = window.innerHeight - 80;
  const containerHeight = workspaceHeight * 0.95;

  const headerHeight = header.offsetHeight;
  const scrollHeight = containerHeight - headerHeight;

  scroll.style.height = `${scrollHeight}px`;
};

window.addEventListener('load', resizeScrollContainer, true);
window.addEventListener('resize', resizeScrollContainer, true);
