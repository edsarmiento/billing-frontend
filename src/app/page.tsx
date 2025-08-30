'use client';

import { useState, useEffect, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { InvoiceFilters, InvoiceResponse, Invoice } from '@/types/invoice';
import { invoiceApi, ApiError } from '@/services/api';
import SearchFilters from '@/components/SearchFilters';
import InvoiceTable from '@/components/InvoiceTable';
import InvoiceDetailModal from '@/components/InvoiceDetailModal';
import {
  DocumentTextIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

export default function Home() {
  const [invoices, setInvoices] = useState<InvoiceResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<InvoiceFilters>({
    per_page: 15,
  });
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadInvoices = useCallback(async (filters: InvoiceFilters = currentFilters) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await invoiceApi.getInvoices(filters);
      setInvoices(response);
    } catch (err) {
      const apiError = err as ApiError;
      const errorMessage = apiError.message || 'Error al cargar las facturas';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [currentFilters]);

  // Load invoices on component mount
  useEffect(() => {
    loadInvoices({ per_page: 15 });
  }, [loadInvoices]);

  const handleFiltersChange = (filters: InvoiceFilters) => {
    setCurrentFilters(filters);
    loadInvoices(filters);
  };

  const handlePageChange = (page: number) => {
    const newFilters = { ...currentFilters, page };
    setCurrentFilters(newFilters);
    loadInvoices(newFilters);
  };

  const handleViewInvoice = async (invoiceNumber: string) => {
    try {
      const invoice = await invoiceApi.getInvoice(invoiceNumber);
      setSelectedInvoice(invoice);
      setIsModalOpen(true);
    } catch (err) {
      const apiError = err as ApiError;
      const errorMessage = apiError.message || 'Error al cargar los detalles de la factura';
      toast.error(errorMessage);
    }
  };

  const handleExport = async () => {
    try {
      const blob = await invoiceApi.exportInvoices(currentFilters);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `facturas_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Exportación completada');
    } catch (err) {
      const apiError = err as ApiError;
      const errorMessage = apiError.message || 'Error al exportar las facturas';
      toast.error(errorMessage);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <DocumentTextIcon className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">
                Sistema de Facturación
              </h1>
            </div>
            <div className="text-sm text-gray-500">
              Backend API en puerto 3000
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Search Filters */}
          <SearchFilters
            onFiltersChange={handleFiltersChange}
            isLoading={isLoading}
          />

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />
                <p className="text-red-800">{error}</p>
              </div>
            </div>
          )}

          {/* Invoice Table */}
          <InvoiceTable
            data={invoices}
            isLoading={isLoading}
            onPageChange={handlePageChange}
            onExport={handleExport}
            onViewInvoice={handleViewInvoice}
          />
        </div>
      </main>

      {/* Invoice Detail Modal */}
      <InvoiceDetailModal
        invoice={selectedInvoice}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}
