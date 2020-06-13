export function hasClass (el: HTMLElement, className: string): boolean {
  return el.classList.contains(className)
}

export function addClass (el: HTMLElement, className: string): void {
  if (!hasClass(el, className)) {
    el.classList.add(className)
  }
}
