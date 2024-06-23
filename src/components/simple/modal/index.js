import ReusableDialog from 'src/components/modal'
import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import Form from 'src/components/simple/form'
import {yupResolver} from '@hookform/resolvers/yup'
import {createCall, editCall} from 'src/store/simple/actions'
import {editMediaService} from 'src/store/media/actions'
import {useDispatch} from 'react-redux'
import createValidationSchema from '../form/validations'
import {
  DialogContent,
  Tab,
  Tabs,
} 
from '@mui/material'

export const Modal = ({open, setOpen, modal, isEditing, setIsEditing, useTabs, setUseTabs, endpointsParams, values}) => {
  const dispatch = useDispatch()
  const [actions, setActions] = useState([])
  const [selectedTab, setSelectedTab] = useState(0)
  const [defaultValues, setDefaultValues] = useState(modal.form.reduce((acc, input) => ({...acc, [input.field]: undefined}), {}))
  const {control, handleSubmit, watch, resetField, reset, setValue, getValues} = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(createValidationSchema(Boolean(useTabs) ? modal.tabs[selectedTab].form : modal.form))
  })

  // close modal edit, create, details, etc
  const handleCloseModal = () => {
    setIsEditing(false)
    setUseTabs(false)
    setOpen(false)
  }

  const onSubmit = (values) => {
    // multimedia purpose
    const saveMultimedia = modal.form.some(item => item.type === 'multimedia')
    const mediaInput = modal.form.find(item => item.type === 'multimedia')
    if (values?.id) {
      dispatch(editCall({form: values, endpointsParams}))
      if (saveMultimedia && values[mediaInput?.field]?.length) {
        dispatch(editMediaService({form: values, media: {saveMultimedia, mediaOwner: mediaInput?.owner, field: mediaInput?.field}}))
      }
    } else {
      dispatch(createCall({form: values, endpointsParams, media: {saveMultimedia, mediaOwner: mediaInput?.owner, field: mediaInput?.field}}))
    }
    handleCloseModal()
  }

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // set default values when changing tabs
  useEffect(() => {
    if (useTabs) {
      setDefaultValues(modal.tabs[selectedTab].form.reduce((acc, input) => ({...acc, [input.field]: undefined}), {}))
    }
  }, [selectedTab, useTabs, setDefaultValues, modal.tabs])

  //init fields when is not creating
  useEffect(() => {
    if (Object.keys(values).length > 0 && (useTabs || isEditing)) {
      reset(values)
      setOpen(true)
    } else {
      reset({})
    }
  }, [isEditing, useTabs, values, reset, open, setOpen])

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
      onClose={handleCloseModal}
      title={Boolean(isEditing) ? 'editar' : modal.title}
      footerButtons={Boolean(useTabs) ? modal.tabs[selectedTab]?.indexActions : undefined}
      actions={[
        {label: modal?.actions?.back ?? 'Regresar', onClick: handleCloseModal, color: 'primary', variant: 'outlined'},
        ...actions
      ]}
    >
      <DialogContent>
        {useTabs 
          ?
            <>
              <Tabs value={selectedTab} onChange={handleTabChange}>
                {modal.tabs.map((tab, index) => (
                  <Tab label={tab.title} key={index} />
                ))}
              </Tabs>
              {modal.tabs.map((tab, index) => (
                selectedTab === index &&
                  <div key={index}>
                    <Form
                      title={tab.title}
                      inputs={tab.form}
                      control={control}
                      resetField={resetField}
                      reset={reset}
                      watch={watch}
                      setValue={setValue}
                      getValues={getValues}
                    />
                  </div>
              ))}
            </>
          :
            <Form
              title={modal.title}
              inputs={modal.form}
              control={control}
              watch={watch}
              resetField={resetField}
              reset={reset}
              setValue={setValue}
              getValues={getValues}
            />
        }
      </DialogContent>
    </ReusableDialog>
  )
}
