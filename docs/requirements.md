## Projekt: PatternLab

PatternLab ist eine Webanwendung zur Organisation von Häkel- und Strickprojekten.  
Die Anwendung ergänzt hochgeladene PDF-Anleitungen durch Notizen, Checklisten und Fortschrittsverfolgung, ohne deren Inhalt automatisch zu strukturieren.

---

## Must-have

- Die Anwendung muss das Erstellen neuer Projekte ermöglichen.
- Jedes Projekt muss einen Titel und eine Kategorie („Häkeln“ oder „Stricken“ oder "Andere") besitzen.
- Jedes Projekt muss optionale Metadaten (Beschreibung, Material, Nadelstärke) speichern können.
- Die Anwendung muss das Hochladen oder Einbinden einer PDF-Anleitung pro Projekt ermöglichen.
- Die Anwendung muss die PDF-Anleitung in der Projektansicht anzeigen oder zugänglich machen.
- Die Anwendung darf keine automatische Umwandlung oder Strukturierung der PDF-Inhalte voraussetzen.
- Die Anwendung muss eine Projekt-Detailansicht bereitstellen.
- Die Detailansicht muss Anleitung, Metadaten und interaktive Funktionen gemeinsam darstellen.
- Die Anwendung muss projektspezifische Notizen speichern und anzeigen können.
- Die Anwendung muss pro Projekt eine Checkliste erstellen und bearbeiten lassen.
- Die Anwendung muss Checklistenpunkte als erledigt oder unerledigt speichern.
- Die Anwendung muss den Fortschritt aus dem Verhältnis erledigter zu Gesamtpunkten berechnen und anzeigen.
- Die Anwendung muss ein Dashboard mit allen Projekten anzeigen.
- Das Dashboard muss pro Projekt Titel, Kategorie und Fortschritt anzeigen.
- Die Anwendung muss Navigation zwischen Dashboard, Projektansicht und Projekt-Erstellung ermöglichen.
- Die Anwendung muss eine Seite oder Ansicht zum Erstellen neuer Projekte besitzen.
- Die Anwendung muss ein übersichtliches, ruhiges und nicht überladenes UI verwenden.
- Die Anwendung muss mit HTML, CSS und JavaScript umsetzbar sein.
- Die Anwendung muss ohne Backend als Prototyp funktionieren.
- Die Anwendung muss Projektdaten persistent im Browser speichern (z. B. LocalStorage).
- Die Anwendung muss als statische Website (z. B. über GitHub Pages) deploybar sein.
- Die Anwendung muss ein Impressum enthalten, wenn sie öffentlich zugänglich ist.

---

## Nice-to-have

- Die Anwendung kann einen Maschenzähler pro Projekt bereitstellen.
- Der Maschenzähler kann Schritte wie +1, +10, +15, −1 und Reset unterstützen.
- Der Maschenzähler kann persistent gespeichert werden.
- Die Anwendung kann PDF-Anzeigen mit Zoom oder besserer Lesbarkeit erweitern.
- Die Anwendung kann Projekte filtern oder durchsuchen.
- Die Anwendung kann Projekte nach Kategorie sortieren oder filtern.
- Die Anwendung kann zusätzliche Statuswerte (z. B. „in Arbeit“, „fertig“) unterstützen.
- Die Anwendung kann mehrere Notizbereiche pro Projekt unterstützen.
- Die Anwendung kann Tags für Projekte unterstützen.
- Die Anwendung kann Fortschritt visuell als Balken darstellen.
- Die Anwendung kann ein Sidebar-basiertes Layout nutzen.
- Die Anwendung kann responsiv gestaltet werden.
- Die Anwendung kann später um ein Backend für Nutzerdaten und Projektverwaltung erweitert werden.
- Die Anwendung kann für Mehrbenutzerbetrieb und Synchronisation mit Firebase Spark erweitert werden.

---

## Offene Fragen

- Wie werden PDFs technisch eingebunden (Upload, Referenz oder Demo-Dateien)?
- Können PDFs im LocalStorage sinnvoll gespeichert werden oder nur referenziert?
- Wird die Anwendung als Multi-Page-App oder Single-Page-App umgesetzt?
- Wie genau wird die PDF-Anzeige realisiert (Einbettung vs. Öffnen)?
- Können Projekte gelöscht werden?
- Werden Checklistenpunkte beim Erstellen oder erst in der Detailansicht angelegt?
- Gibt es einen oder mehrere Maschenzähler pro Projekt?
- Ist der Maschenzähler Teil des MVP oder optional?
- Welche zusätzlichen Projektdaten (z. B. Größe, Datum) werden gespeichert?
- Wie wird die Detailansicht strukturiert (Spaltenlayout vs. Tabs)?
- Werden chartbasierte Anleitungen speziell behandelt oder wie normale PDFs dargestellt?
- Welche Designparameter (Farben, Typografie) werden final festgelegt?
- Soll die Anwendung für eine spätere Backend-Integration vorbereitet werden?
- Welche Daten sollen bei einer Backend-Version benutzerbezogen gespeichert werden?