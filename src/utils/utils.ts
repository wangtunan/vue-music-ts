const viewportWidth = 375
const unitPrecision = 8
export function getUid (): string {
  const t = new Date().getMilliseconds()
  return `${Math.round(2147483647 * Math.random()) * t % 1e10}`
}

export function pxToVw (px: number): number | string {
  return parseFloat((100 / viewportWidth * px).toFixed(unitPrecision))
}
