## Überblick

Die Anwendung kombiniert unveränderte PDF-Anleitungen mit nutzergenerierten, strukturierten Projektdaten.  
PDFs dienen als Referenz; Struktur (Notizen, Checklisten, Fortschritt) wird durch Nutzer:innen erzeugt.

---

## Vorhandene Daten

- Eine Strickanleitung (Sailorslipper) als PDF
- Drei Filethäkel-Anleitungen als PDF (Text + Raster-Chart)
- Eine Häkelanleitung als textbasierte PDF
- PDFs enthalten entweder linearen Text oder visuelle Muster (Charts)
- PDFs sind nicht in maschinenlesbare Einzelschritte strukturiert

---

## Datenformate

- Anleitungen liegen im PDF-Format vor
- Inhalte bestehen aus Text (Schritte/Reihen) oder Grafiken (Charts)
- Projektdaten werden als strukturierte Daten (JSON/JavaScript-Objekte) gespeichert
- Speicherung erfolgt im Browser (LocalStorage)

---

## Datenverwendung

- PDFs werden unverändert eingebunden oder referenziert
- PDF-Inhalte werden nicht automatisch analysiert oder strukturiert
- Strukturierte Daten werden durch Nutzer:innen erzeugt
- Originaldaten (PDF) und Nutzerdaten werden getrennt behandelt

---

## Umwandlung

- Es erfolgt keine automatische Transformation von PDFs
- Anleitungsschritte werden nicht extrahiert
- Struktur entsteht ausschließlich durch Nutzereingaben

---

## Fehlende Daten

- Projektdaten entstehen erst durch Nutzung
- Checklistenpunkte existieren initial nicht
- Notizen existieren initial nicht
- Fortschrittswerte existieren initial nicht
- Maschenzählerwerte existieren initial nicht

---

## Datenstruktur

Ein Projekt enthält:

- id
- title
- category
- description (optional)
- materials (optional)
- needleSize (optional)
- pdf (Referenz oder Einbindung)
- checklist: [{ text, done }]
- notes
- progress (berechnet)
- counter (optional)

---

## Datenverarbeitung

- Projekte müssen erstellt, geladen, aktualisiert und angezeigt werden
- Änderungen an Checkliste, Notizen und Zähler werden gespeichert
- Fortschritt wird dynamisch berechnet
- Daten werden nach Neuladen wiederhergestellt

---

## Besonderheiten

- Kombination aus unstrukturierten (PDF) und strukturierten Daten
- Struktur ist unabhängig vom PDF-Inhalt
- Unterschiedliche PDF-Typen werden gleich behandelt
- Datenqualität hängt von Nutzereingaben ab

---

## Einschränkungen

- LocalStorage ist in Speichergröße begrenzt
- PDFs sind ggf. zu groß für direkte Speicherung
- PDFs müssen ggf. referenziert werden
- Speicherung ist gerätegebunden
- Kein Mehrbenutzerbetrieb im Prototyp
- Keine Synchronisation zwischen Geräten
- Für Mehrbenutzerbetrieb ist ein Backend erforderlich (z. B. Firebase Spark)

---

## Kommentare im Code

- Kommentare sollen kurz, klar und verständlich formuliert sein.
- Kommentare sollen erklären, was ein Codeabschnitt macht, ohne jede einzelne Zeile unnötig zu wiederholen.
- Kommentare sollen erklären, warum ein bestimmter Code verwendet wird, wenn das nicht direkt erkennbar ist.
- Kommentare sollen die Orientierung im Code erleichtern, zum Beispiel durch kurze Abschnittsüberschriften.
- Kommentare sollen so geschrieben sein, dass auch Personen mit sehr wenig Erfahrung in HTML, CSS und JavaScript den grundlegenden Aufbau nachvollziehen können.
- Kommentare sollen nicht zu lang sein, damit der Code übersichtlich bleibt.