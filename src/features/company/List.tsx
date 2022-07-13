import {useEffect, useState} from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { companyState, listCompaniesAsync } from './companySlice';
import { Company } from '../../types';
import Stack from '@mui/material/Stack/Stack';
import Button from '@mui/material/Button/Button';
import { useNavigate } from 'react-router-dom';

const columns: GridColDef[] = [
  { field: 'nit', headerName: 'NIT', width: 130 },
  { field: 'name', headerName: 'Nombre', width: 130 },
  { field: 'address', headerName: 'Dirección', width: 130 },
  { field: 'phone', headerName: 'Teléfono', type: 'number', width: 130 },
];

export const List = () => {
    const dispatch = useAppDispatch();
    const state = useAppSelector(companyState);
    const [companies, setCompanies] = useState<Company[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(listCompaniesAsync())
    }, [])

    useEffect(() => {
        setCompanies(state.companies)
    }, [state.companies])

  return (
    <div style={{ height: 400, width: '100%' }}>
        <DataGrid
            rows={companies}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection={false}
        />

        <Stack spacing={2}>
            <Button variant="contained" onClick={() => navigate('/create')}>Crear</Button>
        </Stack>
    </div>
  );
}
