# DeLeon Judo Club website

Plain HTML/CSS/JS static site. No build step — open `index.html` in a browser or serve the folder with any static host.

```
index.html          Home
classes.html        Schedule, fees, what to bring
kids.html           Kids program
about.html          History, philosophy
instructors.html    Instructor bios
what-is-judo.html   Intro to judo
faq.html            Full FAQ
contact.html        Contact
css/styles.css      All styles
js/main.js          Club info, FAQ list, contact block, mobile nav
js/liquid-glass.js  Refracting "liquid glass" backdrop for the nav pill
public/logo.svg     Logo
```

## Editing content

- **Address, phones, email, schedule, registration link** → `CLUB` object at the top of `js/main.js`. These feed the contact block on every page and the schedule tables.
- **FAQ questions** → `FAQ` array in `js/main.js`. Every page shows the first few (`data-limit` on `<section id="faq">`); `faq.html` shows all.
- **Nav / header / footer** → repeated in each HTML file (find & replace across files).

## Local preview

```
python3 -m http.server 8000
```
then open http://localhost:8000
