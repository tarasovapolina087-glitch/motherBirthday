// script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Анимация конфетти при загрузке страницы
    // Проверяем, доступна ли функция confetti (она подключается через CDN в index.html)
    if (typeof confetti === 'function') {
        setTimeout(() => {
            confetti({
                particleCount: 100, // Количество частиц конфетти
                spread: 70,         // Разброс конфетти
                origin: { y: 0.6 }, // Точка запуска (примерно середина страницы по высоте)
                colors: ['#F2E8D7', '#DCC7B0', '#FFFFFF', '#8D7B6D'] // Цвета конфетти в бежевых тонах
            });
        }, 500); // Запускаем конфетти через 0.5 секунды после загрузки
    }

    // 2. Анимация заголовка и подзаголовка при загрузке страницы
    const mainHeader = document.querySelector('.main-header');

    // Добавляем класс 'header-visible' к основному заголовку,
    // чтобы запустить анимации его дочерних элементов через CSS
    // Используем setTimeout, чтобы убедиться, что CSS-переходы применяются после первоначального рендера
    setTimeout(() => {
        if (mainHeader) {
            mainHeader.classList.add('header-visible');
        }
    }, 100); // Небольшая задержка перед началом анимации заголовка

    // 3. Анимация появления секций при прокрутке (Intersection Observer)
    const animatedElements = document.querySelectorAll('.animated-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Если элемент попадает в область видимости, добавляем класс 'is-visible',
                // чтобы запустить CSS-переход
                entry.target.classList.add('is-visible');
                // Останавливаем наблюдение за этим элементом, так как он уже анимировался
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px', // Отсутствие дополнительного отступа вокруг области просмотра
        threshold: 0.1     // Анимация срабатывает, когда 10% элемента видно
    });

    // Наблюдаем за каждым элементом, который должен анимироваться при прокрутке
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});