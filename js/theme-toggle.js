document.addEventListener('DOMContentLoaded', () => {
    // Obtener elementos del DOM
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const sunIconMobile = document.getElementById('sun-icon-mobile');
    const moonIconMobile = document.getElementById('moon-icon-mobile');
    const dots = document.querySelectorAll('.dot');
    const themeTitle = document.getElementById('theme-title');

    // Función para habilitar el modo oscuro
    const enableDarkMode = () => {
        document.documentElement.classList.add('dark');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
        sunIconMobile.classList.add('hidden');
        moonIconMobile.classList.remove('hidden');
        dots.forEach(dot => {
            if (dot.closest('#mobile-menu')) {
                dot.style.transform = 'translateX(150%)'; // Ajuste para móviles
            } else {
                dot.style.transform = 'translateX(100%)'; // Ajuste para web
            }
        });
        themeTitle.textContent = 'Tema: Dark';
        localStorage.setItem('theme', 'dark');
    };

    // Función para deshabilitar el modo oscuro
    const disableDarkMode = () => {
        document.documentElement.classList.remove('dark');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
        sunIconMobile.classList.remove('hidden');
        moonIconMobile.classList.add('hidden');
        dots.forEach(dot => dot.style.transform = 'translateX(0)');
        themeTitle.textContent = 'Tema: Light';
        localStorage.setItem('theme', 'light');
    };

    // Función para alternar el tema
    const toggleTheme = (checked) => {
        if (checked) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    };

    // Eventos para alternar el tema
    themeToggle.addEventListener('change', () => {
        toggleTheme(themeToggle.checked);
        themeToggleMobile.checked = themeToggle.checked;
    });

    themeToggleMobile.addEventListener('change', () => {
        toggleTheme(themeToggleMobile.checked);
        themeToggle.checked = themeToggleMobile.checked;
    });

    // Comprobar la preferencia de tema inicial
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        themeToggle.checked = true;
        themeToggleMobile.checked = true;
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});