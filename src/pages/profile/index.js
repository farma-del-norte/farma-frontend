// ** React Imports
import {useDispatch, useSelector} from 'react-redux'

// ** Next Import

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import UserProfileLeft from 'src/views/profile/UserProfileLeft'

const Profile = () => {
  const dispatch = useDispatch()
  // const { user } = useSelector(state => state.dashboard.general)
  const {paymentMethods} = useSelector(state => state.paymentMethods)
  const {address} = useSelector(state => state.address)

  return user.id ? (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <UserProfileLeft data={user} />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        {/* <UserProfileRight methods={paymentMethods} addresses={address} /> */}
      </Grid>
    </Grid>
  ) : null
}

export default Profile
