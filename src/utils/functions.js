import CPMexico from './data/CPMexico.json'

export const getColonies = zipCode => {
  return CPMexico.filter(neighborhood => neighborhood.zipCode === String(zipCode)).map(neighborhood => neighborhood)
}
export const onZipCodeChange = zipCode => {
  return getColonies(zipCode) ?? []
}
