
function toggleMobileNav() {
  const navList = document.querySelector('.navmobile__list');

  if (!navList.style.display || navList.style.display === 'none') {
    navList.style.display = 'flex';
  } else {
    navList.style.display = 'none';
  }
}
