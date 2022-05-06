# Personal Website

This site is intended for my personal website.

I open this project to public, so that it can be used for your personal website.

## Stacks

- [Nuxt 3](https://v3.nuxtjs.org)
- [TailwindCSS 3](https://tailwindcss.com)
- [DaisyUI](https://daisyui.com)
- [GraphCMS](https://graphcms.com)

## Setup

Make sure to install the dependencies:

```bash
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
pnpm run dev
```

## Production

Build the application for production:

```bash
pnpm run build
```

Locally preview production build:

```bash
pnpm run preview
```

## Changing the Data

Open the file `/composables/useData.js`, and change the data returned in functin `getDataLocal`

## Using GraphCMS for your data

Copy the file `.env-example`, and name the new file to `.env`

```dotenv
NUXT_AUTHOR_ID=the-id-of-author
NUXT_GRAPH_CMS_URL=your-graphcms-public-url
NUXT_USE_GRAPH_CMS=1
```

## Credits

I want to give a credit to [Brittany Chiang](https://brittanychiang.com/),
where I base the design of this project to her [Personal Website V4](https://github.com/bchiang7/v4).
