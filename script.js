document.addEventListener('DOMContentLoaded', function() {
    // Элементы навигации
    const navButtons = document.querySelectorAll('.nav-btn');
    const footerLinks = document.querySelectorAll('.footer-link');
    const ctaButton = document.querySelector('.cta-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.querySelector('.nav');
    
    // Функция переключения табов
    function switchTab(tabId) {
        console.log('Переключаем на таб:', tabId);
        
        // Проверяем существование таба
        const targetTab = document.getElementById(tabId);
        if (!targetTab) {
            console.error('Таб не найден:', tabId);
            return;
        }
        
        // Убираем активный класс у всех кнопок
        navButtons.forEach(btn => btn.classList.remove('active'));
        footerLinks.forEach(link => link.classList.remove('active'));
        
        // Убираем активный класс у всех табов
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Добавляем активный класс выбранной кнопке
        const activeNavButton = document.querySelector(`.nav-btn[data-tab="${tabId}"]`);
        const activeFooterLink = document.querySelector(`.footer-link[data-tab="${tabId}"]`);
        
        if (activeNavButton) {
            activeNavButton.classList.add('active');
        }
        if (activeFooterLink) {
            activeFooterLink.classList.add('active');
        }
        
        // Показываем выбранный таб
        targetTab.classList.add('active');
        
        // Закрываем меню на мобильных
        if (window.innerWidth <= 768 && nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
        
        // Прокрутка к верху таба (только на десктопе)
        if (window.innerWidth > 768) {
            const mainElement = document.querySelector('.main');
            if (mainElement) {
                mainElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
        
        // Обновляем URL (без перезагрузки страницы)
        history.pushState(null, null, `#${tabId}`);
    }
    
    // Обработчики для кнопок навигации в шапке
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            console.log('Клик по навигации:', tabId);
            switchTab(tabId);
        });
    });
    
    // Обработчики для ссылок в футере
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            console.log('Клик по футеру:', tabId);
            switchTab(tabId);
        });
    });
    
    // Обработчик для кнопки CTA
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            console.log('Клик по CTA:', tabId);
            switchTab(tabId);
        });
    }
    
    // Кнопка меню на мобильных
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        nav.classList.toggle('active');
    });
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768) {
            if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
                nav.classList.remove('active');
            }
        }
    });
    
    // Обработка хэша в URL при загрузке
    function handleHashOnLoad() {
        const hash = window.location.hash.substring(1);
        const validTabs = ['home', 'recipes', 'history', 'gallery', 'tips'];
        
        if (hash && validTabs.includes(hash)) {
            console.log('Загружаем таб из URL:', hash);
            switchTab(hash);
        } else {
            console.log('Загружаем домашний таб по умолчанию');
            switchTab('home');
        }
    }
    
    // Обработка изменения хэша
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1);
        const validTabs = ['home', 'recipes', 'history', 'gallery', 'tips'];
        
        if (hash && validTabs.includes(hash)) {
            console.log('Хэш изменился:', hash);
            switchTab(hash);
        }
    });
    
    // Анимация появления элементов при скролле
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.recipe-card, .tip-card, .gallery-item, .feature-card');
        
        // Инициализация стилей для анимации
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        function checkScroll() {
            animatedElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        }
        
        window.addEventListener('scroll', checkScroll);
        checkScroll(); // Проверяем при загрузке
    }
    
    // Дебаг информация
    console.log('Сайт "Чебуреки от Vovanhick" загружен');
    console.log('Найдено кнопок навигации:', navButtons.length);
    console.log('Найдено ссылок в футере:', footerLinks.length);
    console.log('Найдено табов:', tabContents.length);
    
    // Инициализация
    handleHashOnLoad();
    initScrollAnimations();
    
    // Обработка ошибок
    window.addEventListener('error', function(e) {
        console.error('Ошибка на странице:', e.error);
    });
});