---
layout: plugin
lang: de
ref: helpdesk
plugin: helpdesk
permalink: /de/helpdesk/
title: expert Helpdesk
description: >-
  Macht aus Microsoft-365- oder IMAP-Postfächern einen Redmine-Helpdesk: Mail
  wird zum Ticket, Antworten landen am vorhandenen Ticket, Mitarbeiter antworten
  von der Ticketseite. SLA in Arbeitsminuten, Kunden, Phishing-Erkennung, optional KI.
promise: >-
  Macht aus Postfächern einen Helpdesk. Eingehende Mail wird zum Ticket,
  Kundenantworten landen am bereits vorhandenen Ticket, und Ihre Mitarbeiter
  antworten von der Ticketseite aus — in Redmine, im Mail-Thread des Kunden.
intro: >-
  Die meisten Helpdesk-Aufbauten in Redmine brechen an derselben Stelle: Der
  Kunde antwortet, und aus der Antwort wird ein zweites Ticket. Dieses Plugin
  übergibt jede eingehende Nachricht an Redmines eigenen `MailHandler` — damit
  verhalten sich `In-Reply-To`-Header und `[#id]`-Betreffmuster exakt so wie bei
  Redmines eingebauter Mailverarbeitung, Anhänge eingeschlossen. Alles Weitere
  setzt darauf auf.

