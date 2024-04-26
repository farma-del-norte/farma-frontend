// ** React Imports
import {Fragment, useState} from 'react'

import {useDispatch} from 'react-redux'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TableContainer from '@mui/material/TableContainer'

// ** Icons Imports
import Plus from 'mdi-material-ui/Plus'
import Delete from 'mdi-material-ui/Delete'
// ** Third Party Imports
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup/dist/yup'
import {useForm} from 'react-hook-form'
// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'

import {deleteAddress, setModal} from 'src/store/address'

import DialogAddress from '../components/dialogs/DialogAddress'

const defaultAddressValues = {
  street: '',
  extNumber: '',
  intNumber: '',
  colony: '',
  federalEntity: '',
  zipCode: '',
  country: '',
  city: '',
  refer: ''
}

const addressSchema = yup.object().shape({
  colony: yup.string().required(),
  zipCode: yup
    .string()
    .length(5)
    .matches(/^[0-9]{5}/)
    .required(),
  extNumber: yup.string().required(),
  intNumber: yup.string(),
  federalEntity: yup.string().required(),
  city: yup.string().required(),
  street: yup.string().required(),
  country: yup.string().required(),
  refer: yup.string().required()
})

const UserProfileAddress = ({addresses = []}) => {
  const dispatch = useDispatch()
  const [openDeleteCard, setOpenDeleteCard] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [deleteID, setDeleteID] = useState(null)

  // ** Hooks
  const {
    reset,
    control: addressControl,
    handleSubmit,
    formState: {errors: addressErrors}
  } = useForm({
    defaultValues: defaultAddressValues,
    resolver: yupResolver(addressSchema)
  })

  // const onSubmit = data => {
  //   if (editItem && Object.keys(editItem).length) {
  //     dispatch(updateAddress({body: data}))
  //   } else {
  //     dispatch(createAddress({body: data, uuid: user.id}))
  //   }
  //   handleAddressClose(false)
  // }

  // Handle Edit Card dialog and get card ID
  const handleEditAddressClickOpen = address => {
    setEditItem(address)
    dispatch(setModal(true))
    reset(address)
  }

  const sendDelete = () => {
    if (deleteID) dispatch(deleteAddress(deleteID))
  }

  const handleDeleteModal = address => {
    setDeleteID(address?.id)
    setOpenDeleteCard(true)
  }

  return (
    <Fragment>
      <Card sx={{mb: 6}}>
        <CardHeader
          title='Direcciones'
          titleTypographyProps={{variant: 'h6'}}
          action={
            <Button
              variant='contained'
              onClick={() => {
                dispatch(setModal(true))
              }}
            >
              <Plus sx={{mr: 1, fontSize: '1.125rem'}} />
              Agregar
            </Button>
          }
        />
      </Card>
      {addresses.length
        ? addresses.map(address => (
            <Card key={address.id} sx={{margin: '20px 0px'}}>
              <CardHeader
                title='Direcciones'
                titleTypographyProps={{variant: 'h6'}}
                action={
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: '10px'
                    }}
                  >
                    <Button variant='outlined' onClick={() => handleEditAddressClickOpen(address)}>
                      Editar
                    </Button>
                    <Button onClick={() => handleDeleteModal(address)}>
                      <Delete sx={{mr: 1, fontSize: '1.125rem'}} />
                    </Button>
                  </div>
                }
              />
              <CardContent>
                <Grid container spacing={6}>
                  <Grid item xs={12} lg={6}>
                    <TableContainer>
                      <Table size='small' sx={{width: '95%'}}>
                        <TableBody
                          sx={{
                            '& .MuiTableCell-root': {
                              border: 0,
                              pt: 2,
                              pb: 2,
                              pl: '0 !important',
                              pr: '0 !important',
                              '&:first-of-type': {
                                width: 148
                              }
                            }
                          }}
                        >
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{
                                  fontWeight: 500,
                                  fontSize: '0.875rem',
                                  whiteSpace: 'nowrap',
                                  lineHeight: '22px',
                                  letterSpacing: '0.1px'
                                }}
                              >
                                Calle:
                              </Typography>
                            </TableCell>
                            <TableCell>{address.street}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{
                                  fontWeight: 500,
                                  fontSize: '0.875rem',
                                  whiteSpace: 'nowrap',
                                  lineHeight: '22px',
                                  letterSpacing: '0.1px'
                                }}
                              >
                                Número Exterior
                              </Typography>
                            </TableCell>
                            <TableCell>{address.extNumber}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{
                                  fontWeight: 500,
                                  fontSize: '0.875rem',
                                  whiteSpace: 'nowrap',
                                  lineHeight: '22px',
                                  letterSpacing: '0.1px'
                                }}
                              >
                                Número Interior
                              </Typography>
                            </TableCell>
                            <TableCell>{address.intNumber}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{
                                  fontWeight: 500,
                                  fontSize: '0.875rem',
                                  whiteSpace: 'nowrap',
                                  lineHeight: '22px',
                                  letterSpacing: '0.1px'
                                }}
                              >
                                Colonia:
                              </Typography>
                            </TableCell>
                            <TableCell>{address.colony}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>

                  <Grid item xs={12} lg={6}>
                    <TableContainer>
                      <Table size='small'>
                        <TableBody
                          sx={{
                            '& .MuiTableCell-root': {
                              border: 0,
                              pt: 2,
                              pb: 2,
                              pl: '0 !important',
                              pr: '0 !important',
                              '&:first-of-type': {
                                width: 148
                              }
                            }
                          }}
                        >
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{
                                  fontWeight: 500,
                                  fontSize: '0.875rem',
                                  whiteSpace: 'nowrap',
                                  lineHeight: '22px',
                                  letterSpacing: '0.1px'
                                }}
                              >
                                Ciudad:
                              </Typography>
                            </TableCell>
                            <TableCell>{address.city}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{
                                  fontWeight: 500,
                                  fontSize: '0.875rem',
                                  whiteSpace: 'nowrap',
                                  lineHeight: '22px',
                                  letterSpacing: '0.1px'
                                }}
                              >
                                Estado:
                              </Typography>
                            </TableCell>
                            <TableCell>{address.federalEntity}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{
                                  fontWeight: 500,
                                  fontSize: '0.875rem',
                                  whiteSpace: 'nowrap',
                                  lineHeight: '22px',
                                  letterSpacing: '0.1px'
                                }}
                              >
                                Código Postal:
                              </Typography>
                            </TableCell>
                            <TableCell>{address.zipCode}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{
                                  fontWeight: 500,
                                  fontSize: '0.875rem',
                                  whiteSpace: 'nowrap',
                                  lineHeight: '22px',
                                  letterSpacing: '0.1px'
                                }}
                              >
                                Pais:
                              </Typography>
                            </TableCell>
                            <TableCell>{address.country}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Typography
                                sx={{
                                  fontWeight: 500,
                                  fontSize: '0.875rem',
                                  whiteSpace: 'nowrap',
                                  lineHeight: '22px',
                                  letterSpacing: '0.1px'
                                }}
                              >
                                Referencia:
                              </Typography>
                            </TableCell>
                            <TableCell>{address.refer}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))
        : null}
      <DialogAddress
        openAddressCard={showModal}
        handleAddressClose={() => dispatch(setModal(false))}
        editItem={editItem}
        handleSubmit={handleSubmit}
        addressControl={addressControl}
        addressErrors={addressErrors}
        onSubmit={onSubmit}
      />
      <Dialog
        open={openDeleteCard}
        onClose={() => setOpenDeleteCard(false)}
        sx={{'& .MuiPaper-root': {width: '100%', maxWidth: 450, p: [2, 5]}}}
      >
        <DialogContent>Seguro de eliminar la direccion seleccionada?</DialogContent>
        <DialogActions>
          <Button variant='contained' sx={{mr: 1}} onClick={sendDelete}>
            Eliminar
          </Button>
          <Button variant='outlined' color='secondary' onClick={() => setOpenDeleteCard(false)}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default UserProfileAddress
