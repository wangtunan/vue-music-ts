const viewportWidth = 375
const unitPrecision = 8

export function getUid (): string {
  const t = new Date().getMilliseconds()
  return `${Math.round(2147483647 * Math.random()) * t % 1e10}`
}

export function pxToVw (px: number): number | string {
  return parseFloat((100 / viewportWidth * px).toFixed(unitPrecision))
}

export function throrrte (fn: () => any, interval = 500): () => void {
  let timer: number | undefined
  let firstTime = true
  const _fn = fn
  return function (...agrs) {
    // @ts-ignore
    const self = this
    if (firstTime) {
      _fn.apply(self, agrs)
      firstTime = false
      return
    }
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      clearTimeout(timer)
      timer = undefined
      _fn.apply(self, agrs)
    }, interval)
  }
}

export function debounce (fn: () => any, delay = 300): () => void {
  let timer: number | undefined
  return function (...args) {
    // @ts-ignore
    const self = this
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      clearTimeout(timer)
      timer = undefined
      fn.apply(self, args)
    }, delay)
  }
}
