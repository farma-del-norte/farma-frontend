import { Simple } from "src/components/simple"

export default function pruebaSimple() {
  return (
    <Simple
      table={
        {
          label: 'Prueba',
          showAddButton: true,
          columns: [],
          rows: [],
          actions: ['edit', 'delete']
        }
      }
      modal={
        {
          title: 'modal de prueba',
          size: 'md',
          form: [
            {
              label: 'Zona',
              name: 'name',
              type: 'text',
              value: '',
              isRequired: true,
              width: 12,
            },
          ],
          actions: ["Regresar", "Guardar"]
        }
      }
    />
  )
}
