export const BurrgerMenu = () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const nav = document.querySelector('nav');
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle("active");
        nav.classList.toggle("active");
    })

};
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

export const Slider = () => {

    const levels = document.querySelector('.levels')
    const progress = document.querySelector('.progress')
    const knob = document.querySelector('.knob')

    let levelsBox, knobBox, points, min, max
    // knob.style.transform = "translateX(335.124px) rotate(-45deg); transition: all 0.5s ease 0s;";
    // progress.style.transform = "all 0.5s ease 0s; width: 345.6px;"
    // knob.style.transform = `translateX(${131}px) rotate(-45deg)`
    // progress.style.width = 138 + 28 / 2 + 'px'

    knob.addEventListener('mousedown', function (e) {
        // progress.style.width = 0;
        // knob.style.left = e.x;
        e.preventDefault()

        window.addEventListener('mousemove', dragging)
        window.addEventListener('mouseup', drop)

        knob.style.transition = '0s'
        progress.style.transition = '0s'

        const knobBox = knob.getBoundingClientRect()
        // координата нажатия мыши относительно ручки
        let shift = e.x - knobBox.left;
        let X = 0;

        function dragging(e) {
            let x = 0;

            // не даем выйти за границы
            if (e.x < min) x = min
            else if (e.x > max) x = max
            else x = e.x

            X = x - shift - levelsBox.left
            console.log(X);
            console.log(knobBox.width);
            knob.style.transform = `translateX(${X}px) rotate(-45deg)`
            progress.style.width = X + knobBox.width / 2 + 'px'
        }

        function drop(e) {
            // ближайшее число в массиве точек к текущей координате ручки
            var closest = getClosest(X)

            knob.style.transition = '0.5s'
            progress.style.transition = '0.5s'

            // перемащаем к полученной ближайшей точке
            knob.style.transform = `
    	translateX(${closest - knobBox.width / 2.7}px)
    	rotate(-45deg)
     `
            progress.style.width = closest + 'px'

            window.removeEventListener('mousemove', dragging)
            window.removeEventListener('mousemove', drop)
        }
    })

    function getClosest(v) {
        return points.reduce((prev, curr) =>
            (Math.abs(curr - v) < Math.abs(prev - v) ? curr : prev)
        )
    }

    function init() {
        levelsBox = levels.getBoundingClientRect()
        knobBox = knob.getBoundingClientRect()

        /* ширина промежутков */
        points = [
            0,
            levelsBox.width * 0.2,
            levelsBox.width * 0.45,
            levelsBox.width
        ]

        min = levelsBox.left,
            max = levelsBox.right;
        // knob.style.transform = `translateX(-${knobBox.width / 2.7}px) rotate(-45deg)`
        // progress.style.width = 0
    }

    // при изменении ширины окна пересчитываем
    // некоторые размеры для корректного отображения
    window.onresize = init

    init()
}
