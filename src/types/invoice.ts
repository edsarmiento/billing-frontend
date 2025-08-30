export interface Invoice {
  id: number;
  invoice_number: string;
  total: string;
  formatted_total: string;
  invoice_date: string;
  formatted_date: string;
  short_date: string;
  status: 'Vigente' | 'Pagada' | 'Vencida' | 'Cancelada' | 'Pendiente' | 'Cancelado';
  active: boolean;
  active_status_text: string;
  active_status_class: string;
  status_badge_class: string;
  status_icon: string;
  amount_category: string;
  amount_category_class: string;
  days_since_created: number;
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
  invoices: Invoice[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_count: number;
    per_page: number;
  };
  search_params: Record<string, string>;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
}
