const navToggler = document.querySelector('.nav-toggler');
const navItems = document.querySelector('nav ul');

navToggler.addEventListener('click', () => {
    const visibility = navItems.getAttribute('data-visible');
    if(visibility === 'false') navItems.setAttribute('data-visible', true)
    else navItems.setAttribute('data-visible', false)
})