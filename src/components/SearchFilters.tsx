'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { InvoiceFilters } from '@/types/invoice';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface SearchFiltersProps {
  onFiltersChange: (filters: InvoiceFilters) => void;
  isLoading?: boolean;
}

export default function SearchFilters({ onFiltersChange, isLoading }: SearchFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const { register, handleSubmit, reset, watch } = useForm<InvoiceFilters>({
    defaultValues: {
      per_page: 15,
    },
  });

  const onSubmit = (data: InvoiceFilters) => {
    // Remove empty values and convert types
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => 
        value !== undefined && value !== null && value !== '' && !isNaN(Number(value))
      ).map(([key, value]) => {
        // Convert active filter from string to boolean
        if (key === 'active' && typeof value === 'string') {
          return [key, value === 'true'];
        }
        // Ensure numeric values are properly converted
        if ((key === 'min_amount' || key === 'max_amount') && typeof value === 'number') {
          return [key, value];
        }
        return [key, value];
      })
    ) as InvoiceFilters;
    
    onFiltersChange(cleanData);
  };

  const handleReset = () => {
    reset();
    onFiltersChange({ per_page: 15 });
  };

  const hasActiveFilters = Object.values(watch()).some(value => 
    value !== undefined && value !== null && value !== '' && value !== 15
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <FunnelIcon className="w-6 h-6" />
          Filtros de Búsqueda
        </h2>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm font-semibold text-blue-600 hover:text-blue-800"
        >
          {isExpanded ? 'Ocultar' : 'Mostrar'} filtros avanzados
        </button>
      </div>

      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="space-y-4"
      >
        {/* Basic Search */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Número de Factura
            </label>
            <input
              type="text"
              {...register('invoice_number')}
              className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium"
              placeholder="Ej: C30481"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Estado
            </label>
            <select
              {...register('status')}
              className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium"
            >
              <option value="">Todos los estados</option>
              <option value="Vigente">Vigente</option>
              <option value="Pagado">Pagado</option>
              <option value="Vencido">Vencido</option>
              <option value="Cancelado">Cancelado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Vigent545">Vigent545</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Activa
            </label>
            <select
              {...register('active')}
              className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium"
            >
              <option value="">Todas</option>
              <option value="true">Solo activas</option>
              <option value="false">Solo inactivas</option>
            </select>
          </div>
        </div>

        {/* Advanced Filters */}
        {isExpanded && (
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-md">
              <p className="font-medium mb-1">💡 Consejo:</p>
              <p>Después de configurar los filtros de fecha, haz clic en "Buscar" para aplicar los filtros.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Fecha Desde
                </label>
                <input
                  type="date"
                  {...register('date_from')}
                  className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium"
                  title="Selecciona la fecha de inicio del rango a filtrar"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Fecha Hasta
                </label>
                <input
                  type="date"
                  {...register('date_to')}
                  className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Monto Mínimo
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register('min_amount', { 
                    valueAsNumber: true,
                    setValueAs: (value) => value === '' ? undefined : Number(value)
                  })}
                  className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Monto Máximo
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register('max_amount', { 
                    valueAsNumber: true,
                    setValueAs: (value) => value === '' ? undefined : Number(value)
                  })}
                  className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Elementos por página
                </label>
                <select
                  {...register('per_page', { 
                    valueAsNumber: true,
                    setValueAs: (value) => value === '' ? undefined : Number(value)
                  })}
                  className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              <MagnifyingGlassIcon className="w-4 h-4" />
              {isLoading ? 'Buscando...' : 'Buscar'}
            </button>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 font-semibold"
              >
                <XMarkIcon className="w-4 h-4" />
                Limpiar
              </button>
            )}
          </div>

          {hasActiveFilters && (
            <div className="text-sm font-semibold text-blue-600">
              Filtros activos
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
