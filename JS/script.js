const mixer = mixitup('#our-blog__grid', {
    load: {
        sort: 'date:desc'
    }
});


// =========================
// REVIEWS SLIDER
// =========================

const track = document.querySelector('.reviews__track');
const cards = document.querySelectorAll('.rewiews__card');
const prevButton = document.querySelector('.reviews__button--prev');
const nextButton = document.querySelector('.reviews__button--next');
const dotsContainer = document.querySelector('.reviews__dots');

let currentSlide = 0;
let cardsPerSlide = getCardsPerSlide();


// Сколько карточек показываем одновременно
function getCardsPerSlide() {
    return window.innerWidth <= 920 ? 1 : 2;
}


// Сколько всего слайдов
function getTotalSlides() {
    return Math.ceil(cards.length / cardsPerSlide);
}


// Создание полосок
function createDots() {
    const totalSlides = getTotalSlides();

    dotsContainer.innerHTML = '';

    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');

        dot.classList.add('reviews__dot');

        if (i === currentSlide) {
            dot.classList.add('active');
        }

        dot.addEventListener('click', () => {
            currentSlide = i;
            updateSlider();
        });

        dotsContainer.appendChild(dot);
    }
}


// Обновление слайдера
function updateSlider() {
    if (!cards.length) return;

    const cardWidth = cards[0].offsetWidth;
    const gap = 48;

    const move =
        currentSlide *
        (cardWidth + gap) *
        cardsPerSlide;

    track.style.transform = `translateX(-${move}px)`;


    // Активная полоска
    const dots = dotsContainer.querySelectorAll('.reviews__dot');

    dots.forEach((dot, index) => {
        dot.classList.toggle(
            'active',
            index === currentSlide
        );
    });
}


// Правая стрелка
if (nextButton) {
    nextButton.addEventListener('click', () => {
        const totalSlides = getTotalSlides();

        if (currentSlide < totalSlides - 1) {
            currentSlide++;
        } else {
            currentSlide = 0;
        }

        updateSlider();
    });
}


// Левая стрелка
if (prevButton) {
    prevButton.addEventListener('click', () => {
        const totalSlides = getTotalSlides();

        if (currentSlide > 0) {
            currentSlide--;
        } else {
            currentSlide = totalSlides - 1;
        }

        updateSlider();
    });
}


// Перестраиваем слайдер при изменении ширины
window.addEventListener('resize', () => {
    const newCardsPerSlide = getCardsPerSlide();

    if (newCardsPerSlide !== cardsPerSlide) {
        cardsPerSlide = newCardsPerSlide;

        const totalSlides = getTotalSlides();

        if (currentSlide >= totalSlides) {
            currentSlide = totalSlides - 1;
        }

        createDots();
    }

    updateSlider();
});


// Запуск
createDots();
updateSlider();


// =========================
// FAQ ACCORDION
// =========================

const faqQuestions = document.querySelectorAll('.faq__question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {

        const item = question.parentElement;
        const icon = question.querySelector('.plus');

        item.classList.toggle('active');

        if (item.classList.contains('active')) {
            icon.src = './Images/FAQ/Minus.svg';
        } else {
            icon.src = './Images/FAQ/Plus.svg';
        }
    });
});


// =========================
// FORM
// =========================

const form = document.querySelector('#form__input');

if (form) {
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        form.reset();
    });
}


// =========================
// BURGER
// =========================

$('.burger').on('click', function (e) {
    e.preventDefault();

    $('.header__top').toggleClass('header__top--open');
});


// Закрываем меню после клика
$('.header__nav-link').on('click', function () {
    $('.header__top').removeClass('header__top--open');
});


// =========================
// SHOW MORE
// =========================

const showMoreButton = document.querySelector('.show-more--btn');
const blogGrid = document.querySelector('#our-blog__grid');

if (showMoreButton && blogGrid) {

    showMoreButton.addEventListener('click', () => {

        blogGrid.classList.toggle('blog-open');

        if (blogGrid.classList.contains('blog-open')) {
            showMoreButton.textContent = 'Hide';
        } else {
            showMoreButton.textContent = 'Show more';
        }

    });
}