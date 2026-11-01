# International Education Egypt – Website

Static site (HTML + CSS + JavaScript). No build step. Hash routing (#/apps, #/kids ...), so no server rules are needed.

## IMPORTANT: add your game
Copy your original Math Mission HTML file into `games/` and name it `math-mission.html`
(or change `game.file` in `js/data.js`). Until then, "Play Game" shows a clear
"game file not found" message. The game is loaded unchanged in an iframe.

## Update content (only edit `js/data.js`)
- New video: add a line to `videos` with grade ("6" or "8"), subject (science, math, german, arabic, social, review), title, description, url.
  YouTube watch, youtu.be and Shorts links all work. A subject with no video shows Coming Soon automatically.
- New ad: add `{ title, category, description, url }` to `ads`. Placeholders disappear automatically.
- Social links / contact: fill in `contact`; only filled items appear.

## Publish
**Netlify (easiest):** app.netlify.com/drop, drag the whole `iee-website` folder in. Done.
**Other hosts** (GitHub Pages, Cloudflare Pages, any web host): upload the folder contents as-is.
Open via `https://` (or a local server such as `python3 -m http.server`); opening index.html from disk
works for pages but the game check and YouTube embeds need a web server.

## Structure
index.html · css/styles.css · js/data.js (content) · js/app.js (pages + guide) · assets/logo.png (original, unmodified) · games/
