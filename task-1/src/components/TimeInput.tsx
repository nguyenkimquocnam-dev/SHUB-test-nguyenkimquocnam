import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'

interface Props {
  label?: string
  selectedTime: any
  onTimeChange: (time: any) => void
}

const TimeInput = ({ label = '', selectedTime, onTimeChange }: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label={label}
        value={selectedTime}
        onChange={(newValue) => onTimeChange(newValue)}
        renderInput={(params) => <TextField {...params} />}
        ampm={false}
      />
    </LocalizationProvider>
  )
}

export default TimeInput
