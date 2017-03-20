# sketchfetch
[![npm](https://img.shields.io/npm/v/sketchfetch.svg)](https://www.npmjs.com/package/sketchfetch)
![Sketch.app](https://img.shields.io/badge/Sketch.app-43-brightgreen.svg)


~= fetch for Sketch, using Futures

```js
import fetch from 'sketchfetch';

fetch('https://reqres.in/api/users').fork(
  err => log('error, fella'),
  res => {
    log('result!');
    log(res);
  }
);
```

## Rationale
- sketch's JS runtime doesn't support fetch or XMLHttpRequest so we can't use any normal polyfills
- NSURLConnections take a ton of code to set up
- no time for that…

## TODOs
- [ ] list out unsupported cases
- [ ] switch to async requests
