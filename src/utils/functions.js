import CPMexico from "./data/CPMexico.json"

export const getColonies = (zipCode) => {
    return CPMexico.filter((colony) => colony.zipCode === zipCode)[0]
}

export const onZipCodeChange = (e, onChange, setColonies) => {
    const newValue = e.target.value
    onChange(newValue)
    if(newValue.length >= 4 && newValue.length <= 5){
      setColonies(getColonies(newValue) ?? {})
    }else{
        setColonies({})
    }
  }