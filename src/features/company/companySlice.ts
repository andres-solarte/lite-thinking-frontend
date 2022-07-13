import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Company } from '../../types';
import CompanyService from './../../services/CompanyService';

export type CompanyState = Omit<Company, "id" | "createdAt" | "updatedAt"> & {
  companies: Company[]
}

const initialState: CompanyState = {
    nit: '',
    name: '',
    address: '',
    phone: '',
    companies: []
};

export const createCompanyAsync = createAsyncThunk(
    'company/create',
    async (company: CompanyState) => {
      const companyService = new CompanyService()

      return await companyService.create(company)
    }
  );

export const listCompaniesAsync = createAsyncThunk(
    'companies/list',
    async () => {
      const companyService = new CompanyService()

      return await companyService.list()
    }
  );

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    create: (state, action: PayloadAction<CompanyState>) => {
      state = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listCompaniesAsync.fulfilled, (state, action) => {
        state.companies = action.payload
      })
  },
});

export const { create } = companySlice.actions;

export const companyState = (state: RootState) => state.company;

export default companySlice.reducer;
