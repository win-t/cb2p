'use strict'

const resKey = Symbol('waitcb result key')

const waitcb = fn => new Promise((ok, fail) => fn((err, ...res) => {
  if (err) {
    if (res.length > 0 && typeof err == 'object') err[resKey] = res
    return fail(err)
  }
  return ok(res)
}))

waitcb.resKey = resKey

exports.waitcb = waitcb
