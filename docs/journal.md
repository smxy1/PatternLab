# Journal

Dieses Journal dokumentiert die Planung, Konzeption und Umsetzung des Projekts PatternLab. Neben den einzelnen Entwicklungsschritten werden auch technische Entscheidungen, aufgetretene Probleme und deren Lösungen festgehalten.

---

## bis 20.03.2026
Projektidee „PatternLab“ entwickelt: Webanwendung zur Organisation von Häkel- und Strickprojekten mit Fokus auf Anleitungen, Notizen, Fortschritt und integriertem Maschenzähler.

---

## 20.03. – 24.03.2026
Materialien gesammelt (mehrere Häkel- und Strickanleitungen als PDF, inkl. Text und Chart).  
Grundlegende Überlegungen zu Funktionen und Datenstruktur angestellt.

---

## 24.03.2026
Feedback zur Projektidee erhalten: Backend langfristig notwendig, aber Prototyp mit LocalStorage ausreichend.  
Hinweis: mögliche Erweiterung mit Firebase Spark für Mehrbenutzerbetrieb

---

## 26.03.2026
Analyse der vorhandenen PDFs durchgeführt.  
Festgestellt, dass die Anleitungen unterschiedlich aufgebaut sind (Text vs. Chart) und nicht sinnvoll automatisiert strukturiert werden können.

---

## 27.03.2026
Entscheidung zum Umgang mit Daten getroffen: PDFs werden unverändert eingebunden und nicht automatisch verarbeitet.  
Konzept entwickelt, strukturierte Daten (Checklisten, Notizen) durch Nutzer:innen erzeugen zu lassen.

---

## 30.03.2026
Funktionsumfang definiert: Projekte anlegen, PDF-Anzeige, Notizen, Checkliste, Fortschrittsanzeige und Maschenzähler.  
Erste Datenstruktur für Projekte (Metadaten, Checkliste, Notizen) festgelegt.

---

## 02.04.2026
Erste Design- und Navigationskonzepte entwickelt (Dashboard, Projektseite, Formular).  
Verschiedene Layout-Optionen (Top-Navigation vs. Sidebar) verglichen.

---

## 04.04.2026
Designentscheidungen getroffen: Sidebar-Navigation, Kartenlayout im Dashboard, zweispaltige Projektansicht.  
Farbschema und reduzierter, ruhiger Stil festgelegt.

---

## 06.04.2026
Mockups für Dashboard, Projektseite und Projekt erstellt.  
Struktur der Anwendung und Anordnung der Funktionen finalisiert.

---

## 07.04.2026
GitHub-Repository erstellt und grundlegende Dateienstruktur angelegt.

---

## 08.04.2026
Dokumentation erstellt (requirements.md, data.md, visual-design.md) und auf GitHub committed.  

---

## 09.04.2026
HTML-Struktur erstellen (imprint, index, new-project, project), auf GitHub committed und parallel das Tutorial dazu erstellt (Basics als .md und spezifisch als Kommentare).

---

## 10.04.2026
HTML-Struktur finalisiert und CSS-Layout für alle Seiten umgesetzt. README erstellt und Design-Mockups ins Repository integriert.

---

## 12.04.2026
Erste JavaScript-Interaktion umgesetzt.

---

## 13.04.2026
Tutorial zu HTML- und CSS- Basics erstellt sowie bestehenden Code mit erklärenden Kommentaren ergänzt, Open Sans über Google Fonts eingebunden und weitere Implementierungsschritte geplant.

---

## 14.04.2026
Zweispaltiges Layout der Projektseite überarbeitet.
Struktur für rechte Interaktionsspalte mit Projekt-Tools (z. B. Maschenzähler / Checkpoints) vorbereitet.

---

## 16.04.2026

Kommentarstruktur für HTML-, CSS- und JavaScript-Dateien überarbeitet.  
Festgelegt, dass Kommentare kurz, verständlich und anfängerfreundlich formuliert werden sollen.

---

## 27.04.2026

Konzept für Assignment 2 (JavaScript-Erweiterung) ausgearbeitet.Geplante Funktionen definiert: Projekt per Formular anlegen und als Karte anzeigen, dynamische Checkliste, automatische Fortschrittsanzeige sowie Maschenzähler mit mehreren Buttons.

---

## bis 28.04.2026

Konzept für Assignment 2 (JavaScript-Erweiterung) ausgearbeitet.  
Geplante Funktionen definiert: Projekte per Formular anlegen und anzeigen, Checkliste, Fortschrittsanzeige sowie Maschen- und Reihenzähler.

---

## 28.04.2026

Feedback zum Konzept erhalten und Umfang der Anwendung reduziert, damit die JavaScript-Erweiterung den Anforderungen des Assignments entspricht.

## 19.05.2026

Assignment 2 präsentiert. Umgesetzt wurde die Projekterstellung über ein Formular mit Speicherung im LocalStorage sowie die dynamische Anzeige von Projektkarten im Dashboard.

---

## 11.06.2026

JavaScript-Anwendung erweitert. Such- und Filterfunktionen für Projekte implementiert, sodass Projekte nun nach Kategorie gefiltert sowie über Titel und Beschreibung durchsucht werden können.

