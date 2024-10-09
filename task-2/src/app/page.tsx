'use client'
import styled from '@emotion/styled'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import LoadingButton from '@mui/lab/LoadingButton'
import CheckIcon from '@mui/icons-material/Check'
import {
  Alert,
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
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const StyledInput = styled(TextField)({
  '& input[type="number"]': {
    MozAppearance: 'textfield' // Sử dụng camelCase
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

const PALLER_OPTIONS = [
  {
    value: '1',
    label: '1'
  },
  {
    value: '2',
    label: '2'
  },
  {
    value: '3',
    label: '3'
  }
]

export default function Home() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<IUpdateFormPayload>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const onSubmit = (data: IUpdateFormPayload) => {
    if (data.dateTime) {
      // Format date
      const formatedDateTime = dayjs(data.dateTime).format(
        'DD/MM/YYYY HH:mm:ss'
      )
      const payload = { ...data, dateTime: formatedDateTime }

      // Call Api
      setIsLoading(true)
      try {
        console.log('🚀payload---->', payload)
        setMessage('You are updated successfully')
      } catch (error: any) {
        console.log('🚀error---->', error)
      } finally {
        setTimeout(() => {
          setIsLoading(false)
        }, 2000)
      }
    }
  }

  return (
    <main className='min-h-screen'>
      {message && (
        <Alert icon={<CheckIcon fontSize='inherit' />} severity='success'>
          {message}
        </Alert>
      )}
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
              <LoadingButton
                variant='contained'
                sx={{ borderRadius: 3, textTransform: 'none' }}
                type='submit'
                loading={isLoading}
              >
                Cập nhật
              </LoadingButton>
            </Box>
          </Box>
          <Box
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
                    newValue && setValue('dateTime', newValue as any)
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
              <FormHelperText>
                {errors.dateTime?.message || null}
              </FormHelperText>
            </FormControl>

            <FormControl error={!!errors.quantity}>
              <StyledInput
                label='Số lượng'
                type='number'
                {...register('quantity', {
                  required: 'Số lượng không được để trống'
                })}
                InputProps={{
                  inputProps: {
                    step: '0.01',
                    min: '0'
                  }
                }}
              />
              <FormHelperText>{errors.quantity?.message}</FormHelperText>
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
                defaultValue={''}
              >
                <MenuItem value=''>
                  <em>Chọn trụ</em>
                </MenuItem>
                {PALLER_OPTIONS.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText sx={{ color: 'red' }}>
                {errors.paller?.message}
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
              <FormHelperText>{errors.revenue?.message}</FormHelperText>
            </FormControl>

            <FormControl error={!!errors.unitPrice}>
              <StyledInput
                label='Đơn giá'
                type='number'
                {...register('unitPrice', {
                  required: 'Đơn giá không được để trống'
                })}
              />
              <FormHelperText>{errors.unitPrice?.message}</FormHelperText>
            </FormControl>
          </Box>
        </Box>
      </Container>
    </main>
  )
}
