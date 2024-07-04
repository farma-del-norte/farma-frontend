export const PERMISSIONS = {
  home: 'home',
  users: 'users',
  zones: 'zones',
  branches: 'branches',
  budgets: 'budgets',
  maintenances: 'maintenances',
  correctivesMaintenances: 'correctivesMaintenances',
  servicesMaintenances: 'servicesMaintenances',
  preventivesMaintenances: 'preventivesMaintenances',
  damagesMaintenances: 'damagesMaintenances',
  resources: 'resources',
  conceptsResources: 'conceptsResources',
  dimensionsResources: 'dimensionsResources',
  materialsResources: 'materialsResources',
  requirementsResources: 'requirementsResources',
  servicesResources: 'servicesResources',
  suppliersResources: 'suppliersResources',
  variablesResources: 'variablesResources',
  damagesResources: 'damagesResources'
}

export const PROFILES = {
  Administrador: Object.values(PERMISSIONS),
  'Gerente de zona': [
    PERMISSIONS.home,
    PERMISSIONS.zones,
    PERMISSIONS.branches,
    PERMISSIONS.budgets,
    PERMISSIONS.maintenances,
    PERMISSIONS.correctivesMaintenances,
    PERMISSIONS.servicesMaintenances,
    PERMISSIONS.preventivesMaintenances,
    PERMISSIONS.damagesMaintenances
  ],
  default: []
}

export const ROUTES_PERMISSION = {
  ['/dashboards/']: PERMISSIONS.home,
  ['/users/']: PERMISSIONS.users,
  ['/zones/']: PERMISSIONS.zones,
  ['/branches/']: PERMISSIONS.branches,
  ['/budgets/']: PERMISSIONS.budgets,
  ['/maintenances/']: PERMISSIONS.maintenances,
  ['/maintenances/correctives/']: PERMISSIONS.correctivesMaintenances,
  ['/maintenances/services/']: PERMISSIONS.servicesMaintenances,
  ['/maintenances/preventives/']: PERMISSIONS.preventivesMaintenances,
  ['/maintenances/damages/']: PERMISSIONS.damagesMaintenances,
  ['/resources/']: PERMISSIONS.resources,
  ['/resources/concepts/']: PERMISSIONS.conceptsResources,
  ['/resources/dimensions/']: PERMISSIONS.dimensionsResources,
  ['/resources/materials/']: PERMISSIONS.materialsResources,
  ['/resources/requirements/']: PERMISSIONS.requirementsResources,
  ['/resources/services/']: PERMISSIONS.servicesResources,
  ['/resources/suppliers/']: PERMISSIONS.suppliersResources,
  ['/resources/variables/']: PERMISSIONS.variablesResources,
  ['/resources/damages/']: PERMISSIONS.damagesResources,
  ['/401/']: PERMISSIONS.home,
  ['/404/']: PERMISSIONS.home
}

export const PROFILES_USER = {
  admin: 'Administrador',
  manager: 'Gerente de zona'
}
