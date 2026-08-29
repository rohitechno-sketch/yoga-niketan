# Yoga Niketan — Website

A calm, modern, responsive static website for **Yoga Niketan, Bangui Nagar** — a
centre for yoga, meditation, wellness and personal development.

Built with plain HTML5, CSS3 and vanilla JavaScript. No build step, no
backend, no database — it can be hosted anywhere that serves static files,
including GitHub Pages.

## Project structure

```
yoga-niketan/
│
├── index.html        Home page (hero, intro, why yoga, schedule, testimonials, CTA)
├── about.html         Our story, our approach, our community
├── yoga.html          Yoga practices: Hatha Yoga, Pranayama, Meditation, Beginners
├── classes.html       Full weekly class schedule (placeholder data)
├── gallery.html        Categorised photo gallery with lightbox
├── contact.html       Contact details, form, map placeholder
│
├── css/
│   └── style.css      All site styling (CSS variables, layout, animations)
│
├── js/
│   └── script.js      Navigation, lightbox, WhatsApp link, form handling
│
├── images/
│   ├── logo.png
│   ├── hero.jpg
│   ├── yoga-1.jpg / yoga-2.jpg / meditation.jpg / about.jpg
│   └── gallery/       Category photos (yoga, meditation, classes, community, centre)
│
└── README.md
```

All images currently shipped in this repository are **generated placeholder
graphics**, clearly labelled as placeholders. They are provided only so the
layout can be previewed, and must be replaced with real photographs of Yoga
Niketan before the site goes live.

## 1. Running the website locally

No installation or build tools are required. Pick any of the following:

- **Just open it:** double-click `index.html` (or open it via your browser's
  File > Open dialog).
- **Recommended (avoids browser file-path restrictions):** serve the folder
  with a simple local web server, for example:

  ```bash
  # Python 3
  python3 -m http.server 8000

  # Node.js (if installed)
  npx serve .
  ```

  Then visit `http://localhost:8000` in your browser.

## 2. Replacing images

Every image file in `images/` (including `images/gallery/`) is a placeholder.
To replace an image:

1. Prepare your photo (JPEG/PNG/WebP), ideally similar in aspect ratio to the
   placeholder it replaces.
2. Save it with **the same filename** into the same folder (e.g. overwrite
   `images/hero.jpg`), or use a new filename and update the corresponding
   `src="..."` attribute in the HTML.
3. Update the image's `alt` text in the HTML to describe the real photo.
4. For the logo, replace `images/logo.png` with your own logo (ideally a
   square PNG with a transparent background).

The gallery (`gallery.html`) uses `data-category` attributes (`yoga`,
`meditation`, `classes`, `community`, `centre`) on each `<button
class="gallery-item">` — keep these attributes so the category filters keep
working, and add more `<button class="gallery-item">` blocks for more photos.

## 3. Updating contact information

Contact details appear in a few places and use clearly marked placeholders
such as `[ADD PHONE NUMBER]`, `[ADD EMAIL]`, `[ADD ADDRESS]`:

- `contact.html` — address, phone, email, opening hours, and the Google Maps
  embed.
- Footer (repeated at the bottom of every page) — address, phone, email.
- `index.html` — the structured data (`<script type="application/ld+json">`)
  in the `<head>`, used for local-business SEO.

**WhatsApp number:** open `js/script.js` and edit the `SITE_SETTINGS` object
near the top of the file:

```js
const SITE_SETTINGS = {
  whatsappNumber: "REPLACE_WITH_NUMBER", // international format, digits only
  whatsappMessage: "Hello Yoga Niketan, I would like to know more about your yoga classes.",
};
```

Use the full international format with digits only (no spaces, dashes, or
`+`), for example `"919876543210"`. This number automatically powers both the
floating WhatsApp button and any "Chat on WhatsApp" links across the site.

**Google Maps:** in `contact.html`, find the `<iframe>` inside
`.map-wrapper` and replace its `src="about:blank"` with the real embed URL
from Google Maps (Google Maps → Share → Embed a map → copy the `src` from the
provided `<iframe>` code). Do not guess coordinates — use the official embed
link for the real Yoga Niketan, Bangui Nagar location.

## 4. Updating the class schedule

The schedule tables in `index.html` (home page preview) and `classes.html`
(full schedule) use clearly marked **placeholder data** in `<table
class="schedule-table">`. Each row looks like:

```html
<tr>
  <td>Monday</td>
  <td>7:00 AM</td>
  <td>Yoga</td>
  <td>All Levels</td>
  <td>[ADD INSTRUCTOR NAME]</td>
</tr>
```

To update the schedule:

1. Edit the `<td>` values for Day, Time, Class, Level and Instructor.
2. Add or remove `<tr>` rows as needed for the real timetable.
3. Remove the "placeholder schedule" note (`.schedule-note`) once real data is
   in place.

## 5. Adding social media links

Social icons appear in the footer of every page:

```html
<ul class="social-list" aria-label="Social media">
  <li><a href="#" aria-label="Instagram (link to be added)">IG</a></li>
  <li><a href="#" aria-label="Facebook (link to be added)">FB</a></li>
  <li><a href="#" aria-label="YouTube (link to be added)">YT</a></li>
  <li><a href="#" data-whatsapp-button aria-label="WhatsApp">WA</a></li>
</ul>
```

Replace each `href="#"` with the real profile URL once the official account
is known, and update the `aria-label` accordingly. Do this on every page (the
footer markup is repeated identically across `index.html`, `about.html`,
`yoga.html`, `classes.html`, `gallery.html` and `contact.html`).

## 6. Deploying to GitHub Pages

1. Commit and push this repository to GitHub (or use your existing repo).
2. On GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, choose:
   - Source: `Deploy from a branch`
   - Branch: `main` (or your default branch), folder `/ (root)`
4. Save. GitHub will publish the site at
   `https://<your-username>.github.io/<repository-name>/`.
5. Because all links in this project are relative (`about.html`,
   `css/style.css`, etc.), the site works correctly whether it's served from
   the domain root or a repository sub-path — no configuration changes are
   needed.

## Accessibility & performance notes

- Semantic HTML5 landmarks (`header`, `nav`, `main`, `footer`) and a
  skip-to-content link are included on every page.
- All interactive elements are keyboard accessible with visible focus states.
- Animations respect `prefers-reduced-motion`.
- Gallery images use `loading="lazy"` to avoid loading unnecessary images.

## Content honesty

In line with the project requirements, this site does **not** invent factual
details about Yoga Niketan (address, phone, instructors, history, awards, or
testimonials). All unknown information is marked with placeholders such as
`[ADD PHONE NUMBER]` or `[ADD INSTRUCTOR NAME]`, and sample testimonials are
explicitly labelled as placeholder content. Please replace these with real,
verified information before publishing the site.
