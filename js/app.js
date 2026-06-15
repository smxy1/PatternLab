// JavaScript erst starten, wenn die HTML-Seite geladen ist.
document.addEventListener('DOMContentLoaded', function() {

  // Zentrale Elemente suchen, die je nach Seite vorhanden sind.
  const projectForm = document.getElementById('project-form');
  const projectsContainer = document.querySelector('.projects');
  const projectSearch = document.getElementById('project-search');
  const categoryFilter = document.getElementById('category-filter');

  // Projekte aus dem Browser laden. Wenn noch nichts gespeichert ist, startet die App mit einer leeren Liste.
  let allProjects = JSON.parse(localStorage.getItem('projects')) || [];

  // Projekte zentral speichern, damit nicht überall derselbe LocalStorage-Code steht.
  function saveProjects() {
    // JSON.stringify macht aus dem Array einen Text, den LocalStorage speichern kann.
    localStorage.setItem('projects', JSON.stringify(allProjects));
  }

  // Kategorien werden technisch kurz gespeichert, aber lesbar angezeigt.
  function getCategoryName(category) {
    // Die Werte kommen aus den value-Attributen im Formular.
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
    // Ohne Checkliste gibt es noch keinen Fortschritt.
    if (!project.checklist || project.checklist.length === 0) {
      return 0;
    }

    // filter erstellt ein neues Array mit allen erledigten Punkten.
    const doneItems = project.checklist.filter(function(item) {
      return item.done;
    });

    // Math.round rundet auf ganze Prozentzahlen.
    return Math.round(doneItems.length / project.checklist.length * 100);
  }

  // GitHub-Ansichtslinks werden für die PDF-Anzeige in direkte Datei-Links umgewandelt.
  function getPdfDisplayUrl(pdfUrl) {
    // GitHub-Links mit /blob/ zeigen eine Webseite. Für <embed> brauchen wir die direkte Datei.
    if (pdfUrl.includes('github.com') && pdfUrl.includes('/blob/')) {
      return pdfUrl
        .replace('https://github.com/', 'https://raw.githubusercontent.com/')
        .replace('/blob/', '/');
    }

    return pdfUrl;
  }

  // ============================================================
  // TEIL 1: Neues Projekt erstellen und speichern
  // ============================================================

  // Dieser Teil läuft nur auf der Formularseite.
  if (projectForm) {
    const formUrlParams = new URLSearchParams(window.location.search);
    const editProjectId = Number(formUrlParams.get('id'));

    const projectToEdit = allProjects.find(function(project) {
      // find gibt das erste Projekt zurück, dessen ID zur URL-ID passt.
      return project.id === editProjectId;
    });

    // Wenn eine Projekt-ID in der URL steht, wird das Formular zum Bearbeiten gefüllt.
    if (projectToEdit) {
      document.getElementById('project-title').value = projectToEdit.title || '';
      document.getElementById('project-category').value = projectToEdit.category || '';
      document.getElementById('project-description').value = projectToEdit.description || '';
      document.getElementById('project-material').value = projectToEdit.material || '';
      document.getElementById('project-needle-size').value = projectToEdit.needleSize || '';
      document.getElementById('project-pdf-url').value = projectToEdit.pdfUrl || '';
    }

    // Mit Enter springt der Fokus im Formular zum nächsten Feld.
    projectForm.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        const formFields = Array.from(projectForm.querySelectorAll('input, textarea, select, button'));
        const currentIndex = formFields.indexOf(event.target);

        if (currentIndex > -1 && currentIndex < formFields.length - 1) {
          event.preventDefault();
          formFields[currentIndex + 1].focus();
        }
      }
    });

    projectForm.addEventListener('submit', function(event) {
      
      // Das Formular wird mit JavaScript verarbeitet, deshalb darf die Seite nicht automatisch neu laden.
      event.preventDefault();

      // Alle Formularwerte werden in einem Projektobjekt gesammelt.
      const projectData = {
        id: Date.now(),

        title: document.getElementById('project-title').value,
        category: document.getElementById('project-category').value,
        description: document.getElementById('project-description').value,
        material: document.getElementById('project-material').value,
        needleSize: document.getElementById('project-needle-size').value,
        pdfUrl: document.getElementById('project-pdf-url').value
      };

      if (projectToEdit) {
        // Beim Bearbeiten werden nur die Grunddaten überschrieben.
        // Checkliste, Notizen und Zähler bleiben erhalten.
        projectToEdit.title = projectData.title;
        projectToEdit.category = projectData.category;
        projectToEdit.description = projectData.description;
        projectToEdit.material = projectData.material;
        projectToEdit.needleSize = projectData.needleSize;
        projectToEdit.pdfUrl = projectData.pdfUrl;
      } else {
        // Neues Projekt zur Liste hinzufügen
        allProjects.push(projectData);
      }

      // Projekte im LocalStorage speichern
      saveProjects();

      // Zurück zum Dashboard oder zur bearbeiteten Projektseite
      if (projectToEdit) {
        window.location.href = 'project.html?id=' + projectToEdit.id;
      } else {
        window.location.href = 'index.html';
      }
    });
  }

  // ============================================================
  // TEIL 2: Projekte im Dashboard anzeigen
  // ============================================================

  // Dieser Teil läuft nur auf dem Dashboard.
  if (projectsContainer) {

    // Projektkarten passend zu Suche und Kategorie anzeigen.
    function showProjectCards() {
      projectsContainer.innerHTML = '';

      const searchText = projectSearch ? projectSearch.value.toLowerCase() : '';
      const selectedCategory = categoryFilter ? categoryFilter.value : 'all';

      const filteredProjects = allProjects.filter(function(project) {
        // toLowerCase sorgt dafür, dass Groß- und Kleinschreibung bei der Suche egal sind.
        const matchesSearch = project.title.toLowerCase().includes(searchText);
        const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;

        return matchesSearch && matchesCategory;
      });

      // Für jedes gefilterte Projekt wird eine Karte erstellt.
      filteredProjects.forEach(function(project) {
        projectsContainer.innerHTML += `
          <article class="project-card">
            <h3>${project.title}</h3>
            <p><strong>Kategorie:</strong> ${getCategoryName(project.category)}</p>
            <p><strong>Fortschritt:</strong> ${calculateProgress(project)}%</p>
            <!-- data-project-id speichert die Projekt-ID direkt am Button. -->
            <button class="btn-secondary open-project-btn" data-project-id="${project.id}">Öffnen</button>
          </article>
        `;
      });

      // Die Projekt-ID wird beim Öffnen in der URL mitgegeben.
      document.querySelectorAll('.open-project-btn').forEach(function(button) {
        button.addEventListener('click', function() {
          // dataset.projectId liest den Wert aus data-project-id.
          window.location.href = 'project.html?id=' + button.dataset.projectId;
        });
      });
    }

    showProjectCards();

    // ============================================================
    // TEIL 3: Projektkarte öffnen
    // ============================================================

    if (projectSearch) {
      projectSearch.addEventListener('input', function() {
        showProjectCards();
      });
    }

    if (categoryFilter) {
      categoryFilter.addEventListener('change', function() {
        showProjectCards();
      });
    }

  }

  // ============================================================
  // TEIL 4: Einzelnes Projekt in der Projektansicht anzeigen
  // ============================================================

  // Elemente der Projektseite suchen. Auf anderen Seiten sind sie einfach nicht vorhanden.
  const projectTitle = document.getElementById('project-title');
  const projectCategory = document.getElementById('project-category');
  const projectProgress = document.getElementById('project-progress');
  const projectDataContainer = document.getElementById('project-data-container');
  const checklistContainer = document.getElementById('checklist-container');
  const addChecklistButton = document.querySelector('.add-checklist-item');
  const deleteLastChecklistButton = document.querySelector('.delete-last-checklist-item');
  const projectNotes = document.getElementById('project-notes');
  const counterValue = document.getElementById('counter-value');
  const counterButtons = document.querySelectorAll('.stitch-counter-btn');
  const rowCounterValue = document.getElementById('row-counter-value');
  const rowCounterButtons = document.querySelectorAll('.row-counter-btn');
  const projectPdfViewer = document.getElementById('project-pdf-viewer');
  const projectPdfMessage = document.getElementById('project-pdf-message');
  const deleteProjectButton = document.getElementById('delete-project-button');
  const editProjectLink = document.getElementById('edit-project-link');

  // Dieser Teil läuft nur auf der Projektseite.
  if (projectTitle && projectCategory && projectDataContainer) {

    // Die Projekt-ID aus der URL lesen, zum Beispiel aus project.html?id=123.
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = Number(urlParams.get('id'));

    // Das passende Projekt aus der gespeicherten Projektliste suchen.
    const currentProject = allProjects.find(function(project) {
      return project.id === projectId;
    });

    // Wenn das Projekt gefunden wurde, werden die gespeicherten Daten angezeigt.
    if (currentProject) {
      projectTitle.textContent = currentProject.title;
      projectCategory.textContent = getCategoryName(currentProject.category);

      // Der Bearbeiten-Link öffnet das bestehende Formular mit dieser Projekt-ID.
      if (editProjectLink) {
        editProjectLink.href = 'new-project.html?id=' + currentProject.id;
      }

      // Optionale Projektdaten anzeigen. Leere Felder bekommen einen kurzen Hinweis.
      projectDataContainer.innerHTML = `
        <dt>Beschreibung:</dt>
        <dd>${currentProject.description || 'Keine Beschreibung vorhanden'}</dd>
        <dt>Material:</dt>
        <dd>${currentProject.material || 'Kein Material angegeben'}</dd>
        <dt>Nadelstärke:</dt>
        <dd>${currentProject.needleSize || 'Keine Nadelstärke angegeben'}</dd>
      `;

      // Die PDF wird über den gespeicherten Link in die Projektansicht eingebunden.
      if (projectPdfViewer && currentProject.pdfUrl) {
        if (projectPdfMessage) {
          projectPdfMessage.hidden = true;
        }

        const pdfDisplayUrl = getPdfDisplayUrl(currentProject.pdfUrl);

        // Die bereinigte PDF-Adresse wird in das embed-Element geschrieben.
        projectPdfViewer.src = pdfDisplayUrl;

        projectPdfViewer.addEventListener('error', function() {
          if (projectPdfMessage) {
            projectPdfMessage.hidden = false;
          }
        });
      } else {
        if (projectPdfMessage) {
          projectPdfMessage.hidden = false;
        }
      }

      // ============================================================
      // TEIL 5: Checkliste anzeigen und neue Punkte hinzufügen
      // ============================================================

      // Ältere Projekte bekommen beim Öffnen eine leere Checkliste.
      if (!currentProject.checklist) {
        currentProject.checklist = [];
      }

      // Fortschritt aus erledigten und offenen Checklistenpunkten anzeigen.
      function showProgress() {
        const progress = calculateProgress(currentProject);
        projectProgress.textContent = progress + '%';
      }

      // Checklistenpunkte anzeigen und ihre Änderungen speichern.
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
            // Der index verbindet die Checkbox wieder mit dem passenden Eintrag im Array.
            currentProject.checklist[index].done = checkbox.checked;
            saveProjects();
            showProgress();
          });
        });

        document.querySelectorAll('.checklist-text').forEach(function(input, index) {
          input.addEventListener('change', function() {
            currentProject.checklist[index].text = input.value;
            saveProjects();
          });

          input.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
              event.preventDefault();
              currentProject.checklist[index].text = input.value;
              saveProjects();
              input.blur();
            }
          });
        });

      }

      if (checklistContainer && addChecklistButton) {
        showChecklist();

        // Eingabefeld für neue Arbeitsschritte erstellen und über dem Button einfügen.
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

        // Eingabefeld einblenden, wenn ein neuer Punkt hinzugefügt werden soll.
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

            saveProjects();
            newChecklistInput.value = '';
            checklistInputArea.style.display = 'none';
            showChecklist();
            showProgress();
          }
        });

        // Enter speichert den neuen Checklistenpunkt.
        newChecklistInput.addEventListener('keydown', function(event) {
          if (event.key === 'Enter') {
            event.preventDefault();
            saveChecklistButton.click();
          }
        });

        // Der letzte Checklistenpunkt kann wieder entfernt werden.
        if (deleteLastChecklistButton) {
          deleteLastChecklistButton.addEventListener('click', function() {
            currentProject.checklist.pop();
            saveProjects();
            showChecklist();
            showProgress();
          });
        }
      }

      // ============================================================
      // TEIL 6: Notizen speichern
      // ============================================================

      // Gespeicherte Notizen laden und jede Änderung direkt speichern.
      if (projectNotes) {
        projectNotes.value = currentProject.notes || '';

        projectNotes.addEventListener('input', function() {
          currentProject.notes = projectNotes.value;
          saveProjects();
        });
      }

      // ============================================================
      // TEIL 7: Maschenzähler und Reihenzähler speichern
      // ============================================================

      // Gemeinsame Logik für Maschen- und Reihenzähler.
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
            saveProjects();
          });
        });
      }

      setupCounter(counterValue, counterButtons, 'counter');
      setupCounter(rowCounterValue, rowCounterButtons, 'rowCounter');

      // ============================================================
      // TEIL 8: Projekt löschen
      // ============================================================

      if (deleteProjectButton) {
        deleteProjectButton.addEventListener('click', function() {
          const shouldDelete = confirm('Soll dieses Projekt wirklich gelöscht werden?');

          if (shouldDelete) {
            allProjects = allProjects.filter(function(project) {
              return project.id !== currentProject.id;
            });

            saveProjects();
            window.location.href = 'index.html';
          }
        });
      }

      showProgress();
    } else {
      // Falls die ID nicht existiert, bekommt die Nutzerin eine klare Rückmeldung.
      projectTitle.textContent = 'Projekt nicht gefunden';
    }
  }

});
