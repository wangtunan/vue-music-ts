export function throttle (fn: () => any, interval = 500): () => void {
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
