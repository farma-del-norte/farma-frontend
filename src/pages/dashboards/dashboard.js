import {Typography, Grid} from '@mui/material'
import React from 'react'

function Dashboard() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography
          variant='h3'
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem',
            textTransform: 'uppercase',
            marginTop: '2rem',
            marginBottom: '2rem'
          }}
        >
          Bienvenido a Farma del Norte
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Dashboard
