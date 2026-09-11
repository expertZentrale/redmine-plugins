---
layout: legal
lang: de
ref: privacy
permalink: /de/datenschutz/
title: Datenschutz
description: >-
  Was diese Website erhebt — nämlich nichts. Keine Cookies, keine Analyse, keine
  Anfragen an Dritte. Gehostet auf GitHub Pages.
---

<div class="callout" markdown="1">
**Gerüst.** Die sachliche Beschreibung unten trifft auf die Website zu, wie sie
gebaut ist. Die Angaben zum Verantwortlichen und der Abschnitt zu den
Betroffenenrechten brauchen jedoch dieselben Unternehmensdaten wie das
[Impressum]({{ '/de/impressum/' | relative_url }}), und die gesamte Seite sollte
vor dem Livegang unter einer öffentlichen Domain geprüft werden.
</div>

## Die kurze Fassung

Dies ist eine statische Website. Sie setzt keine Cookies, betreibt keine
Analyse, bindet nichts von Dritten ein und hat weder Formulare noch Login noch
Kommentarfunktion. Nichts, was Sie hier tun, wird von uns aufgezeichnet.

## Verantwortlicher

TODO — Firmierung, Anschrift und Kontakt, übereinstimmend mit dem Impressum.
Datenschutzbeauftragter: TODO — Name und Kontakt, sofern bestellt.

## Hosting

Die Website wird auf **GitHub Pages** gehostet, betrieben von GitHub Inc.,
88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA.

Wenn Sie eine Seite aufrufen, übermittelt Ihr Browser zwangsläufig Ihre
IP-Adresse zusammen mit der Anfrage an GitHub, und GitHub hält sie in seinen
Server-Logs fest. GitHub gibt an, diese Logs zu Sicherheitszwecken zu nutzen und
für einen begrenzten Zeitraum aufzubewahren. Wir haben darauf keinen Zugriff und
können es nicht abschalten. Beschrieben ist das in GitHubs eigener
[Datenschutzerklärung](https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement)
und, speziell für Pages, in der
[GitHub-Pages-Dokumentation](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#data-collection).

Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO — unser berechtigtes Interesse am
sicheren Betrieb dieser Website. GitHub ist nach dem EU-U.S. Data Privacy
Framework zertifiziert.

## Was diese Website nicht tut

Das sind Eigenschaften der Bauweise, keine Absichtserklärungen:

- **Keine Cookies.** Die Website setzt keinerlei Cookies. Es gibt kein
  Einwilligungsbanner, weil es nichts einzuwilligen gibt.
- **Keine Analyse.** Kein Google Analytics, kein Matomo, kein Zählpixel, kein
  Beacon.
- **Keine Anfragen an Dritte.** Jede Schrift, jedes Stylesheet, jedes Skript und
  jedes Bild wird von der Domain dieser Website selbst ausgeliefert.
  Insbesondere ist die Schrift Nunito lokal eingebunden und wird nicht von
  Google Fonts geladen — Ihre IP-Adresse geht dafür also nicht an Google.
- **Keine eingebetteten Inhalte.** Keine Videos, keine Karten, keine
  Social-Media-Widgets, keine iframes.
- **Keine Formulare.** Nichts hier erhebt einen Namen, eine Anschrift oder eine
  Nachricht.

Sie können das selbst nachprüfen: Öffnen Sie den Netzwerk-Tab Ihres Browsers und
laden Sie die Seite neu. Jede Anfrage geht an diese Domain.

## Wenn Sie diese Website verlassen

Links zu GitHub, redmine.org und anderen Seiten sind gewöhnliche Links. Sobald
Sie einem folgen, gilt die Datenschutzerklärung der dortigen Seite, und wir
haben keinen Einfluss darauf, was sie erhebt. Wenn Sie ein Plugin-Release
herunterladen, einen Fehler melden oder den Quellcode lesen, tun Sie das auf
GitHub zu GitHubs Bedingungen.

## Ihre Rechte

Nach der DSGVO haben Sie das Recht auf Auskunft (Art. 15), Berichtigung
(Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18),
Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21) sowie das Recht auf
Beschwerde bei einer Aufsichtsbehörde (Art. 77).

Da diese Website selbst keine personenbezogenen Daten speichert, beträfe ein
Auskunfts- oder Löschersuchen allein die Server-Logs von GitHub, das Sie dafür
unmittelbar adressieren müssten.

TODO — den Kontaktweg zur Ausübung dieser Rechte bestätigen und die zuständige
Aufsichtsbehörde benennen.

## Zur Software selbst

Die hier beschriebenen Plugins laufen in **Ihrem** Redmine, auf Ihrer eigenen
Infrastruktur. Sie senden nichts an uns, kontaktieren keinen Lizenzserver und
haben keine Telemetrie. Personenbezogene Daten, die sie verarbeiten — Tickets,
Kontakte, Benutzeraktivität — bleiben in Ihrer eigenen Datenbank und werden
unter Ihrer eigenen Verantwortung als Verantwortlicher verarbeitet.

Zwei Funktionen verdienen eine ausdrückliche Erwähnung, weil sie Daten aus Ihrer
Infrastruktur heraussenden können — beide werden **deaktiviert** ausgeliefert:

- **KI-Zusammenfassungen, Wissensdatenbank und Vollständigkeitsprüfung** in
  expert Helpdesk senden Ticket-Text und, wenn Sie es so einstellen, Anhänge an
  denjenigen KI-Anbieter, auf den Sie sie richten. Wo dieser Anbieter sitzt und
  was er mit den Daten tut, ist eine Sache zwischen Ihnen und ihm — genau
  deshalb unterstützt das Plugin auch einen selbst betriebenen,
  OpenAI-kompatiblen Endpunkt.
- **Die Phishing-Erkennung** lädt öffentliche URL-Listen in eine lokale Kopie
  und prüft Links gegen diese Kopie. Die Links aus Ihrer Mail werden nirgendwohin
  gesendet; der Abgleich geschieht in Ihrer eigenen Datenbank.

## Änderungen

Diese Seite beschreibt die Website so, wie sie derzeit gebaut ist. Sollte sie je
etwas bekommen, das Daten erhebt, ändert sich zuerst diese Seite.
