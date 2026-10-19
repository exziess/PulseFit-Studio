# PulseFit Studio

A responsive React + Vite fitness studio website demo.

## Run locally
1. Install Node.js (LTS).
2. Open a terminal in this folder.
3. Run `npm install`
4. Run `npm run dev`
5. Open the local URL printed by Vite.

## Production build
Run `npm run build`. The generated site will be in `dist/`.

## Deploy
Import this project into a Git provider and deploy it on a static hosting platform such as Vercel or Netlify. Build command: `npm run build`; output directory: `dist`.

## Replace team photos
Put portraits into `public/images/team/` and update the `image` paths in `src/data.js`.
The current image paths are intentional placeholders; until real portraits are added, branded fallbacks are shown.

## Demo-only features
- PulseFit AI uses a Vercel serverless API route and the OpenAI Responses API. Configure `OPENAI_API_KEY` in Vercel Project Settings → Environment Variables; never put the key in client-side code or commit it to GitHub.
- Trial booking is a front-end demo and does not transmit or save submitted details.
- Class schedule and instructor names are illustrative.
- No real prices, address, contact details, or employee identities are invented.

## Enable the AI assistant on Vercel
1. In the OpenAI API platform, create an API key and ensure the API account has billing/credits configured. The ChatGPT subscription does not automatically include API usage.
2. In Vercel, open Project Settings → Environment Variables. Add key `OPENAI_API_KEY` and paste the secret value into the Value field. Select Production and Preview as appropriate.
3. Save the variable and redeploy the latest deployment. Never commit the key to GitHub or expose it in browser code.

The Obama profile and supplied image are included as a fictional website mock-up only, not a claim that the real person works for or endorses the studio.

## Notes
Remote Unsplash photos and Google Fonts require an internet connection. Replace them with locally licensed assets if needed.