features:
  - kicker: Mail rein
    title: Eine Mail kommt an, ein Ticket entsteht
    shot: 04-issue-detail
    caption: >-
      Ticketseite mit Helpdesk-Infozeile: Absendername und -adresse,
      Ursprungspostfach sowie zwei grüne SLA-Chips für Reaktions- und Lösungszeit.
    body: >-
      Jedes Projekt zeigt auf eigene Postfächer und legt fest, was neue Tickets
      bekommen: Tracker, Priorität, Status — und was mit Absendern geschieht, die
      kein Redmine-Konto haben. Die Originalnachricht wird als `.eml` am Ticket
      archiviert, und die Signaturlogos und Screenshots, die Mailprogramme als
      `[cid:image001.png]` referenzieren, werden auf den Anhang umgeschrieben,
      den Redmine gerade gespeichert hat. Das Ticket liest sich damit wie die
      Mail — und nicht wie eine Reihe von Platzhaltern.

  - kicker: Mail raus
    title: Dem Kunden vom Ticket aus antworten
    shot: 06-reply
    caption: >-
      Antwort-Panel im Bearbeiten-Formular: Auswahlfeld „Als E-Mail an Kunden
      senden“ mit Empfänger, An/CC/BCC-Feldern und einer Vorschau der Signatur.
    body: >-
      Das normale Redmine-Notizfeld, dazu ein Panel, das es als echte Mail über
      das Postfach selbst versendet — eine Kopie landet in „Gesendet“, und das
      Postfach enthält damit beide Hälften des Gesprächs. Zitieren Sie die
      Originalmail oder den ganzen Verlauf (private Notizen niemals), fügen Sie
      eine gespeicherte Antwortvorlage mit bereits aufgelösten Makros ein, ziehen
      Sie Inline-Bilder hinein, und lassen Sie An/CC/BCC aus den Projektkontakten
      vervollständigen.

  - kicker: Jeder Anbieter
    title: Microsoft 365 — oder jeder IMAP-Server
    shot: 08-mailbox-form
    caption: >-
      Postfachkonfiguration mit Adresse und Ordnern, Standardwerten für neue
      Tickets, Wiedereröffnungsregeln, Absender- und Auto-Reply-Filter,
      Autoresponder-Text und Antwortvorlagen samt Signaturvorschau.
    body: >-
      Jedes Postfach wählt sein eigenes Backend: Microsoft Graph für Microsoft
      365, oder klassisches IMAP zum Empfangen und SMTP zum Senden für Google
      Workspace, Exchange on-premises, Dovecot, Zimbra und jeden gewöhnlichen
      Hoster. Authentifiziert wird mit OAuth2/XOAUTH2 in drei Varianten — nur
      Anwendung, einmalige Zustimmung, Dienstkonto — wobei Benutzername und
      Passwort über TLS weiterhin möglich bleiben, wo es kein OAuth2 gibt. Ein
      **Verbindungstest** prüft Host, TLS und Anmeldung vor dem Speichern und
      listet die sichtbaren Ordner auf.

  - kicker: SLA
    title: Fristen in Arbeitsminuten, nicht in Kalenderstunden
    shot: 01-sla-dashboard
    caption: >-
      SLA-Statistik: Tickets offen, geschlossen und überschritten, ein
      Balkendiagramm zur SLA-Erfüllung, das monatliche Ticketvolumen,
      Durchschnittszeiten im Zeitverlauf sowie Stoßzeiten nach Stunden und Wochentagen.
    body: >-
      Reaktions- und Lösungsziele werden gegen die Arbeitstage und
      Geschäftszeiten des jeweiligen Projekts gemessen, mit Ausnahmen je
      Priorität für die Tickets, die nicht warten können. Beide Uhren erscheinen
      als Ampel-Chips am Ticket und als sortierbare Spalten in der Ticketliste,
      sodass sich eine Warteschlange auf einen Blick nach Dringlichkeit ordnen
      lässt. Überschreitungen melden sich über einen Cron-Endpunkt an eine
      Eskalationsadresse, und ein eigener Reiter stellt die SLA-Erfüllung im
      Zeitverlauf dar.

  - kicker: Auswertung
    title: Wohin die Zeit tatsächlich geht
    shot: 11-ticket-dashboard
    caption: >-
      Ticket-Statistik: offen, geschlossen, wiedereröffnet und Antwort ausstehend,
      Erstreaktions- und Lösungszeiten, Verweildauer je Status, Gesprächslänge
      sowie Tabellen je Mitarbeiter und je Kunde.
    body: >-
      Ein Reiter „Ticket-Statistik“ für jedes Helpdesk-Projekt, mit oder ohne
      SLA, hinter einer eigenen Berechtigung — Sie können ihn einer Teamleitung
      geben und sonst niemandem. Volumen, Erstreaktions- und Lösungszeiten,
      Verweildauer je Status, Wiedereröffnungen, Gesprächslänge, eine Tabelle je
      Mitarbeiter und eine je Kunde, Stoßzeiten nach Stunden und Wochentagen —
      auf Kalenderzeit oder auf den Geschäftszeiten des Projekts.

  - kicker: Kunden
    title: Jeder Absender wird zum Kontakt
    shot: 03-contacts
    caption: >-
      Kundenliste eines Helpdesk-Projekts: durchsuchbare, seitenweise Tabelle mit
      Name, E-Mail-Adresse, Firma, Telefonnummer, Ticketanzahl und Datum des
      letzten Tickets.
    body: >-
      Absender werden automatisch gespeichert und je Projekt mit Firma, Telefon
      und Ticketanzahl gelistet. Die Ticketseite bekommt eine Kundenkarte mit den
      früheren Tickets und den bereits gesendeten Antworten, die Ticketliste
      sortierbare Spalten **Kunde** und **Kunden-E-Mail** samt passendem Filter —
      und jedem manuell angelegten Ticket lässt sich ein Kontakt zuordnen,
      wahlweise mit gleich versendeter erster Mail.

  - kicker: Optional
    title: KI-Zusammenfassungen und Wissensdatenbank, standardmäßig aus
    shot: 02-ai-dashboard
    caption: >-
      KI-Statistik: Anzahl Anfragen, Token-Verbrauch, Erfolgsquote und
      Antwortzeit, dazu Diagramme zu Anfragevolumen, Token-Verbrauch im
      Zeitverlauf, Erfolg gegen Fehler, Anfragetyp, Anbieter-Modell und Stoßzeiten.
    body: >-
      Ein schwer lesbarer weitergeleiteter Verlauf lässt sich von OpenAI,
      Anthropic oder jedem selbst betriebenen OpenAI-kompatiblen Endpunkt zu
      einer privaten internen Notiz zusammenfassen. Gelöste Tickets können zu
      einer Wissensdatenbank je Projekt destilliert werden — Qdrant oder pgvector
      — aus der neue Mails Lösungsvorschläge beziehen, streng getrennt, sodass
      ein Projekt nie die Einträge eines anderen sieht. Eine separate
      Vollständigkeitsprüfung fragt beim Kunden nach den Angaben, die ein
      einzeiliges „Drucker kaputt“ offengelassen hat. Alles davon wird
      deaktiviert ausgeliefert, alles läuft in Hintergrundjobs, und die KI-Pfade
      scheitern sicher.

