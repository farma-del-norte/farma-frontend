import CardTable from 'src/components/cardTable'
import {Modal} from 'src/components/simple/modal'
import ReusableDialog from 'src/components/modal'
import FallbackSpinner from 'src/@core/components/spinner'
import {Pencil, Delete, TextBoxSearch} from 'mdi-material-ui'
import {Fragment, useState, useEffect, useMemo} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getCall, deleteCall} from 'src/store/simple/actions'
import {MAINTENANCES} from 'src/utils/constants'
import {Typography, Box} from '@mui/material'

export const Simple = ({table, modal}) => {
  const dispatch = useDispatch()
  const {tables} = useSelector(state => state.simple)
  const [openModal, setOpenModal] = useState(false)
  const [openDelModal, setOpenDelModal] = useState(false)
  const [delItem, setDelItem] = useState({})
  // key for reducer
  const keyList = table.label.replace(/\s+/g, '')
  // params fro endpoints
  const endpointsParams = useMemo(() => {
    return {
      endpoint: table.endpoints.baseUrl,
      key: keyList
    }
  }, [table.endpoints, keyList])

  // handles open main modal
  const handleAddItem = () => {
    setOpenModal(true)
  }

  // handles delete modal
  const handleDeleteModal = row => {
    setOpenDelModal(true)
    setDelItem(row)
  }

  const handleDeleteConfirm = () => {
    dispatch(deleteCall({...delItem, endpointsParams}))
    setOpenDelModal(false)
  }

  const handleDeleteCancel = () => {
    setOpenDelModal(false)
  }

  // init get
  useEffect(() => {
    dispatch(getCall(endpointsParams))
  }, [dispatch, keyList, endpointsParams])

  const actionableColumns = [
    ...table.columns,
    {
      flex: 0.125,
      minWidth: 120,
      field: 'actions',
      headerName: 'Acciones',
      renderCell: params => {
        const row = params?.row
        return (
          <Typography variant='body2' sx={{color: '#6495ED', cursor: 'pointer'}}>
            {table.actions.includes('edit') && <Pencil sx={{margin: '5px'}} onClick={() => handleOpenModal(row)} />}
            {table.actions.includes('detail') && (
              <TextBoxSearch sx={{margin: '5px'}} onClick={() => handleDetailModal({row, open: true})} />
            )}
            {table.actions.includes('delete') && <Delete sx={{margin: '5px'}} onClick={() => handleDeleteModal(row)} />}
          </Typography>
        )
      }
    }
  ]

  return (
    <Fragment>
      <CardTable
        showAddButton={table.showAddButton}
        columns={actionableColumns}
        rows={tables[keyList].list}
        loading={!tables[keyList] || tables[keyList].loading}
        pageSize={MAINTENANCES.TABLE_PAGE_SIZE}
        label={table.label}
        onAddItem={handleAddItem}
      />
      <Modal open={openModal} setOpen={setOpenModal} modal={modal} />
      <ReusableDialog
        open={openDelModal}
        size={'md'}
        onClose={handleDeleteCancel}
        title={'Borrar'}
        actions={[
          {label: 'Regresar', onClick: handleDeleteCancel, color: 'primary', variant: 'outlined'},
          {label: 'Eliminar', onClick: handleDeleteConfirm, color: 'primary', variant: 'contained'}
        ]}
      >
        <Box>
          <Typography variant='body2'>Seguro de eliminar {table.label} seleccionado?</Typography>
        </Box>
      </ReusableDialog>
    </Fragment>
  )
}
