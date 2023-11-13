import {t} from 'i18next'
import i18n from 'src/configs/i18n'

export const COMMON_LOCALE = {
  BACK_BUTTON: i18n.t('back_button'),
  SAVE_BUTTON: i18n.t('save_button'),
  DELETE_BUTTON: i18n.t('delete_button'),
  ACTIONS: i18n.t('actions')
}

export const CATALOGS_LOCALE = {
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

export const COMMON = {
  COLUMN_FLEX: 0.25,
  COLUMN_FLEX_SMALL: 0.15,
  COLUMN_MIN_WIDTH: 200,
  COLUMN_MIN_WIDTH_SMALL: 100,
  COLUMN_ACTION_FLEX: 0.125,
  COLUMN_ACTION_MIN_WIDTH: 100,
  FORM_MARGIN_TOP: '6px',
  ACTION_ICON_MARGIN: '5px',
  ACTIONS_FIELD: 'actions',
  ACTIONS_TEXT_VARIANT: 'body2',
  ACTIONS_TEXT_COLOR: '#6495ED',
  ACTIONS_TEXT_CURSOR: 'pointer',
  BUTTON_PRIMARY_COLOR: 'primary',
  BACK_BUTTON_VARIANT: 'outlined',
  SAVE_BUTTON_VARIANT: 'contained',
  DELETE_BUTTON_VARIANT: 'contained',
  MODAL_DELETE_TEXT_VARIANT: 'body2'
}

export const CATALOGS = {
  TABLE_PAGE_SIZE: 5,
  TABLE_PAGE_ROWS_OPTIONS: [7, 10, 25, 50],
  DIMENSIONS_FIELD_FLEX_SIZE: 12,
  DIMENSIONS_FIELD_NAME: 'name',
  CONCEPTS_FIELD_NAME: 'name',
  CONCEPTS_FIELD_TYPE: 'type',
  CONCEPTS_FIELD_DEFINITION: 'definition',
  CONCEPTS_FIELD_OBSERVATIONS: 'observations',
  CONCEPTS_FIELD_VARIABLE_NAME: 'variableName',
  CONCEPTS_FIELD_VARIABLE_ID: 'variablesID',
  VARIABLES_FIELD_NAME: 'name',
  VARIABLES_FIELD_OBLIGATION: 'obligation',
  VARIABLES_FIELD_SPECIFICATIONS: 'specifications',
  VARIABLES_FIELD_GUIDELINES: 'guidelines',
  VARIABLES_FIELD_SERVICE: 'service',
  VARIABLES_FIELD_DIMENSIONS_NAME: 'dimensionName',
  VARIABLES_FIELD_DIMENSION_ID: 'dimensionID'
}
