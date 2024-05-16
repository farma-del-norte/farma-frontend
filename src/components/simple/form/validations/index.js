import * as Yup from 'yup'

const createValidationSchema = formFields => {
  const schemaFields = {}

  formFields.forEach(field => {
    if (['text', 'textarea'].includes(field.type)) {
      schemaFields[field.name] = field.isRequired
        ? Yup.string().required(`El ${field.headerName} es requerido`)
        : Yup.string().notRequired()
    } else if (['email'].includes(field.type)) {
      schemaFields[field.name] = field.isRequired
        ? Yup.string()
            .required(`El ${field.headerName} es requerido`)
            .email('La dirección de correo electrónico no es válida')
        : Yup.string().notRequired().email('La dirección de correo electrónico no es válida') // Optional email validation
    } else if (['password'].includes(field.type)) {
      schemaFields[field.name] = field.isRequired
        ? Yup.string()
            .required('La contraseña es obligatoria')
            .min(8, 'La contraseña debe tener al menos 8 caracteres')
            .matches(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula')
            .matches(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
            .matches(/\d/, 'La contraseña debe contener al menos un dígito')
            .matches(/[^a-zA-Z0-9\s!@#$%^&*()]/, 'La contraseña debe contener al menos un caracter especial')
            .notOneOf(['password', '12345678', 'qwerty'], 'La contraseña no debe ser una contraseña común')
        : Yup.string()
            .notRequired()
            .min(8, 'La contraseña debe tener al menos 8 caracteres')
            .matches(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula')
            .matches(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
            .matches(/\d/, 'La contraseña debe contener al menos un dígito')
            .matches(/[^a-zA-Z0-9\s!@#$%^&*()]/, 'La contraseña debe contener al menos un caracter especial')
            .notOneOf(['password', '12345678', 'qwerty'], 'La contraseña no debe ser una contraseña común')
    }
  })

  return Yup.object().shape(schemaFields)
}

export default createValidationSchema
