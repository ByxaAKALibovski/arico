const state = {};
const carouselList = document.querySelector('.carousel__list');
const carouselItems = document.querySelectorAll('.carousel__item');
const elems = Array.from(carouselItems);

carouselList.addEventListener('click', function (event) {
    const newActive = event.target.closest('.carousel__item');
    
    // Проверяем, что клик был по элементу карусели
    if (!newActive) {
        return;
    }

    // Проверяем, не кликнули ли по кнопке "в корзину"
    const isButton = event.target.closest('button.btn');

    if (isButton) {
        event.preventDefault(); // Предотвращаем переход по ссылке
        // Логика для кнопки "в корзину" (можно заменить на свою)
        console.log('Клик по кнопке "в корзину"');
        return;
    }

    // Проверяем позицию карточки
    const isCenter = newActive.dataset.pos === '0';

    if (!isCenter) {
        // Если карточка не в центре, прокручиваем карусель
        event.preventDefault(); // Предотвращаем переход по ссылке
        update(newActive);
    }
    // Если карточка в центре, ничего не делаем — ссылка сработает автоматически
});

const update = function (newActive) {
    const newActivePos = newActive.dataset.pos;

    const current = elems.find((elem) => elem.dataset.pos == 0);
    const prev = elems.find((elem) => elem.dataset.pos == -1);
    const next = elems.find((elem) => elem.dataset.pos == 1);
    const first = elems.find((elem) => elem.dataset.pos == -2);
    const last = elems.find((elem) => elem.dataset.pos == 2);

    current.classList.remove('carousel__item_active');

    [current, prev, next, first, last].forEach((item) => {
        const itemPos = item.dataset.pos;
        item.dataset.pos = getPos(itemPos, newActivePos);
    });
};

const getPos = function (current, active) {
    const diff = current - active;

    if (Math.abs(current - active) > 2) {
        return -current;
    }

    return diff;
};