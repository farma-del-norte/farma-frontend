// ** React Imports
import {useEffect} from 'react'

// ** Next Imports
import {useRouter} from 'next/router'

// ** Hooks Import
import {useSelector} from 'react-redux'
import {PROFILES, ROUTES_PERMISSION} from 'src/configs/profiles'
//import {loginCall} from 'src/store/login/actions'

const resolveProfile = (user, path) => {
  const userProfile = user?.position ? PROFILES[user.position] : PROFILES.default
  const permission = ROUTES_PERMISSION[path]

  return userProfile.includes(permission)
}

const AuthGuard = props => {
  const {children} = props
  const {fallback} = props
  const router = useRouter()
  const {isLoading, user} = useSelector(state => state.login)

  useEffect(
    () => {
      if (!router.isReady) {
        return
      }
      if (router.asPath === '/') {
        router.replace('/login')
      }
      if (!localStorage.getItem('im-user')) {
        router.replace({
          pathname: '/login'
        })
      } else if (user && !resolveProfile(user, router.pathname)) {
        router.replace({
          pathname: '/401/'
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route]
  )
  // if (isLoading || user === null) {
  //   return fallback
  // }

  return <>{children}</>
}

export default AuthGuard
