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
  console.log('User Profile:', userProfile) // Debug log
  console.log('Permission Required:', permission, path) // Debug log
  return userProfile.includes(permission)
}

const AuthGuard = props => {
  const {children} = props
  const {fallback} = props
  const router = useRouter()
  const {isLoading} = useSelector(state => state.login)
  const userData = localStorage.getItem('data-user')
  const user = userData ? JSON.parse(userData) : null
  useEffect(
    () => {
      if (!router.isReady) {
        return
      }
      if (router.asPath === '/') {
        router.replace('/login')
      }
      if (!user) {
        localStorage.removeItem('im-user')
        router.replace('/login')
      } else if (!resolveProfile(user, router.asPath)) {
        router.replace('/401')
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route]
  )
  if (isLoading || user === null) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard
