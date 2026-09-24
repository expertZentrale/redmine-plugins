---
layout: plugin
lang: de
ref: agile
plugin: agile
permalink: /de/agile/
title: expert Agile
description: >-
  Kanban- und Scrum-Boards für Redmine auf Basis von Redmines eigenem
  Query-System, mit Story Points, echten Sprints, Backlog-Planer und Diagrammen
  für Burndown, Burnup, Velocity, Cumulative Flow und Durchlaufzeit. GPL-2.0.
promise: >-
  Ein Kanban- und Scrum-Board, das eine Redmine-Query *ist*. Jeder Filter, jede
  Spalte, jede Gruppierung und jede Sichtbarkeitsregel, die Sie in der
  Ticketliste nutzen, gilt am Board unverändert — und ein gespeichertes Board ist
  eine Zeile in Redmines eigener Query-Tabelle.
intro: >-
  Agile-Plugins bauen üblicherweise eine zweite, parallele Welt: eigene Filter,
  eigene Berechtigungen, eine eigene Vorstellung davon, welche Tickets Sie sehen
  dürfen. Dieses nicht. Das Board ist eine Unterklasse von `IssueQuery` und erbt
  damit Redmines Filterung, Sortierung, Gruppierung und Sichtbarkeitsregeln
  vollständig; die Board-Einstellungen reisen in der Options-Spalte der Query mit.

features:
  - kicker: Das Board
    title: Die Spalten sind Ihre Ticketstatus
    shot: 01-board
    caption: >-
      Agile-Board mit fünf Statusspalten — Zu erledigen, In Arbeit, eine
      gemeinsame Dev-Überschrift über den Unterspalten Review und Test sowie
      Fertig. Jede Überschrift trägt Kartenzahl und WIP-Grenze; Review ist
      hervorgehoben, weil dort fünf Karten gegen eine Grenze von vier stehen.
    body: >-
      Eine Karte per Drag-and-drop in eine andere Spalte zu ziehen ändert ihren
      Status. Die Spalten kommen aus den Status, die Sie ohnehin haben,
      wahlweise mit WIP-Grenzen, die eine überladene Spalte markieren, eine
      Bewegung aber nie blockieren. Status mit gemeinsamem `Präfix:` rücken unter
      eine gemeinsame Überschrift. Die Karten zeigen, was Sie auswählen —
      Bearbeiter mit Avatar, Story Points oder geschätzten Aufwand, Fortschritt,
      einen Beschreibungsauszug und jede Query-Spalte samt benutzerdefinierten
      Feldern.

  - kicker: Swimlanes
    title: Eine Bahn je Person — oder je beliebigem Feld
    shot: 02-board-swimlanes
    caption: >-
      Dasselbe Board, in Swimlanes nach Bearbeiter gruppiert: ein beschriftetes
      Band je Teammitglied plus ein Band für nicht zugewiesene Tickets, jedes über
      alle fünf Statusspalten.
    body: >-
      Jedes Feld, nach dem die Query gruppieren kann, wird zu einer waagerechten
      Bahn — Bearbeiter, Tracker, Priorität, Kategorie — jeweils mit eigener
      Ticketzahl und Story-Point-Summe. Boards lassen sich privat speichern oder
      mit dem Projekt teilen, und das Board eines Oberprojekts trägt die Tickets
      seiner Unterprojekte mit.

  - kicker: Schätzung
    title: Story Points dort, wo Redmine sie erwartet
    shot: 05-story-points
    caption: >-
      Ticketformular mit Redmines eigenen Attributfeldern und darunter zwei
      Feldern des Plugins: ein Auswahlfeld Story Points mit dem Wert 5 und ein
      Auswahlfeld Sprint mit Sprint 24.
    body: >-
      Gespeichert je Ticket in einer eigenen Tabelle, statt in ein
      benutzerdefiniertes Feld geschmuggelt zu werden. Angeboten als
      konfigurierbare Werteliste (voreingestellt modifizierte Fibonacci-Reihe)
      und auf die Tracker begrenzbar, bei denen das sinnvoll ist. Sie erscheinen
      im Ticketformular, in der Attributtabelle, in der Sammelbearbeitung und als
      sortier-, filter- und gruppierbare Spalte der Ticketliste.

  - kicker: Sprints
    title: Sprints sind ein eigenes Objekt, keine umbenannte Version
    shot: 04-sprints
    caption: >-
      Reiter Sprints in den Projekteinstellungen mit fünf Sprints samt Status,
      Start- und Enddatum: einer aktiv, einer offen und drei abgeschlossen.
    body: >-
      Name, Beschreibung, Start- und Enddatum sowie ein Lebenszyklus offen →
      aktiv → abgeschlossen: Einen Sprint zu aktivieren beendet den vorherigen,
      und ein Sprint lässt sich nicht abschließen, solange er noch offene Tickets
      enthält. Die Freigabe funktioniert wie bei Redmine-Versionen, von „nicht
      geteilt“ bis zum gesamten Projektbaum. Einen Sprint zu löschen hebt die
      Zuordnung seiner Tickets auf — gelöscht wird nie. Redmines eigene Versionen
      bleiben für die Releaseplanung daneben nutzbar.

  - kicker: Planung
    title: Ein Backlog, aus dem sich wirklich etwas herausziehen lässt
    shot: 03-backlog
    caption: >-
      Backlog-Planer mit den Reitern Sprints und Versionen: links eine
      Backlog-Bahn, daneben je eine Bahn pro verfügbarem Sprint, jede mit
      Ticketzahl, Story-Point-Summe, Zeitraum und Restlaufzeit in der Kopfzeile.
    body: >-
      Links das Backlog, daneben eine Bahn je Sprint — und ein zweiter Reiter,
      der stattdessen in Redmine-Versionen plant. Jede Bahn trägt Ticketzahl,
      Story-Point-Summe, Zeitraum und Restlaufzeit in der Kopfzeile. Der Planer
      hat dasselbe Filter-Panel und dieselben Kartenfelder wie das Board,
      speichert benannte Backlogs und merkt sich, wo Sie zuletzt waren.

  - kicker: Diagramme
    title: Fünf Diagramme, aus dem was tatsächlich passiert ist
    shot: 06-chart-burndown
    caption: >-
      Burndown über einen Sprint in Story Points: die Restlinie fällt von 200
      Punkten und endet heute, darunter eine gestrichelte Ideallinie, die zum
      Sprintende auf null läuft. Die Seitenleiste listet gespeicherte Diagramme
      und die Sprints des Projekts.
    body: >-
      Burndown, Burnup, Velocity, Cumulative Flow und Durchlaufzeit — in Tickets,
      Stunden oder Story Points, nach Tag, Woche oder Monat. Der Verlauf wird aus
      den Ticket-Journalen nachgespielt und nicht nächtlich abgetastet; ein
      Diagramm, das Sie heute erzeugen, stimmt deshalb auch für den letzten
      Monat. Die Messlinien enden heute, die Ideallinie läuft bis zum Ende des
      Zeitraums und kann Wochenenden auslassen.

