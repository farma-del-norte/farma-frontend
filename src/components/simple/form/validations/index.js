import * as Yup from 'yup'

const createValidationSchema = formFields => {
  const schemaFields = {}

  formFields.forEach(input => {
    if (['text', 'textarea'].includes(input.type)) {
      schemaFields[input.field] = input.isRequired
        ? Yup.string().required(`El ${input.headerName} es requerido`)
        : Yup.string().notRequired()
    } else if (['email'].includes(input.type)) {
      schemaFields[input.field] = input.isRequired
        ? Yup.string()
            .required(`El ${input.headerName} es requerido`)
            .email('La dirección de correo electrónico no es válida')
        : Yup.string().notRequired().email('La dirección de correo electrónico no es válida') // Optional email validation
    } else if (['password'].includes(input.type)) {
      schemaFields[input.field] = input.isRequired
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
    } else if (['select'].includes(input.type)) {
      schemaFields[input.field] = input.isRequired
        ? Yup.string().required('Seleccione una opción')
        : Yup.string().notRequired()
    } else if (['multipleSelect'].includes(input.type)) {
      schemaFields[input.field] = input.isRequired
        ? Yup.array().required().min(1, 'Seleccione al menos una opción')
        : Yup.array().notRequired()
    } else if (['phone'].includes(input.type)) {
      schemaFields[input.field] = input.isRequired
        ? Yup.string().required('El número de teléfono es requerido').min(10, 'Teléfono no valido')
        : Yup.string().notRequired().min(10, 'Teléfono no valido')
    }
  })

  return Yup.object().shape(schemaFields)
}

export default createValidationSchema
