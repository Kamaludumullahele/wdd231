// getting a nav button reference 
const navButton = document.querySelector('#nav-button');
// creating a nav Bar reference:
const navBar = document.querySelector('#nav-bar');

// creating an eventlistner
navButton.addEventListener('click', () => {
    const isOpen = navButton.classList.toggle('show');
    navButton.setAttribute('aria-expanded', isOpen);
    navBar.classList.toggle('show');
});


