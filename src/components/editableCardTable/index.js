import {useState} from 'react'
import {Delete, TextBoxSearch} from 'mdi-material-ui'
import {GridActionsCellItem} from '@mui/x-data-grid'
import {useForm} from 'react-hook-form'
import ReusableDialog from 'src/components/modal'
import CardTable from '../cardTable'

const EditCardTable = ({...props}) => {
  const structureRow = props.structureRow
  const Content = props.modal?.Content
  const [isOpen, setIsOpen] = useState(false)
  const {control, handleSubmit, resetField, reset, setValue, getValues} = useForm({
    defaultValues: {}
  })

  const handleRowEditCommit = params => {
    if (params.hasOwnProperty('rows')) {
      const updatedRows = [...props.values()]
      const rowIndex = updatedRows.findIndex(row => row.id === params.row.id)
      updatedRows[rowIndex][params.field] = params.value
      props.setValues(updatedRows)
    } else {
      const updatedRows = [...props.values()]
      const rowIndex = updatedRows.findIndex(row => row.id === params.id)
      updatedRows[rowIndex][params.field] = params.value
      props.setValues(updatedRows)
    }
  }

  const addRow = value => {
    const id = value.length
    const newRow = {...structureRow, id}
    props.setValues([...value, newRow])
  }

  const handleRowDeleteClick = id => {
    const allRows = [...props.values()]
    const leftRows = allRows.filter(row => row.id !== id)
    props.setValues(leftRows)
  }

  //Modal actions

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleOpenModal = params => {
    const {row, open} = params
    reset(row)
    setIsOpen(open)
  }

  const onSubmit = values => {
    console.log(values)
    // if (Boolean(modalItem)) {
    //   dispatch(editMaintenance(values))
    // } else {
    //   dispatch(createMaintenance(values))
    // }
    // handleCloseModal()
  }

  //Actions column

  const actionableMaterialsColumns = [
    ...props.columns,
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Accion',
      width: 100,
      cellClassName: 'Eliminar',
      getActions: ({id, row}) => {
        return [
          <GridActionsCellItem
            key='delete'
            icon={<Delete />}
            label='Eliminar fila'
            onClick={() => handleRowDeleteClick(id)}
            color='inherit'
          />,
          props.hasOwnProperty('modal') ? (
            <GridActionsCellItem
              key='dialog'
              icon={<TextBoxSearch />}
              label='Ver mas'
              onClick={() => handleOpenModal({row, open: true})}
              color='inherit'
            />
          ) : (
            <></>
          )
        ]
      }
    }
  ]

  return (
    <>
      <CardTable
        {...props}
        columns={actionableMaterialsColumns}
        onCellEditCommit={handleRowEditCommit}
        onAddItem={() => addRow(props.rows)}
      />
      {props.hasOwnProperty('modal') && (
        <ReusableDialog
          open={isOpen}
          onClose={handleCloseModal}
          title={props.modal?.title}
          size={'md'}
          actions={[
            {label: 'Regresar', onClick: handleCloseModal, color: 'primary', variant: 'outlined'},
            {label: 'Guardar', onClick: handleSubmit(onSubmit), color: 'primary', variant: 'contained'}
          ]}
        >
          <Content control={control} resetField={resetField} reset={reset} setValue={setValue} getValues={getValues} />
        </ReusableDialog>
      )}
    </>
  )
}

export default EditCardTable
