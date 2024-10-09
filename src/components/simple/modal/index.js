import ReusableDialog from 'src/components/modal'
import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import Form from 'src/components/simple/form'
import {yupResolver} from '@hookform/resolvers/yup'
import {createCall, editCall, getCall} from 'src/store/simple/actions'
import {editMediaService} from 'src/store/media/actions'
import {useDispatch, useSelector} from 'react-redux'
import createValidationSchema from '../form/validations'
import {DialogContent, Tab, Tabs} from '@mui/material'
import FallbackSpinner from 'src/@core/components/spinner'

const TabForm = ({currentTab, form, values, watch, control, reset, resetField, setValue, getValues}) => {
  const isLoading = form?.isLoading ?? true
  return (
    <>
      {currentTab.endpoints && isLoading ? (
        <FallbackSpinner
          h="20vh"
          mt="100px"
          mb="100px"
        />
      ) : (
        <Form
          values={values}
          title={currentTab.title}
          inputs={currentTab.form}
          control={control}
          resetField={resetField}
          reset={reset}
          watch={watch}
          setValue={setValue}
          getValues={getValues}
        />
      )}
    </>
  );
}

export const Modal = ({
  open,
  setOpen,
  modal,
  isEditing,
  setIsEditing,
  useTabs,
  setUseTabs,
  endpointsParams,
  values
}) => {
  const dispatch = useDispatch()
  const {forms} = useSelector(state => state.simple)
  const [actions, setActions] = useState([])
  const [selectedTab, setSelectedTab] = useState(0)
  const [formKey, setFormKey] = useState(undefined)
  const baseEndpointsParams = { ...endpointsParams }
  const [currentEndpointParams, setCurrentEndpointParams] = useState(baseEndpointsParams)
  const [defaultValues, setDefaultValues] = useState(
    modal.form.reduce((acc, input) => ({...acc, [input.field]: undefined}), {})
  )
  const {control, handleSubmit, watch, resetField, reset, setValue, getValues} = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(createValidationSchema(Boolean(useTabs) ? modal.tabs[selectedTab].form : modal.form))
  })

  // close modal edit, create, details, etc
  const handleCloseModal = () => {
    setIsEditing(false)
    setUseTabs(false)
    setOpen(false)
    setSelectedTab(0)
    reset()
  }

  const onSubmit = values => {
    // multimedia purpose
    const saveMultimedia = modal.form.some(item => item.type === 'multimedia')
    const mediaInput = modal.form.find(item => item.type === 'multimedia')
    if (values?.id || forms[formKey]?.found) {
      dispatch(editCall({form: values, endpointsParams: currentEndpointParams}))
      if (saveMultimedia && values[mediaInput?.field]?.length) {
        dispatch(
          editMediaService({
            form: values,
            media: {saveMultimedia, mediaOwner: mediaInput?.owner, field: mediaInput?.field}
          })
        )
      }
    } else {
      dispatch(
        createCall({
          form: values,
          endpointsParams: currentEndpointParams,
          media: {saveMultimedia, mediaOwner: mediaInput?.owner, field: mediaInput?.field}
        })
      )
    }
    if(!useTabs) {
      handleCloseModal()
    }
  }

  const handleTabChange = (event, newValue) => {
    setFormKey(`${modal.tabs[newValue].title.replace(/\s+/g, '')}_${values.id}`)
    setSelectedTab(newValue)
  }

  // set default values when changing tabs
  useEffect(() => {
    if (useTabs) {
      setDefaultValues(modal.tabs[selectedTab].form.reduce((acc, input) => ({...acc, [input.field]: undefined}), {}))
    }
  }, [selectedTab, useTabs, setDefaultValues, modal.tabs])

  // if form has tabs, and had endpoints, get data
  useEffect(() => {
    if (useTabs && modal?.tabs[selectedTab]?.endpoints) {
      const tempParams = {
        endpoint: modal.tabs[selectedTab]?.endpoints.baseUrl,
        type: 'forms',
        key: `${modal.tabs[selectedTab]?.title.replace(/\s+/g, '')}_${values.id}`,
        [modal?.tabs[selectedTab].fieldName]: modal?.tabs[selectedTab].field ? modal?.tabs[selectedTab].field : values.id
      }
      setCurrentEndpointParams(tempParams)
      dispatch(getCall({... tempParams}))
    } else {
      // set base endpoints params
      setCurrentEndpointParams(baseEndpointsParams)
    }
  }, [selectedTab])

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
      title={isEditing ? 'Editar' : useTabs ? modal.detailsTitle || modal.title : modal.title}
      footerButtons={Boolean(useTabs) ? modal.tabs[selectedTab]?.indexActions : undefined}
      actions={[
        {label: modal?.actions?.back ?? 'Regresar', onClick: handleCloseModal, color: 'primary', variant: 'outlined'},
        ...actions
      ]}
    >
      <DialogContent>
        {useTabs ? (
          <>
            <Tabs value={selectedTab} onChange={handleTabChange} sx={{mb: selectedTab === 0 ? '1rem' : '-1rem'}}>
              {modal.tabs.map((tab, index) => (
                <Tab label={tab.title} key={index} />
              ))}
            </Tabs>
            {modal.tabs.map(
              (tab, index) =>
                selectedTab === index && (
                  <div key={index}>
                    <TabForm
                      currentTab={tab}
                      values={values}
                      form={forms[formKey]}
                      control={control}
                      resetField={resetField}
                      reset={reset}
                      watch={watch}
                      setValue={setValue}
                      getValues={getValues}
                    />
                  </div>
                )
            )}
          </>
        ) : (
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
        )}
      </DialogContent>
    </ReusableDialog>
  )
}
