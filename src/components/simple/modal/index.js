import ReusableDialog from 'src/components/modal'
import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import Form from 'src/components/simple/form'
import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { createCall, editCall } from 'src/store/simple/actions'
import { useDispatch } from 'react-redux'

const generateValidationSchema = formFields => {
  let schemaFields = {}

  formFields.forEach(field => {
    if (['text', 'textarea'].includes(field.type)) {
      schemaFields[field.name] = field.isRequired ? Yup.string().required() : Yup.string().notRequired()
    }
  })

  return Yup.object().shape(schemaFields)
}

export const Modal = ({open, setOpen, modal, isEditing, setIsEditing, endpointsParams, values}) => {
  const dispatch = useDispatch()
  const [actions, setActions] = useState([])
  const defaultValues = modal.form.reduce((acc, field) => ({...acc, [field.name]: undefined}), {})
  const {control, handleSubmit, resetField, reset, setValue, getValues} = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(generateValidationSchema(modal.form))
  })

  // close modal edit, create, details
  const handleCloseModal = () => {
    setOpen(false)
    setIsEditing(false)
  }

  const onSubmit = values => {
    if (Boolean(isEditing)) {
      dispatch(editCall({...values, endpointsParams}))
    } else {
      dispatch(createCall({...values, endpointsParams}))
    }
  }

  //init fields when edits
  useEffect(() => {
    if (Object.keys(values).length > 0 && isEditing) {
      reset(values)
      setOpen(true)
    } else {
      reset({})
    }
  }, [isEditing, values, reset, setOpen])

  // init modal actions
  useEffect(() => {
    const tempActions = []
    if (modal?.actions?.save) {
      tempActions.push({
        label: modal?.actions?.save,
        onClick: handleSubmit(onSubmit),
        color: 'primary',
        variant: 'contained'
      })
    }
    setActions(tempActions)
  }, [handleSubmit, modal])

  return (
    <ReusableDialog
      open={open}
      size={modal.size}
      tabs={modal.tabs}
      onClose={handleCloseModal}
      title={Boolean(isEditing) ? 'editar' : modal.title}
      actions={[
        {label: modal?.actions?.back ?? 'Regresar', onClick: handleCloseModal, color: 'primary', variant: 'outlined'},
        ...actions
      ]}
    >
      <Form
        inputs={modal.form}
        control={control}
        resetField={resetField}
        reset={reset}
        setValue={setValue}
        getValues={getValues}
      />
    </ReusableDialog>
  )
}
