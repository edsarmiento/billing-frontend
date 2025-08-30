'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Invoice } from '@/types/invoice';
import { formatDate, formatCurrency, formatDateTime } from '@/utils/formatters';
import StatusBadge from './StatusBadge';

interface InvoiceDetailModalProps {
  invoice: Invoice | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function InvoiceDetailModal({
  invoice,
  isOpen,
  onClose,
}: InvoiceDetailModalProps) {
  if (!invoice) return null;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    <span className="sr-only">Cerrar</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900 mb-4">
                      Detalles de la Factura
                    </Dialog.Title>

                    <div className="space-y-6">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-2xl font-bold text-gray-900">
                            {invoice.invoice_number}
                          </h4>
                          {invoice.customer_name && (
                            <p className="text-gray-600 mt-1">{invoice.customer_name}</p>
                          )}
                        </div>
                        <StatusBadge status={invoice.status} />
                      </div>

                      {/* Amount */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Monto Total</p>
                          <p className="text-3xl font-bold text-gray-900">
                            {formatCurrency(invoice.amount, invoice.currency)}
                          </p>
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="text-sm font-medium text-gray-900 mb-3">Información de Fechas</h5>
                          <dl className="space-y-2">
                            <div>
                              <dt className="text-sm text-gray-500">Fecha de Emisión</dt>
                              <dd className="text-sm font-medium text-gray-900">
                                {formatDate(invoice.issue_date)}
                              </dd>
                            </div>
                            <div>
                              <dt className="text-sm text-gray-500">Fecha de Vencimiento</dt>
                              <dd className="text-sm font-medium text-gray-900">
                                {formatDate(invoice.due_date)}
                              </dd>
                            </div>
                          </dl>
                        </div>

                        <div>
                          <h5 className="text-sm font-medium text-gray-900 mb-3">Información del Cliente</h5>
                          <dl className="space-y-2">
                            {invoice.customer_email && (
                              <div>
                                <dt className="text-sm text-gray-500">Email</dt>
                                <dd className="text-sm font-medium text-gray-900">
                                  {invoice.customer_email}
                                </dd>
                              </div>
                            )}
                            <div>
                              <dt className="text-sm text-gray-500">Estado</dt>
                              <dd className="text-sm font-medium text-gray-900">
                                {invoice.active ? 'Activa' : 'Inactiva'}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>

                      {/* Description */}
                      {invoice.description && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-900 mb-2">Descripción</h5>
                          <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                            {invoice.description}
                          </p>
                        </div>
                      )}

                      {/* Timestamps */}
                      <div className="border-t border-gray-200 pt-4">
                        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <dt className="text-gray-500">Creado</dt>
                            <dd className="text-gray-900">{formatDateTime(invoice.created_at)}</dd>
                          </div>
                          <div>
                            <dt className="text-gray-500">Actualizado</dt>
                            <dd className="text-gray-900">{formatDateTime(invoice.updated_at)}</dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                    onClick={onClose}
                  >
                    Cerrar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
