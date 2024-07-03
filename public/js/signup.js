document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.querySelector('.wrapper');
    const registerLink = document.querySelector('.register-link');
    const loginLink = document.querySelector('.login-link');

    if (window.location.pathname === '/signup') {
        wrapper.classList.add('active');
    }

    registerLink.onclick = () => {
        wrapper.classList.add('active');
    }

    loginLink.onclick = () => {
        wrapper.classList.remove('active');
    }
});
