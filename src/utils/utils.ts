export function getUid (len = 10): string {
  if (len === 0 || !len) {
    return ''
  }
  const t = new Date().getMilliseconds()
  return `${Math.round(2147483647 * Math.random()) * t % Math.pow(10, len)}`
}

export function pxToVw (px: number, viewportWidth = 375, unitPrecision = 8): number {
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

export function combineParams (data: any): string {
  let url = ''
  for (const key in data) {
    if (data[key] !== undefined) {
      url += `&${key}=${encodeURIComponent(data[key])}`
    }
  }
  return url ? url.substring(1) : ''
}
