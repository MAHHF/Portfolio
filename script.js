// Warten, bis das DOM geladen ist
document.addEventListener('DOMContentLoaded', function () {
    // Alle Links im Navigationsmenü finden
    const navLinks = document.querySelectorAll('nav a');

    // Funktion zum Hinzufügen und Entfernen der 'active' Klasse
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            // Entfernt die 'active' Klasse von allen Links
            navLinks.forEach(function(link) {
                link.classList.remove('active');
            });

            // Fügt die 'active' Klasse dem angeklickten Link hinzu
            event.target.classList.add('active');
        });
    });
});
