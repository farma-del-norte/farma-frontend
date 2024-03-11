const Zone = () => {
  return (
    <Grid item xs={12} md={3} sx={{marginTop: '6px'}}>
      <FormControl fullWidth>
        <Controller
          name='area'
          control={control}
          render={({field: {value, onChange}}) => (
            <>
              <InputLabel>Tipo de Area</InputLabel>
              <Select
                defaultValue=''
                value={value || ''}
                label='Tipo de Area'
                onChange={e => handleChangeAreaType(e, onChange)}
              >
                {areas.map((area, i) => (
                  <MenuItem key={i} value={area.value}>
                    {area.name}
                  </MenuItem>
                ))}
              </Select>
            </>
          )}
        />
      </FormControl>
    </Grid>
  )
}

export default Zone
