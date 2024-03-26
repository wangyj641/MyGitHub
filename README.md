# MyGitHub

- A personal GitHub web app that supports logging in to GitHub, browsing repositories, searching repositories, and viewing repository details.

- Developed with JavaScript, Next.js, React, Koa2, TailwindCSS, Redis, OAuth, radix-ui

![screenshot](public/screenshot.jpg)

### Key Skills

- Next.js server-side rending fullstack project 
- Koa2 server provides data interfaces and server-side route
- TailwindCSS UI design
- Github OAuth integration
- Apply React Hooks
- Integrate Redux into Next.js
- Redis session store
- Use Github REST APIs


### Getting Started

##### Configuration
- Register a github OAuth app
```
github -> settings -> Developer settings -> OAuth apps
```
- Edit global.config.js
```
// Github OAuth app client id
const client_id = '246560ac02e68a37f12b';
// Github OAuth app Client Secret
const client_secret = 'a41f9423c793d224b3d268efb1d26e28e9faa281';

const SCOPE = 'user';

const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize';
```

##### Start the app

```shell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.