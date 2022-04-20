import {
  ConfirmationNumberOutlined,
  InsertPageBreakOutlined,
  RouteTwoTone,
} from '@mui/icons-material';
import { Chip, Grid } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React from 'react';
import useSWR from 'swr';
import { AdminLayout } from '../../../components/layouts';
import { IOrder, IUser } from '../../../interfaces';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 250 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'name', headerName: 'Nombre', width: 300 },
  { field: 'total', headerName: 'Total', width: 200 },
  {
    field: 'isPaid',
    headerName: 'Pagada',
    width: 150,
    renderCell: ({ row }: GridValueGetterParams) => {
      return row.isPaid ? (
        <Chip variant="outlined" label="Pagada" color="success" />
      ) : (
        <Chip variant="outlined" label="Pendiente" color="error" />
      );
    },
  },
  {
    field: 'numProducts',
    headerName: 'No.Productos',
    align: 'center',
    width: 120,
  },
  {
    field: 'check',
    headerName: 'Ver Orden',
    renderCell: ({ row }: GridValueGetterParams) => {
      return (
        <a href={`/admin/orders/${row.id}`} target="_blank" rel="noreferrer">
          Ver Orden
        </a>
      );
    },
  },
  { field: 'createdAt', headerName: 'Creada en ', width: 250 },
];

const OrdersPage = () => {
  const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

  // esta cargando
  if (!data && !error) return <></>;

  const rows = data!.map((order) => ({
    id: order._id,
    email: (order.user as IUser).email,
    name: (order.user as IUser).name,
    total: order.total,
    isPaid: order.isPaid,
    numProducts: order.numberOfItems,
    createdAt: order.createdAt,
  }));

  return (
    <AdminLayout
      title={'Ordenes'}
      subtitle={'Mantenimiento de ordenes'}
      icon={<ConfirmationNumberOutlined />}
    >
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            columns={columns}
            rows={rows}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default OrdersPage;
