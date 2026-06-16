// JavaScript erst starten, wenn die HTML-Seite geladen ist.
document.addEventListener('DOMContentLoaded', function() {

  // Zentrale Elemente suchen, die je nach Seite vorhanden sind.
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
  const contrastStorageKey = 'highContrast';
  const textSizeStorageKey = 'textSize';

  // ============================================================
  // TEIL 0: Barrierefreiheitsoptionen
  // ============================================================

  // Der Kontrastmodus nutzt eine Body-Klasse, damit alle Farben zentral im CSS wechseln.
  function setContrastState(highContrastIsActive) {
    document.body.classList.toggle('high-contrast', highContrastIsActive);

    if (contrastToggle) {
      contrastToggle.setAttribute('aria-pressed', String(highContrastIsActive));
      contrastToggle.setAttribute('aria-label', highContrastIsActive ? 'Normalen Kontrast aktivieren' : 'Kontrast erhÃ¶hen');
    }
  }

  setContrastState(localStorage.getItem(contrastStorageKey) === 'true');

  if (contrastToggle) {
    contrastToggle.addEventListener('click', function() {
      const highContrastIsActive = !document.body.classList.contains('high-contrast');

      localStorage.setItem(contrastStorageKey, String(highContrastIsActive));
      setContrastState(highContrastIsActive);
    });
  }

  // Die SchriftgrÃ¶ÃŸe rotiert durch mehrere Stufen bis 200 Prozent.
  function setTextSizeState(textSize) {
    textSizeSteps.forEach(function(step) {
      document.body.classList.remove('text-size-' + step);
    });

    if (textSize !== 100) {
      document.body.classList.add('text-size-' + textSize);
    }

    if (textSizeToggle) {
      textSizeToggle.setAttribute('aria-label', 'SchriftgrÃ¶ÃŸe erhÃ¶hen, aktuell ' + textSize + ' Prozent');
    }
  }

  let currentTextSize = Number(localStorage.getItem(textSizeStorageKey)) || 100;

  if (!textSizeSteps.includes(currentTextSize)) {
    currentTextSize = 100;
  }

  setTextSizeState(currentTextSize);

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

  function setMenuState(menuIsOpen) {
    if (!sidebar || !menuToggle) {
      return;
    }

    sidebar.classList.toggle('is-open', menuIsOpen);
    document.body.classList.toggle('menu-open', menuIsOpen);
    menuToggle.setAttribute('aria-expanded', String(menuIsOpen));
    menuToggle.setAttribute('aria-label', menuIsOpen ? 'Navigation schlieÃŸen' : 'Navigation Ã¶ffnen');
  }

  // Mobile Navigation ein- und ausklappen.
  if (sidebar && menuToggle) {
    menuToggle.addEventListener('click', function() {
      const menuIsOpen = !sidebar.classList.contains('is-open');
      setMenuState(menuIsOpen);
    });

    sidebar.querySelectorAll('nav a, footer a').forEach(function(link) {
      link.addEventListener('click', function() {
        setMenuState(false);
      });
    });
  }

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
  if (filterToggle && dashboardFilters) {
    filterToggle.addEventListener('click', function() {
      const filtersAreOpen = dashboardFilters.classList.toggle('is-open');

      filterToggle.setAttribute('aria-expanded', String(filtersAreOpen));
    });
  }

  // Projekte aus dem Browser laden. Wenn noch nichts gespeichert ist, startet die App mit einer leeren Liste.
  let allProjects = JSON.parse(localStorage.getItem('projects')) || [];

  // Projekte zentral speichern, damit nicht Ã¼berall derselbe LocalStorage-Code steht.
  function saveProjects() {
    // JSON.stringify macht aus dem Array einen Text, den LocalStorage speichern kann.
    localStorage.setItem('projects', JSON.stringify(allProjects));
  }

  // Kategorien werden technisch kurz gespeichert, aber lesbar angezeigt.
  function getCategoryName(category) {
    // Die Werte kommen aus den value-Attributen im Formular.
    if (category === 'haekeln') {
      return 'HÃ¤keln';
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

  // GitHub-Ansichtslinks werden fÃ¼r die PDF-Anzeige in direkte Datei-Links umgewandelt.
  function getPdfDisplayUrl(pdfUrl) {
    // GitHub-Links mit /blob/ zeigen eine Webseite. FÃ¼r <embed> brauchen wir die direkte Datei.
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

  // Dieser Teil lÃ¤uft nur auf der Formularseite.
  if (projectForm) {
    const formUrlParams = new URLSearchParams(window.location.search);
    const editProjectId = Number(formUrlParams.get('id'));

    const projectToEdit = allProjects.find(function(project) {
      // find gibt das erste Projekt zurÃ¼ck, dessen ID zur URL-ID passt.
      return project.id === editProjectId;
    });

    // Wenn eine Projekt-ID in der URL steht, wird das Formular zum Bearbeiten gefÃ¼llt.
    if (projectToEdit) {
      document.getElementById('project-title').value = projectToEdit.title || '';
      document.getElementById('project-category').value = projectToEdit.category || '';
      document.getElementById('project-description').value = projectToEdit.description || '';
      document.getElementById('project-material').value = projectToEdit.material || '';
      document.getElementById('project-needle-size').value = projectToEdit.needleSize || '';
      document.getElementById('project-pdf-url').value = projectToEdit.pdfUrl || '';
    }

    // Mit Enter springt der Fokus im Formular zum nÃ¤chsten Feld.
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
        // Beim Bearbeiten werden nur die Grunddaten Ã¼berschrieben.
        // Checkliste, Notizen und ZÃ¤hler bleiben erhalten.
        projectToEdit.title = projectData.title;
        projectToEdit.category = projectData.category;
        projectToEdit.description = projectData.description;
        projectToEdit.material = projectData.material;
        projectToEdit.needleSize = projectData.needleSize;
        projectToEdit.pdfUrl = projectData.pdfUrl;
      } else {
        // Neues Projekt zur Liste hinzufÃ¼gen
        allProjects.push(projectData);
      }

      // Projekte im LocalStorage speichern
      saveProjects();

      // ZurÃ¼ck zum Dashboard oder zur bearbeiteten Projektseite
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

  // Dieser Teil lÃ¤uft nur auf dem Dashboard.
  if (projectsContainer) {

    function createProjectInfo(label, value) {
      const paragraph = document.createElement('p');
      const strong = document.createElement('strong');

      strong.textContent = label + ': ';
      paragraph.append(strong, value);

      return paragraph;
    }

    function createProjectCard(project) {
      const card = document.createElement('article');
      const title = document.createElement('h2');
      const openButton = document.createElement('button');

      card.className = 'project-card';
      title.textContent = project.title || 'Unbenanntes Projekt';

      openButton.className = 'btn-secondary open-project-btn';
      openButton.type = 'button';
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
    function showProjectCards() {
      projectsContainer.replaceChildren();

      const searchText = projectSearch ? projectSearch.value.toLowerCase() : '';
      const selectedCategory = categoryFilter ? categoryFilter.value : 'all';

      const filteredProjects = allProjects.filter(function(project) {
        // toLowerCase sorgt dafÃ¼r, dass GroÃŸ- und Kleinschreibung bei der Suche egal sind.
        const projectTitleText = (project.title || '').toLowerCase();
        const projectDescription = (project.description || '').toLowerCase();
        const matchesSearch =
          projectTitleText.includes(searchText) ||
          projectDescription.includes(searchText);
        const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;

        return matchesSearch && matchesCategory;
      });

      // FÃ¼r jedes gefilterte Projekt wird eine Karte erstellt.
      filteredProjects.forEach(function(project) {
        projectsContainer.appendChild(createProjectCard(project));
      });

      // Die Projekt-ID wird beim Ã–ffnen in der URL mitgegeben.
      document.querySelectorAll('.open-project-btn').forEach(function(button) {
        button.addEventListener('click', function() {
          // dataset.projectId liest den Wert aus data-project-id.
          window.location.href = 'project.html?id=' + button.dataset.projectId;
        });
      });
    }

    showProjectCards();

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

  // Dieser Teil lÃ¤uft nur auf der Projektseite.
  if (projectTitle && projectCategory && projectDataContainer) {

    // Die Projekt-ID aus der URL lesen, zum Beispiel aus project.html?id=123.
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = Number(urlParams.get('id'));

    // Das passende Projekt aus der gespeicherten Projektliste suchen.
    const currentProject = allProjects.find(function(project) {
      return project.id === projectId;
    });

    function appendProjectData(term, value) {
      const termElement = document.createElement('dt');
      const valueElement = document.createElement('dd');

      termElement.textContent = term + ':';
      valueElement.textContent = value;

      projectDataContainer.append(termElement, valueElement);
    }

    function createChecklistItem(item) {
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

      // Der Bearbeiten-Link Ã¶ffnet das bestehende Formular mit dieser Projekt-ID.
      if (editProjectLink) {
        editProjectLink.href = 'new-project.html?id=' + currentProject.id;
      }

      // Optionale Projektdaten anzeigen. Leere Felder bekommen einen kurzen Hinweis.
      projectDataContainer.replaceChildren();
      appendProjectData('Beschreibung', currentProject.description || 'Keine Beschreibung vorhanden');
      appendProjectData('Material', currentProject.material || 'Kein Material angegeben');
      appendProjectData('Nadelstärke', currentProject.needleSize || 'Keine Nadelstärke angegeben');

      // Die PDF wird Ã¼ber den gespeicherten Link in die Projektansicht eingebunden.
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
      // TEIL 5: Checkliste anzeigen und neue Punkte hinzufÃ¼gen
      // ============================================================

      // Ã„ltere Projekte bekommen beim Ã–ffnen eine leere Checkliste.
      if (!currentProject.checklist) {
        currentProject.checklist = [];
      }

      // Fortschritt aus erledigten und offenen Checklistenpunkten anzeigen.
      function showProgress() {
        const progress = calculateProgress(currentProject);
        projectProgress.textContent = progress + '%';
      }

      // Checklistenpunkte anzeigen und ihre Ã„nderungen speichern.
      function showChecklist() {
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

      if (checklistContainer && addChecklistButton) {
        showChecklist();

        // Eingabefeld fÃ¼r neue Arbeitsschritte erstellen und Ã¼ber dem Button einfÃ¼gen.
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

        // Eingabefeld einblenden, wenn ein neuer Punkt hinzugefÃ¼gt werden soll.
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

      // Gespeicherte Notizen laden und jede Ã„nderung direkt speichern.
      if (projectNotes) {
        projectNotes.value = currentProject.notes || '';

        projectNotes.addEventListener('input', function() {
          currentProject.notes = projectNotes.value;
          saveProjects();
        });
      }

      // ============================================================
      // TEIL 7: MaschenzÃ¤hler und ReihenzÃ¤hler speichern
      // ============================================================

      // Gemeinsame Logik fÃ¼r Maschen- und ReihenzÃ¤hler.
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
      // TEIL 8: Projekt lÃ¶schen
      // ============================================================

      if (deleteProjectButton) {
        deleteProjectButton.addEventListener('click', function() {
          const shouldDelete = confirm('Soll dieses Projekt wirklich gelÃ¶scht werden?');

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
      // Falls die ID nicht existiert, bekommt die Nutzerin eine klare RÃ¼ckmeldung.
      projectTitle.textContent = 'Projekt nicht gefunden';
    }
  }

});




