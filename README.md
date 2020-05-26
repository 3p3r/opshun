# opshun

<p align="center">
  <img src="banner.jpg" />
</p>

type-safe version of the [rc package](https://www.npmjs.com/package/rc).

## why

this is a drop-in replacement for the rc package that accomplishes:

1. enabling type safety (original rc reads everything as strings)
1. logging flat version of the parsed config for debugging
1. fixing VSCode's intellisense references to the package

## usage

in your project:

```bash
npm install --save opshun
```

in your code:

```JS
const rc = require('opshun);
const conf = rc(appname, {
  //defaults go here.
  port: 2468,
  //defaults which are objects will be merged, not replaced
  views: {
    engine: 'jade'
  }
});
```
