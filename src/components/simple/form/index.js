import {useEffect} from 'react'
import {Grid, FormControl} from '@mui/material'
import {Controller} from 'react-hook-form'
import {changeForm} from 'src/store/form/reducer'
import {useDispatch, useSelector} from 'react-redux'
import InputManager from 'src/components/simple/form/inputManager'

const Form = ({title, inputs, control, watch, getValues}) => {
  const dispatch = useDispatch()
  const {form} = useSelector(state => state.form)
  const filteredInputs = inputs.filter(input => !input.hideInput)
  const watchForm = watch()
  const keyForm = title.replace(/\s+/g, '')

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
