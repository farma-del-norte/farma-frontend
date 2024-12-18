// ** React Imports
import {useState, Fragment} from 'react'
//import {useEffect} from 'react'
import {useSelector} from 'react-redux'

// ** Next Import
import {useRouter} from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
//import MenuItem from '@mui/material/MenuItem'
import {styled} from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import FlagIcon from '@mui/icons-material/Flag'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

// ** Icons Imports
//import LogoutVariant from 'mdi-material-ui/LogoutVariant'
//import AccountTie from 'mdi-material-ui/AccountTie'

// ** Styled Components
const BadgeContentSpan = styled('span')(({theme}) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))
//import {Account} from 'mdi-material-ui'
//import {PROFILES_USER} from 'src/configs/profiles'

const UserDropdown = props => {
  //const dispatch = useDispatch()

  // ** Props
  const {settings} = props

  // ** States
  const [anchorEl, setAnchorEl] = useState(null)
  const {user} = useSelector(state => state.login)
  // ** Hooks
  const router = useRouter()

  // ** Vars
  const {direction} = settings

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = url => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  // const handleGoTo = path => {
  //   router.push(path)
  //   handleDropdownClose()
  // }
  const handleLogout = () => {
    localStorage.removeItem('im-user')
    router.push('/login')
    handleDropdownClose()
  }

  const getCorrectName = () => {
    let name = user ? user.firstname : '',
      lastName = user ? user.lastname : ''

    return `${name.split(' ')[0]} ${lastName.split(' ')[0]}`
  }

  // const handleConvertProfile = () => {
  //   router.push({pathname: '/register/address', query: {newAssociate: true}})
  //   handleDropdownClose()
  // }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ml: 2, cursor: 'pointer'}}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Avatar alt='avatar' onClick={handleDropdownOpen} sx={{width: 40, height: 40}}>
          <AccountCircleIcon />
        </Avatar>
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{'& .MuiMenu-paper': {width: 230, mt: 4}}}
        anchorOrigin={{vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left'}}
        transformOrigin={{vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left'}}
      >
        <Box sx={{pt: 2, pb: 3, px: 4}}>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
            >
              <Avatar alt='avatar-menu' sx={{width: '2.5rem', height: '2.5rem'}}>
                <AccountCircleIcon />
              </Avatar>
            </Badge>
            <Box sx={{display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column'}}>
              <Typography sx={{fontWeight: 600}}>{getCorrectName()}</Typography>
              <Typography variant='body2' sx={{fontSize: '0.8rem', color: 'text.disabled'}}>
                {user?.position}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{display: 'flex', ml: 3, alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: '10px'}}>
          <FlagIcon />
          <Typography sx={{fontWeight: 600}}>{'Tengo un problema'}</Typography>
        </Box>
        <Divider />
        <div onClick={handleLogout} style={{cursor: 'pointer'}}>
          <Box sx={{display: 'flex', ml: 3, alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: '10px'}}>
            <ExitToAppIcon />
            <Typography sx={{fontWeight: 600}}>{'Cerrar Sesión'}</Typography>
          </Box>
        </div>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
