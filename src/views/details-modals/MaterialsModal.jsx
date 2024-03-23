import ReusableDialog from 'src/components/modal'
import i18n from 'src/configs/i18n'
import {useDispatch, useSelector} from 'react-redux'
import {toggleMaterialModal, setIsEditing} from 'src/store/maintenances/materials/reducer'
import {MAINTENANCES_LOCALE} from 'src/utils/constants'
import {createMaterial, editMaterial} from 'src/store/maintenances/materials/actions'
import { MaterialsForm } from '../forms/materials/MaterialsForm'

const MaterialsModal = ({control, handleSubmit, children}) => {
  const dispatch = useDispatch()
  const {isModalOpen, isEditing} = useSelector(state => state.materials)

  const handleAddMaterial = values => {
    values = { ...values, serviceID: values.service.id}
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
          ? MAINTENANCES_LOCALE.MATERIALS_EDIT_MODAL
          : MAINTENANCES_LOCALE.MATERIALS_ADD_MODAL
      }
      actions={[
        {label: i18n.t('Regresar'), onClick: handleCloseModal, color: 'primary', variant: 'outlined'},
        Boolean(isEditing)
          ? {
              label: i18n.t('save_button'),
              onClick: handleSubmit(handleUpdateMaterial),
              color: 'primary',
              variant: 'contained'
            }
          : {label: i18n.t('add'), onClick: handleSubmit(handleAddMaterial), color: 'primary', variant: 'contained'}
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