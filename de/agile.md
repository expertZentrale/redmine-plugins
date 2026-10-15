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
      Status. Sobald Sie sie aufnehmen, zeigt jede Spalte, ob Ihr Workflow diese
      Karte hineinlässt — grün, wohin sie darf, schraffiert, wohin nicht —,
      ermittelt mit derselben Prüfung, mit der der Server die Bewegung
      durchsetzt; eine gesperrte Spalte nimmt die Karte gar nicht erst an. Die
      Spalten kommen aus den Status, die Sie ohnehin haben,
      wahlweise mit WIP-Grenzen, die eine überladene Spalte markieren, eine
      Bewegung aber nie blockieren. Status mit gemeinsamem `Präfix:` rücken unter
      eine gemeinsame Überschrift. Die Karten zeigen, was Sie auswählen —
      Bearbeiter mit Avatar, Story Points oder geschätzten Aufwand, Fortschritt,
      einen Beschreibungsauszug und jede Query-Spalte samt benutzerdefinierten
      Feldern.

  - kicker: Swimlanes
    title: Eine Bahn je Person, Tracker oder Version
    shot: 02-board-swimlanes
    caption: >-
      Dasselbe Board, in Swimlanes nach Bearbeiter gruppiert: ein beschriftetes
      Band je Teammitglied plus ein Band für nicht zugewiesene Tickets, jedes über
      alle fünf Statusspalten.
    body: >-
      Projekt, Tracker, Status, Priorität, Autor, Bearbeiter, Kategorie,
      Zielversion oder Epic werden zu einer waagerechten Bahn, jeweils mit eigener
      Ticketzahl und Story-Point-Summe. Das sind die Felder, nach denen ein Team
      seine Arbeit tatsächlich aufteilt; Fortschritt, Datumsfelder und das
      Privat-Kennzeichen werden nicht angeboten. Boards lassen sich privat speichern oder
      mit dem Projekt teilen, und das Board eines Oberprojekts trägt die Tickets
      seiner Unterprojekte mit. Das globale Board, verlinkt im Anwendungsmenü,
      trägt alle Projekte, die Sie sehen dürfen.

  - kicker: Epics
    title: Epic, Story, Unteraufgabe — auf Redmines eigenem Unteraufgaben-Baum
    shot: 12-board-epics
    caption: >-
      Sprint-Board nach Epic gruppiert: eine Swimlane je Epic mit seinem
      Fortschrittsbalken im Kopf und eine letzte Bahn für Tickets ohne Epic.
      Eine Story in Arbeit zeigt „Erledigte Unteraufgaben: 1/3“, ihre
      Unteraufgaben stehen in ihren eigenen Spalten.
    body: >-
      Sie wählen die Tracker, deren Tickets Epics sind, und ein Ticket gehört
      zum nächsten Epic über ihm in Redmines Unteraufgaben-Baum — keine eigene
      Tabelle, kein benutzerdefiniertes Feld; der Filter „Übergeordnetes
      Ticket“, die REST-API, das Gantt-Diagramm und die Story-Point-Summen sehen
      deshalb dasselbe. Karten tragen ihr Epic als farbiges Badge, eine
      Unteraufgabe nennt ihre Story, und eine Story zählt ihre erledigten
      Unteraufgaben. Nach Epic gruppiert bekommt jedes Epic eine Bahn mit seinem
      Fortschritt im Kopf; eine Story in die Bahn eines anderen Epics zu ziehen
      verschiebt sie dorthin.

  - kicker: Epic-Übersicht
    title: Jedes Epic, seine Stories und deren Unteraufgaben in einem Baum
    shot: 13-epics
    caption: >-
      Reiter Epics: jedes Epic mit Status, Fortschrittsbalken und erledigten
      Tickets und Story Points über einer Tabelle seiner Stories; die
      Unteraufgaben einer Story stehen eingerückt darunter.
    body: >-
      Der Reiter Epics listet jedes offene Epic des Projekts mit dem, was
      erledigt ist — Tickets und Story Points, als Balken und in Zahlen — und
      seine Stories und Unteraufgaben als Baum mit Status, Bearbeiter und
      Punkten. Derselbe Fortschritt steht auf der Ticketseite des Epics. Gezählt
      werden nur Tickets, die der Leser sehen darf.

  - kicker: Farben
    title: Jede Farbe — nach Tracker, Status, Priorität oder Projekt
    shot: 09-card-colors
    caption: >-
      Farben der Agile-Karten für Ticketstatus, mit Reitern für Projekt, Tracker
      und Priorität. Der Farbwähler ist auf „In Arbeit“ geöffnet: eine
      Farbfläche, ein Farbton-Regler, der Hex-Wert #e08a1e und achtzehn
      Palettenfarben.
    body: >-
      Karten nehmen ihre Farbe vom Tracker, vom Status, von der Priorität oder
      vom Projekt, und Spaltenköpfe können die Statusfarbe übernehmen. Jede Farbe
      geht — Farbfläche, Farbton-Regler und Hex-Feld, dazu die achtzehn
      Palettentöne als Vorschläge —, und der Hintergrund der Karte wird daraus
      abgeleitet und bleibt hell, egal was gewählt wurde. Der Farbwähler Coloris
      liegt im Plugin, zur Laufzeit wird nichts nachgeladen.

  - kicker: Schätzung
    title: Story Points dort, wo Redmine sie erwartet
    shot: 05-story-points
    caption: >-
      Ticketformular mit Redmines eigenen Attributfeldern und darunter zwei
      Feldern des Plugins: ein Auswahlfeld Story Points mit dem Wert 2 und ein
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
      ein Sprint lässt sich nicht abschließen, solange er noch offene Tickets
      enthält, und ein abgeschlossener Sprint nimmt keine neuen mehr auf — sein
      Burndown und seine Velocity bleiben, wie sie waren. Die Freigabe
      funktioniert wie bei Redmine-Versionen, mit denselben Regeln dafür, wer wie
      weit teilen darf: „Mit Projektbaum“ braucht jemanden, der im Hauptprojekt
      Sprints verwaltet, „Mit allen Projekten“ einen Administrator. Einen Sprint
      zu löschen hebt die Zuordnung seiner Tickets auf — gelöscht wird nie —, und
      ein geteilter Sprint, in den andere Projekte noch planen, lässt sich gar
      nicht löschen. Redmines eigene Versionen bleiben für die Releaseplanung
      daneben nutzbar.

  - kicker: Sprint-Boards
    title: Ein Board, das dem laufenden Sprint folgt
    shot: 11-sprint-board
    caption: >-
      Geöffnete Board-Optionen über dem Sprint-Board: Kartenfelder,
      Darstellung mit der Sprint-Auswahl „Aktiver Sprint (automatisch)“ und die
      Statusspalten mit ihren WIP-Limits.
    body: >-
      Jedes Board lässt sich in seinen Optionen auf einen Sprint eingrenzen —
      oder mit `sprint_id` in der URL. **Aktiver Sprint** folgt dem Sprint, der
      gerade läuft; ein gespeichertes Sprint-Board stimmt damit auch nach dem
      Start der nächsten Iteration noch. Spalten, Zähler und Story-Point-Summen
      umfassen dann nur diesen Sprint, und ein geschlossener Sprint lässt sich für
      sein Review weiterhin öffnen.

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

  - kicker: Epic-Planung
    title: Stories in Epics planen wie in Sprints
    shot: 14-backlog-epics
    caption: >-
      Backlog-Planer im Reiter Epics: Stories ohne Epic links, daneben eine
      Bahn je offenem Epic mit Ticketzahl, Story-Point-Summe und Fortschritt im
      Kopf; jede Karte trägt ihr Epic-Badge.
    body: >-
      Ein dritter Reiter im Planer stellt die Stories ohne Epic neben eine Bahn
      je offenem Epic. Eine Story in ein Epic zu ziehen macht sie zu dessen
      Unteraufgabe — mit Journaleintrag und unter der Berechtigung,
      Unteraufgaben zu verwalten —, und ihre eigenen Unteraufgaben gehen mit.

  - kicker: Sprint-Abschluss
    title: Einen Sprint in einem Schritt abschließen
    shot: 15-sprint-complete
    caption: >-
      Seite Sprint abschließen: wie viele Tickets erledigt und noch offen sind
      samt Story Points, die offenen Tickets als Liste und die Wahl zwischen
      nächstem Sprint, Backlog oder einem neuen Sprint mit vorgeschlagenem Namen
      und Datum, dazu „Ziel-Sprint zum aktiven Sprint machen“.
    body: >-
      **Sprint abschließen** zeigt, was erledigt und was noch offen ist, und
      verschiebt die offenen Tickets in den nächsten Sprint, zurück ins Backlog
      oder in einen neuen Sprint, der gleich mit hochgezähltem Namen und
      anschließenden Daten angelegt wird. Der Sprint wird geschlossen, und das
      Ziel kann zum aktiven Sprint werden — ein Board, das dem aktiven Sprint
      folgt, stimmt dann sofort. Jedes Ticket wird wie im Planer verschoben,
      unter denselben Berechtigungen und der eigenen Validierung des Tickets;
      lässt sich ein einziges nicht verschieben, wird nichts geschrieben, und die
      Seite sagt, welches und warum. Auch über die REST-API.

  - kicker: Ticketliste
    title: Die Ticketliste kennt den Sprint
    shot: 16-issue-list-sprint
    caption: >-
      Redmines Ticketliste, gefiltert auf offene Stories im aktiven und im
      nächsten Sprint, nach der Spalte Sprint in Sprint 24 und Sprint 25
      gruppiert, mit einer Spalte Story Points.
    body: >-
      Redmines eigene Ticketliste bekommt einen Filter **Sprint** — ein oder
      mehrere Sprints, **Aktiver Sprint**, bei jedem Aufruf neu aufgelöst,
      irgendeiner oder keiner — und eine Spalte **Sprint**, die sortiert,
      gruppiert und in den CSV-Export geht. Gespeicherte Listen wie „alles im
      laufenden Sprint“, Sprint-Exporte und Sammelbearbeitungen der Tickets
      eines Sprints gehen damit von selbst.

  - kicker: Diagramme
    title: Fünf Diagramme, aus dem was tatsächlich passiert ist
    shot: 06-chart-burndown
    caption: >-
      Burndown über einen Sprint in Story Points: die Restlinie fällt von rund 165
      Punkten und endet heute, darunter eine gestrichelte Ideallinie, die zum
      Sprintende auf null läuft.
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
  - "**Workflow-Grenzen zeigen sich vor dem Ablegen, Ablehnungen erklären sich.** Gesperrte Spalten sind schon beim Ziehen markiert. Was der Workflow nicht im Voraus wissen kann — etwa ein Feld, das der neue Status verlangt —, wird nach dem Ablegen abgelehnt; die Meldung nennt Tracker und beide Status, listet die Übergänge auf, die *erlaubt* sind, und bietet Administratoren einen direkten Link zum Workflow dieses Trackers."
  - "**Agile-Rechte sind Redmines Rechte.** Eine Bewegung, die den Status ändert, braucht dieselbe Berechtigung wie im Ticketformular, Story-Point-Summen zählen nur Tickets, die der Leser sehen darf, und ein globales Board, Diagramm oder Backlog zu veröffentlichen bleibt Administratoren vorbehalten — wie bei Queries im Kern."
  - "**Die REST-API schreibt, nicht nur liest** — Story Points und Sprintzuordnung sind beide schreibbar, und für Sprints gibt es vollständiges CRUD."
  - "**Einen Sprint abzuschließen gelingt ganz oder gar nicht.** Die Tickets wandern und der Sprint schließt in einer Transaktion; ein Sprint bleibt nie halb verschoben zurück — ein einziges Ticket, das nicht verschoben werden darf, hält alles an und wird genannt."

install:
  step1: "Release-Archiv herunterladen:"
  step2: "In das Verzeichnis `plugins/` Ihres Redmine entpacken:"
  step3: "Migrationen ausführen:"
  step4: "Redmine neu starten, dann das Modul **expert Agile** in einem Projekt aktivieren. Der Backlog-Planer ist ein zweites Modul, **expert Agile Backlog**, und lässt sich getrennt vergeben; seine Berechtigung *Backlog verwalten* ist auch die, mit der jemand den Sprint eines Tickets setzen darf."
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
