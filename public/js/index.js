const menuBtn = document.querySelector('.menu-btn');
const menuItems = document.querySelector('.hidden');

//main toggle
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    menuItems.classList.toggle('active');
})