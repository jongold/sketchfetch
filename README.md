# sketchfetch

~= fetch for Sketch, using Futures

```
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
- [ ] support POST w/ data
- [ ] list out unsupported cases
- [ ] switch to async requests
