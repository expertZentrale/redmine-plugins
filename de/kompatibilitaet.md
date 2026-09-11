---
layout: page
lang: de
ref: compatibility
permalink: /de/kompatibilitaet/
title: Kompatibilität
description: >-
  Welches expert-Plugin auf welcher Redmine- und Ruby-Version läuft, welche
  Datenbanken unterstützt werden, welche Gems nötig sind und welche Plugins
  durch Continuous Integration abgedeckt sind.
lead: >-
  Alle vier Plugins geben Redmine 5.0 als Untergrenze an und werden gegen die
  vier unten genannten Versionen getestet. Alles auf dieser Seite wird aus
  denselben Daten erzeugt wie die Plugin-Seiten und kann deshalb nicht von ihnen
  abweichen.
---

{% assign t = site.data.i18n[page.lang] %}
{% assign nav = site.data.nav[page.lang] %}
{% include compat-table.html
     t=t nav=nav
     h_versions="Redmine-Versionen"
     h_testing="Prüfung"
     h_ruby="Ruby und Datenbank in der CI"
     h_ci_db="Datenbank"
     h_requirements="Voraussetzungen"
     label_db_note="siehe unten"
     note_versions="Wo die Spalte Prüfung „In CI getestet“ zeigt, läuft die Testsuite dieses Plugins bei jedem Push gegen alle vier Versionen und wird zusätzlich im offiziellen redmine-Docker-Image derselben Versionen gestartet." %}

## Hinweis zu PostgreSQL

Drei der vier Plugins enthalten kein datenbankspezifisches SQL und laufen auf
MariaDB, MySQL und PostgreSQL gleichermaßen.

**expert Helpdesk ist die Ausnahme.** Seine SLA-Spalten in der Ticketliste
vergleichen Fristen gegen `UTC_TIMESTAMP()` — das ist MariaDB- und
MySQL-Syntax, PostgreSQL kennt diese Funktion nicht. Die CI läuft ausschließlich
auf MariaDB; PostgreSQL ist dort also nicht bloß ungetestet, sondern für diese
Funktion nachweislich nicht lauffähig. Wenn Sie Redmine auf PostgreSQL
betreiben, sind die anderen drei Plugins unproblematisch.

## Redmine aktualisieren

Keines dieser Plugins legt sich auf einen Redmine-Patchstand fest. Beim Wechsel
zwischen den unterstützten Hauptversionen ersetzen Sie das Plugin-Verzeichnis
durch das aktuelle Release und führen `rake redmine:plugins:migrate` für die
Plugins mit Migrationen aus (Helpdesk und Agile immer, Metrics einmalig,
Lightbox nie). Die Release-Notes weisen auf jede Migration hin, die Beachtung
braucht.

## Mehrere gleichzeitig installieren

Die Plugins sind unabhängig und teilen keinen Code, jede Kombination
funktioniert. Zwei Paarungen sind erwähnenswert:

- **expert Metrics und expert Helpdesk** arbeiten zusammen: Sind beide
  installiert, bekommt `/metrics` zusätzlich den Zähler
  `redmine_helpdesk_mails_total`, aufgeschlüsselt nach Projekt und Richtung.
  Keines setzt das andere voraus.
- **expert Agile und ein anderes Agile-Plugin** lassen sich nebeneinander
  installieren — bei uns trägt jede Klasse, Tabelle und Route ein Präfix —,
  aktivieren Sie aber nicht zwei Agile-Module im selben Projekt.
