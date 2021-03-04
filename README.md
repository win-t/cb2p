# waitcb

Simple utility to convert NodeJS callback style to Promise

example:

```js
const { waitcb } = require('@win-t/waitcb')
const { exec } = require('child_process')

const main = async () => {
  try {
    const [stdout, stderr] = await waitcb(cb => exec(
      `echo out text >&1; echo err text >&2; exit ${Math.floor(Math.random() * 2)}`, cb,
    ))
    console.log('ok', { stdout, stderr })
  } catch (e) {
    const [stdout, stderr] = e[waitcb.resKey]
    console.log('fail', { exitCode: e.code, exitSignal: e.signal, stdout, stderr })
  }
}

main()
```

## How to use

This package provide single function `waitcb` this function take 1 argument `fn` and return Promise

`fn` is a function that take `cb`,

`cb` is a function that you can pass into NodeJS callback parameter

The promise value, when resolved, is an array, whatever called to `cb` (excluding the first error arg)

When the promise is rejected (`cb` is called with first parameter not `null`), then you can access the rest of the parameter called to `cb` using `waitcb.resKey` symbol

