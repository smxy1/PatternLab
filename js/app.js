// Warten, bis die HTML-Seite vollständig geladen ist
document.addEventListener('DOMContentLoaded', function() {

  // Formular mit ID "project-form" suchen
  const projectForm = document.getElementById('project-form');

  // Container mit den Projektkarten finden
  const projectsContainer = document.querySelector('.projects');

  // Alle bisherigen Projekte abrufen (oder leeres Array, wenn noch keine da)
  let allProjects = JSON.parse(localStorage.getItem('projects')) || [];

  // Kategorie schöner anzeigen.
  // Im Formular werden kurze Werte gespeichert, angezeigt werden aber lesbare Begriffe.
  function getCategoryName(category) {
    if (category === 'haekeln') {
      return 'Häkeln';
    }

    if (category === 'stricken') {
      return 'Stricken';
    }

    if (category === 'andere') {
      return 'Andere';
    }

    return category;
  }

  // Fortschritt eines Projekts aus der Checkliste berechnen.
  function calculateProgress(project) {
    if (!project.checklist || project.checklist.length === 0) {
      return 0;
    }

    const doneItems = project.checklist.filter(function(item) {
      return item.done;
    });

    return Math.round(doneItems.length / project.checklist.length * 100);
  }

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
          <p><strong>Kategorie:</strong> ${getCategoryName(project.category)}</p>
          <p><strong>Fortschritt:</strong> ${calculateProgress(project)}%</p>
          <button class="open-project-btn">Öffnen</button>
        </article>
      `;
    });
    // ============================================================
    // TEIL 3: Projektkarte öffnen
    // ============================================================

    // Jeder Öffnen-Button bekommt einen Klick-Listener.
    // Beim Klick wird die Projektseite geöffnet und die Projekt-ID in der URL mitgegeben.
    document.querySelectorAll('.open-project-btn').forEach(function(button, index) {
      button.addEventListener('click', function() {
        window.location.href = 'project.html?id=' + allProjects[index].id;
      });
    });

    console.log('Projektkarten wurden geladen.');
  }

  // ============================================================
  // TEIL 4: Einzelnes Projekt in der Projektansicht anzeigen
  // ============================================================

  // HTML-Elemente auf der Projektseite suchen.
  // Diese Elemente gibt es nur in project.html.
  const projectTitle = document.getElementById('project-title');
  const projectCategory = document.getElementById('project-category');
  const projectProgress = document.getElementById('project-progress');
  const projectDataContainer = document.getElementById('project-data-container');
  const checklistContainer = document.getElementById('checklist-container');
  const addChecklistButton = document.querySelector('.add-checklist-item');
  const projectNotes = document.getElementById('project-notes');
  const counterValue = document.getElementById('counter-value');
  const counterButtons = document.querySelectorAll('.stitch-counter-btn');
  const rowCounterValue = document.getElementById('row-counter-value');
  const rowCounterButtons = document.querySelectorAll('.row-counter-btn');

  // Nur ausführen, wenn die aktuelle Seite wirklich die Projektansicht ist.
  if (projectTitle && projectCategory && projectDataContainer) {

    // Die Projekt-ID aus der URL lesen, zum Beispiel aus project.html?id=1.
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = Number(urlParams.get('id'));

    // Das Projekt mit der passenden ID aus dem LocalStorage-Array suchen.
    const currentProject = allProjects.find(function(project) {
      return project.id === projectId;
    });

    // Wenn ein Projekt gefunden wurde, werden die gespeicherten Daten angezeigt.
    if (currentProject) {
      projectTitle.textContent = currentProject.title;
      projectCategory.textContent = getCategoryName(currentProject.category);

      // Optionale Projektdaten anzeigen.
      // Falls ein Feld leer ist, wird ein einfacher Hinweis ausgegeben.
      projectDataContainer.innerHTML = `
        <dt>Beschreibung:</dt>
        <dd>${currentProject.description || 'Keine Beschreibung vorhanden'}</dd>
        <dt>Material:</dt>
        <dd>${currentProject.material || 'Kein Material angegeben'}</dd>
        <dt>Nadelstärke:</dt>
        <dd>${currentProject.needleSize || 'Keine Nadelstärke angegeben'}</dd>
      `;

      // ============================================================
      // TEIL 5: Checkliste anzeigen und neue Punkte hinzufügen
      // ============================================================

      // Falls ein älteres Projekt noch keine Checkliste hat, wird eine leere Liste angelegt.
      if (!currentProject.checklist) {
        currentProject.checklist = [];
      }

      // Fortschritt aus der Checkliste berechnen.
      // Erledigte Punkte werden durch alle Punkte geteilt.
      function showProgress() {
        const progress = calculateProgress(currentProject);
        projectProgress.textContent = progress + '%';
      }

      // Checklistenpunkte in der Projektansicht anzeigen.
      function showChecklist() {
        checklistContainer.innerHTML = '';

        currentProject.checklist.forEach(function(item, index) {
          checklistContainer.innerHTML += `
            <li>
              <input type="checkbox" class="checklist-checkbox" ${item.done ? 'checked' : ''}>
              <input type="text" class="checklist-text" value="${item.text}">
            </li>
          `;
        });

        document.querySelectorAll('.checklist-checkbox').forEach(function(checkbox, index) {
          checkbox.addEventListener('change', function() {
            currentProject.checklist[index].done = checkbox.checked;
            localStorage.setItem('projects', JSON.stringify(allProjects));
            showProgress();
          });
        });

        document.querySelectorAll('.checklist-text').forEach(function(input, index) {
          input.addEventListener('change', function() {
            currentProject.checklist[index].text = input.value;
            localStorage.setItem('projects', JSON.stringify(allProjects));
          });
        });
      }

      if (checklistContainer && addChecklistButton) {
        showChecklist();

        // Eingabefeld für neue Arbeitsschritte erstellen.
        const checklistInputArea = document.createElement('div');
        checklistInputArea.className = 'checklist-input-area';
        checklistInputArea.innerHTML = `
          <input type="text" id="new-checklist-item" placeholder="Neuen Arbeitsschritt eingeben">
          <button type="button" id="save-checklist-item">Speichern</button>
        `;

        addChecklistButton.before(checklistInputArea);
        checklistInputArea.style.display = 'none';

        const newChecklistInput = document.getElementById('new-checklist-item');
        const saveChecklistButton = document.getElementById('save-checklist-item');

        // Eingabefeld direkt unter der Checkliste ein- und ausblenden.
        addChecklistButton.addEventListener('click', function() {
          checklistInputArea.style.display = 'flex';
          newChecklistInput.focus();
        });

        // Neuen Arbeitsschritt speichern und direkt anzeigen.
        saveChecklistButton.addEventListener('click', function() {
          const newItemText = newChecklistInput.value;

          if (newItemText) {
            currentProject.checklist.push({
              text: newItemText,
              done: false
            });

            localStorage.setItem('projects', JSON.stringify(allProjects));
            newChecklistInput.value = '';
            checklistInputArea.style.display = 'none';
            showChecklist();
            showProgress();
          }
        });
      }

      // ============================================================
      // TEIL 6: Notizen speichern
      // ============================================================

      // Gespeicherte Notizen in das Textfeld schreiben.
      if (projectNotes) {
        projectNotes.value = currentProject.notes || '';

        // Änderungen an den Notizen direkt im Projekt speichern.
        projectNotes.addEventListener('input', function() {
          currentProject.notes = projectNotes.value;
          localStorage.setItem('projects', JSON.stringify(allProjects));
        });
      }

      // ============================================================
      // TEIL 7: Maschenzähler und Reihenzähler speichern
      // ============================================================

      // Einen Zähler anzeigen, verändern und im aktuellen Projekt speichern.
      function setupCounter(valueElement, buttons, storageName) {
        if (!valueElement || buttons.length === 0) {
          return;
        }

        if (!currentProject[storageName]) {
          currentProject[storageName] = 0;
        }

        valueElement.textContent = currentProject[storageName];

        buttons.forEach(function(button) {
          button.addEventListener('click', function() {
            if (button.value === 'reset') {
              currentProject[storageName] = 0;
            } else {
              currentProject[storageName] = currentProject[storageName] + Number(button.value);
            }

            valueElement.textContent = currentProject[storageName];
            localStorage.setItem('projects', JSON.stringify(allProjects));
          });
        });
      }

      setupCounter(counterValue, counterButtons, 'counter');
      setupCounter(rowCounterValue, rowCounterButtons, 'rowCounter');

      showProgress();
    } else {
      // Falls die ID nicht existiert, bekommt die Nutzerin eine klare Rückmeldung.
      projectTitle.textContent = 'Projekt nicht gefunden';
    }
  }

});
