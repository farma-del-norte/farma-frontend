import {Simple} from 'src/components/simple'

export default function Table({input, value}) {

  const id = value

  return (
    <Simple
      table={input.table}
      modal={input.modal}
      id={id}
    />
  )
}
