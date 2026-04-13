/* ============================================================
   NEUES PROJEKT: Button-Klick zu new-project.html
   ============================================================ */

// wird später im Semester erklärt
document.addEventListener('DOMContentLoaded', function() {
  // wird später im Semester erklärt
  const newProjectBtn = document.getElementById('new-project');
  
  // wird später im Semester erklärt
  if (newProjectBtn) {
    newProjectBtn.addEventListener('click', function() {
      // wird später im Semester erklärt
      window.location.href = 'new-project.html';
    });
  }

  /* ============================================================
     PROJEKT ÖFFNEN: Button-Klick zu project.html
     ============================================================ */

  // wird später im Semester erklärt
  const openProjectBtns = document.querySelectorAll('.open-project-btn');
  
  // wird später im Semester erklärt
  openProjectBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      // wird später im Semester erklärt
      window.location.href = 'project.html';
    });
  });

  /* ============================================================
     NEUES PROJEKT SPEICHERN: Projektdaten in LocalStorage
     ============================================================ */

  // wird später im Semester erklärt
  const projectForm = document.getElementById('project-form');
  
  // wird später im Semester erklärt
  if (projectForm) {
    projectForm.addEventListener('submit', function(e) {
      // wird später im Semester erklärt
      e.preventDefault();
      
      // wird später im Semester erklärt
      const projectData = {
        title: document.getElementById('project-title').value,
        category: document.getElementById('project-category').value,
        description: document.getElementById('project-description').value || '',
        material: document.getElementById('project-material').value || '',
        needleSize: document.getElementById('project-needle-size').value || '',
        pdf: document.getElementById('project-pdf').value || 'Keine Datei'
      };
      
      // wird später im Semester erklärt
      let allProjects = JSON.parse(localStorage.getItem('projects')) || [];
      
      // wird später im Semester erklärt
      projectData.id = Date.now();
      projectData.counter = 0;
      projectData.notes = '';
      projectData.checklist = [];
      
      // wird später im Semester erklärt
      allProjects.push(projectData);
      localStorage.setItem('projects', JSON.stringify(allProjects));
      
      // wird später im Semester erklärt
      alert('Projekt gespeichert!');
      window.location.href = 'index.html';
    });
  }

  /* ============================================================
     MASCHENZÄHLER: Counter-Buttons
     ============================================================ */

  // wird später im Semester erklärt
  const counterValue = document.getElementById('counter-value');
  const counterBtns = document.querySelectorAll('.counter-btn');
  
  // wird später im Semester erklärt
  if (counterValue) {
    let currentCount = parseInt(localStorage.getItem('currentCounter')) || 0;
    counterValue.textContent = currentCount;
    
    // wird später im Semester erklärt
    counterBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        // wird später im Semester erklärt
        const action = btn.getAttribute('value');
        
        // wird später im Semester erklärt
        if (action === 'reset') {
          currentCount = 0;
        } else {
          currentCount += parseInt(action);
        }
        
        // wird später im Semester erklärt
        if (currentCount < 0) currentCount = 0;
        
        // wird später im Semester erklärt
        counterValue.textContent = currentCount;
        localStorage.setItem('currentCounter', currentCount);
      });
    });
  }
});
