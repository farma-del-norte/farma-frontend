import useMediaQuery from '@mui/material/useMediaQuery'

// ** Layout Imports
// !Do not remove this Layout import
import Layout from 'src/@core/layouts/Layout'

// ** Navigation Imports
import VerticalNavItems from 'src/layouts/navigation/vertical'
import HorizontalNavItems from 'src/layouts/navigation/horizontal'

// ** Component Import
// Uncomment the below line (according to the layout type) when using server-side menu
// import ServerSideVerticalNavItems from './components/vertical/ServerSideNavItems'
// import ServerSideHorizontalNavItems from './components/horizontal/ServerSideNavItems'

import VerticalAppBarContent from './components/vertical/AppBarContent'
import HorizontalAppBarContent from './components/horizontal/AppBarContent'

// ** Hook Import
import {useSettings} from 'src/@core/hooks/useSettings'
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {loadSession} from 'src/store/login/actions'
import {useRouter} from 'next/router'

import {PROFILES, ROUTES_PERMISSION} from 'src/configs/profiles'
const UserLayout = ({children}) => {
  // ** Hooks
  const dispatch = useDispatch()
  const router = useRouter()

  const {settings, saveSettings} = useSettings()
  const resolveProfile = (user, path) => {
    const userProfile = user?.position ? PROFILES[user.position] : PROFILES.default
    const permission = ROUTES_PERMISSION[path]

    return userProfile.includes(permission)
  }
  /**
   *  The below variable will hide the current layout menu at given screen size.
   *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
   *  You can change the screen size from which you want to hide the current layout menu.
   *  Please refer useMediaQuery() hook: https://mui.com/material-ui/react-use-media-query/,
   *  to know more about what values can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))

  const {user} = useSelector(state => state.login)

  useEffect(() => {
    if (localStorage.getItem('im-user') && !user) {
      dispatch(loadSession())
    }
  }, [user])

  useEffect(
    () => {
      if (user && !resolveProfile(user, router.pathname)) {
        router.replace({
          pathname: '/401/'
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  )

  return (
    <Layout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      {...(settings.layout === 'horizontal'
        ? {
            // ** Navigation Items
            horizontalNavItems: HorizontalNavItems(),

            // Uncomment the below line when using server-side menu in horizontal layout and comment the above line
            // horizontalNavItems: ServerSideHorizontalNavItems(),
            // ** AppBar Content
            horizontalAppBarContent: () => (
              <HorizontalAppBarContent hidden={hidden} settings={settings} saveSettings={saveSettings} />
            )
          }
        : {
            // ** Navigation Items
            verticalNavItems: VerticalNavItems(),

            // Uncomment the below line when using server-side menu in vertical layout and comment the above line
            // verticalNavItems: ServerSideVerticalNavItems(),
            // ** AppBar Content
            verticalAppBarContent: props => (
              <VerticalAppBarContent
                hidden={hidden}
                settings={settings}
                saveSettings={saveSettings}
                toggleNavVisibility={props.toggleNavVisibility}
              />
            )
          })}
    >
      {children}
    </Layout>
  )
}

export default UserLayout
