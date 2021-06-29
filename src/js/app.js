export const Select = () => {
    const headers = document.querySelectorAll('.select-header');
    const items = document.querySelectorAll('.select-item');

    const selectHeader = function () {
        this.parentElement.classList.toggle("is-active")
    };

    const selectItem = function () {
        const text = this.innerText;
        const select = this.closest('.select');
        const currentText = select.querySelector('.select-current-item');
        currentText.innerText = text;
        select.classList.remove('is-active');
    };

    items.forEach((item) => {
        item.addEventListener('click', selectItem);
    })

    headers.forEach((header) => {
        header.addEventListener('click', selectHeader)
    });
};