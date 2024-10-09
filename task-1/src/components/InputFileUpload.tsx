/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import * as React from 'react'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

interface Props {
  onFileChange?: (file: any) => void
}

const InputFileUpload = ({ onFileChange }: Props) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFileChange?.(e.target.files[0])
    }
  }

  return (
    <Button
      component='label'
      role={undefined}
      variant='contained'
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload files
      <VisuallyHiddenInput
        type='file'
        onChange={handleFileChange}
        multiple={false}
      />
    </Button>
  )
}

export default InputFileUpload
