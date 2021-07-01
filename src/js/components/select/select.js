import { domQueryAll } from '../../util';

import './select.scss';

export const Select = () => {
    const headers = domQueryAll('.select-header');
    const items = domQueryAll('.select-item');

    const selectHeader = function () {
        console.log(this)
        this.parentElement.classList.toggle("is-active");
        const icon = this.querySelector('.select-icon');
        icon.classList.toggle('is-active');
    };


    const selectItem = function () {
        const text = this.innerText;
        const select = this.closest('.select');
        const currentText = select.querySelector('.select-current-item');

        currentText.innerText = text;
        select.classList.remove('is-active');
        select.querySelector('.select-icon').classList.remove('is-active');
    };

    items.forEach((item) => {
        item.addEventListener('click', selectItem);
    })

    headers.forEach((header) => {
        header.addEventListener('click', selectHeader)
    });
};