Zusätzlich Funktionen zum Bearbeiten und Löschen von Projekten umgesetzt. Für die Bearbeitung wird das bestehende Formular wiederverwendet und automatisch mit den vorhandenen Daten aus dem LocalStorage befüllt.

Die Checklistenfunktion erweitert. Checklistenpunkte können nun erstellt, bearbeitet, gelöscht und als erledigt markiert werden. Aus den erledigten Einträgen wird automatisch ein Fortschrittswert berechnet und auf den Projektkarten angezeigt.

---

## 11.06.2026

Möglichkeiten zur Erweiterung des Projekts um ein Backend untersucht. Aufbauend auf früherem Feedback wurde Firebase Spark getestet, um langfristig Benutzerkonten und geräteübergreifende Datenspeicherung zu ermöglichen.

Dabei festgestellt, dass für die Speicherung von PDF-Dateien Firbase Storage und somit Firebase Blaze benötigt wird, wodurch bei Überschreitung des Freikontingents Kosten entstehen können. Die Ergebnisse zusätzlich in einem Forumsbeitrag dokumentiert.

Entscheidung getroffen, in der aktuellen Version weiterhin ausschließlich LocalStorage zu verwenden.

---

## 11.06.2026

Problem bei der Speicherung von PDF-Dateien analysiert. Da LocalStorage ausschließlich Zeichenketten speichern kann, lassen sich PDF-Dateien nicht direkt speichern.

Als Lösung beschlossen, PDF-Dateien über öffentlich erreichbare URLs einzubinden und lediglich die jeweilige Adresse im LocalStorage abzulegen. Aus dieser Fragestellung entstand außerdem die Idee für einen FAQ-Bereich.

---

### 12.06.2026

Codebasis überprüft und überarbeitet. HTML-, CSS- und JavaScript-Dateien auf Redundanzen untersucht, bestehende Strukturen vereinfacht und wiederkehrende Werte ausgelagert.

Zusätzlich Kommentare ergänzt und überarbeitet, um die Verständlichkeit und Wartbarkeit des Codes zu verbessern.

---

## 14.06.2026

Benutzeroberfläche überarbeitet und bestehende CSS-Strukturen vereinheitlicht. Darstellung von Checklisten, Notizen und weiteren Interaktionselementen angepasst, um ein konsistenteres Erscheinungsbild zu erreichen.

Zusätzlich HTML-Struktur mit dem W3C Validator überprüft und kleinere Fehler sowie Probleme in der Überschriftenhierarchie behoben.

---

## 15.06.2026

Mobile-First-Optimierungen umgesetzt. Das bisherige zweispaltige Desktoplayout wurde für kleinere Bildschirme in ein einspaltiges Layout umgewandelt.

Die dauerhaft sichtbare Sidebar wurde auf Mobilgeräten durch ein Hamburger-Menü ersetzt, um die Bedienbarkeit auf Smartphones und Tablets zu verbessern.

---

## 15.06.2026

FAQ-Seite erstellt und mit häufigen Fragen zur Datenspeicherung, PDF-Einbindung und den Funktionen der Anwendung befüllt.

Zusätzlich eine eigene E-Mail-Adresse für Fragen, Anregungen und Feedback eingerichtet und im FAQ-Bereich verlinkt. Parallel dazu das Impressum vervollständigt.

---

## 15.06.2026

Eigenes Logo für PatternLab entwickelt. Ziel war es, die Themen Handarbeit und „Lab“ in einem gemeinsamen Symbol zu verbinden.

Nach mehreren Entwürfen entstand die Idee, ein Wollknäuel mit Stricknadeln zu kombinieren. Das lose Ende des Wollfadens bildet gemeinsam mit dem Umriss des Knäuels die Form eines stilisierten Reagenzglases. Das finale Logo wurde in Procreate selbst erstellt und anschließend als Logo sowie als Favicon eingebunden.

---

## 16.06.2026

Accessibility der Anwendung überprüft. Hierfür wurde das WAVE Accessibility Evaluation Tool verwendet. Mehrere Hinweise und Fehler behoben, insbesondere fehlende Labels und Beschreibungen von Formular- und Navigationselementen.

Da die ursprüngliche Farbpalette zu mehreren Kontrastwarnungen führte, wurde ein optionaler Kontrastmodus über einen Button in der Sidebar umgesetzt. Zusätzlich eine Funktion zur Schriftgrößenanpassung bis 200 % integriert. Inspiration dafür bot die Webseite des Odilien-Insitut Graz für Sehbehinderte: https://wwww.odilien.at

Orientierung an den WCAG-Kriterien 1.4.3 (Contrast Minimum) und 1.4.4 (Resize Text).

---

### 16.06.2026

Dokumentation erweitert. README.md um zusätzliche Informationen zur Nutzung, zu Quellen, Sprachunterstützung sowie zu den Accessibility-Funktionen ergänzt.

Zusätzlich ein Accessibility Statement erstellt und die umgesetzten Maßnahmen dokumentiert.

---

### 16.06.2026

Verschiedene Open-Source-Lizenzen verglichen und bewertet. Nach der Analyse möglicher Alternativen die GNU General Public License v3.0 (GPL-3.0) gewählt.

Ausschlaggebend war die Überlegung, dass PatternLab und zukünftige Weiterentwicklungen langfristig frei zugänglich und Open Source bleiben sollen.
