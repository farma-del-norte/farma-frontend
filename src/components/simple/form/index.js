import {useEffect} from 'react'
import {Grid, FormControl} from '@mui/material'
import {Controller} from 'react-hook-form'
import {changeForm} from 'src/store/form/reducer'
import {useDispatch, useSelector} from 'react-redux'
import InputManager from 'src/components/simple/form/inputManager'

const Form = ({values, title, inputs, control, reset, watch, getValues}) => {
  const dispatch = useDispatch()
  const {form} = useSelector(state => state.form)
  const {forms} = useSelector(state => state.simple)
  const filteredInputs = inputs.filter(input => !input.hideInput)
  const watchForm = watch()
  const keyForm = title.replace(/\s+/g, '')

  
  useEffect(() => {
    // si valores del form se obtienen del reducer
    if (forms[`${title}_${values?.id}`]) {
      if (Object.keys(forms[`${title}_${values.id}`]?.values || {}).length) {
        reset(forms[`${title}_${id}`].values)
      } else {
        const defaultFormValues = filteredInputs.reduce((acc, current) => {
          acc[current.field] = current.value;
          return acc;
        }, {});
        reset({...defaultFormValues})
      }
    } else if (values) {
      // got back to details
      reset(values)
    }
  }, [dispatch, reset, forms, title, values]);

  // set form changed values to store
  useEffect(() => {
    const formChanged = JSON.stringify(watchForm);
    if (!form[keyForm] || JSON.stringify(form[keyForm]) !== formChanged) {
      dispatch(changeForm({keyForm, watch: watchForm}));
    }
  }, [dispatch, watchForm, form, keyForm]);

  return (
    <Grid container spacing={3} sx={{pt: 2}}>
      {filteredInputs.map((input, index) => (
        <Grid key={index} item xs={12} md={input.width}>
          <FormControl fullWidth>
            <Controller
              name={input.field}
              control={control}
              render={({field: {value, onChange}, fieldState: {error}}) => (
                <InputManager input={input} value={value} onChange={onChange} getValues={getValues} error={error} />
              )}
            />
          </FormControl>
        </Grid>
      ))}
    </Grid>
  )
}

export default Form
