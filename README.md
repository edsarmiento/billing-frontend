# Sistema de Facturación - Frontend

Una aplicación web moderna para consulta y gestión de facturas, desarrollada con Next.js 15, TypeScript y Tailwind CSS.

## 🚀 Características

### Funcionalidades Principales
- **Consulta de Facturas**: Visualización de todas las facturas con paginación
- **Filtros Avanzados**: Búsqueda por múltiples criterios:
  - Número de factura
  - Estado (Vigente, Pagada, Vencida, Cancelada)
  - Rango de fechas
  - Rango de montos
  - Estado activo/inactivo
- **Exportación CSV**: Descarga de facturas filtradas en formato CSV
- **Vista Detallada**: Modal con información completa de cada factura
- **Ordenamiento**: Ordenamiento por columnas en la tabla
- **Paginación**: Navegación entre páginas de resultados

### Tecnologías Utilizadas
- **Next.js 15** - Framework de React con App Router
- **TypeScript** - Tipado estático para mayor robustez
- **Tailwind CSS** - Framework de CSS utilitario
- **Headless UI** - Componentes de interfaz accesibles
- **Heroicons** - Iconografía moderna
- **React Hook Form** - Manejo de formularios
- **React Hot Toast** - Notificaciones elegantes
- **Date-fns** - Manipulación de fechas

## 📋 Requisitos

- Node.js 18+ 
- npm o yarn
- Backend API corriendo en `http://localhost:3000`

## 🛠️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd billing-frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3001
   ```

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## 📡 API Endpoints Utilizados

La aplicación consume los siguientes endpoints del backend:

### Consulta de Facturas
- `GET /api/v1/invoices` - Obtener todas las facturas
- `GET /api/v1/invoices/{number}` - Obtener factura específica
- `GET /api/v1/invoices/search` - Búsqueda avanzada
- `GET /api/v1/invoices/export` - Exportar a CSV

### Parámetros de Filtrado
- `page` - Número de página
- `per_page` - Elementos por página
- `status` - Estado de la factura
- `date_from` / `date_to` - Rango de fechas
- `min_amount` / `max_amount` - Rango de montos
- `invoice_number` - Número de factura
- `active` - Estado activo

## 🎨 Estructura del Proyecto

```
src/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página principal
│   └── globals.css         # Estilos globales
├── components/
│   ├── SearchFilters.tsx   # Componente de filtros
│   ├── InvoiceTable.tsx    # Tabla de facturas
│   ├── InvoiceDetailModal.tsx # Modal de detalles
│   └── StatusBadge.tsx     # Badge de estado
├── services/
│   └── api.ts              # Servicios de API
├── types/
│   └── invoice.ts          # Tipos TypeScript
└── utils/
    └── formatters.ts       # Utilidades de formato
```

## 🔍 Funcionalidades Detalladas

### Filtros de Búsqueda
- **Básicos**: Número de factura, estado, estado activo
- **Avanzados**: Rango de fechas, rango de montos, elementos por página
- **Persistencia**: Los filtros se mantienen durante la sesión

### Tabla de Facturas
- **Columnas**: Número, Estado, Monto, Fechas, Acciones
- **Ordenamiento**: Click en encabezados para ordenar
- **Paginación**: Navegación entre páginas
- **Responsive**: Adaptable a diferentes tamaños de pantalla

### Exportación
- **Formato CSV**: Descarga directa del navegador
- **Filtros aplicados**: Solo exporta los resultados filtrados
- **Nombrado automático**: Incluye fecha en el nombre del archivo

### Vista Detallada
- **Modal responsive**: Información completa de la factura
- **Datos organizados**: Secciones claras para diferentes tipos de información
- **Accesibilidad**: Navegación por teclado y lectores de pantalla

## 🎯 Casos de Uso

1. **Consulta General**: Ver todas las facturas con paginación
2. **Búsqueda Específica**: Filtrar por número de factura
3. **Análisis por Estado**: Filtrar facturas por estado (vigentes, pagadas, etc.)
4. **Análisis Temporal**: Filtrar por rango de fechas
5. **Análisis Financiero**: Filtrar por rango de montos
6. **Exportación**: Descargar datos para análisis externo
7. **Revisión Detallada**: Ver información completa de una factura

## 🔒 Consideraciones de Seguridad

- Validación de entrada en el frontend
- Manejo de errores de API
- Sanitización de datos antes de mostrar
- Headers de seguridad apropiados

## 🚀 Despliegue

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm run build
npm run start
```

### Variables de Entorno
- `NEXT_PUBLIC_API_URL` - URL del backend API (opcional, por defecto `http://localhost:3000`)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o preguntas sobre la implementación, contacta al equipo de desarrollo.
