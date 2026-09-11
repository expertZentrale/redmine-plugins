---
layout: plugin
lang: de
ref: metrics
plugin: metrics
permalink: /de/metrics/
title: expert Metrics
description: >-
  Zeigt, wer gerade in Redmine arbeitet — als Administrationsseite und als
  Prometheus-Metriken unter /metrics, samt Grafana-Dashboard. Ohne Konfiguration,
  ohne Berechtigungen, ohne Gems. Redmine 5.1 bis 7.0, GPL-2.0.
promise: >-
  Beantwortet eine Frage gründlich: Kann ich Redmine jetzt neu starten? Das
  Plugin zeigt, wer in der letzten Stunde aktiv war, und stellt dasselbe Bild als
  Prometheus-Metriken für Ihr Monitoring bereit.
intro: >-
  Jeder, der Redmine betreibt, hat das schon geschätzt. Sie wollen deployen,
  einen Pod neu starten oder eine Migration fahren — und die einzige ehrliche
  Antwort lautet „wahrscheinlich ist gerade niemand drin“. Dieses Plugin macht
  daraus eine Zahl. Und dann ein Diagramm, weil die Zahl mit dem gestrigen Wert
  daneben deutlich mehr wert ist.

features:
  - kicker: Gerade jetzt
    title: Wer tatsächlich drin ist
    shot: 01-active-users
    body: >-
      Ein Eintrag **expert Metrics** im Administrationsmenü listet jeden Benutzer
      mit einem Request in den letzten 60 Minuten, den jüngsten zuerst: Login,
      Name, letzte Aktivität als „vor 3 Min.“, angemeldet seit, und wie viele
      Sitzungen er hält. Ein Kasten darüber zählt aktive Benutzer über 5, 15 und
      60 Minuten, offene Sitzungen und Anmeldungen der letzten 24 Stunden. Die
      Seite aktualisiert sich jede Minute selbst.

  - kicker: Automatisierung
    title: Dieselbe Antwort als JSON
    shot: 02-json
    body: >-
      `/admin/active_users.json` liefert dieselben Daten für ein Skript,
      autorisiert über einen Administrator-API-Schlüssel. Ein einzeiliges
      `curl | jq '.summary.active_users'` vor Ihrem Deployment-Job macht aus
      „wahrscheinlich niemand“ eine Bedingung.

  - kicker: Monitoring
    title: Prometheus unter /metrics
    shot: 03-metrics-endpoint
    body: >-
      Standard-Textformat, ausschließlich aggregierte Zahlen — **niemals
      Benutzernamen**. Aktive Benutzer je Zeitfenster, offene Sitzungen,
      Anmeldungen, Gesamtzahlen zu Benutzern, Projekten und Tickets,
      Benachrichtigungsmails je Projekt sowie Helpdesk-Kundenmails je Projekt und
      Richtung, wenn das Helpdesk-Plugin installiert ist. Standardmäßig offen;
      ein Token in der `configuration.yml` verlangt stattdessen einen
      Bearer-Token — und der Endpunkt antwortet auch dann noch, wenn
      „Authentifizierung erforderlich“ eingeschaltet ist.

  - kicker: Grafana
    title: Ein Dashboard, das die Fallen schon kennt
    shot: 04-grafana
    body: >-
      Mitgeliefertes JSON importieren, Prometheus-Datenquelle auswählen, fertig.
      Zeilen für *Gerade jetzt*, *Benutzer, Projekte und Tickets*, *Mail* und
      *Scrape-Gesundheit*, dazu zwei Textpanels, die erklären, wie das Dashboard
      zu lesen ist. Die Kubernetes-Falle ist eingebaut: Jeder Pod meldet dieselben
      datenbankweiten Zahlen, deshalb aggregiert das Dashboard mit `max` statt mit
      `sum` — und verknüpft `up` mit einem 24-Stunden-Rückblick, damit ein totes
      Ziel als 0 erscheint statt zu veralten.

why:
  - "**Keine Konfiguration und keine Berechtigungen.** Keine Einstellungsseite, keine Rollen zu vergeben. Es arbeitet, sobald es geladen ist."
  - "**Keine neue Tabelle für Aktivität.** Es liest Redmines eigene `tokens`-Zeilen und trifft damit keine Annahme über Ihren Session-Store — Cookie, Redis oder Datenbank funktionieren gleichermaßen."
  - "**Es zählt ehrlich.** Requests mit API-Schlüssel und der Mailabruf erzeugen nie ein Session-Token und werden deshalb nicht als anwesende Person gemeldet."
  - "**Ein Schnappschuss bedient jeden Scrape.** Die Ergebnisse werden 15 Sekunden gecacht — eine Reihe von Pods, die alle paar Sekunden abgefragt wird, kostet damit einen Satz Abfragen."
  - "**Die Mailzähler überleben Neustarts.** Benachrichtigungsmail wird über einen Observer mit atomarem Inkrement in eine echte Tabelle gezählt, gemeinsam für alle Pods — nicht in einen prozesslokalen Zähler, der beim Deployment zurückspringt."
  - "**Es degradiert, statt zu scheitern.** `/metrics` antwortet auch bei frisch installiertem, noch nicht migriertem Plugin, und die Helpdesk-Metriken erscheinen erst, wenn dessen Tabelle existiert."

install:
  step1: "Release-Archiv herunterladen:"
  step2: "In das Verzeichnis `plugins/` Ihres Redmine entpacken:"
  step3: "Migration ausführen:"
  step4: "Redmine neu starten. Der Eintrag **expert Metrics** erscheint sofort in der Administration, und `/metrics` antwortet — es gibt nichts zu konfigurieren."
  note: >-
    `/metrics` ist **standardmäßig offen**, was hinter einem privaten Netz richtig
    und im offenen Internet falsch ist. Setzen Sie `metrics_token` in Ihrer
    `config/configuration.yml`, um `Authorization: Bearer <token>` zu verlangen;
    Administratoren kommen unabhängig davon immer durch.
---

Keine Gems, keine Einstellungen, keine Berechtigungen, eine Migration. Läuft auf
MariaDB, MySQL und PostgreSQL und mit jedem Session-Store.

Das Grafana-Dashboard liegt im Repository unter
`contrib/grafana/redmine-expert-metrics.json`.
