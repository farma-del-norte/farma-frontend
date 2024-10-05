import CardTable from 'src/components/cardTable'
import {Modal} from 'src/components/simple/modal'
import ReusableDialog from 'src/components/modal'
import {Pencil, Delete, TextBoxSearch} from 'mdi-material-ui'
import {Fragment, useState, useEffect, useMemo} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getCall, deleteCall} from 'src/store/simple/actions'
import {Typography, IconButton, Tooltip, CardContent} from '@mui/material'

export const Simple = ({table, modal, tablekey = 'tableId', id}) => {
  const dispatch = useDispatch()
  const {tables} = useSelector(state => state.simple)
  const [isEditing, setIsEditing] = useState(false)
  const [useTabs, setUseTabs] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [openDelModal, setOpenDelModal] = useState(false)
  const [delItem, setDelItem] = useState({})
  const [rowItem, setRowItem] = useState({})
  // pagination
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  })
  // key for reducer
  const keyList = table.label.replace(/\s+/g, '')
  // params fro endpoints
  const endpointsParams = useMemo(() => {
    return {
      endpoint: table.endpoints.baseUrl,
      key: keyList,
      [tablekey]: id,
      pagination: table?.serverMode ? true : false
    }
  }, [table.endpoints, keyList, id])

  // handles open add modal
  const handleAddItem = () => {
    setOpenModal(true)
  }

  // handles edit modal
  const handleOpenModal = row => {
    setRowItem(row)
    //AL editar
    setIsEditing(true)
  }

  // handles detail modal
  const handleDetailModal = row => {
    setRowItem(row)
    setUseTabs(true)
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
    dispatch(getCall({...endpointsParams, paginationModel}))
  }, [])

  const handlePaginationModelChange = (paginationModel) => {
    setPaginationModel(paginationModel)
    dispatch(getCall({...endpointsParams, paginationModel}))
  };

  const actionableColumns = [
    ...table.columns,
    {
      flex: table.columns.length < 2 ? 0.15 : table.columns.length < 3 ? 0.25 : true,
      field: 'actions',
      headerName: 'Acciones',
      type: 'actions',
      renderCell: params => {
        const row = params?.row
        return (
          <>
            {table.actions.includes('edit') && (
              <Tooltip title={'Editar'}>
                <IconButton size='small' color='warning' onClick={() => handleOpenModal(row)}>
                  <Pencil />
                </IconButton>
              </Tooltip>
            )}
            {table.actions.includes('detail') && (
              <Tooltip title={'Ver Detalles'}>
                <IconButton size='small' color='info' onClick={() => handleDetailModal(row)}>
                  <TextBoxSearch />
                </IconButton>
              </Tooltip>
            )}
            {table.actions.includes('delete') && (
              <Tooltip title={'Eliminar'}>
                <IconButton size='small' color='error' onClick={() => handleDeleteModal(row)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            )}
          </>
        )
      }
    }
  ]
  const filteredColumns = actionableColumns.filter(column => !column.hideColumn)
  return (
    <Fragment>
      <CardTable
        showAddButton={table.showAddButton}
        paginationModel={table?.serverMode ? paginationModel : null}
        onPaginationModelChange={handlePaginationModelChange}
        columns={filteredColumns}
        rows={tables[keyList]?.list || []}
        isLoading={tables[keyList]?.isLoading || !tables[keyList]}
        label={table.label}
        onAddItem={handleAddItem}
        paginationMode={table?.serverMode ? "server" : "client"}
        rowCount={tables[keyList]?.pagination?.lastPage || 1}
        pageSizeOptions={[10, 20, 50, 100]}
      />
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        values={rowItem}
        modal={modal}
        useTabs={useTabs}
        setUseTabs={setUseTabs}
        endpointsParams={endpointsParams}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
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
        <CardContent>
          <Typography variant='body2'>¿Seguro de eliminar el elemento seleccionado?</Typography>
        </CardContent>
      </ReusableDialog>
    </Fragment>
  )
}
