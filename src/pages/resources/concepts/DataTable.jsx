import { useEffect } from 'react'
import { Typography } from '@mui/material'
import { toggleModal, toggleDeleteModal, setRow } from 'src/store/catalogs/concepts/reducer'
import { getConceptsCat } from 'src/store/catalogs/concepts/actions'
import { useSelector, useDispatch } from 'react-redux'
import { Pencil, Delete } from 'mdi-material-ui'
import { conceptsColumns } from 'src/views/tables/resources/concepts'
import { COMMON } from 'src/utils/constants'
import {t} from 'i18next'
import FallbackSpinner from 'src/@core/components/spinner'
import CardTable from 'src/components/cardTable'

const DataTable = ({methods}) => {
  const dispatch = useDispatch(),
    { conceptsCat,  isLoading } = useSelector(state => state.conceptsCat),
    actionableColumns = [
      ...conceptsColumns,
      {
        flex: COMMON.COLUMN_ACTION_FLEX,
        minWidth: COMMON.COLUMN_ACTION_MIN_WIDTH,
        field: COMMON.ACTIONS_FIELD,
        headerName: t('actions'),
        renderCell: params => {
          const row = params?.row
          return (
            <Typography
              variant={COMMON.ACTIONS_TEXT_VARIANT}
              sx={{color: COMMON.ACTIONS_TEXT_COLOR, cursor: COMMON.ACTIONS_TEXT_CURSOR}}
            >
              <Pencil sx={{margin: COMMON.ACTION_ICON_MARGIN}} onClick={() => handleOpenModal({row, open: true})} />
              <Delete sx={{margin: COMMON.ACTION_ICON_MARGIN}} onClick={() => handleDeleteModal({row, open: true})} />
            </Typography>
          )
        }
      }
    ],
    handleAddItem = () => {
      dispatch(toggleModal(true))
      methods.reset()
      methods.clearErrors()
    },
    handleOpenModal = params => {
      const { row } = params
      dispatch(toggleModal(true))
      dispatch(setRow(row))
    },
    handleDeleteModal = params => {
      const {row, open} = params
      dispatch(toggleDeleteModal(open))
      dispatch(setRow(row))
    };

  useEffect(() => {
    dispatch(getConceptsCat())
  }, [dispatch])


  return (
    isLoading ? (
        <FallbackSpinner />
      ) : (
        <CardTable
          showAddButton
          columns={actionableColumns}
          rows={conceptsCat}
          label='Servicios'
          onAddItem={handleAddItem}
        />
    )
  )
}

export default DataTable;