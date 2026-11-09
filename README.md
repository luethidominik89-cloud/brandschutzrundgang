# Brandschutz-Rundgang (DETEC Facility Services)

Handy-Web-App für die periodischen Brandschutz-Kontrollrundgänge des Hauswarts
(VKF-Brandschutzrichtlinie 12-15, Ziff. 3.1 und 4.2).

- Läuft in Chrome auf Android, auch ohne Netz (Service Worker).
- Daten nur auf dem Gerät (IndexedDB + Spiegel). Keine Kundendaten in diesem Repo:
  Gebäude, Standorte und alte Mängel kommen über ein separates Startpaket (JSON).
- Bericht pro Gebäude als PDF (an die Hausdienst-Adresse zur Ablage) und HTML-Übersicht
  aller offenen Mängel (an die Kontrolle). Versand über das Microsoft-365-Geschäftskonto
  (Microsoft Graph, Anmeldung mit PKCE, kein Server).
- `uebersicht.html`: interaktive Übersicht (Suchen/Filtern/Sortieren). Die Daten stehen
  komprimiert im Link nach dem «#» und werden nie an den Server übertragen.
- Kontrollpunkte nach VKF 12-15, 15-15, 16-15, 17-15, 18-15.

Bei jedem Update `VERSION` in `sw.js` und `APP_V` in `index.html` gleich hochzählen.

PDF-Erzeugung: jsPDF 2.5.2 (MIT-Lizenz, © James Hall, yWorks GmbH).

© Dominik Lüthi, Einzelfirma prüfbuch.ch
