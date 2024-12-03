import CPMexico from './data/CPMexico.json'

export const getColonies = zipCode => {
  return CPMexico.filter(neighborhood => neighborhood.zipCode === String(zipCode)).map(neighborhood => neighborhood)
}
export const onZipCodeChange = zipCode => {
  return getColonies(zipCode) ?? []
}

export const customDateFormat = (date, format='DD/MM/YYYY') => {
   const fecha = new Date(date);
    
   // Extraer el día, mes y año y añadir ceros si es necesario
   const dia = String(fecha.getDate()).padStart(2, '0');
   const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
   const anio = fecha.getFullYear();
   
   // Formatear a DD/MM/Año
   switch (format) {
      case 'DD/MM/YYYY':
         return `${dia}/${mes}/${anio}`;
      case 'YYYY/MM/DD':
         return `${anio}/${mes}/${dia}`;
      default:
         return `${dia}/${mes}/${anio}`;
   }
}

export const orderListByRowField = (options, input) => {
  const getFieldValue = (item) => {
    if (Array.isArray(input.fieldName)) {
     // Concatenar los valores de cada campo especificado en fieldName
     return input.fieldName.map(field => item[field]).join(' ');
    } else {
      // Si fieldName es un string, obtener el valor directamente
      return item[input?.fieldName ?? 'name'];
    }
  };
  // ordena las options por su fieldname
  const sorted = [...options].sort((a, b) => {
    const aValue = getFieldValue(a).toLowerCase();;
    const bValue = getFieldValue(b).toLowerCase();;
   
     if (aValue < bValue) return -1;
     if (aValue > bValue) return 1;
     return 0;
  });
  return sorted
}
