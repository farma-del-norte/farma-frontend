// ** React Imports
import {useEffect} from 'react'

// ** Next Imports
import {useRouter} from 'next/router'

// ** Hooks Import
//import {useSelector} from 'react-redux'

const GuestGuard = props => {
  const {children} = props
  //const {fallback} = props

  const router = useRouter()
  useEffect(() => {
    if (!router.isReady) {
      return
    }
    // if (window.localStorage.getItem('userData')) {
    //   router.replace('/')
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route])
  // if (isLoading) {
  //   return fallback
  // }

  return <>{children}</>
}

export default GuestGuard
