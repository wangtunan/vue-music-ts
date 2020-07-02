interface Vendor {
  webkit: string;
  Moz: string;
  O: string;
  ms: string;
  standard: string;
  [propName: string]: any;
}
const domStyle = document.createElement('div').style

export const vendor = (function () {
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
  return 'standard'
})()

export function hasClass (el: HTMLElement, className: string): boolean {
  return el.classList.contains(className)
}

export function addClass (el: HTMLElement, className: string) {
  el.classList.add(className)
}

export function getDomData (el: HTMLElement, name: string): string | null {
  const prefix = 'data-'
  return el.getAttribute(prefix + name)
}

export function getVendorsPrefix (style: string, venderName = vendor): string {
  if (venderName === 'standard') {
    return style
  }
  return `${venderName}${style.charAt(0).toUpperCase()}${style.substring(1)}`
}
