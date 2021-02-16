# Next.js with sql.js 🐳

This is a barebone example of how to use [sql.js](https://github.com/sql-js/sql.js) in [Next.js](https://github.com/vercel/next.js/).

Wait, what the heck is [sql.js](https://github.com/sql-js/sql.js)? [sql.js](https://github.com/sql-js/sql.js) is SQLite compiled to WebAssembly. This enables SQLite to be run entirely in the browser. ✨

This repo is largely based on [@lovasoa](https://github.com/lovasoa)'s [react-sqljs-demo example](https://github.com/sql-js/react-sqljs-demo).

## Working Example 🔥

[https://nextjs-with-sqljs-example.vercel.app/](https://nextjs-with-sqljs-example.vercel.app/)

## Tricks to make sql.js work in Next.js 🍉

There are two primary differences compared to the [react-sqljs-demo example](https://github.com/sql-js/react-sqljs-demo).

### Trick 1: Webpack config (`next.config.js`)

This example doesn't utilize the `copy-webpack-plugin` to copy wasm file from `/node_modules/sql.js/dist/sql-wasm.wasm`. So, the webpack configuration will be simpler. However, we do need to ignore `fs` module in npm when in browser context.

```javascript
// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    // If in client, don't use fs module in npm
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }

    return config;
  },
};
```

### Trick 2: Retrieve wasm file from CDN

The wasm file is retrieved from a CDN when initializing [sql.js](https://github.com/sql-js/sql.js). This is to avoid having to use the `copy-webpack-plugin`.

```javascript
// whichever component you're initializing sql.js
initSqlJs({
  // Fetch sql.js wasm file from CDN
  // This way, we don't need to deal with webpack
  locateFile: (file) =>
    `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.4.0/dist/${file}`,
})
```


## Running locally 🏃🏻
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Credits

[@lovasoa](https://github.com/lovasoa) - [react-sqljs-demo example](https://github.com/sql-js/react-sqljs-demo)
