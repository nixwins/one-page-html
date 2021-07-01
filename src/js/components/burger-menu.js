import { domQuery } from '../util';
import { domQueryAll } from '../util';

export const BurgerMenu = () => {
    const burgerMenu = domQuery('.burger-menu');
    const nav = domQuery('nav');
    const navLinks = domQueryAll('nav a');
    navLinks.forEach((e) => {
        e.addEventListener('click', () => {
            burgerMenu.classList.remove("active");
            nav.classList.remove("active");
        })
    });

    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle("active");
        nav.classList.toggle("active");
    })

};
