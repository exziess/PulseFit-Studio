# PulseFit Studio — website project

A responsive, multi-page fitness studio website built with plain HTML, CSS and JavaScript. It is designed to be easy to run and publish without a build step.

## Run locally

1. Extract the `pulsefit-studio` folder.
2. Open `index.html` in a modern browser.
3. For the most reliable local preview, you can run a simple static server from this folder:
   - Python: `python -m http.server 8000`
   - Then visit `http://localhost:8000`

No npm install, API keys, or backend are required.

## Pages

- `index.html` — home page
- `services.html` — service details, sample schedule filters, FAQ
- `team.html` — staff directory with working role filters and replaceable profile placeholders
- `styles.css` — shared design and responsive styling
- `app.js` — navigation, animation, demo booking form, PulseBot, schedule, team rendering

## Add staff photos

Put the photos in `images/team/` using these names, or update the `photo` values in the `staff` array near the end of `app.js`:

- `staff-member-01.jpg`
- `staff-member-02.jpg`
- `staff-member-03.jpg`
- `staff-member-04.jpg`
- `staff-member-05.jpg`
- `staff-member-06.jpg`

If an image is missing, the branded placeholder remains visible. Update the names, roles, and biographies in the same array when real details are available.

## Important demo notes

- PulseBot uses prepared local answers; it is not connected to a live AI model.
- The booking form validates entries and shows a demo confirmation. It does not send or save submissions.
- The class timetable and fitness-tracker figures are illustrative.
- Gym imagery is loaded from Unsplash and Google Fonts are loaded remotely, so those visual assets require an internet connection. You can replace them with locally licensed assets before publishing.
- The website is a student project template. Add verified contact information and business details before presenting it as a real operating gym.

## Publish

This is a static website, so it can be deployed to any static host. For example, upload the folder contents to a static hosting provider's project/deployment interface. The public URL is provided by the hosting provider after deployment; it cannot be created by simply opening the local files.
