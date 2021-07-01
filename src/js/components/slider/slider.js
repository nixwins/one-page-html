import { domQuery } from '../../util';
import './slider.scss';

export const Slider = () => {

    const levels = domQuery('.levels')
    const progress = domQuery('.progress')
    const knob = domQuery('.knob')

    let levelsBox, knobBox, points, min = 0, max = 0;
    // console.log(levels.querySelectorAll('.level')[0].getBoundingClientRect())
    let allLevels = levels.querySelectorAll('.level');
    let knobStartPosition = allLevels[0].getBoundingClientRect().width + allLevels[1].getBoundingClientRect().width - 10;

    // Init values 
    window.addEventListener('resize', () => {
        allLevels = levels.querySelectorAll('.level');
        console.log('resize', allLevels[0].getBoundingClientRect().width);
        knobStartPosition = allLevels[0].getBoundingClientRect().width + allLevels[1].getBoundingClientRect().width - 10;
        knob.style.transform = `translateX(${knobStartPosition}px) rotate(-45deg)`;
    });
    knob.style.transform = `translateX(${knobStartPosition}px) rotate(-45deg)`;

    let shift;
    let X = 0;

    knob.addEventListener('touchstart', function (e) {
        e.preventDefault()

        window.addEventListener('touchmove', dragging)
        window.addEventListener('touchend', drop)

        knob.style.transition = '0s'
        progress.style.transition = '0s'

        const knobBox = knob.getBoundingClientRect()
        console.log(e)
        // координата нажатия мыши относительно ручки
        shift = e.changedTouches[0].clientX - knobBox.left;
        console.log("shift", shift);

        // при изменении ширины окна пересчитываем
        // некоторые размеры для корректного отображения
        window.onresize = init

        init()
    });

    knob.addEventListener('mousedown', function (e) {

        e.preventDefault()

        window.addEventListener('mousemove', dragging)
        window.addEventListener('mouseup', drop)

        knob.style.transition = '0s'
        progress.style.transition = '0s'

        const knobBox = knob.getBoundingClientRect()
        // координата нажатия мыши относительно ручки
        shift = e.x - knobBox.left;

        // при изменении ширины окна пересчитываем
        // некоторые размеры для корректного отображения
        window.onresize = init

        init()
    });

    function dragging(e) {

        const { type } = e;
        console.log(type)
        var x = 0;

        if (type === 'mousemove') {


            if (e.x < min) x = min
            else if (e.x > max) x = max
            else x = e.x

        } else if (type === 'touchmove') {
            let clientX = e.changedTouches[0].clientX;
            if (clientX < min) x = min
            else if (clientX > max) x = max
            else x = clientX;
        }




        X = x - shift - levelsBox.left
        console.log("dragging", levelsBox.left, "shift", shift, "x", x)
        console.log(X);
        // console.log(knobBox.width);
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

    function getClosest(v) {
        return points.reduce((prev, curr) =>
            (Math.abs(curr - v) < Math.abs(prev - v) ? curr : prev)
        )
    }

    function init() {
        levelsBox = levels.getBoundingClientRect()
        knobBox = knob.getBoundingClientRect()
        console.log("init", levelsBox)
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


}
