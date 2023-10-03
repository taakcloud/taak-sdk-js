export function applyMixins(derivedConstructor: any, baseConstructors: any[]) {
  baseConstructors.forEach((baseConstructor) => {
    Object.getOwnPropertyNames(baseConstructor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedConstructor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseConstructor.prototype, name)
      )
    })
  })
}

export function isJson(item: any) {
  let value = typeof item !== 'string' ? JSON.stringify(item) : item
  try {
    value = JSON.parse(value)
  } catch (e) {
    return false
  }

  return typeof value === 'object' && value !== null
}
