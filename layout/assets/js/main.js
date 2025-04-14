const sliderLine = document.querySelector('.slider__line');
const prevBtn = document.querySelector('.arrow__btn.prev');
const nextBtn = document.querySelector('.arrow__btn.next');
const items = document.querySelectorAll('.sliider__item');
const itemWidth = 700 + 20; // Ширина карточки (700px) + gap (20px)
const itemCount = items.length;

// Клонируем элементы для бесконечности
const clonesStart = [];
const clonesEnd = [];

items.forEach((item) => {
    const cloneStart = item.cloneNode(true);
    const cloneEnd = item.cloneNode(true);
    clonesStart.push(cloneStart);
    clonesEnd.push(cloneEnd);
});

// Добавляем клоны в начало и конец
clonesStart.reverse().forEach((clone) => sliderLine.prepend(clone));
clonesEnd.forEach((clone) => sliderLine.append(clone));

// Начальная позиция — первый оригинальный элемент
let currentIndex = itemCount; // Учитываем клоны в начале
sliderLine.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

// Функция обновления слайдера
function updateSlider(animate = true) {
    sliderLine.style.transition = animate ? 'transform 0.3s ease-in-out' : 'none';
    sliderLine.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

// Проверка и перепрыгивание для бесконечности
function handleTransitionEnd() {
    if (currentIndex <= 0) {
        currentIndex = itemCount;
        updateSlider(false); // Без анимации
    } else if (currentIndex >= itemCount * 2) {
        currentIndex = itemCount;
        updateSlider(false); // Без анимации
    }
}

nextBtn.addEventListener('click', () => {
    currentIndex++;
    updateSlider();
});

prevBtn.addEventListener('click', () => {
    currentIndex--;
    updateSlider();
});

document.addEventListener('DOMContentLoaded', () => {
// Обработка окончания анимации для перепрыгивания
sliderLine.addEventListener('transitionend', handleTransitionEnd);

    const ratingBlock = document.querySelector('form.reviews__add .rating__block');
    const stars = ratingBlock ? ratingBlock.querySelectorAll('svg') : [];
    const ratingInput = document.querySelector('input[name="rating"]');

    // console.log(stars);

    // Установка начального рейтинга
    //console.log('Начальный рейтинг:', ratingBlock.dataset.rate); // Для отладки
    ratingBlock.setAttribute('data-rate', 0);
    ratingInput.value = 0;

    // Обработчики событий
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            //console.log('Клик по звезде:', index + 1); // Для отладки
            const rating = index + 1;
            ratingBlock.dataset.rate = rating;
            ratingInput.value = rating;
            updateStars(rating);
            console.log('Рейтинг установлен:', rating); // Для отладки
        });

        star.addEventListener('mouseover', () => {
            updateStars(index + 1, true);
        });

        star.addEventListener('mouseout', () => {
            updateStars(parseInt(ratingBlock.dataset.rate) || 0);
        });
    });

    // Функция обновления звезд
    function updateStars(rating, isHover = false) {
        stars.forEach((star, i) => {
            const path = star.querySelector('path');
            if (path) {
                path.style.fill = i < rating ? (isHover ? '#FFD700' : '#FFB800') : '#C9CBC0';
            }
        });
    }

});