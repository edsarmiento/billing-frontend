export interface Invoice {
  id: number;
  invoice_number: string;
  status: 'Vigente' | 'Pagada' | 'Vencida' | 'Cancelada';
  amount: number;
  currency: string;
  issue_date: string;
  due_date: string;
  active: boolean;
  customer_name?: string;
  customer_email?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface InvoiceFilters {
  page?: number;
  per_page?: number;
  status?: string;
  date_from?: string;
  date_to?: string;
  min_amount?: number;
  max_amount?: number;
  invoice_number?: string;
  active?: boolean;
}

export interface InvoiceResponse {
  data: Invoice[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
}
