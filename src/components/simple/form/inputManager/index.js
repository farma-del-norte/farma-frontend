import React from 'react'
import Text from 'src/components/simple/form/inputs/Text'
import SelectField from 'src/components/simple/form/inputs/SelectField'
import PasswordField from 'src/components/simple/form/inputs/PasswordField'
import EmailField from 'src/components/simple/form/inputs/EmailField'
import MultipleSelectField from 'src/components/simple/form/inputs/MultipleSelectField'
import PhoneField from 'src/components/simple/form/inputs/PhoneField'
import TextArea from 'src/components/simple/form/inputs/TextArea'
import Date from 'src/components/simple/form/inputs/Date'
import Table from 'src/components/simple/form/inputs/Table'
import CashField from 'src/components/simple/form/inputs/CashField'
import MultimediaUploader from 'src/components/simple/form/inputs/MultimediaUploader'

const inputs = {
  text: Text,
  textarea: TextArea,
  select: SelectField,
  multipleSelect: MultipleSelectField,
  password: PasswordField,
  email: EmailField,
  phone: PhoneField,
  date: Date,
  table: Table,
  cash: CashField,
  multimedia: MultimediaUploader
}

const InputManager = ({input, value, getValues, onChange, error}) => {
  const Input = inputs[input.type] || Text
  return <Input input={input} value={value} getValues={getValues} onChange={onChange} error={error} />
}

export default InputManager
