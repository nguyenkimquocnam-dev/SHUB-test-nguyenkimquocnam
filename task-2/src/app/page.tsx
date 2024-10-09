'use client'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import React, { useState } from 'react'
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import styled from '@emotion/styled'
import { useForm } from 'react-hook-form'

const StyledInput = styled(TextField)({
  '& input[type="number"]': {
    '-moz-appearance': 'textfield'
  },
  '& input[type="number"]::-webkit-outer-spin-button, & input[type="number"]::-webkit-inner-spin-button':
    {
      display: 'none'
    }
})

interface IUpdateFormPayload {
  dateTime: Date
  quantity: number
  paller: string
  revenue: number
  unitPrice: number
}

export default function Home() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm()

  const onSubmit = (data: IUpdateFormPayload) => {
    if (data.dateTime) {
      // Format date
      const formatedDateTime = dayjs(data.dateTime).format(
        'DD/MM/YYYY HH:mm:ss'
      )
      const payload = { ...data, dateTime: formatedDateTime }
      console.log('🚀payload---->', payload)
    }
  }

  return (
    <main className='min-h-screen'>
      <Container
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box
          sx={{ padding: '40px 0', minWidth: '400px', maxWidth: '500px' }}
          component='form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: 2,
              paddingBottom: 2
            }}
          >
            <Box>
              <Button
                variant='text'
                sx={{ color: '#000', textTransform: 'capitalize' }}
                startIcon={<KeyboardBackspaceIcon />}
              >
                Đóng
              </Button>
              <Typography
                variant='h2'
                sx={{ fontSize: '2rem', fontWeight: 'bold' }}
              >
                Nhập giao dịch
              </Typography>
            </Box>
            <Box>
              <Button
                variant='contained'
                sx={{ borderRadius: 3, textTransform: 'none' }}
                type='submit'
              >
                Cập nhật
              </Button>
            </Box>
          </Box>
          <Box
            component='form'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}
          >
            <FormControl error={!!errors.dateTime}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label='Thời gian'
                  onChange={(newValue) =>
                    newValue && setValue('dateTime', newValue)
                  }
                  slots={{
                    textField: (textFieldProps) => (
                      <TextField
                        {...textFieldProps}
                        error={!!errors.dateTime}
                        {...register('dateTime', {
                          required: 'Ngày giờ không được để trống'
                        })}
                      />
                    )
                  }}
                />
              </LocalizationProvider>
              <FormHelperText>{errors?.dateTime?.message || ''}</FormHelperText>
            </FormControl>
            <FormControl error={!!errors.quantity}>
              <StyledInput
                label='Số lượng'
                type='number'
                {...register('quantity', {
                  required: 'Số lượng không được để trống'
                })}
              />
              <FormHelperText>{errors?.quantity?.message || ''}</FormHelperText>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id='paller-select-label'>Trụ</InputLabel>
              <Select
                labelId='paller-select-label'
                id='paller-select-label'
                label='Trụ'
                {...register('paller', {
                  required: 'Trụ không được để trống'
                })}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
              <FormHelperText sx={{ color: 'red' }}>
                {errors?.paller?.message || ''}
              </FormHelperText>
            </FormControl>
            <FormControl error={!!errors.revenue}>
              <StyledInput
                label='Doanh thu'
                type='number'
                {...register('revenue', {
                  required: 'Doanh thu không được để trống'
                })}
              />
              <FormHelperText>{errors?.revenue?.message || ''}</FormHelperText>
            </FormControl>

            <FormControl error={!!errors.unitPrice}>
              <StyledInput
                label='Đơn giá'
                type='number'
                {...register('unitPrice', {
                  required: 'Đơn giá không được để trống'
                })}
              />
              <FormHelperText>
                {errors?.unitPrice?.message || ''}
              </FormHelperText>
            </FormControl>
          </Box>
        </Box>
      </Container>
    </main>
  )
}
