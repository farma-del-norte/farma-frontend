import CardTable from 'src/components/cardTable'
import ReusableDialog from 'src/components/modal'
import FallbackSpinner from 'src/@core/components/spinner'
import { Fragment, useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { getCall } from 'src/store/simple/actions'
import {MAINTENANCES} from 'src/utils/constants'

export const Simple = ({ table, modal }) => {

  const dispatch = useDispatch()
  const { mainEndpoint } = useSelector(state => state.simple)
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [dialogActions, setDialogActions] = useState([])

  const handleAddItem = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setIsEditing(false)
  }

//   useEffect(() => {
//     dispatch(getCall())
//   }, [dispatch])


  return (
    <Fragment>
      {loading ? (
        <FallbackSpinner />
      ) : (
    <CardTable
        showAddButton={table.showAddButton}
        columns={table.columns}
        rows={table.rows}
        pageSize={MAINTENANCES.TABLE_PAGE_SIZE}
        label={table.label}
        onAddItem={handleAddItem}
    />)}
    <ReusableDialog
        open={openModal}
        size={modal.size}
        onClose={handleCloseModal}
        title={Boolean(isEditing) ? 'editar' : modal.title}
        actions={[]}
      ></ReusableDialog>
    </Fragment>
  )
}
