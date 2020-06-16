export function hasClass (el: HTMLElement, className: string): boolean {
  if (el.classList) {
    return el.classList.contains(className)
  } else {
    return ` ${el.className} `.indexOf(` ${className} `) > -1
  }
}

export function addClass (el: HTMLElement, className: string): void {
  if (el.classList) {
    el.classList.add(className)
  } else if (!hasClass(el, className)) {
    el.className += ` ${className}`
  }
}

export function getDomData (el: HTMLElement, name: string): string | null {
  const prefix = 'data-'
  return el.getAttribute(prefix + name)
}
