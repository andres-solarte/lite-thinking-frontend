import { API } from 'aws-amplify'
import { Company } from '../types';

type CreateCompanyArgs = Pick<Company, "name" | "nit" | "address" | "phone">

export default class CompanyService {
    async create(args: CreateCompanyArgs): Promise<Company> {
        const {name, nit, address, phone} = args

        return API.post('CompanyAPI', 'company', {
            body: {name, nit, address, phone}
          })
    }

    async list(): Promise<Company[]> {
        const {companies} = await API.get('CompanyAPI', 'companies', {})

        return companies
    }
}
