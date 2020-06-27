const viewportWidth = 375
const unitPrecision = 8

export function getUid (): string {
  const t = new Date().getMilliseconds()
  return `${Math.round(2147483647 * Math.random()) * t % 1e10}`
}

export function pxToVw (px: number): number | string {
  return parseFloat((100 / viewportWidth * px).toFixed(unitPrecision))
}

export function getRandomNumber (min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle (array: any[]): any[] {
  const arr = array.slice()
  for (let index = 0; index < arr.length; index++) {
    const randomIndex = getRandomNumber(0, arr.length)
    const temp = arr[index]
    arr[index] = arr[randomIndex]
    arr[randomIndex] = temp
  }
  return arr
}

export function formatSecond (second: number): string {
  const m = second / 60 | 0
  const s = second % 60 | 0
  return `${fillNumber(m)}:${fillNumber(s)}`
}

export function fillNumber (value: number, fill = 0, len = 2): string {
  let val = value.toString()
  while (val.length < len) {
    val = `${fill}${val}`
  }
  return val
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
