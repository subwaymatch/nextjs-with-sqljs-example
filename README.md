# Next.js with sql.js - TypeScript edition 🐳

This is a barebone example of how to use [sql.js](https://github.com/sql-js/sql.js) in [Next.js](https://github.com/vercel/next.js/).

[sql.js](https://github.com/sql-js/sql.js) is SQLite compiled to WebAssembly. This enables SQLite to run entirely in the browser. ✨

This repo is forked from [@subwaymatch](https://github.com/subwaymatch/nextjs-with-sqljs-example), only it uses TypeScript and types. Please see source repo for notes. 

[@subwaymatch]'s work is based on based on [@lovasoa](https://github.com/lovasoa)'s [react-sqljs-demo example](https://github.com/sql-js/react-sqljs-demo).

## Working Example 🔥

[https://nextjs-with-sqljs-example.vercel.app/](https://nextjs-with-sqljs-example.vercel.app/)

## Tricks to make sql.js work in Next.js 🍉

There are two primary differences compared to the [react-sqljs-demo example](https://github.com/sql-js/react-sqljs-demo).

### Trick 1: Webpack config (`next.config.js`)

This example doesn't utilize `craco` to provide a custom webpack configuration. Instead, we add a custom webpack configuration in `next.config.js` to not include a polyfill for the `fs` module.

```javascript
// next.config.js
module.exports = {
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
};
```

### Trick 2: Retrieve wasm file from CDN

The wasm file is retrieved from a CDN when initializing [sql.js](https://github.com/sql-js/sql.js).

```javascript
initSqlJs({
  locateFile: (file) => `https://sql.js.org/dist/${file}`,
});
```

## Running locally 🏃🏻

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Credits
[@subwaymatch] - [nextjs-with-sqljs-example](https://github.com/subwaymatch/nextjs-with-sqljs-example)
[@lovasoa](https://github.com/lovasoa) - [react-sqljs-demo example](https://github.com/sql-js/react-sqljs-demo)
