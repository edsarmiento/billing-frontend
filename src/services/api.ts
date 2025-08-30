import { Invoice, InvoiceFilters, InvoiceResponse } from '@/types/invoice';

const API_BASE_URL = 'http://localhost:3000/api/v1';

class ApiServiceError extends Error {
  constructor(
    message: string,
    public status?: number,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiServiceError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiServiceError(
      errorData.message || `HTTP error! status: ${response.status}`,
      response.status,
      errorData.errors
    );
  }
  return response.json();
}

export const invoiceApi = {
  // Get all invoices with optional filters
  async getInvoices(filters: InvoiceFilters = {}): Promise<InvoiceResponse> {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });

    const url = `${API_BASE_URL}/invoices${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    return handleResponse<InvoiceResponse>(response);
  },

  // Get a specific invoice by number
  async getInvoice(invoiceNumber: string): Promise<Invoice> {
    const response = await fetch(`${API_BASE_URL}/invoices/${invoiceNumber}`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    return handleResponse<Invoice>(response);
  },

  // Search invoices using the search endpoint
  async searchInvoices(filters: InvoiceFilters = {}): Promise<InvoiceResponse> {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });

    const url = `${API_BASE_URL}/invoices/search${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    return handleResponse<InvoiceResponse>(response);
  },

  // Export invoices to CSV
  async exportInvoices(filters: InvoiceFilters = {}): Promise<Blob> {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });

    const url = `${API_BASE_URL}/invoices/export${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await fetch(url, {
      headers: {
        'Accept': 'text/csv',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiServiceError(
        errorData.message || `HTTP error! status: ${response.status}`,
        response.status,
        errorData.errors
      );
    }

    return response.blob();
  },
};

export { ApiServiceError as ApiError };