why:
  - "**Verträgt sich mit dem, was schon läuft.** Zwei Kern-Helper werden über die ursprüngliche Methode erweitert statt über `prepend`/`super` — genau damit das Plugin neben älteren Plugins bestehen kann, die dieselben Helper per `alias_method_chain` erweitern."
  - "**Die Zuordnung von Antworten wird nicht neu erfunden.** Das Threading macht Redmines `MailHandler`, es verhält sich also wie der Rest Ihres Redmine ohnehin."
  - "**Nichts wird stillschweigend erneut verarbeitet.** Verarbeitete Mail wandert in einen Zielordner, abgewiesene in „übersprungen“, Fehler in „fehlgeschlagen“. Eine kaputte Nachricht bricht niemals den ganzen Abruf ab."
  - "**Zugangsdaten werden verschlüsselt abgelegt** und sind über die REST-API nur schreibbar — ein Client Secret lässt sich setzen, aber nie wieder auslesen."
  - "**Kein eigener Scheduler.** Der Abruf ist ein Knopf oder ein per API-Schlüssel gesicherter Endpunkt, auf den Sie Cron oder einen Kubernetes-CronJob richten. Ihre Zeitsteuerung bleibt Ihre."
  - "**Vollständige REST-API**, JSON und XML, nach Redmines eigenen Konventionen und begrenzt durch die Berechtigungen, die Sie ohnehin vergeben haben."

install:
  step1: "Release-Archiv herunterladen:"
  step2: "In das Verzeichnis `plugins/` Ihres Redmine entpacken:"
  step3: "Migrationen ausführen:"
  step4: "Redmine neu starten, dann das Modul **expert Helpdesk** in einem Projekt aktivieren und in den Projekteinstellungen ein Postfach anlegen."
  note: >-
    Die Einrichtung des Mailanbieters — die Microsoft-365-App-Registrierung oder
    OAuth2 gegen Ihren eigenen IMAP-Server — ist der eine Teil, der echte
    Konfiguration erfordert. Die
    [README](https://github.com/expertZentrale/redmine_expert_helpdesk/blob/main/README.de.md)
    enthält Anleitungen für Microsoft-IMAP im Anwendungsmodus, Google-Workspace-
    Zustimmung und selbst betriebene Server, dazu PowerShell-Skripte für die
    Azure-Seite.
---

Setzt **MariaDB oder MySQL** voraus. Die SLA-Spalten der Ticketliste vergleichen
gegen `UTC_TIMESTAMP()`, das es in PostgreSQL nicht gibt; die CI läuft
ausschließlich auf MariaDB, PostgreSQL ist hier also ungetestet. Die anderen drei
Plugins sind datenbankunabhängig.

`base64` ist als Plugin-Gem deklariert — es ist seit Ruby 4.0, auf dem Redmine 7
läuft, kein Default-Gem mehr. `pdf-reader` ist optional und wird nur benutzt, um
Text aus PDF-Anhängen für KI-Zusammenfassungen zu ziehen; ohne das Gem werden
solche Anhänge schlicht übersprungen. Das pgvector-Backend der Wissensdatenbank
braucht `pg` in Ihrem Deployment, das voreingestellte Qdrant-Backend nicht.
