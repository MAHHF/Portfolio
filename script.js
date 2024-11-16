// Funktion, um das Menü umzuschalten
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('open'); // 'open' Klasse hinzufügen oder entfernen
}

// Event-Listener für Hamburger-Menü
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    hamburger.addEventListener('click', toggleMobileMenu);
});
