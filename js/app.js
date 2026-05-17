// Warten, bis die HTML-Seite vollständig geladen ist
document.addEventListener('DOMContentLoaded', function() {

  // Formular mit ID "project-form" suchen
  const projectForm = document.getElementById('project-form');

  // Container mit den Projektkarten finden
  const projectsContainer = document.querySelector('.projects');

  // Alle bisherigen Projekte abrufen (oder leeres Array, wenn noch keine da)
  let allProjects = JSON.parse(localStorage.getItem('projects')) || [];

  // ============================================================
  // TEIL 1: Neues Projekt erstellen und speichern
  // ============================================================

  // Wenn Formular vorhanden ist, Event-Listener hinzufügen
  if (projectForm) {
    projectForm.addEventListener('submit', function(event) {
      
      // Verhindert, dass die Seite neu lädt
      event.preventDefault();
      console.log('Formular wurde abgesendet.');

      // Alle Daten in ein Objekt zusammenfassen
      const projectData = {
        id: allProjects.length + 1,

        // Daten aus den Formularfeldern auslesen
        title: document.getElementById('project-title').value,
        category: document.getElementById('project-category').value,
        description: document.getElementById('project-description').value,
        material: document.getElementById('project-material').value,
        needleSize: document.getElementById('project-needle-size').value
      };

      // Neues Projekt zur Liste hinzufügen
      allProjects.push(projectData);

      // Projekte im LocalStorage speichern
      localStorage.setItem('projects', JSON.stringify(allProjects));

      console.log('Projekt gespeichert:', projectData);

      // Zurück zum Dashboard
      window.location.href = 'index.html';
    });
  }

  // ============================================================
  // TEIL 2: Projekte im Dashboard anzeigen
  // ============================================================

  // Prüfen, ob Projekt-Container existiert
  if (projectsContainer) {

    // Für jedes Projekt eine Karte erstellen
    allProjects.forEach(function(project) {

      // HTML-Karte als Text erstellen und einfügen
      projectsContainer.innerHTML += `
        <article class="project-card">
          <h3>${project.title}</h3>
          <p><strong>Kategorie:</strong> ${project.category}</p>
          <button class="open-project-btn">Öffnen</button>
        </article>
      `;
    });

    console.log('Projektkarten wurden geladen.');
  }

});