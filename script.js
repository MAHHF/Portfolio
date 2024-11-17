document.addEventListener("DOMContentLoaded", function() {
    // Holen des Body-IDs, um die aktuelle Seite zu bestimmen
    var bodyId = document.body.id;

    // Überprüfen, ob wir uns auf der "photo"-Seite befinden
    if (bodyId === "photo") {
        // Der Link für "Photo" wird zu "35mm" geändert
        document.querySelector('a[href="photo.html"]').textContent = "35mm";
    }

    // Überprüfen, ob wir uns auf der "mahf"-Seite befinden
    if (bodyId === "mahf") {
        // Der Link für "About" wird zu "MAHF" geändert
        document.querySelector('a[href="mahf.html"]').textContent = "MAHF";
    }

    // Überprüfen, ob wir uns auf der "home"-Seite befinden
    if (bodyId === "home") {
        // Der Link für "Home" wird zu "Zuhause" geändert
        document.querySelector('a[href="index.html"]').textContent = "Zuhause";
    }

    // Füge den aktiven Link zur Navigation hinzu
    var links = document.querySelectorAll('nav a');
    links.forEach(function(link) {
        // Wenn der Link der aktuellen Seite entspricht, wird er mit 'active' markiert
        if (link.href.includes(bodyId)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
