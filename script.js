function toggleMenu() {
    // Menü-Element (mit ID "menu")
    var menu = document.getElementById('menu');
    menu.classList.toggle('open');  // Menü ein- oder ausblenden

    // Hamburger-Menü (mit der Klasse "hamburger-menu")
    var hamburger = document.querySelector('.hamburger-menu');
    hamburger.classList.toggle('open');  // Animation für die Linie
}
