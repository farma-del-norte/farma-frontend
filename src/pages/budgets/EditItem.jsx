import { useState } from 'react'
import { MAINTENANCES, MAINTENANCES_LOCALE } from 'src/utils/constants'
import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { columns } from './columns'
import ReusableDialog from 'src/components/modal'
import AssignedBudget from './Fields/AssignedBudget'
import Date from './Fields/Date'
import CurrentAmount from './Fields/CurrentAmount'

const EditItem = ({ methods }) => {
  const handleCloseModal = () => {
    reset()
    const cleanModal = null
    dispatch(toggleModal(false))
    dispatch(setModalItem(cleanModal))
  },
  onSubmit = data => console.log(data);

  return (
    <ReusableDialog
          open={true}
          actions={[
            {label: 'Reportar', onClick: methods.handleSubmit(onSubmit), color: 'primary', variant: 'contained', type:'submit'}
          ]}
        >
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <AssignedBudget/>
              <CurrentAmount/>
              <Date />
              {/* <Zone onChange={handleZoneChange} /> */}
            </form>
          </FormProvider>
    </ReusableDialog>
  )
  
}

export default EditItem;