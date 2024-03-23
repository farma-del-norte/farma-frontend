import ImageUploader from 'src/components/image-uploader/ImageUploader'
import {Controller} from 'react-hook-form'
import {Typography, Grid, FormControl, TextField, Checkbox, FormControlLabel} from '@mui/material'
import i18n from 'src/configs/i18n'

export const DetailsForm = ({control, handleSubmit, handlePharmacyImageUpdate, handleBlueprintImageUpdate}) => {
  return (
    <form onSubmit={handleSubmit()}>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <Grid item xs={12}>
            {/* <FormControl fullWidth>
                <Controller
                  name='image'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label='Imagen Farmacia' value={value} onChange={onChange} />
                  )}
                />
              </FormControl> */}
            <Typography sx={{paddingBottom: '6px'}} variant='body1'>
              {i18n.t('branches:farmacy_image')}
            </Typography>
            <ImageUploader base64Images={[]} handleImages={handlePharmacyImageUpdate} />
          </Grid>
          <Grid item xs={12} sx={{marginTop: '10px'}}>
            {/* <FormControl fullWidth>
              <Controller
                name='blueprints'
                control={control}
                render={({field: {value, onChange}}) => (
                  <TextField label='Planos Farmacia' value={value} onChange={onChange} />
                )}
              />
              
            </FormControl> */}
            <Typography sx={{paddingBottom: '6px'}} variant='body1'>
              {i18n.t('branches:blueprints')}
            </Typography>
            <ImageUploader base64Images={[]} handleImages={handleBlueprintImageUpdate} />
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6} sx={{marginTop: '10px'}}>
              <FormControl fullWidth>
                <Controller
                  name={`details.latitude`}
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label={i18n.t('branches:latitude')} value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '10px'}}>
              <FormControl fullWidth>
                <Controller
                  name='details.longitude'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label={i18n.t('branches:longitude')} value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6} sx={{marginTop: '10px'}}>
              <FormControl fullWidth>
                <Controller
                  name='details.bathrooms'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField
                      label={i18n.t('branches:bathrooms')}
                      value={value}
                      defaultValue={0}
                      onChange={e => {
                        const newValue = e.target.value.replace(/[^0-9]/g, '')
                        onChange(newValue)
                      }}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '10px'}}>
              <FormControl fullWidth>
                <Controller
                  name='details.airWash'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField
                      label={i18n.t('branches:washing_air')}
                      value={value}
                      defaultValue={0}
                      onChange={e => {
                        const newValue = e.target.value.replace(/[^0-9]/g, '')
                        onChange(newValue)
                      }}
                    />
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={6} md={6} sx={{marginTop: '10px'}}>
              <FormControl fullWidth>
                <Controller
                  name='details.solarPanels'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <FormControlLabel
                      sx={{
                        border: '1px solid #FFFFFF33',
                        borderRadius: '10px',
                        padding: '15px',
                        width: '100%',
                        height: 60,
                        marginLeft: 0
                      }}
                      control={<Checkbox checked={value} onChange={onChange} />}
                      label={<Typography sx={{width: '100%'}}>{i18n.t('branches:solar_panels')}</Typography>}
                      labelPlacement='start'
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} md={6} sx={{marginTop: '10px'}}>
              <FormControl fullWidth>
                <Controller
                  name='details.waterproofing'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <FormControlLabel
                      sx={{
                        border: '1px solid #FFFFFF33',
                        borderRadius: '10px',
                        padding: '15px',
                        width: '100%',
                        height: 60,
                        marginLeft: 0
                      }}
                      control={<Checkbox checked={value} onChange={onChange} />}
                      label={<Typography sx={{width: '100%'}}>{i18n.t('branches:waterproofing')}</Typography>}
                      labelPlacement='start'
                    />
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6} sx={{marginTop: '10px'}}>
              <FormControl fullWidth>
                <Controller
                  name='details.mts2'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField
                      label={i18n.t('branches:square_meter')}
                      value={value}
                      defaultValue={0}
                      onChange={e => {
                        const newValue = e.target.value.replace(/[^0-9]/g, '')
                        onChange(newValue)
                      }}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '10px'}}>
              <FormControl fullWidth>
                <Controller
                  name='details.crossAds'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField
                      label={i18n.t('branches:cross_advertisement')}
                      value={value}
                      defaultValue={0}
                      onChange={e => {
                        const newValue = e.target.value.replace(/[^0-9]/g, '')
                        onChange(newValue)
                      }}
                    />
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6} sx={{marginTop: '10px'}}>
              <FormControl fullWidth>
                <Controller
                  name='details.lettersAds'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField
                      label={i18n.t('branches:letters_advertisement')}
                      value={value}
                      defaultValue={0}
                      onChange={e => {
                        const newValue = e.target.value.replace(/[^0-9]/g, '')
                        onChange(newValue)
                      }}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '10px'}}>
              <FormControl fullWidth>
                <Controller
                  name='details.reflectiveAds'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField
                      label={i18n.t('branches:reflex_advertisement')}
                      value={value}
                      defaultValue={0}
                      onChange={e => {
                        const newValue = e.target.value.replace(/[^0-9]/g, '')
                        onChange(newValue)
                      }}
                    />
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6} sx={{marginTop: '10px'}}>
              <FormControl fullWidth>
                <Controller
                  name='details.reflectiveCrossAds'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField
                      label={i18n.t('branches:cross_reflective_advertisement')}
                      value={value}
                      defaultValue={0}
                      onChange={e => {
                        const newValue = e.target.value.replace(/[^0-9]/g, '')
                        onChange(newValue)
                      }}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '10px'}}>
              <FormControl fullWidth>
                <Controller
                  name='details.tarpAds'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField
                      label={i18n.t('branches:canvas_advertisement')}
                      value={value}
                      defaultValue={0}
                      onChange={e => {
                        const newValue = e.target.value.replace(/[^0-9]/g, '')
                        onChange(newValue)
                      }}
                    />
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6} sx={{marginTop: '10px'}}>
              <FormControl fullWidth>
                <Controller
                  name='details.curtains'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField
                      label={i18n.t('branches:curtains')}
                      value={value}
                      defaultValue={0}
                      onChange={e => {
                        const newValue = e.target.value.replace(/[^0-9]/g, '')
                        onChange(newValue)
                      }}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '10px'}}>
              <FormControl fullWidth>
                <Controller
                  name='details.minisplit'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField
                      label={i18n.t('branches:minisplit')}
                      value={value}
                      defaultValue={0}
                      onChange={e => {
                        const newValue = e.target.value.replace(/[^0-9]/g, '')
                        onChange(newValue)
                      }}
                    />
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}
