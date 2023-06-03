const viasRespiratorias = 'Vías Respiratorias'
const activacionMental = 'Activación Mental'
const generacionMuscular = 'Regeneración Muscular'
const saludHormonal = 'Salud Hormonal'
const pielCabelloUñas = 'Piel, Cabello y Uñas'
const digestion = 'Digestión'
const relajación = 'Relajación'
const sistemaOseo = 'Sistema Óseo'
const sistemaInmune = 'Sistema Inmune'
const circulaciónArterial = 'Circulación Arterial'
const propertiesName = {
  parse: {
    viasRespiratorias,
    activacionMental,
    generacionMuscular,
    saludHormonal,
    pielCabelloUñas,
    digestion,
    relajación,
    sistemaOseo,
    sistemaInmune,
    circulaciónArterial
  }
}
export function getCustomStructureMainComponents(obj) {
  return obj.map((o, index) => ({label: o.property, value: o.property, fieldIndex: index}))
}
export function getCustomStructure(obj) {
  return Object.entries(obj).map(([property, value]) => ({property: propertiesName.parse[property], value: value}))
}

const parseDataToEdit = properties => {
  const initialValues = properties.reduce((acc, {property, value}) => {
    switch (property) {
      case viasRespiratorias:
        acc.viasRespiratorias = value
        break
      case activacionMental:
        acc.activacionMental = value
        break
      case generacionMuscular:
        acc.generacionMuscular = value
        break
      case saludHormonal:
        acc.saludHormonal = value
        break
      case pielCabelloUñas:
        acc.pielCabelloUñas = value
        break
      case digestion:
        acc.digestion = value
        break
      case relajación:
        acc.relajación = value
        break
      case sistemaOseo:
        acc.sistemaOseo = value
        break
      case sistemaInmune:
        acc.sistemaInmune = value
        break
      case circulaciónArterial:
        acc.circulaciónArterial = value
        break
    }
    return acc
  }, {})

  return initialValues
}
//titles for reusables modals "farma del norte"

const getTitle = action => {
  switch (action) {
    case 'edit':
      return 'Editar dimension seleccionada'
    case 'add':
      return 'Agregar dimension'
    case 'delete':
      return 'Eliminar dimension'
    default:
      return ''
  }
}

export {
  viasRespiratorias,
  activacionMental,
  generacionMuscular,
  saludHormonal,
  pielCabelloUñas,
  digestion,
  relajación,
  sistemaOseo,
  sistemaInmune,
  circulaciónArterial,
  //parseDataToEdit
  parseDataToEdit,
  //farma del norte utils
  getTitle
}
