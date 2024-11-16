document.addEventListener('DOMContentLoaded', function () {
    // Alle Links im Navigationsmenü finden
    const navLinks = document.querySelectorAll('nav a');
    
    // Den aktuellen URL-Pfad ermitteln (wir wollen nur den Dateinamen, nicht den gesamten Pfad)
    const currentPath = window.location.pathname.split('/').pop(); 

    // Iteriere durch alle Links und vergleiche sie mit dem aktuellen Pfad
    navLinks.forEach(function(link) {
        // Wenn der Link mit dem aktuellen Pfad übereinstimmt, setze die 'active' Klasse
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Optionale Anpassung der Bezeichner für "35mm" Seite
    if (currentPath === 'photo.html') {
        document.getElementById('photo-link').textContent = '35mm'; // Text ändern für "35mm" Seite
    }
});
