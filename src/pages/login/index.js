import React from 'react'
// ** MUI Imports
import Grid from '@mui/material/Grid'

import Form from 'src/views/forms/forms-login-register/Form'
// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

const Login = () => {
  return (
    <Grid container spacing={5} sx={{overflow: 'hidden'}}>
      <Grid item xs={12}>
        <Form />
      </Grid>
    </Grid>
  )
}
Login.getLayout = page => <BlankLayout>{page}</BlankLayout>
Login.guestGuard = true

export default Login
