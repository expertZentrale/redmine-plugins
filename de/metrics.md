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
    caption: >-
      Administration → expert Metrics: aktive Benutzer über 5, 15 und 60
      Minuten, offene Sitzungen und Anmeldungen der letzten 24 Stunden, darunter
      eine Tabelle aller Benutzer mit einer Anfrage in der letzten Stunde —
      Mitgliedsname, Name, letzte Aktivität, angemeldet seit und Anzahl Sitzungen.
    body: >-
      Ein Eintrag **expert Metrics** im Administrationsmenü listet jeden Benutzer
      mit einem Request in den letzten 60 Minuten, den jüngsten zuerst: Login,
      Name, letzte Aktivität als „vor 3 Min.“, angemeldet seit, und wie viele
      Sitzungen er hält. Ein Kasten darüber zählt aktive Benutzer über 5, 15 und
      60 Minuten, offene Sitzungen und Anmeldungen der letzten 24 Stunden. Die
      Seite aktualisiert sich jede Minute selbst.

  - kicker: Automatisierung
    title: Dieselbe Antwort als JSON
    body: |-
      `/admin/active_users.json` liefert dieselben Daten für ein Skript,
      autorisiert über einen Administrator-API-Schlüssel — aus „wahrscheinlich
      ist gerade niemand drin“ wird damit eine Bedingung, die Ihr
      Deployment-Job tatsächlich prüfen kann.

      ```bash
      curl -sH "X-Redmine-API-Key: $KEY" \
           https://redmine.example.com/admin/active_users.json \
        | jq '.summary.active_users["5m"]'
      ```

      ```json
      {
        "collected_at": "2026-09-13T09:27:25Z",
        "window_minutes": 60,
        "summary": {
          "active_users": { "5m": 2, "15m": 6, "60m": 9 },
          "sessions": 14,
          "recent_logins_24h": 11,
          "users": { "active": 14, "registered": 1, "locked": 1 },
          "projects_active": 4,
          "issues_open": 76,
          "issues_closed": 387
        },
        "active_users": [
          { "login": "a.berger", "name": "Anna Berger",
            "last_activity": "2026-09-13T09:23:34Z", "sessions": 2 }
        ]
      }
      ```

  - kicker: Monitoring
    title: Prometheus unter /metrics
    body: |-
      Standard-Textformat, ausschließlich aggregierte Zahlen — **niemals
      Benutzernamen**. Standardmäßig offen; ein Token in der
      `configuration.yml` verlangt stattdessen einen Bearer-Token — und der
      Endpunkt antwortet auch dann noch, wenn „Authentifizierung erforderlich“
      eingeschaltet ist.

      ```
      redmine_active_users{window="5m"} 3
      redmine_active_users{window="15m"} 5
      redmine_active_users{window="60m"} 8
      redmine_sessions_total 12
      redmine_recent_logins_users{window="24h"} 10
      redmine_users_total{status="active"} 14
      redmine_users_total{status="locked"} 1
      redmine_projects_total{status="active"} 4
      redmine_issues_total{state="open"} 76
      redmine_issues_total{state="closed"} 387
      redmine_notifications_sent_total{project="customer-support"} 412
      redmine_helpdesk_mails_total{project="customer-support",direction="in"} 148
      redmine_helpdesk_mails_total{project="customer-support",direction="out"} 131
      redmine_info{redmine_version="7.0.0.stable",plugin_version="1.1.1"} 1
      ```

      Die Helpdesk-Zeilen erscheinen nur, wenn expert Helpdesk installiert ist;
      keines der beiden Plugins setzt das andere voraus.

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
