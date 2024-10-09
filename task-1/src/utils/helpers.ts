export const formatCurrency = (value: number, type: string = 'vi-VN') => {
  if (!value) return

  const formattedValue = new Intl.NumberFormat(type, {
    style: 'currency',
    currency: 'VND'
  }).format(value)

  return formattedValue
}
