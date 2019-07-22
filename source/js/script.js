var navMain = document.querySelector('.main-nav');
var navButtonOpen = document.querySelector('.page-header__button_open');
var navButtonClose = document.querySelector('.page-header__button_close');

navMain.classList.remove('main-nav_nojs');

navButtonOpen.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav_closed')) {
    navMain.classList.remove('main-nav_closed');
    navMain.classList.add('main-nav_opened');
  } else {
    navMain.classList.add('main-nav_closed');
    navMain.classList.remove('main-nav_opened');
  }
});

navButtonClose.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav_closed')) {
    navMain.classList.remove('main-nav_closed');
    navMain.classList.add('main-nav_opened');
  } else {
    navMain.classList.add('main-nav_closed');
    navMain.classList.remove('main-nav_opened');
  }
});
