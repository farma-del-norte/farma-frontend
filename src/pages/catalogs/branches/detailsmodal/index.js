import {useForm, Controller} from 'react-hook-form'
import {Typography, Grid, FormControl, TextField, Box, Checkbox, FormControlLabel} from '@mui/material'
import ReusableDialog from 'src/components/modal'
import ImageUploader from 'src/components/image-uploader/ImageUploader'
import i18n from 'src/configs/i18n'

const DetailsModal = ({
  isOpen,
  handleCloseModal,
  modalItem,
  onSubmit,
  control,
  handleSubmit,
  handleAddBranch,
  handleUpdateBranch,
  handleFarmacyImageUpdate,
  handleBlueprintImageUpdate
}) => {
  return (
    <ReusableDialog
      open={isOpen}
      onClose={handleCloseModal}
      title={Boolean(modalItem) ? i18n.t('edit') : i18n.t('add')}
      actions={[
        {label: i18n.t('Regresar'), onClick: handleCloseModal, color: 'primary', variant: 'outlined'},
        Boolean(modalItem)
          ? {
              label: i18n.t('save_button'),
              onClick: handleSubmit(handleUpdateBranch),
              color: 'primary',
              variant: 'contained'
            }
          : {label: i18n.t('add'), onClick: handleSubmit(handleAddBranch), color: 'primary', variant: 'contained'}
      ]}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
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
              <ImageUploader base64Images={[]} handleImages={handleFarmacyImageUpdate} />
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
                    name='latitude'
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
                    name='longitude'
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
                    name='bathrooms'
                    control={control}
                    render={({field: {value, onChange}}) => (
                      <TextField label={i18n.t('branches:bathrooms')} value={value} onChange={onChange} />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} sx={{marginTop: '10px'}}>
                <FormControl fullWidth>
                  <Controller
                    name='washing-air'
                    control={control}
                    render={({field: {value, onChange}}) => (
                      <TextField label={i18n.t('branches:washing_air')} value={value} onChange={onChange} />
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={5}>
              <Grid item xs={6} md={6} sx={{marginTop: '10px'}}>
                <FormControl fullWidth>
                  <Controller
                    name='solar-panels'
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
                    name='waterproofing'
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
                    name='meters'
                    control={control}
                    render={({field: {value, onChange}}) => (
                      <TextField label={i18n.t('branches:square_meter')} value={value} onChange={onChange} />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} sx={{marginTop: '10px'}}>
                <FormControl fullWidth>
                  <Controller
                    name='cross-advertisement'
                    control={control}
                    render={({field: {value, onChange}}) => (
                      <TextField label={i18n.t('branches:cross_advertisement')} value={value} onChange={onChange} />
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={5}>
              <Grid item xs={12} md={6} sx={{marginTop: '10px'}}>
                <FormControl fullWidth>
                  <Controller
                    name='letters-advertisement'
                    control={control}
                    render={({field: {value, onChange}}) => (
                      <TextField label={i18n.t('branches:letters_advertisement')} value={value} onChange={onChange} />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} sx={{marginTop: '10px'}}>
                <FormControl fullWidth>
                  <Controller
                    name='reflex-advertisement'
                    control={control}
                    render={({field: {value, onChange}}) => (
                      <TextField label={i18n.t('branches:reflex_advertisement')} value={value} onChange={onChange} />
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={5}>
              <Grid item xs={12} md={6} sx={{marginTop: '10px'}}>
                <FormControl fullWidth>
                  <Controller
                    name='canvas-advertisement'
                    control={control}
                    render={({field: {value, onChange}}) => (
                      <TextField label={i18n.t('branches:canvas_advertisement')} value={value} onChange={onChange} />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} sx={{marginTop: '10px'}}>
                <FormControl fullWidth>
                  <Controller
                    name='curtains'
                    control={control}
                    render={({field: {value, onChange}}) => (
                      <TextField label={i18n.t('branches:curtains')} value={value} onChange={onChange} />
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{marginTop: '10px'}}>
              <FormControl fullWidth>
                <Controller
                  name='minisplit'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label={i18n.t('branches:minisplit')} value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </ReusableDialog>
  )
}

export default DetailsModal
