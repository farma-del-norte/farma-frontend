// ** React Imports
import { useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Hooks Import
import { useSelector } from 'react-redux'
import { PROFILES, ROUTES_PERMISSION } from 'src/configs/profiles'

const resolveProfile = (user, path) => {
  const userProfile = user?.profile ? PROFILES[user.profile] : PROFILES.default

  const permission = ROUTES_PERMISSION[path]

  return userProfile.includes(permission)
}

const AuthGuard = props => {
  const { children, fallback } = props
  const { isLoading } = useSelector(state => state.session)
  const { user } = useSelector(state => state.dashboard.general)
  const router = useRouter()

  useEffect(
    () => {
      if (!router.isReady) {
        return
      }

      if (!resolveProfile(user, router.pathname)) {
        if (router.asPath !== '/') {
          router.replace({
            pathname: '/ecommerce/products'
            // query: { returnUrl: router.asPath }
          })
        } else {
          router.replace('/ecommerce/products')
        }
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
