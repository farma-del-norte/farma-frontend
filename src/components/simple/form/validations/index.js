import * as Yup from 'yup'

const createValidationSchema = formFields => {
  const schemaFields = {}

  formFields.forEach(input => {
    if (['text', 'textarea', 'number'].includes(input.type)) {
      schemaFields[input.field] = input.isRequired ? Yup.string().required(`Requerido`) : Yup.string().notRequired()
    } else if (['email'].includes(input.type)) {
      schemaFields[input.field] = input.isRequired
        ? Yup.string().required(`Requerido`).email('La dirección de correo electrónico no es válida')
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
      schemaFields[input.field] = input.isRequired ? Yup.string().required('Requerido') : Yup.string().notRequired()
    } else if (['multipleSelect'].includes(input.type)) {
      schemaFields[input.field] = input.isRequired
        ? Yup.array().required('Seleccione al menos una opción')
        : Yup.array().notRequired()
    } else if (['phone'].includes(input.type)) {
      schemaFields[input.field] = input.isRequired
        ? Yup.string().required('Requerido').min(10, 'Teléfono no valido')
        : Yup.string().notRequired().min(10, 'Teléfono no valido')
    } else if (['date'].includes(input.type)) {
      schemaFields[input.field] = input.isRequired ? Yup.date().required(`Requerido`) : Yup.date().notRequired()
    } else if (['cash'].includes(input.type)) {
      schemaFields[input.field] = input.isRequired
        ? Yup.number()
            .typeError('Debe ser un número válido')
            .required('Requerido')
            .min(0, 'El valor no puede ser negativo')
        : Yup.number().typeError('Debe ser un número válido').notRequired().min(0, 'El valor no puede ser negativo')
    }
  })

  return Yup.object().shape(schemaFields)
}

export default createValidationSchema
