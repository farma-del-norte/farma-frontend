import {Simple} from 'src/components/simple'

export default function Table({input, value}) {

  const id = value

  if (!id) return null
  return (
    <Simple
      table={input.table}
      modal={input.modal}
      tablekey={input?.fieldName}
      id={id}
    />
  )
}
