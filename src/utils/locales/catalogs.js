import {t} from 'i18next'
import i18n from 'src/configs/i18n'

const CATALOGS_LOCALE = {
  // MARK: - BRANCHES
  USERS_TITLE: t('users_title', {ns: 'catalogs'}),
  USERS_EDIT_MODAL: t('users_edit_modal', {ns: 'catalogs'}),
  USERS_ADD_MODAL: t('users_add_modal', {ns: 'catalogs'}),
  USERS_DELETE_MODAL: t('users_delete_modal', {ns: 'catalogs'}),
  USERS_CONFIRM_DELETE_MODAL: t('users_delete_confirm_message', {ns: 'catalogs'}),

  // MARK: - BRANCHES
  BRANCHES_CREATE_MESSAGE: t('branches_create_message', {ns: 'catalogs'}),
  BRANCHES_EDIT_MESSAGE: t('branches_edit_message', {ns: 'catalogs'}),
  BRANCHES_DELETE_MESSAGE: t('branches_delete_message', {ns: 'catalogs'}),
  BRANCHES_IMAGE_PHARMACY: t('branches_image_pharmacy', {ns: 'catalogs'}),
  BRANCHES_WIP_DETAIL: t('branches_wip_detail', {ns: 'catalogs'}),
  BRANCHES_SQUARE_METERS: t('branches_square_meters', {ns: 'catalogs'}),
  BRANCHES_CROSS_AD: t('branches_cross_ad', {ns: 'catalogs'}),
  BRANCHES_PHARMACY_PLANS: t('branches_pharmacy_plans', {ns: 'catalogs'}),
  BRANCHES_LETTER_AD: t('branches_letter_ad', {ns: 'catalogs'}),
  BRANCHES_REFLECTIVE_AD: t('branches_reflective_ad', {ns: 'catalogs'}),
  BRANCHES_LATITUDE: t('branches_latitude', {ns: 'catalogs'}),
  BRANCHES_LONGITUDE: t('branches_longitude', {ns: 'catalogs'}),
  BRANCHES_TARP_AD: t('branches_tarp_ad', {ns: 'catalogs'}),
  BRANCHES_WATERPROOFING: t('branches_waterproofing', {ns: 'catalogs'}),
  BRANCHES_BATHROOMS: t('branches_bathrooms', {ns: 'catalogs'}),
  BRANCHES_AIR_WASH: t('branches_air_wash', {ns: 'catalogs'}),
  BRANCHES_MINISPLITS: t('branches_minisplits', {ns: 'catalogs'}),
  BRANCHES_CURTAINS: t('branches_curtains', {ns: 'catalogs'}),
  BRANCHES_SOLAR_PANELS: t('branches_solar_panels', {ns: 'catalogs'}),
  BRANCHES_BRANCH_DETAILS_TITLE: t('branches_branch_details_title', {ns: 'catalogs'}),
  BRANCHES_BRANCH_ADD_DETAILS: t('brances_create_branch_details', {ns: 'catalogs'}),
  BRANCHES_BRANCH_EDIT_DETAILS: t(),

  // MARK: - DIMENSIONS
  DIMENSIONS_TITLE: t('dimensions_cat_title', {ns: 'catalogs'}),
  DIMENSIONS_FIELD_NAME: t('dimensions_cat_column_name', {ns: 'catalogs'}),
  DIMENSIONS_EDIT_MODAL: t('dimensions_cat_edit_modal', {ns: 'catalogs'}),
  DIMENSIONS_ADD_MODAL: t('dimensions_cat_add_modal', {ns: 'catalogs'}),
  DIMENSIONS_DELETE_MODAL: t('dimensions_cat_delete_modal', {ns: 'catalogs'}),
  DIMENSIONS_CONFIRM_DELETE_MODAL: t('dimensions_cat_delete_confirm_message', {ns: 'catalogs'}),
  DIMENSIONS_EDIT_MESSAGE: t('dimensions_cat_edit_message', {ns: 'catalogs'}),
  DIMENSIONS_CREATE_MESSAGE: t('dimensions_cat_create_message', {ns: 'catalogs'}),
  DIMENSIONS_DELETE_MESSAGE: t('dimensions_cat_delete_message', {ns: 'catalogs'}),

  // MARK: - SUPPLIERS
  SUPPLIERS_TITLE: t('suppliers_title', {ns: 'catalogs'}),
  SUPPLIERS_FIELD_NAME: t('suppliers_column_name', {ns: 'catalogs'}),
  SUPPLIERS_EDIT_MODAL: t('suppliers_edit_modal', {ns: 'catalogs'}),
  SUPPLIERS_ADD_MODAL: t('suppliers_add_modal', {ns: 'catalogs'}),
  SUPPLIERS_DELETE_MODAL: t('suppliers_delete_modal', {ns: 'catalogs'}),
  SUPPLIERS_CONFIRM_DELETE_MODAL: t('suppliers_delete_confirm_message', {ns: 'catalogs'}),
  SUPPLIERS_EDIT_MESSAGE: t('suppliers_edit_message', {ns: 'catalogs'}),
  SUPPLIERS_CREATE_MESSAGE: t('suppliers_create_message', {ns: 'catalogs'}),
  SUPPLIERS_DELETE_MESSAGE: t('suppliers_delete_message', {ns: 'catalogs'}),

  // MARK: - CONCEPTS
  CONCEPTS_TITLE: t('concepts_cat_title', {ns: 'catalogs'}),
  CONCEPTS_FIELD_NAME: t('concepts_cat_field_name', {ns: 'catalogs'}),
  CONCEPTS_FIELD_TYPE: t('concepts_cat_field_type', {ns: 'catalogs'}),
  CONCEPTS_FIELD_DEFINITION: t('concepts_cat_field_definition', {ns: 'catalogs'}),
  CONCEPTS_FIELD_OBSERVATIONS: t('concepts_cat_field_observations', {ns: 'catalogs'}),
  CONCEPTS_FIELD_VARIABLE_NAME: t('concepts_cat_field_variable_name', {ns: 'catalogs'}),
  CONCEPTS_EDIT_MODAL: t('concepts_cat_edit_modal', {ns: 'catalogs'}),
  CONCEPTS_ADD_MODAL: t('concepts_cat_add_modal', {ns: 'catalogs'}),
  CONCEPTS_DELETE_MODAL: t('concepts_cat_delete_modal', {ns: 'catalogs'}),
  CONCEPTS_CONFIRM_DELETE_MODAL: t('concepts_cat_delete_confirm_message', {ns: 'catalogs'}),
  CONCEPTS_EDIT_MESSAGE: t('concepts_cat_edit_message', {ns: 'catalogs'}),
  CONCEPTS_CREATE_MESSAGE: t('concepts_cat_create_message', {ns: 'catalogs'}),
  CONCEPTS_DELETE_MESSAGE: t('concepts_cat_delete_message', {ns: 'catalogs'}),

  // MARK: - VARIABLES
  VARIABLES_TITLE: t('variables_cat_title', {ns: 'catalogs'}),
  VARIABLES_EDIT_MODAL: t('variables_cat_edit_modal', {ns: 'catalogs'}),
  VARIABLES_ADD_MODAL: t('variables_cat_add_modal', {ns: 'catalogs'}),
  VARIABLES_DELETE_MODAL: t('variables_cat_delete_modal', {ns: 'catalogs'}),
  VARIABLES_EDIT_MESSAGE: t('variables_cat_edit_message', {ns: 'catalogs'}),
  VARIABLES_CREATE_MESSAGE: t('variables_cat_create_message', {ns: 'catalogs'}),
  VARIABLES_DELETE_MESSAGE: t('variables_cat_delete_message', {ns: 'catalogs'}),
  VARIABLES_CONFIRM_DELETE_MODAL: t('variables_cat_delete_confirm_message', {ns: 'catalogs'}),
  VARIABLES_FIELD_NAME: t('variables_cat_field_name', {ns: 'catalogs'}),
  VARIABLES_FIELD_OBLIGATION: t('variables_cat_field_obligation', {ns: 'catalogs'}),
  VARIABLES_FIELD_SPECIFICATIONS: t('variables_cat_field_specifications', {ns: 'catalogs'}),
  VARIABLES_FIELD_GUIDELINES: t('variables_cat_field_guidelines', {ns: 'catalogs'}),
  VARIABLES_FIELD_SERVICE: t('variables_cat_field_service', {ns: 'catalogs'}),
  VARIABLES_FIELD_DIMENSIONS_NAME: t('variables_cat_field_dimensions_name', {ns: 'catalogs'}),

  // MARK: - MATERIALS
  MATERIALS_TITLE: t('materials_cat_title', {ns: 'catalogs'}),
  MATERIALS_EDIT_MODAL: t('materials_cat_edit_modal', {ns: 'catalogs'}),
  MATERIALS_ADD_MODAL: t('materials_cat_add_modal', {ns: 'catalogs'}),
  MATERIALS_DELETE_MODAL: t('materials_cat_delete_modal', {ns: 'catalogs'}),
  MATERIALS_CONFIRM_DELETE_MODAL: t('materials_cat_delete_confirm_message', {ns: 'catalogs'}),
  MATERIALS_EDIT_MESSAGE: t('materials_cat_edit_message', {ns: 'catalogs'}),
  MATERIALS_CREATE_MESSAGE: t('materials_cat_create_message', {ns: 'catalogs'}),
  MATERIALS_DELETE_MESSAGE: t('materials_cat_delete_message', {ns: 'catalogs'}),

  // MARK: - SERVICE
  SERVICE_TITLE: t('services_cat_title', {ns: 'catalogs'}),
  SERVICE_EDIT_MODAL: t('services_cat_edit_modal', {ns: 'catalogs'}),
  SERVICE_ADD_MODAL: t('services_cat_add_modal', {ns: 'catalogs'}),
  SERVICE_DELETE_MODAL: t('services_cat_delete_modal', {ns: 'catalogs'}),
  SERVICE_CONFIRM_DELETE_MODAL: t('services_cat_delete_confirm_message', {ns: 'catalogs'}),
  SERVICE_EDIT_MESSAGE: t('services_cat_edit_message', {ns: 'catalogs'}),
  SERVICE_CREATE_MESSAGE: t('services_cat_create_message', {ns: 'catalogs'}),
  SERVICE_DELETE_MESSAGE: t('services_cat_delete_message', {ns: 'catalogs'}),

  // MARK: - REQUIREMENTS
  REQUIREMENTS_TITLE: t('requirements_cat_title', {ns: 'catalogs'}),
  REQUIREMENTS_EDIT_MODAL: t('requirements_cat_edit_modal', {ns: 'catalogs'}),
  REQUIREMENTS_ADD_MODAL: t('requirements_cat_add_modal', {ns: 'catalogs'}),
  REQUIREMENTS_DELETE_MODAL: t('requirements_cat_delete_modal', {ns: 'catalogs'}),
  REQUIREMENTS_CONFIRM_DELETE_MODAL: t('requirements_cat_delete_confirm_message', {ns: 'catalogs'}),
  REQUIREMENTS_EDIT_MESSAGE: t('requirements_cat_edit_message', {ns: 'catalogs'}),
  REQUIREMENTS_CREATE_MESSAGE: t('requirements_cat_create_message', {ns: 'catalogs'}),
  REQUIREMENTS_DELETE_MESSAGE: t('requirements_cat_delete_message', {ns: 'catalogs'}),

  // MARK: - ZONES
  ZONES_TITLE: t('zones_title', {ns: 'catalogs'}),
  ZONES_EDIT_MODAL: t('zones_edit_modal', {ns: 'catalogs'}),
  ZONES_ADD_MODAL: t('zones_add_modal', {ns: 'catalogs'}),
  ZONES_DELETE_MODAL: t('zones_delete_modal', {ns: 'catalogs'}),
  ZONES_CONFIRM_DELETE_MODAL: t('zones_delete_confirm_message', {ns: 'catalogs'}),
  ZONES_EDIT_MESSAGE: t('zones_edit_message', {ns: 'catalogs'}),
  ZONES_CREATE_MESSAGE: t('zones_create_message', {ns: 'catalogs'}),
  ZONES_DELETE_MESSAGE: t('zones_delete_message', {ns: 'catalogs'})
}

export default CATALOGS_LOCALE
