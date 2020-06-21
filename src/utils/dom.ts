interface Vendor {
  webkit: string;
  Moz: string;
  O: string;
  ms: string;
  standard: string;
  [propName: string]: any;
}
const domStyle = document.createElement('div').style
const vendor = (function () {
  const vendorsName: Vendor = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
  for (const key in vendorsName) {
    const val = vendorsName[key]
    if (domStyle[val] !== undefined) {
      return key
    }
  }
  return ''
})()
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

export function getVendorsPrefix (style: string): string {
  if (!vendor) {
    return ''
  }
  if (vendor === 'standard') {
    return style
  }
  return `${vendor}${style.charAt(0).toUpperCase()}${style.substring(1)}`
}
