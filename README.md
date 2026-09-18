# Roomy website

Static pages for the App Store listing: a landing page with screenshots and pricing, the
privacy policy, and the support page with the FAQ (both mandatory URLs in App Store Connect).
Korean and English live in the same file as two `<section class="language">` blocks; `lang.js`
shows one at a time (order: `?lang=`, `#ko`/`#en`, the visitor's last choice, browser language).
No build step. Screenshots in `img/` are 1440-px JPEGs made from `docs/appstore/screenshots/`:

```sh
for lang in en ko; do i=0; for f in docs/appstore/screenshots/$lang/*.png; do i=$((i+1)); \
  sips -Z 1440 -s format jpeg -s formatOptions 82 "$f" --out "site/img/${lang}-0${i}.jpg"; done; done
```

The App Store badge links to `https://apps.apple.com/app/id6812335900`, which resolves once the
app is live.

| File | Purpose | App Store Connect field / in-app link |
|---|---|---|
| `index.html` | Landing page | Marketing URL (optional) · `ROOMY_WEBSITE_URL` |
| `privacy.html` | Privacy policy | Privacy Policy URL · `ROOMY_PRIVACY_URL` |
| `support.html` | Support + FAQ | Support URL · `ROOMY_HELP_URL` |

## Publishing

This repository is private, and GitHub Pages on a private repository needs a paid plan, so the
site is published from the **separate public repository `skyfall-vfx/roomy-site`**, with
GitHub Pages enabled on its `main` branch root (live at https://skyfall-vfx.github.io/roomy-site/):

```sh
# from the Roomy checkout
rsync -a --delete site/ ../roomy-site/ && cd ../roomy-site && git add -A && git commit -m "Update site" && git push
```

The pages are `https://skyfall-vfx.github.io/roomy-site/privacy.html` and `support.html`;
`Packaging/Info.plist` already links to them, and the same two URLs go into App Store Connect.
A custom domain can be added to the Pages settings later; then set `ROOMY_PRIVACY_URL`,
`ROOMY_HELP_URL` and `ROOMY_WEBSITE_URL` in `Scripts/release.env`.

Support mailbox: `info@skyfall.studio` (in the pages and in the app's `RoomySupportEmail`).
