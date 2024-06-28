export const PERMISSIONS = {
  home: 'home'
}

export const PROFILES = {
  'Administrador General': [PERMISSIONS.home],
  default: []
}

export const ROUTES_PERMISSION = {
  ['/landing-page/home']: PERMISSIONS.home
}

export const PROFILES_USER = {
  admin: 'Administrador General',
  productsAdmin: 'Administrador de Productos'
}
