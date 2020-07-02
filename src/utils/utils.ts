export function getUid (len = 10): string {
  if (len === 0 || !len) {
    return ''
  }
  const t = new Date().getMilliseconds()
  return `${Math.round(2147483647 * Math.random()) * t % Math.pow(10, len)}`
}

export function pxToVw (px: number, viewportWidth = 375, unitPrecision = 8): number {
  if (px === 0) {
    return 0
  }
  return parseFloat((100 / viewportWidth * px).toFixed(unitPrecision))
}

export function getRandomNumber (min: number, max: number): number {
  max = Math.max(min, max)
  min = Math.min(min, max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle (array: any[]): any[] {
  if (array.length === 0 || array.length === 1) {
    return array
  }
  const arr = array.slice()
  for (let index = 0; index < arr.length; index++) {
    const randomIndex = getRandomNumber(0, index)
    const temp = arr[index]
    arr[index] = arr[randomIndex]
    arr[randomIndex] = temp
  }
  return arr
}

export function formatSecond (second: number): string {
  const m = second / 60 | 0
  const s = second % 60 | 0
  return `${fillString(m)}:${fillString(s)}`
}

export function fillString (value: number | string, fill = 0, len = 2): string {
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
