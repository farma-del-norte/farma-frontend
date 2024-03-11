import {t} from 'i18next'
import i18n from 'src/configs/i18n'

export const COMMON_LOCALE = {
  BACK_BUTTON: i18n.t('back_button'),
  SAVE_BUTTON: i18n.t('save_button'),
  DELETE_BUTTON: i18n.t('delete_button'),
  ACTIONS: i18n.t('actions'),
  EMPTY_STRING: i18n.t('empty_string')
}

export const NUMBERS = {
  CONST_ZERO: i18n.t('Const_zero'),
  CONST_ONE:  i18n.t('Const_one'),
  CONST_FOUR: i18n.t('Const_four'),
  CONST_FIVE: i18n.t('Const_five'),
  CONST_SIX: i18n.t('Const_six')
}

export const LOGIN_LOCALE = {
  LOG_IN: i18n.t('Log_in'),
  EMAIL: i18n.t('Email'),
  EMAIL_ENG: i18n.t('Email_eng'),
  PASSWORD: i18n.t('Password'),
  PASSWORD_ENG: i18n.t('Password_eng'),
  FORGOT_PASSWORD: i18n.t('I_forgot_my_password'),
  DO_YOU_FORGET_PASSWORD: i18n.t('Do_you_forget_password'),
  RESET_PASSWORD: i18n.t('Reset_password'),
  RESET_LINK: i18n.t('Reset_link'),
  REWRITED_PASSWORD: i18n.t('Re_writed_password'),
  BACK_LOGIN: i18n.t('Back_login'),
  SIGN_IN: i18n.t('Sign_in'),
  INVALID_EMAIL: i18n.t('invalid_email'),
  EMAIL_REQUIRED: i18n.t('email_required'),
  EMPTY_FIELDS: i18n.t('Empty_fields'),
  EMPTY_STRING: i18n.t('Empty_string'),
  ENTER_CODE: i18n.t('Enter_code'),
  ENTER_CODE_RECOVERY_PASSWORD: i18n.t("Enter_code_recovery_password"),
  ENTER_NEW_PASSWORD: i18n.t('Enter_new_password'),
  ENTER_NEW_PASSWORD_AGAIN: i18n.t('Enter_new_password_again'),
  ERROR_CODE: i18n.t('Error_code'),
  UPDATED_PASSWORD: i18n.t('Updated_password'),
  NOT_UPDATED_PASSWORD: i18n.t('Not_updated_password'),
  PASSWORD_MIN: i18n.t('password_min'),
  PASSWORD_REQUIRED: i18n.t('password_required'),
  PASSWORDS_NOT_MATCH: i18n.t('Passwords_not_match'),
  UPDATE_PASSWORD: i18n.t('Update_password'),
  VALID_CODE: i18n.t('Valid_code'),
}

export const MAINTENANCES_LOCALE = {
  // MARK: - MAINTENANCES
  MAINTENANCES_TITLE: t('maintenances_title', {ns: 'maintenances'}),
  MAINTENANCES_FIELD_NAME: t('maintenances_column_name', {ns: 'maintenances'}),
  MAINTENANCES_EDIT: t('maintenances_edit', {ns: 'maintenances'}),
  MAINTENANCES_EDIT_MODAL: t('maintenances_edit_modal', {ns: 'maintenances'}),
  MAINTENANCES_ADD_MODAL: t('maintenances_add_modal', {ns: 'maintenances'}),
  MAINTENANCES_DELETE_MODAL: t('maintenances_delete_modal', {ns: 'maintenances'}),
  MAINTENANCES_CONFIRM_DELETE_MODAL: t('maintenances_delete_confirm_message', {ns: 'maintenances'}),
  MAINTENANCES_EDIT_MESSAGE: t('maintenances_edit_message', {ns: 'maintenances'}),
  MAINTENANCES_CREATE_MESSAGE: t('maintenances_cat_create_message', {ns: 'maintenances'}),
  MAINTENANCES_DELETE_MESSAGE: t('maintenances_cat_delete_message', {ns: 'maintenances'})
}

export const DAMAGES_LOCALE = {
  // MARK: - DAMAGES
  DAMAGES_TITLE: t('damages.title', {ns: 'maintenances'}),
  DAMAGES_COLUMN_DAMAGE_CAT: t('damages.column_damageCat', {ns: 'maintenances'}),
  DAMAGES_COLUMN_MAINTENANCE: t('damages.column_maintenance', {ns: 'maintenances'}),
  DAMAGES_COLUMN_DESCRIPTION: t('damages.column_description', {ns: 'maintenances'}),
  DAMAGES_COLUMN_NOTES: t('damages.column_notes', {ns: 'maintenances'}),
  DAMAGES_COLUMN_DATE: t('damages.column_date', {ns: 'maintenances'}),
  DAMAGES_COLUMN_ACTIONS: t('damages.column_actions', {ns: 'maintenances'}),
  DAMAGES_EDIT_MODAL: t('damages.edit_modal', {ns: 'maintenances'}),
  DAMAGES_ADD_MODAL: t('damages.add_modal', {ns: 'maintenances'}),
  DAMAGES_DELETE_MODAL: t('damages.delete_modal', {ns: 'maintenances'}),
  DAMAGES_CONFIRM_DELETE_MODAL: t('damages.delete_confirm_message', {ns: 'maintenances'}),
  DAMAGES_EDIT_MESSAGE: t('damages.edit_message', {ns: 'maintenances'}),
  DAMAGES_CREATE_MESSAGE: t('damages.cat_create_message', {ns: 'maintenances'}),
  DAMAGES_DELETE_MESSAGE: t('damages.cat_delete_message', {ns: 'maintenances'})
}

export const CATALOGS_LOCALE = {
  // MARK: - BRANCHES
  BRANCHES_TITLE: t('branches_title', {ns: 'catalogs'}),
  BRANCHES_FIELD_NAME: t('branches_column_name', {ns: 'catalogs'}),
  BRANCHES_EDIT_MODAL: t('branches_edit_modal', {ns: 'catalogs'}),
  BRANCHES_ADD_MODAL: t('branches_add_modal', {ns: 'catalogs'}),
  BRANCHES_DELETE_MODAL: t('branches_delete_modal', {ns: 'catalogs'}),
  BRANCHES_CONFIRM_DELETE_MODAL: t('branches_delete_confirm_message', {ns: 'catalogs'}),
  BRANCHES_EDIT_MESSAGE: t('branches_edit_message', {ns: 'catalogs'}),
  BRANCHES_CREATE_MESSAGE: t('branches_create_message', {ns: 'catalogs'}),
  BRANCHES_DELETE_MESSAGE: t('branches_delete_message', {ns: 'catalogs'}),

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

export const MAINTENANCES = {
  TABLE_PAGE_SIZE: 5,
  TABLE_PAGE_ROWS_OPTIONS: [7, 10, 25, 50],
  MAINTENANCES_FIELD_FLEX_SIZE: 12,
  MAINTENANCES_FIELD_NAME: 'name'
}
