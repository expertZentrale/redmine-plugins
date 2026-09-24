---
layout: home
lang: de
ref: home
permalink: /de/
description: >-
  Vier Open-Source-Plugins für Redmine von expert: ein E-Mail-Helpdesk mit
  SLA-Überwachung, Agile-Boards auf Basis von Redmines eigenem Query-System,
  Prometheus-Metriken und Anhang-Vorschau. GPL-2.0, getestet auf Redmine 5.1 bis 7.0.
eyebrow: Open Source · GPL-2.0 · Redmine 5.1 bis 7.0
headline: Redmine, um das ergänzt, was uns gefehlt hat
subhead: >-
  Ein E-Mail-Helpdesk mit SLA-Überwachung, Agile-Boards auf Basis von Redmines
  eigenem Query-System, Prometheus-Metriken und Anhang-Vorschau. Entstanden bei
  expert für das Redmine, das wir selbst betreiben — unter derselben Lizenz wie
  Redmine veröffentlicht.
lead: >-
  Jedes dieser Plugins hat als Lücke in unserer eigenen Installation angefangen.
  Es sind vier eigenständige Plugins — installieren Sie eines oder alle vier.
  Keines funkt nach Hause, keines braucht einen Lizenzschlüssel, und keines legt
  Ihre Daten irgendwo anders ab als in Ihrer eigenen Redmine-Datenbank.
cards:
  helpdesk: >-
    Aus Postfächern wird ein Helpdesk. Eingehende Mail wird zum Ticket,
    Antworten landen am bereits vorhandenen Ticket, und Ihre Mitarbeiter
    antworten dem Kunden, ohne Redmine zu verlassen. Dazu SLA, Kunden und
    Phishing-Erkennung.
  agile: >-
    Ein Kanban- und Scrum-Board, das eine Redmine-Query ist — jeder Filter und
    jede Spalte, die Sie schon nutzen, gilt unverändert. Story Points, Sprints,
    ein Backlog-Planer und fünf Diagrammtypen.
  metrics: >-
    Beantwortet „kann ich Redmine jetzt neu starten?“ — wer gerade arbeitet, als
    Administrationsseite und als Prometheus-Metriken unter /metrics, samt
    Grafana-Dashboard. Ohne Konfiguration, ohne Berechtigungen.
  lightbox: >-
    Ein Klick auf ein Bild oder einen PDF-Anhang öffnet ihn in einem Dialog,
    statt die Seite zu verlassen. Nativer Browser-Dialog, kein jQuery, keine
    Fremdbibliotheken.
---

## Vier Plugins, ein Satz Regeln

Wir haben sie für ein Redmine geschrieben, mit dem bei expert täglich gearbeitet
wird — und nur deshalb sehen sie aus, wie sie aussehen. Die Grundsätze, die wir
uns dabei gesetzt haben, sollten Sie kennen, bevor Sie etwas installieren:

- **Dieselbe Lizenz wie Redmine.** GPL v2 oder später, weil ein Redmine-Plugin
  in den Redmine-Prozess geladen wird und dessen Klassen erweitert — es ist ein
  abgeleitetes Werk, und so behandeln wir es auch. Keine Gebühr pro Server, kein
  Lizenzschlüssel, keine Ausbaustufe, die genau die Funktion freischaltet, die
  Sie eigentlich wollten.
- **Gegen jedes unterstützte Redmine getestet.** Die Testsuiten laufen bei jedem
  Push gegen Redmine 5.1, 6.0, 6.1 und 7.0, und jedes Plugin wird zusätzlich in
  den offiziellen `redmine`-Docker-Images derselben Versionen gestartet.
- **Zur Laufzeit wird nichts nachgeladen.** Kein CDN, keine externe Schrift, kein
  Analyse-Pixel. Chart.js liegt in den Plugins, die Diagramme zeichnen, und Agile
  bringt den Farbwähler Coloris mit; alles andere ist die Ruby-Standardbibliothek
  und das, was Redmine ohnehin mitbringt.
- **Optional heißt aus.** Die KI-Funktionen, die Wissensdatenbank und die
  Phishing-Prüfung sind im Auslieferungszustand deaktiviert. Sie einzuschalten
  ist eine bewusste Entscheidung — und jede davon scheitert sicher: eine kaputte
  Modellantwort schreibt niemals eine Mail an Ihren Kunden.
- **Durchgängig deutsch und englisch.** Beide Sprachen im Plugin, in beiden
  READMEs, in beiden Changelogs — und Screenshots in beiden Sprachen.
