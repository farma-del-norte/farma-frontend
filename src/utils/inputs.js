import {Typography, Grid, FormControl, TextField, Box, Select, MenuItem, InputLabel} from '@mui/material'
import {Fragment, useEffect, useState} from 'react'
import RefreshIcon from '@mui/icons-material/Refresh';

export const LoadingSelect = ({
    label,
    disabled,
    content,
    onChange,
    value,
    loading,
    setLoading,
    loadingLabel
}) => {

    const [nameValue, setNameValue] = useState('')

    const handleOnChange = (event, name) => {
        setNameValue(name.props.children)
        onChange(event.target.value)
    }

    useEffect(() => {
        if(loading && content.length > 0){
            setNameValue('')
            setLoading(false)
        }else if(!loading && value?.length > 0 && content.length > 1){
          setNameValue(content.filter((val) => val.id === value)[0]?.name || [])
        }
    }, [content])

    return (
        <>
            <InputLabel>{label}</InputLabel>
            <Select
                defaultValue=""
                value={value}
                label={label}
                onChange={handleOnChange}
                disabled={disabled}
                displayEmpty
                renderValue={() => {
                  if(loading){
                    return (
                      <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                        <RefreshIcon color="secondary"/>
                        {loadingLabel}
                      </Box>
                    )
                  }else 
                    return (
                      <Box sx={{ display: "flex", gap: 1 }}>
                        {nameValue}
                      </Box>
                  )
                }}
            >
                {content?.map((row, i) => 
                    <MenuItem disabled={row.disabled ? true : false} key={i} value={row.id}>{row.name}</MenuItem>
                )}
            </Select>
        </>
    )
}