why:
  - "**Wir wollten etwas Einfacheres und keine kostenpflichtigen Plugins mehr.** Mehr Grund gibt es nicht. Es steht wie alles hier unter GPL-2.0-or-later: kein Lizenzschlüssel, keine Gebühr pro Server, nichts zu verlängern."
  - "**Die Reihenfolge am Board berechnet der Server** als gebrochener Rang. Eine Bewegung überträgt nur die gezogene Karte und ihre beiden Nachbarn und schreibt eine Zeile. Wird stattdessen im Browser eine ganze Spalte neu durchnummeriert, zerfällt die Reihenfolge bei gleichzeitigen Bewegungen — und Karten, die außerhalb der Seite liegen, werden stillschweigend umsortiert."
  - "**Der Diagrammverlauf entsteht in einem Durchgang** über eine einzige Journal-Abfrage und wird gecacht — nicht dadurch, dass die Journale jedes Tickets einmal pro Datumsschritt erneut durchsucht werden."
  - "**Kein Inline-JavaScript.** Die Views liefern nur Markup, die Daten erreichen den Browser über eine JSON-Insel — das Board funktioniert deshalb unter einer Content-Security-Policy mit `script-src 'self'`."
  - "**Abgelehnte Übergänge erklären sich.** Verbietet Ihr Workflow eine Bewegung, nennt die Meldung Tracker und beide Status, listet die Übergänge auf, die *erlaubt* sind, und bietet Administratoren einen direkten Link zum Workflow dieses Trackers."
  - "**Die REST-API schreibt, nicht nur liest** — Story Points und Sprintzuordnung sind beide schreibbar, und für Sprints gibt es vollständiges CRUD."

install:
  step1: "Release-Archiv herunterladen:"
  step2: "In das Verzeichnis `plugins/` Ihres Redmine entpacken:"
  step3: "Migrationen ausführen:"
  step4: "Redmine neu starten, dann das Modul **expert Agile** in einem Projekt aktivieren. Der Backlog-Planer ist ein zweites Modul, **expert Agile Backlog**, und lässt sich getrennt vergeben."
  note: >-
    Das Plugin lässt sich neben einem anderen Agile-Plugin installieren — jede
    unserer Klassen, Tabellen und Routen trägt ein Präfix —, aber **zwei
    Agile-Module im selben Projekt zu aktivieren wird nicht unterstützt**.
    Story Points und Sprints sind aus, bis Sie sie in den Plugin-Einstellungen
    einschalten.
---

Keine zusätzlichen Gems. Chart.js und der Farbwähler Coloris liegen im Plugin,
und Drag-and-drop nutzt das
jQuery UI, das Redmine ohnehin mitbringt — zur Laufzeit wird also nichts
nachgeladen. Läuft auf MariaDB, MySQL und PostgreSQL.
