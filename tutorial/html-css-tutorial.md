# HTML Basics: Prototyp

## Überblick

HTML (HyperText Markup Language) ist die Grundlage jeder Website.  
Es definiert die Struktur und den Inhalt der Seite, während CSS das Aussehen gestaltet.

In diesem Projekt wird HTML verwendet, um:
- die Seitenstruktur aufzubauen
- Inhalte zu organisieren
- Formulare für Projekte bereitzustellen
- Navigation zwischen Seiten zu ermöglichen

---

## Grundstruktur einer HTML-Seite

Jede Seite folgt diesem Aufbau:

<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>PatternLab</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

</body>
</html>

### Erklärung

- `<!DOCTYPE html>` → definiert HTML5  
- `<html>` → gesamtes Dokument  
- `<head>` → Metadaten (nicht sichtbar)  
- `<body>` → sichtbarer Inhalt der Seite  

---

## Semantische Struktur

Für den Aufbau der Seiten werden semantische HTML-Elemente verwendet:

<aside>...</aside>
<main>...</main>
<section>...</section>
<header>...</header>
<nav>...</nav>

### Bedeutung

- `<aside>` → Sidebar (Navigation)  
- `<main>` → Hauptinhalt  
- `<nav>` → Navigation  
- `<section>` → inhaltlicher Bereich  
- `<header>` → Kopfbereich  

Diese Elemente machen den Code verständlicher und strukturierter.

---

## Navigation mit Links

Seiten werden über Links verbunden:

<a href="new-project.html">Neues Projekt</a>

### Erklärung

- `<a>` = Link  
- `href` = Zielseite  

---

## Container und Struktur

<div class="project-card">
  <h3>Projekt</h3>
</div>

- `<div>` ist ein neutrales Container-Element  
- wird für Layout und Gruppierung verwendet  

---

## Formulare

Formulare werden verwendet, um neue Projekte anzulegen:

<form>
  <label for="title">Titel</label>
  <input type="text" id="title">

  <button>Speichern</button>
</form>

### Wichtige Elemente

- `<form>` → Formular  
- `<input>` → Eingabefeld  
- `<textarea>` → längerer Text  
- `<button>` → Aktion  
- `<label>` → Beschriftung  

---

## Checkliste

Für Arbeitsschritte wird eine Liste mit Checkboxen verwendet:

<ol>
  <li>
    <input type="checkbox">
    Reihe 1 stricken
  </li>
</ol>

- `<ol>` → geordnete Liste  
- `<li>` → Listenelement  
- Checkbox → erledigt / nicht erledigt  

---

## Notizen

<textarea></textarea>

- Mehrzeiliges Eingabefeld für freie Notizen  

---

## Projektdaten

<dl>
  <dt>Material</dt>
  <dd>Wolle</dd>
</dl>

- `<dl>` → Liste von Begriffen und Werten  
- `<dt>` → Begriff  
- `<dd>` → Wert  

---

## PDF einbinden

<embed src="file.pdf" type="application/pdf">

- Zeigt eine PDF direkt im Browser an  

---

## Klassen und CSS

<div class="project-card"></div>

- `class` verbindet HTML mit CSS  
- wird für Styling verwendet  

---

## Grundlayout der Anwendung

Alle Seiten folgen diesem Muster:

<body>

  <aside>Sidebar</aside>

  <main>
    Inhalt der Seite
  </main>

</body>

---

## Fazit

Die wichtigsten HTML-Bausteine in diesem Projekt sind:

- Struktur: `<main>`, `<aside>`, `<section>`  
- Navigation: `<a>`  
- Formulare: `<form>`, `<input>`, `<textarea>`  
- Listen: `<ol>`, `<li>`  
- Metadaten: `<dl>`  
- Container: `<div>`  
- Styling-Verbindung: `class`  

