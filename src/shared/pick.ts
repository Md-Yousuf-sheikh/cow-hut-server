const pick = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[],
): Partial<T> => {
  const finedObj: Partial<T> = {}
  //
  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finedObj[key] = obj[key]
    }
  }

  return finedObj
}

export default pick
