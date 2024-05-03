import ReusableDialog from 'src/components/modal'
import {useDispatch, useSelector} from 'react-redux'
import {toggleMaterialModal} from 'src/store/maintenances/materials/reducer'
import {createMaterial, editMaterial} from 'src/store/maintenances/materials/actions'
import { MaterialsForm } from '../forms/materials/MaterialsForm'
import {t} from 'i18next'

const MaterialsModal = ({control, handleSubmit, children}) => {
  const dispatch = useDispatch()
  const {isModalOpen, isEditing} = useSelector(state => state.materials)
  const { services } = useSelector(state => state.services)

  const handleAddMaterial = values => {
    values = { ...values, services: services}
    dispatch(createMaterial(values))
    handleCloseModal()
  }

  const handleUpdateMaterial = values => {
    dispatch(editMaterial(branchDetails.id, values))
    handleCloseModal()
  }

  const handleCloseModal = () => {
    dispatch(toggleMaterialModal(false))
  }

  return (
    <ReusableDialog
      open={isModalOpen}
      onClose={handleCloseModal}
      title={
        Boolean(isEditing)
          ? t('materials.edit_modal', {ns: 'maintenances'})
          : t('materials.add_modal', {ns: 'maintenances'})
      }
      actions={[
        {label: t('back_button'), onClick: handleCloseModal, color: 'primary', variant: 'outlined'},
        Boolean(isEditing)
          ? {
              label: t('save_button'),
              onClick: handleSubmit(handleUpdateMaterial),
              color: 'primary',
              variant: 'contained'
            }
          : {label: t('add'), onClick: handleSubmit(handleAddMaterial), color: 'primary', variant: 'contained'}
      ]}
    >
      {children}
      <MaterialsForm
        control={control}
        handleSubmit={handleSubmit}
      />
    </ReusableDialog>
  )
}

export default MaterialsModal