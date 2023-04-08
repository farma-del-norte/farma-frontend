import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useForm, Controller } from "react-hook-form";
import {
  CardContent,
  Card,
  CardHeader,
  CardActions,
  Grid,
  TextField,
  Divider,
  Button,
  Typography,
  InputAdornment,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText
} from '@mui/material'
import CustomSnackbar from 'src/views/components/snackbar/CustomSnackbar'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import ListProperties from '../components/propertiesProduct';
//import utils fns
import { getCustomStructure, getCustomStructureMainComponents } from 'src/utils/functions';
import { createProduct, getMainComponents, setRemoveEdit, updateProduct } from 'src/store/products';
import { parseDataToEdit } from 'src/utils/functions';
import { closeSnackBar } from 'src/store/notifications'
import MultiSelectWithAddOption from '../components/multiselectWithAddOption';
import Plus from 'mdi-material-ui/Plus'


const Modal = ({
  open = false,
  onHandleOpenModal = () => { },
  onSubmitConfirm = () => {}
}) => {

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogContentText>
          Presione confirmar para crear el producto.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
      <Button onClick={onHandleOpenModal}>Salir</Button>
      <Button onClick={onSubmitConfirm}>Crear producto</Button>
      </DialogActions>
    </Dialog>
  )
}

