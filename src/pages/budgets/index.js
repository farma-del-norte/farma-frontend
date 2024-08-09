import {Simple} from 'src/components/simple'
import {BUDGETS_ENDPOINT, ZONES_ENDPOINT} from 'src/services/endpoints'
import {setValue} from 'src/store/form/reducer'
import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'

const data = [
  {
    headerName: 'Zona',
    field: 'zoneID',
    type: 'select',
    endpoint: `${ZONES_ENDPOINT}/zones`,
    options: [],
    value: '',
    isRequired: true,
    width: 6,
    flex: true,
    hideColumn: true
  },
  {
    headerName: 'Zona',
    field: 'zoneName',
    flex: true,
    hideInput: true
  },
  {
    headerName: 'Fecha de asignación',
    field: 'assignmentDate',
    type: 'date',
    valueGetter: params => new Date(params.row.assignmentDate),
    isRequired: true,
    width: 6,
    flex: true
  },
  {
    headerName: 'Presupuesto',
    field: 'budget',
    type: 'cash',
    value: '',
    isRequired: true,
    width: 6,
    flex: true
  },
  {
    headerName: 'Monto actual',
    field: 'currentAmount',
    disabled: true,
    type: 'cash',
    value: '',
    isRequired: true,
    width: 6,
    flex: true
  }
]
export default function Budgets() {
  const {form} = useSelector(state => state.form)
  const [dataForm, setDataForm] = useState(data)
  useEffect(() => {
    if (form.Crearpresupuesto?.budget) {
      setValue({
        form,
        fields: dataForm,
        setFields: setDataForm,
        inputFields: {currentAmount: 'value'},
        watch: {CrearPresupuesto: 'budget'},
        values: form.Crearpresupuesto.budget
      })
    }
  }, [form])
  return (
    <Simple
      table={{
        label: 'Presupuestos',
        endpoints: {
          baseUrl: `${BUDGETS_ENDPOINT}/budgets`
        },
        columns: data,
        showAddButton: true,
        actions: ['edit', 'delete']
      }}
      modal={{
        title: 'Crear presupuesto',
        form: dataForm,
        size: 'md',
        actions: {
          back: 'Regresar',
          save: 'Guardar'
        }
      }}
    />
  )
}
