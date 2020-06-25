export function getUid (): string {
  const t = new Date().getMilliseconds()
  return `${Math.round(2147483647 * Math.random()) * t % 1e10}`
}
