# Video-Assets für Referenz-Seiten

Lade die Videos herunter und lege sie in diesem Ordner (`/public/assets/`) ab.

---

## immobilien-hero.mp4
**Seite:** `/projekte/immobilien` — Müller Immobilien
**Thema:** Luxus-Architektur / modernes Interieur
**Pexels:** https://www.pexels.com/video/5417269/
**Direktlink (MP4):** https://videos.pexels.com/video-files/5417269/5417269-hd_1920_1080_25fps.mp4

Alternativen:
- https://www.pexels.com/video/3571264/ — Moderne Architektur Außenansicht
- https://www.pexels.com/video/1918285/ — Luxus-Villa Drohnenaufnahme

---

## kanzlei-hero.mp4
**Seite:** `/projekte/kanzlei` — Wagner & Partner
**Thema:** Anwaltskanzlei / formelles Büro
**Pexels:** https://www.pexels.com/video/6205498/
**Direktlink (MP4):** https://videos.pexels.com/video-files/6205498/6205498-hd_1920_1080_25fps.mp4

Alternativen:
- https://www.pexels.com/video/5669732/ — Modernes Bürogebäude
- https://www.pexels.com/video/3197299/ — Business-Meeting

---

## steuer-hero.mp4
**Seite:** `/projekte/steuerberatung` — Hoffmann Steuerberatung
**Thema:** Finance / modernes Tech-Büro
**Pexels:** https://www.pexels.com/video/3943961/
**Direktlink (MP4):** https://videos.pexels.com/video-files/3943961/3943961-hd_1920_1080_25fps.mp4

Alternativen:
- https://www.pexels.com/video/6510390/ — Modernes Büro mit Screens
- https://www.pexels.com/video/3195394/ — City/Business Luftaufnahme

---

## Anleitung

1. Pexels-Link öffnen
2. "Download" → Format **HD (1080p)** wählen
3. Datei umbenennen (z.B. `immobilien-hero.mp4`)
4. In diesen Ordner ablegen: `agency/lb-digital/public/assets/`
5. In der jeweiligen `page.tsx` den Pexels-CDN-Link durch den lokalen Pfad ersetzen:

```html
<!-- Vorher (CDN): -->
<source src="https://videos.pexels.com/video-files/5417269/..." type="video/mp4" />

<!-- Nachher (lokal): -->
<source src="/assets/immobilien-hero.mp4" type="video/mp4" />
```

> Alle Videos auf Pexels sind kostenlos und lizenzfrei (Pexels License).
