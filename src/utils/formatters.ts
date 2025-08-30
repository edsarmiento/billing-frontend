import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'dd/MM/yyyy', { locale: es });
  } catch {
    return dateString;
  }
};

export const formatDateAsYYYYMMDD = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'yyyy-MM-dd');
  } catch {
    return dateString;
  }
};

export const formatDateTime = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'dd/MM/yyyy HH:mm', { locale: es });
  } catch {
    return dateString;
  }
};

export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Vigente':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Pagada':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Vencida':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'Cancelada':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const getStatusIcon = (status: string): string => {
  switch (status) {
    case 'Vigente':
      return 'clock';
    case 'Pagada':
      return 'check-circle';
    case 'Vencida':
      return 'exclamation-triangle';
    case 'Cancelada':
      return 'x-circle';
    default:
      return 'question-mark-circle';
  }
};
