/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import InputFileUpload from '@/components/InputFileUpload'
import TimeInput from '@/components/TimeInput'
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Container,
  Typography
} from '@mui/material'
import dayjs from 'dayjs'
import * as React from 'react'
import * as XLSX from 'xlsx'
import isBetween from 'dayjs/plugin/isBetween'
import { formatCurrency } from '@/utils/helpers'

dayjs.extend(isBetween)

export default function Home() {
  const [data, setData] = React.useState<any[]>([])
  const [errorMessage, setErrorMessage] = React.useState<string>('')
  const [successMessage, setSuccessMessage] = React.useState<string>('')
  const [selectedStartTime, setSelectedStartTime] = React.useState(null)
  const [selectedEndTime, setSelectedEndTime] = React.useState(null)
  const [total, setTotal] = React.useState<number>(0)

  // Filter data
  const dataFiltered: any =
    data.length > 0 &&
    data.filter((_, index) => {
      return index > 4
    })

  const handleSelectedStartTime = (time: any) => {
    if (time) {
      setSelectedStartTime(time)
    }
  }

  const handleSelectedEndTime = (time: any) => {
    if (time) {
      setSelectedEndTime(time)
    }
  }

  const handleCalculateTotalPrice = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation()
    if (dataFiltered?.length > 0 && selectedEndTime && selectedEndTime) {
      const baseDate = '2024-03-21'
      const formattedStartTime = dayjs(
        `${baseDate} ${dayjs(selectedStartTime).format('HH:mm:ss')}`
      ).format()

      const formattedEndTime = dayjs(
        `${baseDate} ${dayjs(selectedEndTime).format('HH:mm:ss')}`
      ).format()

      const results = dataFiltered.filter((item: any) => {
        const itemTime = dayjs(`${baseDate} ${item?.__EMPTY_1}`)
        // Kiểm tra giá trị itemTime
        return itemTime.isBetween(formattedStartTime, formattedEndTime)
      })

      const totalPrice = results?.reduce((totalPrice: number, item: any) => {
        return totalPrice + item?.__EMPTY_6
      }, 0)

      setTotal(totalPrice)
    }
  }

  const handleUploadFileExcel = (file: any) => {
    if (!file) return
    if (file.name?.endsWith('.xlsx')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const binaryStr = e.target?.result

        const workbook = XLSX.read(binaryStr, { type: 'binary' })

        // // Lấy dữ liệu từ sheet đầu tiên
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]

        // Chuyển đổi dữ liệu thành dạng JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet)
        setData(jsonData)
        setSuccessMessage('File is uploaded successfully.')
      }
      reader.readAsBinaryString(file)
    } else {
      setErrorMessage('File is not in correct format.')
      setData([])
    }
  }

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!!errorMessage || !!successMessage) {
        setErrorMessage('')
        setSuccessMessage('')
      } else {
        return
      }
    }, 2000)

    return () => clearTimeout(timeoutId)
  }, [errorMessage, successMessage])

  return (
    <main style={{ minHeight: '100vh' }}>
      {errorMessage && (
        <Alert severity='error'>
          <AlertTitle>Error</AlertTitle>
          {errorMessage}
        </Alert>
      )}
      {successMessage && (
        <Alert severity='success'>
          <AlertTitle>Success</AlertTitle>
          {successMessage}
        </Alert>
      )}
      <Container>
        <Box sx={{ padding: '20px 0' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: 2
            }}
          >
            <InputFileUpload onFileChange={handleUploadFileExcel} />
          </Box>
          <Box></Box>
        </Box>

        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'stretch',
              justifyContent: 'center',
              gap: 2
            }}
          >
            <TimeInput
              onTimeChange={handleSelectedStartTime}
              selectedTime={selectedStartTime}
            />
            <TimeInput
              onTimeChange={handleSelectedEndTime}
              selectedTime={selectedEndTime}
            />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                marginTop: 2
              }}
            >
              <Button variant='contained' onClick={handleCalculateTotalPrice}>
                Calculate Total
              </Button>
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 2,
                  color: 'red'
                }}
                variant='h6'
                gutterBottom
              >
                Total: {formatCurrency(total)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </main>
  )
}
