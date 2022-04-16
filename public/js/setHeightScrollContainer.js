function resizeScrollContainer(event) {
  const menuContainerHeader = document.querySelector('.menucontainer__header');
  const menuContainerScroll = document.querySelector('.menucontainer__scroll');

  const workspaceHeight = window.innerHeight - 80;
  const menuContainerHeight = workspaceHeight * 0.95;

  const menuContainerHeaderHeight = menuContainerHeader.offsetHeight;
  const menuContainerScrollHeight = menuContainerHeight - menuContainerHeaderHeight;

  menuContainerScroll.style.height = `${menuContainerScrollHeight}px`;
};

window.addEventListener('load', resizeScrollContainer, true);
window.addEventListener('resize', resizeScrollContainer, true);
