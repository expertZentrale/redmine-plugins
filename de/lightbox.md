---
layout: plugin
lang: de
ref: lightbox
plugin: lightbox
permalink: /de/lightbox/
title: expert Lightbox
description: >-
  Bild- und PDF-Anhänge in einem Dialog ansehen, statt die Seite zu verlassen.
  Nativer Browser-Dialog, kein jQuery, keine Fremdbibliotheken, keine
  überschriebene View. Redmine 5.1 bis 7.0, GPL-2.0.
promise: >-
  Ein Klick auf ein Bild oder einen PDF-Anhang öffnet ihn in einem Dialog,
  statt die Seite zu verlassen, die Sie gerade lesen. Pfeiltasten, Wischen und
  Klickzonen am Rand führen durch alles Weitere auf der Seite.
intro: >-
  Dieses Plugin gibt es, weil `redmine_x_lightbox2` unter Redmine 6 und 7 nicht
  mehr funktioniert hat. Es hatte eine Kern-View für Anhänge überschrieben und
  sich auf die `icon-*`-Klassen gestützt, die Redmine 7 entfernt hat. Der Ersatz
  besitzt davon bewusst nichts: keine überschriebene View, kein Controller-Patch,
  nichts, was vom Markup der Anhänge abhängt.

features:
  - kicker: Vorschau
    title: Bilder und PDFs, an Ort und Stelle
    shot: 01-image-modal
    body: >-
      Ein Bild öffnet sich auf Fenstergröße skaliert, ein PDF im eingebauten
      PDF-Betrachter des Browsers. Alles andere verhält sich genau wie vorher —
      das Plugin mischt sich bei Dateien, die es nicht anzeigen kann, nicht ein.
      `Esc` oder ein Klick auf den Hintergrund schließt den Dialog, und der Fokus
      kehrt zu dem Link zurück, den Sie angeklickt haben.

  - kicker: Galerie
    title: Vier Wege durch den Satz
    shot: 02-gallery
    body: >-
      Alle anzeigbaren Anhänge einer Seite bilden in Dokumentreihenfolge eine
      Galerie. Durchblättern geht mit den Pfeiltasten, den Schaltflächen in der
      Kopfzeile, den Klickzonen am linken und rechten Bildrand — unsichtbar bis
      zum Überfahren, auf Touchgeräten dauerhaft sichtbar — oder per waagerechtem
      Wischen. Überwiegend senkrechte Bewegungen scrollen weiterhin die Seite,
      und `Strg`/`Cmd`/Mittelklick öffnet den Anhang nach wie vor in einem neuen Tab.

  - kicker: Überall
    title: Keine Liste erlaubter Seiten
    shot: 03-wiki
    body: >-
      Ticketanhänge, Vorschaubilder im Verlauf, eingebettete Wiki-Bilder, die
      Module Dateien und Dokumente, Neuigkeiten und Forenbeiträge — und jede
      Seite eines Fremd-Plugins, die auf einen Anhang verlinkt. Die Erkennung
      greift allein an der Form der Anhang-URLs an, nicht an einer Liste von
      Controllern, an die wir zufällig gedacht haben.

why:
  - "**Keine Abhängigkeiten.** Reines JavaScript und ein natives `<dialog>` — `Esc`, Fokusführung und Hintergrund kommen damit vom Browser. Kein jQuery, kein Fancybox, kein Build-Schritt, keine CDN-Anfrage."
  - "**Keine überschriebene View und kein Controller-Patch.** Die Erkennung greift an URL-Formen an, die über viele Redmine-Hauptversionen stabil geblieben sind, und nicht am Markup, an CSS-Klassen oder an Icon-Fonts des Kerns — genau daran ist der Vorgänger zerbrochen."
  - "**Keine Konfiguration.** Keine Migrationen, keine Einstellungen, keine Berechtigungen."
  - "**Es degradiert zu nichts.** In einem Browser ohne `<dialog>` bleibt das Plugin untätig, und Anhang-Links verhalten sich wie gewohnt."
  - "**Der eine Server-Endpunkt ist bewusst eng.** Er liefert eine Datei nur dann eingebettet aus, wenn ihre Endung auf einer festen Liste steht, sendet `X-Content-Type-Options: nosniff` mit einem Typ aus eben dieser Liste statt aus den Metadaten des Uploads, und prüft Redmines `Attachment#visible?` — er gewährt also nichts, was der normale Download-Weg nicht auch gewähren würde."

install:
  step1: "Release-Archiv herunterladen:"
  step2: "In das Verzeichnis `plugins/` Ihres Redmine entpacken:"
  step3: ""
  step4: "Redmine neu starten. Mehr ist nicht zu tun — kein Modul zu aktivieren, keine Berechtigung zu vergeben, keine Einstellung zu setzen."
  note: >-
    Keine Migrationen, also auch kein Migrationsschritt und nichts
    zurückzurollen. Wenn Sie `redmine_x_lightbox2` oder `redmine_lightbox2`
    ablösen, entfernen Sie das alte Plugin zuerst — zwei Lightboxen auf einer
    Seite greifen beide nach demselben Klick.
---

Keine Gems, keine Migrationen, keine Einstellungen, keine Berechtigungen. Läuft
auf jeder Datenbank, weil es keine anfasst.