const AddProduct = () => {
  const dispatch = useDispatch()
  const router = useRouter()


  const { editItem, mainComponents } = useSelector(state => state.products)
  const { open, message, severity } = useSelector(state => state.notifications)
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      product: '',
      description: '',
      capsuleQuantity: '',
      capsuleConcentration: '',
      instructions: '',
      ingredients: '',
      price: '',
      quantity: '',
   }
  });

  /* images state */
  const [images, setImages] = React.useState({ link1: '', link2: '' })
  /* properties */
  const [values, setValues] = React.useState({
    viasRespiratorias: '',
    activacionMental: '',
    generacionMuscular: '',
    saludHormonal: '',
    pielCabelloUñas: '',
    digestion: '',
    relajación: '',
    sistemaOseo: '',
    sistemaInmune: '',
    circulaciónArterial: '',
  })
  /* fields of main components property - value form */
  const [fields, setFields] = React.useState([]);

  const [mainComponentValue, setMainComponentValue] = React.useState([])
  /* the new option for select */
  const [newOption, setNewOption] = React.useState('');

  const [openModal, setOpenModal] = React.useState(false)

  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }

  const submitConfirm = () => {
    console.log(fields)
    dispatch(createProduct(fields))
  }

  /* main component handle on change select */
  const handleOptionChange = ({ target }) => {
    const selectedValues = target.value;
    let newFields = [];

    // Map through the selected values and create a new field object for each one
    selectedValues.forEach((value) => {
      newFields.push({
        property: value.value,
        value: '',
      });
    });

    // Update state with the new fields and selected values
    setFields(newFields);
    setMainComponentValue(selectedValues);
  };

  const handleNewOptionChange = (event) => {
    setNewOption(event.target.value)
  }

  const handleFieldChange = (index, field, value) => {
    const newFields = [...fields];
    newFields[index][field] = value;
    setFields(newFields);
  };

  const handleAddOption = () => {
      // Check if the new option is already in the options list
    const existingOption = mainComponents.find((option) => option.value === newOption);

    if (existingOption) {
      // If the new option already exists, set it as the selected option
      setMainComponentValue([...mainComponentValue, existingOption]);
    } else {
      // If the new option doesn't exist, add it to the options list and set it as the selected option
      const newOptionObject = { value: newOption };
      setMainComponentValue([...mainComponentValue, newOptionObject]);
    }

    // Update the last input field's property with the new option
    setFields((prevFields) => [
      ...prevFields,
      { property: newOption.trim(), value: '' }
    ]);

    // Clear the new option text field
    setNewOption('');
  }

  const handleCleanOptions = () => {
    setMainComponentValue([])
    setFields([])
  }

  const setLinks = () => {
    return Object.values(images)
  }

  const handleChangeLinks = (prop) => (event) => {
    setImages({
      ...images,
      [prop]: event.target.value
    })
  }

  const handlePropertiesList = (prop) => (event) => {
    const newValue = event.target.value;
    if (newValue >= 0 && newValue <= 10) {
      setValues((prevValues) => ({ ...prevValues, [prop]: newValue }));
    }
  }

  const onSubmit = (data, event) => {
    event.preventDefault()
    const newProperties = getCustomStructure(values);

    const body = {
      product: data?.product ,
      description: data?.description,
      capsuleQuantity: data?.capsuleQuantity,
      capsuleConcentration: data?.capsuleConcentration,
      mainComponents: [{property: "ZINC", value: 60}],
      instructions: data?.instructions,
      price: data?.price,
      ingredients: data?.ingredients,
      quantity: 1,
      properties: newProperties,
      urlImages: setLinks(),
      id: editItem?.id ?? ''
    }
    if (Boolean(editItem)) {
      dispatch(updateProduct(body))
    } else {
      setFields(body)
      handleOpenModal()
    }
  };

  React.useEffect(() => {
    dispatch(getMainComponents())
  }, [dispatch])

  React.useEffect(() => {
    return () => {
      dispatch(setRemoveEdit())//cleaning edit values
     }
  }, [dispatch])

   React.useEffect(() => {
    if (editItem) {
      reset({
        product: editItem.product,
        description: editItem.description,
        capsuleQuantity: editItem.capsuleQuantity,
        capsuleConcentration: editItem.capsuleConcentration,
        mainComponents: editItem.mainComponent,
        instructions: editItem.instructions,
        price: editItem.price,
        ingredients: editItem.ingredients,
        quantity: 1,
      })
      const defaultProperties = parseDataToEdit(editItem.properties)
      setValues(defaultProperties)
      setImages({
        link1: editItem.urlImages[0],
        link2: editItem.urlImages[1],
      })
      setFields(editItem?.mainComponents)
      const defaultMainComponents = getCustomStructureMainComponents(editItem?.mainComponents)
      setMainComponentValue(defaultMainComponents)
    }
   }, [editItem])

  return (
    <>
    <Card sx={{ margin: '40px 20px'  }}>
      <CardHeader title={`${editItem ? 'Editar' : 'Agregar'} Producto`} titleTypographyProps={{ variant: 'h6' }} />
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <form onSubmit={handleSubmit(onSubmit)} >
      <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="product"
                rules={{ required: true }}
                render={({
                  field,
                  fieldState,
                }) => (
                  <TextField
                    error={!!errors.product}
                    label='Producto'
                    fullWidth
                    {...field}
                  />
                )}
              />

            </Grid>
            <Grid item xs={12} sm={6} >
              <Controller
                control={control}
                name="description"
                rules={{ required: true }}
                render={({
                  field,
                  fieldState,
                }) => (
                  <TextField
                    error={!!errors.description}
                    label='Descripción'
                    fullWidth
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="capsuleQuantity"
                rules={{ required: true }}
                render={({
                  field,
                  fieldState,
                }) => (
                  <TextField
                    error={!!errors.capsuleQuantity}
                    label='Cantidad de Cápsulas'
                    fullWidth
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="capsuleConcentration"
                rules={{ required: true }}
                render={({
                  field,
                  fieldState,
                }) => (
                  <TextField
                    error={!!errors.capsuleConcentration}
                    label='Concentracion de Cápsulas'
                    fullWidth
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="instructions"
                rules={{ required: true }}
                render={({
                  field,
                  fieldState,
                }) => (
                  <TextField
                    error={!!errors.instructions}
                    label='Instrucciones'
                    fullWidth
                    {...field}
                  />
                )}
              />
              </Grid>
              <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="ingredients"
                rules={{ required: true }}
                render={({
                  field,
                  fieldState,
                }) => (
                  <TextField
                    error={!!errors.ingredients}
                    label='Ingredientes'
                    fullWidth
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                control={control}
                name="price"
                rules={{ required: true }}
                render={({ field, formState }) => {
                  const { value } = field;
                  if (value >= 0) {
                    return (
                      <TextField
                        label="Precio"
                        fullWidth
                        type="number"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        {...field}
                      />
                    );
                  } else {
                    return (
                      <TextField
                        label="Precio"
                        fullWidth
                        type="number"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        {...field}
                        error
                      />
                    );
                  }
                }}
                />
              </Grid>
            <Grid item xs={12} >
              <Typography sx={{margin: 'auto 0px'}} variant='h5'>Propiedades</Typography>
              </Grid>

            <ListProperties
              values={values}
              handleChangeProperties={handlePropertiesList}
            />
            <Grid item xs={12} sm={6}>
              <TextField
                focused={images.link2 ? true : false}
                label='Foto del producto'
                value={images.link1}
                id='input-link'
                name='link1'
                fullWidth
                type='text'
                onChange={handleChangeLinks('link1')}
              />
          </Grid>
          <Grid item xs={12} sm={6}>
              <TextField
                focused={images.link2 ? true : false}
                label='Foto del producto'
                value={images.link2}
                id='input-link'
                fullWidth
                name='link2'
                type='text'
                onChange={handleChangeLinks('link2')}
            />
              </Grid>
          </Grid>
      </CardContent>
      <Grid item xs={12}>
        <Divider sx={{ mb: 2 }} />
      </Grid>
      <CardActions>
        <Button size='large' type='submit' sx={{ m: 0 }} variant='contained'>
          Crear Producto
        </Button>
          <Button onClick={() => router.push('/ecommerce/products')} size='large' color='secondary' variant='outlined'>
          Regresar
        </Button>
        </CardActions>
      </form>
    </Card>
    <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
    <Modal open={openModal} onHandleOpenModal={handleOpenModal} onSubmitConfirm={submitConfirm}/>
    </>
  )
}
AddProduct.getLayout = page => <BlankLayout>{page}</BlankLayout>
AddProduct.guestGuard = true
export default AddProduct