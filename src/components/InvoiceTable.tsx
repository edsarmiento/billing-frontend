'use client';

import { useState } from 'react';
import { Invoice, InvoiceResponse } from '@/types/invoice';
import { formatDate, formatCurrency } from '@/utils/formatters';
import StatusBadge from './StatusBadge';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowDownTrayIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';

interface InvoiceTableProps {
  data: InvoiceResponse | null;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onExport: () => void;
  onViewInvoice: (invoiceNumber: string) => void;
}

export default function InvoiceTable({
  data,
  isLoading,
  onPageChange,
  onExport,
  onViewInvoice,
}: InvoiceTableProps) {
  console.log('InvoiceTable - Component rendered with props:', { data, isLoading });
  const [sortField, setSortField] = useState<keyof Invoice>('invoice_date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: keyof Invoice) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedInvoices = data?.invoices ? [...data.invoices].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  }) : [];

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  console.log('InvoiceTable - data received:', data);
  console.log('InvoiceTable - data.invoices:', data?.invoices);
  console.log('InvoiceTable - data.invoices?.length:', data?.invoices?.length);
  
  if (!data || data.invoices.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <div className="text-gray-500">
          <p className="text-lg font-medium mb-2">No se encontraron facturas</p>
          <p className="text-sm">Intenta ajustar los filtros de búsqueda</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            Facturas ({data.pagination.total_count})
          </h3>
          <p className="text-sm font-medium text-gray-600">
            Mostrando {((data.pagination.current_page - 1) * data.pagination.per_page) + 1}-{Math.min(data.pagination.current_page * data.pagination.per_page, data.pagination.total_count)} de {data.pagination.total_count} resultados
          </p>
        </div>
        <button
          onClick={onExport}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          <ArrowDownTrayIcon className="w-4 h-4" />
          Exportar CSV
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                onClick={() => handleSort('invoice_number')}
                className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                Número
              </th>
              <th
                onClick={() => handleSort('status')}
                className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                Estado
              </th>
              <th
                onClick={() => handleSort('total')}
                className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                Monto
              </th>
              <th
                onClick={() => handleSort('invoice_date')}
                className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                Fecha Emisión
              </th>
              <th
                onClick={() => handleSort('active')}
                className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                Activa
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedInvoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-gray-800">
                    {invoice.invoice_number}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={invoice.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-green-700">
                    {invoice.formatted_total}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-gray-800">
                    {invoice.short_date}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    invoice.active 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {invoice.active ? 'Sí' : 'No'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onViewInvoice(invoice.invoice_number)}
                    className="text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1"
                  >
                    <EyeIcon className="w-4 h-4" />
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data.pagination.total_pages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-800">
              Página {data.pagination.current_page} de {data.pagination.total_pages}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(data.pagination.current_page - 1)}
              disabled={data.pagination.current_page === 1}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeftIcon className="w-4 h-4" />
              Anterior
            </button>
            
            <button
              onClick={() => onPageChange(data.pagination.current_page + 1)}
              disabled={data.pagination.current_page === data.pagination.total_pages}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
