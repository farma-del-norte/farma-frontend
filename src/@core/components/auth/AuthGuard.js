// ** React Imports
import {useEffect} from 'react'

// ** Next Imports
import {useRouter} from 'next/router'

// ** Hooks Import
//import {useSelector} from 'react-redux'

/* const resolveProfile = (user, path) => {
  const userProfile = user?.profile ? PROFILES[user.profile] : PROFILES.default

  const permission = ROUTES_PERMISSION[path]

  return userProfile.includes(permission)
} */

const AuthGuard = props => {
  const {children} = props
  //const {fallback} = props
  // const {user} = useSelector(state => state.dashboard.general)
  const router = useRouter()

  useEffect(
    () => {
      if (!router.isReady) {
        return
      }

      if (router.asPath === '/') {
        router.replace('/login')
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
