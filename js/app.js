// JavaScript erst starten, wenn die HTML-Seite geladen ist.
document.addEventListener('DOMContentLoaded', function() {

  // Zentrale Elemente suchen, die je nach Seite vorhanden sind.
  // getElementById findet ein Element über id="...", querySelector über einen CSS-Selektor wie ".projects".
  const projectForm = document.getElementById('project-form');
  const projectsContainer = document.querySelector('.projects');
  const projectSearch = document.getElementById('project-search');
  const categoryFilter = document.getElementById('category-filter');
  const sidebar = document.querySelector('.sidebar');
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebarMenuPanel = document.querySelector('.sidebar-menu-panel');
  const filterToggle = document.querySelector('.filter-toggle');
  const dashboardFilters = document.getElementById('dashboard-filters');
  const contrastToggle = document.querySelector('.contrast-toggle');
  const textSizeToggle = document.querySelector('.text-size-toggle');
  const textSizeSteps = [100, 125, 150, 200];
  // Diese Schlüssel sind die Namen, unter denen Werte im LocalStorage abgelegt werden.
  const contrastStorageKey = 'highContrast';
  const textSizeStorageKey = 'textSize';

  // ============================================================
  // TEIL 0: Barrierefreiheitsoptionen
  // ============================================================

  // Der Kontrastmodus nutzt eine Body-Klasse, damit alle Farben zentral im CSS wechseln.
  function setContrastState(highContrastIsActive) {
    // classList.toggle fügt die Klasse hinzu, wenn der zweite Wert true ist, und entfernt sie bei false.
    document.body.classList.toggle('high-contrast', highContrastIsActive);

    if (contrastToggle) {
      contrastToggle.setAttribute('aria-pressed', String(highContrastIsActive));
      contrastToggle.setAttribute('aria-label', highContrastIsActive ? 'Normalen Kontrast aktivieren' : 'Kontrast erhöhen');
    }
  }

  // Beim Laden der Seite wird der zuletzt gespeicherte Kontrastzustand wiederhergestellt.
  setContrastState(localStorage.getItem(contrastStorageKey) === 'true');

  // Wenn der Kontrast-Button existiert, bekommt er eine Klickfunktion zum Umschalten.
  if (contrastToggle) {
    // addEventListener reagiert hier auf Klicks der Nutzerin.
    contrastToggle.addEventListener('click', function() {
      const highContrastIsActive = !document.body.classList.contains('high-contrast');

      localStorage.setItem(contrastStorageKey, String(highContrastIsActive));
      setContrastState(highContrastIsActive);
    });
  }

  // Die Schriftgröße rotiert durch mehrere Stufen bis 200 Prozent.
  function setTextSizeState(textSize) {
    // Erst alle möglichen Schriftgrößen-Klassen entfernen, damit immer nur eine Stufe aktiv ist.
    textSizeSteps.forEach(function(step) {
      document.body.classList.remove('text-size-' + step);
    });

    if (textSize !== 100) {
      document.body.classList.add('text-size-' + textSize);
    }

    if (textSizeToggle) {
      textSizeToggle.setAttribute('aria-label', 'Schriftgröße erhöhen, aktuell ' + textSize + ' Prozent');
    }
  }

  // Beim Laden wird die gespeicherte Schriftgröße gelesen; ohne gespeicherten Wert startet sie bei 100 Prozent.
  let currentTextSize = Number(localStorage.getItem(textSizeStorageKey)) || 100;

  // Falls im Speicher ein ungültiger Wert steht, wird sicherheitshalber wieder 100 Prozent genutzt.
  if (!textSizeSteps.includes(currentTextSize)) {
    currentTextSize = 100;
  }

  // Die gelesene oder korrigierte Schriftgröße wird direkt auf die Seite angewendet.
  setTextSizeState(currentTextSize);

  // Wenn der Schriftgrößen-Button existiert, schaltet ein Klick zur nächsten Größenstufe.
  if (textSizeToggle) {
    textSizeToggle.addEventListener('click', function() {
      const currentIndex = textSizeSteps.indexOf(currentTextSize);
      const nextIndex = (currentIndex + 1) % textSizeSteps.length;

      currentTextSize = textSizeSteps[nextIndex];
      localStorage.setItem(textSizeStorageKey, String(currentTextSize));
      setTextSizeState(currentTextSize);
    });
  }

  // ============================================================
  // TEIL 1: Navigation und mobile Filter
  // ============================================================

  // Menüstatus setzen: true klappt die Navigation aus, false klappt sie wieder ein.
  function setMenuState(menuIsOpen) {
    if (!sidebar || !menuToggle) {
      return;
    }

    // is-open steuert im CSS, ob das mobile Menü sichtbar ist.
    sidebar.classList.toggle('is-open', menuIsOpen);
    // menu-open verhindert, dass der Seiteninhalt hinter dem geöffneten Menü scrollt.
    document.body.classList.toggle('menu-open', menuIsOpen);
    menuToggle.setAttribute('aria-expanded', String(menuIsOpen));
    menuToggle.setAttribute('aria-label', menuIsOpen ? 'Navigation schließen' : 'Navigation öffnen');
  }

  // Mobile Navigation ein- und ausklappen: Der Hamburger-Button öffnet oder schließt das Menü.
  if (sidebar && menuToggle) {
    menuToggle.addEventListener('click', function() {
      const menuIsOpen = !sidebar.classList.contains('is-open');
      setMenuState(menuIsOpen);
    });

    // Wenn ein Navigationslink angeklickt wird, schließt sich das mobile Menü wieder.
    sidebar.querySelectorAll('nav a, footer a').forEach(function(link) {
      link.addEventListener('click', function() {
        setMenuState(false);
      });
    });
  }

  // Zusätzlich wird das mobile Menü geschlossen, wenn außerhalb geklickt oder Escape gedrückt wird.
  if (sidebar && menuToggle) {
    document.addEventListener('click', function(event) {
      if (!sidebar.classList.contains('is-open')) {
        return;
      }

      const clickInsideMenu = sidebarMenuPanel && sidebarMenuPanel.contains(event.target);
      const clickOnToggle = menuToggle.contains(event.target);

      if (!clickInsideMenu && !clickOnToggle) {
        setMenuState(false);
      }
    });

    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        setMenuState(false);
      }
    });
  }

  // Suche und Kategoriefilter bleiben auf kleinen Bildschirmen platzsparend einklappbar.
  // Der Button blendet den Filterbereich ein oder aus.
  if (filterToggle && dashboardFilters) {
    filterToggle.addEventListener('click', function() {
      const filtersAreOpen = dashboardFilters.classList.toggle('is-open');

      filterToggle.setAttribute('aria-expanded', String(filtersAreOpen));
    });
  }

  // Projekte aus dem Browser laden. Wenn noch nichts gespeichert ist, startet die App mit einer leeren Liste.
  // JSON.parse wandelt den gespeicherten Text wieder in ein JavaScript-Array um.
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
  // TEIL 2: Neues Projekt erstellen und speichern
  // ============================================================

  // Dieser Teil läuft nur auf der Formularseite.
  // Formularlogik nur ausführen, wenn auf der aktuellen Seite wirklich ein Projektformular vorhanden ist.
  if (projectForm) {
    // URLSearchParams liest Werte aus der Adresse, zum Beispiel die id in new-project.html?id=123.
    const formUrlParams = new URLSearchParams(window.location.search);
    const editProjectId = Number(formUrlParams.get('id'));

    // Beim Bearbeiten wird das Projekt gesucht, dessen ID in der URL steht.
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
    // Tastatursteuerung im Formular: Enter springt zum nächsten Feld statt direkt zu speichern.
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

    // Beim Absenden werden die Formularwerte gesammelt und gespeichert.
    projectForm.addEventListener('submit', function(event) {
      
      // Das Formular wird mit JavaScript verarbeitet, deshalb darf die Seite nicht automatisch neu laden.
      event.preventDefault();

      // Alle Formularwerte werden in einem Projektobjekt gesammelt.
      // Dieses Objekt ist die Datenstruktur, die später im LocalStorage gespeichert wird.
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
  // TEIL 3: Projekte im Dashboard anzeigen und filtern
  // ============================================================

  // Dieser Teil läuft nur auf dem Dashboard.
  // Dashboardlogik nur ausführen, wenn der Container für Projektkarten vorhanden ist.
  if (projectsContainer) {

    // Erstellt eine einzelne Textzeile für die Projektkarte, zum Beispiel "Fortschritt: 50%".
    function createProjectInfo(label, value) {
      // Diese Hilfsfunktion baut eine Zeile wie "Kategorie: Häkeln" für eine Projektkarte.
      const paragraph = document.createElement('p');
      const strong = document.createElement('strong');

      strong.textContent = label + ': ';
      paragraph.append(strong, value);

      return paragraph;
    }

    // Erstellt die komplette Projektkarte im Dashboard inklusive Öffnen-Button.
    function createProjectCard(project) {
      // createElement erzeugt HTML-Elemente mit JavaScript, ohne sie als HTML-String zu schreiben.
      const card = document.createElement('article');
      const title = document.createElement('h2');
      const openButton = document.createElement('button');

      card.className = 'project-card';
      title.textContent = project.title || 'Unbenanntes Projekt';

      openButton.className = 'btn-secondary open-project-btn';
      openButton.type = 'button';
      // dataset.projectId wird im HTML zu data-project-id und merkt sich, welches Projekt geöffnet wird.
      openButton.dataset.projectId = project.id;
      openButton.textContent = 'Öffnen';

      card.append(
        title,
        createProjectInfo('Beschreibung', project.description || 'Keine Beschreibung vorhanden'),
        createProjectInfo('Kategorie', getCategoryName(project.category)),
        createProjectInfo('Fortschritt', calculateProgress(project) + '%'),
        openButton
      );

      return card;
    }

    // Projektkarten passend zu Suche und Kategorie anzeigen.
    // Dieser Block läuft beim ersten Laden und später bei jeder Filteränderung.
    function showProjectCards() {
      projectsContainer.replaceChildren();

      const searchText = projectSearch ? projectSearch.value.toLowerCase() : '';
      const selectedCategory = categoryFilter ? categoryFilter.value : 'all';

      // Aus allen Projekten bleiben nur die übrig, die zur Suche und Kategorie passen.
      const filteredProjects = allProjects.filter(function(project) {
        // filter behält nur die Projekte, bei denen am Ende true zurückgegeben wird.
        // toLowerCase sorgt dafür, dass Groß- und Kleinschreibung bei der Suche egal sind.
        const projectTitleText = (project.title || '').toLowerCase();
        const projectDescription = (project.description || '').toLowerCase();
        const matchesSearch =
          projectTitleText.includes(searchText) ||
          projectDescription.includes(searchText);
        const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;

        return matchesSearch && matchesCategory;
      });

      // Für jedes gefilterte Projekt wird eine Karte erstellt.
      filteredProjects.forEach(function(project) {
        projectsContainer.appendChild(createProjectCard(project));
      });

      // Die Projekt-ID wird beim Öffnen in der URL mitgegeben.
      document.querySelectorAll('.open-project-btn').forEach(function(button) {
        button.addEventListener('click', function() {
          // dataset.projectId liest den Wert aus data-project-id.
          window.location.href = 'project.html?id=' + button.dataset.projectId;
        });
      });
    }

    // Dashboard direkt beim Laden einmal mit allen passenden Projekten füllen.
    showProjectCards();

    // Bei jeder Eingabe im Suchfeld werden die Projektkarten neu gefiltert.
    if (projectSearch) {
      projectSearch.addEventListener('input', function() {
        showProjectCards();
      });
    }

    // Bei jeder Änderung der Kategorie werden die Projektkarten neu gefiltert.
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
  // Projektseitenlogik nur ausführen, wenn die wichtigsten Elemente der Detailseite vorhanden sind.
  if (projectTitle && projectCategory && projectDataContainer) {

    // Die Projekt-ID aus der URL lesen, zum Beispiel aus project.html?id=123.
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = Number(urlParams.get('id'));

    // Das passende Projekt aus der gespeicherten Projektliste suchen.
    const currentProject = allProjects.find(function(project) {
      return project.id === projectId;
    });

    // Fügt einen einzelnen Projektdaten-Eintrag in die Begriff-Wert-Liste ein.
    function appendProjectData(term, value) {
      // dt und dd gehören zusammen: dt ist die Bezeichnung, dd der dazugehörige Inhalt.
      const termElement = document.createElement('dt');
      const valueElement = document.createElement('dd');

      termElement.textContent = term + ':';
      valueElement.textContent = value;

      projectDataContainer.append(termElement, valueElement);
    }

    // Erstellt einen sichtbaren Checklistenpunkt mit Checkbox und bearbeitbarem Textfeld.
    function createChecklistItem(item) {
      // Jeder Checklistenpunkt wird dynamisch gebaut, weil die Anzahl je Projekt unterschiedlich ist.
      const listItem = document.createElement('li');
      const checkbox = document.createElement('input');
      const textInput = document.createElement('input');

      checkbox.type = 'checkbox';
      checkbox.className = 'checklist-checkbox';
      checkbox.checked = item.done;
      checkbox.setAttribute('aria-label', 'Arbeitsschritt erledigt');

      textInput.type = 'text';
      textInput.className = 'checklist-text';
      textInput.value = item.text || '';
      textInput.setAttribute('aria-label', 'Arbeitsschritt bearbeiten');

      listItem.append(checkbox, textInput);

      return listItem;
    }

    // Wenn das Projekt gefunden wurde, werden die gespeicherten Daten angezeigt.
    if (currentProject) {
      projectTitle.textContent = currentProject.title;
      projectCategory.textContent = getCategoryName(currentProject.category);

      // Der Bearbeiten-Link öffnet das bestehende Formular mit dieser Projekt-ID.
      if (editProjectLink) {
        editProjectLink.href = 'new-project.html?id=' + currentProject.id;
      }

      // Optionale Projektdaten anzeigen. Leere Felder bekommen einen kurzen Hinweis.
      projectDataContainer.replaceChildren();
      appendProjectData('Beschreibung', currentProject.description || 'Keine Beschreibung vorhanden');
      appendProjectData('Material', currentProject.material || 'Kein Material angegeben');
      appendProjectData('Nadelstärke', currentProject.needleSize || 'Keine Nadelstärke angegeben');

      // Die PDF wird über den gespeicherten Link in die Projektansicht eingebunden.
      // Wenn ein PDF-Link vorhanden ist, wird er in den PDF-Viewer geschrieben.
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
        // replaceChildren leert die Liste, bevor sie aus den aktuellen Daten neu aufgebaut wird.
        checklistContainer.replaceChildren();

        currentProject.checklist.forEach(function(item) {
          checklistContainer.appendChild(createChecklistItem(item));
        });

        checklistContainer.querySelectorAll('.checklist-checkbox').forEach(function(checkbox, index) {
          checkbox.addEventListener('change', function() {
            // Der index verbindet die Checkbox wieder mit dem passenden Eintrag im Array.
            currentProject.checklist[index].done = checkbox.checked;
            saveProjects();
            showProgress();
          });
        });

        checklistContainer.querySelectorAll('.checklist-text').forEach(function(input, index) {
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

      // Checklistenlogik nur aktivieren, wenn Liste und Hinzufügen-Button vorhanden sind.
      if (checklistContainer && addChecklistButton) {
        showChecklist();

        // Eingabefeld für neue Arbeitsschritte erstellen und über dem Button einfügen.
        const checklistInputArea = document.createElement('div');
        const newChecklistInput = document.createElement('input');
        const saveChecklistButton = document.createElement('button');

        checklistInputArea.className = 'checklist-input-area';

        newChecklistInput.type = 'text';
        newChecklistInput.id = 'new-checklist-item';
        newChecklistInput.placeholder = 'Neuen Arbeitsschritt eingeben';
        newChecklistInput.setAttribute('aria-label', 'Neuen Arbeitsschritt eingeben');

        saveChecklistButton.type = 'button';
        saveChecklistButton.id = 'save-checklist-item';
        saveChecklistButton.textContent = 'Speichern';

        checklistInputArea.append(newChecklistInput, saveChecklistButton);

        addChecklistButton.before(checklistInputArea);
        checklistInputArea.style.display = 'none';

        // Eingabefeld einblenden, wenn ein neuer Punkt hinzugefügt werden soll.
        // Klick auf "+ Punkt hinzufügen": Eingabefeld für einen neuen Arbeitsschritt anzeigen.
        addChecklistButton.addEventListener('click', function() {
          checklistInputArea.style.display = 'flex';
          newChecklistInput.focus();
        });

        // Neuen Arbeitsschritt speichern und direkt anzeigen.
        // Klick auf "Speichern": neuen Checklistenpunkt in das aktuelle Projekt übernehmen.
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
        // Enter im neuen Checklistenfeld löst denselben Speichern-Vorgang aus wie der Button.
        newChecklistInput.addEventListener('keydown', function(event) {
          if (event.key === 'Enter') {
            event.preventDefault();
            saveChecklistButton.click();
          }
        });

        // Der letzte Checklistenpunkt kann wieder entfernt werden.
        // Falls der Löschen-Button vorhanden ist, entfernt er immer den letzten Checklistenpunkt.
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
      // Notizen werden geladen und bei jeder Eingabe sofort im Projekt gespeichert.
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
            // button.value kommt aus dem value-Attribut im HTML, zum Beispiel "+10" oder "reset".
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

      // Maschenzähler einrichten: Wert wird im Projekt unter "counter" gespeichert.
      setupCounter(counterValue, counterButtons, 'counter');
      // Reihenzähler einrichten: Wert wird im Projekt unter "rowCounter" gespeichert.
      setupCounter(rowCounterValue, rowCounterButtons, 'rowCounter');

      // ============================================================
      // TEIL 8: Projekt löschen
      // ============================================================

      // Löschen-Button nur aktivieren, wenn er auf der Seite vorhanden ist.
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
