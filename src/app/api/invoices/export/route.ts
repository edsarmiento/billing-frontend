import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:3000/api/v1';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    
    console.log('Export request with params:', Object.fromEntries(searchParams.entries()));
    
    const backendUrl = `${BACKEND_URL}/invoices/export${queryString ? `?${queryString}` : ''}`;
    
    console.log('Proxying export request to:', backendUrl);
    
    const response = await fetch(backendUrl, {
      headers: {
        'Accept': 'text/csv',
      },
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const csvData = await response.text();
    
    return new NextResponse(csvData, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="facturas.csv"',
      },
    });
  } catch (error) {
    console.error('Export proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to export invoices', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
