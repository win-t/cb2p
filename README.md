waitcb
====

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
