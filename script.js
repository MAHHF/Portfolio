// Toggle für Hamburger-Menü
function toggleMenu() {
    var menu = document.getElementById('menu');
    menu.classList.toggle('open');  // Menü ein- oder ausblenden

    var hamburger = document.querySelector('.hamburger-menu');
    hamburger.classList.toggle('open');  // Animation für die Linie
}

// Event Listener für das Hamburger-Menü
document.querySelector('.hamburger-menu').addEventListener('click', toggleMenu);
