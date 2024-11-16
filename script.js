document.addEventListener('DOMContentLoaded', function () {
    // Alle Links im Navigationsmenü finden
    const navLinks = document.querySelectorAll('nav a');
    
    // Den aktuellen URL-Pfad ermitteln
    const currentPath = window.location.pathname.split('/').pop(); // Nur der Dateiname ohne Verzeichnisse
    
    // Iteriere durch alle Links und vergleiche sie mit dem aktuellen Pfad
    navLinks.forEach(function(link) {
        // Wenn der Link mit dem aktuellen Pfad übereinstimmt, setze die 'active' Klasse
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
