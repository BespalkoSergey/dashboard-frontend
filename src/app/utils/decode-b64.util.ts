export const parse = (v: unknown) => {
  try {
    if (typeof v !== 'string') {
      throw new Error('type of value is not string')
    }

    return JSON.parse(v)
  } catch (e) {
    console.log(e)
    return null
  }
}

const getAtob = (b64: string): string => {
  try {
    return atob(b64)
  } catch (e) {
    console.log(e)
    return ''
  }
}

const decode = (s: string): string =>
  decodeURIComponent(
    getAtob((s.split('.').splice(1, 1).shift() || '').replace(/-/g, '+').replace(/_/g, '/'))
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  )

export const decodeB64Util = <T extends object>(v: string | null): T | null => {
  if (v) {
    try {
      const d = decode(v)
      return parse(d)
    } catch (e) {
      console.log(e)
      return null
    }
  }

  return null
}
