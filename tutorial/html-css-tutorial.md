# HTML & CSS Basics

# HTML Basics
## Grundstruktur einer HTML-Seite

Jede HTML-Seite folgt einem festen Aufbau:

<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>Seite</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

</body>
</html>

### Erklärung

- `<!DOCTYPE html>` → definiert HTML5  
- `<html>` → gesamtes Dokument  
- `<head>` → Metadaten (nicht sichtbar)  
- `<body>` → sichtbarer Inhalt  

---

## HTML-Elemente

Ein HTML-Element besteht meist aus:

<tag>Inhalt</tag>

### Beispiel

<p>Text</p>

- `<p>` → Start-Tag  
- `</p>` → End-Tag  
- Inhalt steht dazwischen  

Einige Elemente sind selbstschließend:

<img src="bild.jpg" alt="Beschreibung">

---

## Attribute

Attribute liefern zusätzliche Informationen zu Elementen.

<a href="seite.html">Link</a>

- `href` → Zieladresse  

<img src="bild.jpg" alt="Bildbeschreibung">

- `src` → Quelle  
- `alt` → Beschreibung  

---

## Überschriften und Text

<h1>Überschrift</h1>
<p>Absatz</p>

- `<h1> - <h6>` → Überschriften  
- `<p>` → Absatz  

Textauszeichnung:

<strong>Fett</strong>
<em>Kursiv</em>

- `<strong>` → wichtige Hervorhebung  
- `<em>` → Betonung  

---

## Links

<a href="seite.html">Zur Seite</a>

- Verbindet verschiedene Seiten miteinander  
- Grundlage der Navigation  

---

## Bilder

<img src="bild.jpg" alt="Beschreibung">

- Zeigt Bilder an  
- `alt` ist wichtig für Barrierefreiheit  

---

## Listen

<ul>
  <li>Element</li>
</ul>

<ol>
  <li>Element</li>
</ol>

- `<ul>` → ungeordnete Liste  
- `<ol>` → geordnete Liste  
- `<li>` → Listenelement  

---

## Semantische Elemente

<header>...</header>
<nav>...</nav>
<main>...</main>
<section>...</section>
<aside>...</aside>

### Bedeutung

- `<header>` → Kopfbereich  
- `<nav>` → Navigation  
- `<main>` → Hauptinhalt  
- `<section>` → inhaltlicher Abschnitt  
- `<aside>` → Zusatzbereich  

Diese Elemente strukturieren die Seite logisch.

---

## Container

<div>Inhalt</div>
<span>Text</span>

- `<div>` → Block-Element für Struktur  
- `<span>` → Inline-Element für kleinere Inhalte  

---

## Formulare

<form>
  <label for="name">Name</label>
  <input type="text" id="name">

  <textarea></textarea>

  <button>Senden</button>
</form>

### Wichtige Elemente

- `<form>` → Formular  
- `<input>` → Eingabefeld  
- `<textarea>` → mehrzeiliger Text  
- `<button>` → Aktion  
- `<label>` → Beschriftung  

---

## Tabellen (Grundlagen)

<table>
  <tr>
    <th>Titel</th>
    <th>Wert</th>
  </tr>
  <tr>
    <td>A</td>
    <td>B</td>
  </tr>
</table>

- `<table>` → Tabelle  
- `<tr>` → Zeile  
- `<th>` → Kopfzelle  
- `<td>` → Datenzelle  

---

## HTML und CSS

HTML und CSS arbeiten zusammen:

- HTML → Struktur  
- CSS → Darstellung  

CSS wird über `class` oder `id` mit HTML verbunden:

<div class="box"></div>

---

## Grundlayout einer Seite

<body>

  <aside>Sidebar</aside>

  <main>
    Inhalt der Seite
  </main>

</body>

---

# CSS Basics
## Grundsyntax

CSS besteht aus Regeln, die auf HTML-Elemente angewendet werden.

selector {
  property: value;
}

### Erklärung

- `selector` → bestimmt, welche Elemente gestylt werden  
- `property` → beschreibt die Eigenschaft (z. B. Farbe)  
- `value` → legt den Wert fest  

### Beispiel

p {
  color: blue;
  font-size: 16px;
}

Alle Absätze werden blau dargestellt und haben eine Schriftgröße von 16 Pixel.

---

## Selektoren

### Element-Selektor

p {
  color: red;
}

- Gilt für alle `<p>`-Elemente  

### Klassen-Selektor

.box {
  background-color: lightgray;
}

- Gilt für alle Elemente mit `class="box"`  

### ID-Selektor

#main {
  font-weight: bold;
}

- Gilt für das Element mit `id="main"`  
- Sollte nur einmal pro Seite verwendet werden  

### Kombination

div.box {
  padding: 10px;
}

- Nur `<div>`-Elemente mit Klasse `box`  

---

## CSS einbinden

### Externe Datei (Standard)

<link rel="stylesheet" href="css/style.css">

- CSS wird in einer separaten Datei gespeichert  
- Wird im `<head>` eingebunden  
- Wiederverwendbar für mehrere Seiten  

### Interne Styles

<style>
  body { margin: 0; }
</style>

- Direkt im HTML-Dokument  
- Nur für eine Seite  

### Inline Styles

<p style="color: red;">Text</p>

- Direkt im Element  
- Schwer wartbar, vermeiden  

---

## Farben

color: red;
background-color: #f0f0f0;

- `color` → Textfarbe  
- `background-color` → Hintergrundfarbe  

Farben können als:
- Namen (`red`)
- Hex (`#ff0000`)
- RGB (`rgb(255,0,0)`) angegeben werden  

---

## Text und Schrift

font-size: 16px;
font-family: Arial, sans-serif;
text-align: center;

- `font-size` → Schriftgröße  
- `font-family` → Schriftart  
- `text-align` → Ausrichtung  

---

## Box-Modell

Jedes Element besteht aus:

- Content → Inhalt  
- Padding → Innenabstand  
- Border → Rahmen  
- Margin → Außenabstand  

### Beispiel

div {
  margin: 10px;
  padding: 10px;
  border: 1px solid black;
}

---

## Größe

width: 200px;
height: 100px;

- Legt Breite und Höhe eines Elements fest  

---

## Layout (projektrelevant)

### Flexbox (für einfache Layouts)

.container {
  display: flex;
}

- Elemente werden nebeneinander angeordnet  

### Beispiel Sidebar + Inhalt

body {
  display: flex;
}

aside {
  width: 200px;
}

main {
  flex: 1;
}

- Sidebar hat feste Breite  
- Hauptbereich nimmt restlichen Platz ein  

---

## Abstände

margin: 10px;
padding: 10px;

- `margin` → Abstand nach außen  
- `padding` → Abstand nach innen  

---

## Klassen im Projekt

.project-card {
  border: 1px solid #ccc;
  padding: 10px;
}

.button {
  background-color: black;
  color: white;
}

- Klassen werden für wiederverwendbare Komponenten genutzt  

---

## Zustände (einfach)

a:hover {
  color: blue;
}

- Wird angewendet, wenn der Benutzer mit der Maus über ein Element fährt  

---