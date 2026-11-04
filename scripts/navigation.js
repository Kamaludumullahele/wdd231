// getting a nav button reference 
const navButton = document.querySelector('#navButton');

// creating an eventlistner
navButton.addEventListener('click', () => {
    const isOpen = navButton.classList.toggle('show');
    navButton.setAttribute('area-expanded', isOpen);
});