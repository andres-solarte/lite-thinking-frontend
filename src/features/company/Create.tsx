import { Divider } from '@mui/material';
import Button from '@mui/material/Button/Button';
import Container from '@mui/material/Container/Container';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText/FormHelperText';
import Input from '@mui/material/Input/Input';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import Stack from '@mui/material/Stack/Stack';
import Typography from '@mui/material/Typography/Typography';
import { FC, ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { createCompanyAsync } from './companySlice';

export const Create = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const [error, setError] = useState({
        name: false,
        address: false,
        nit: false,
        phone: false
    })

    const [form, setForm] = useState({
        name: '',
        address: '',
        nit: '',
        phone: ''
    })

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prevState => ({
          ...prevState,
          [event.target.name]: event.target.value,
        }))
      }

    const cancel = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        navigate('/')
    }

    const validateForm = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()

        if(!form.name) {
            setError(prevState => ({
                ...prevState,
                name: true
            }))
        }

        if(!form.address) {
            setError(prevState => ({
                ...prevState,
                address: true
            }))
        }

        if(!form.nit) {
            setError(prevState => ({
                ...prevState,
                nit: true
            }))
        }

        if(!form.phone) {
            setError(prevState => ({
                ...prevState,
                phone: true
            }))
        }

        if(error.name || error.address || error.nit || error.phone)
            return

        dispatch(createCompanyAsync({...form, companies: []}))
            .then(() => navigate('/'))
    }

    return (
        <>
            <br />

            <Container maxWidth="sm">
                <Typography variant="h3" component="h3">
                    Crear empresa
                </Typography>

                <Divider></Divider>
                <br />
                <br />

                <Stack spacing={2}>
                    <InputText
                        label='Nombre de la empresa'
                        name='name'
                        type='text'
                        hasErrors={error.name}
                        value={form.name}
                        onChange={handleFormChange}
                    />
                    <InputText
                        label='Dirección'
                        name='address'
                        type='text'
                        hasErrors={error.address}
                        value={form.address}
                        onChange={handleFormChange}
                    />
                    <InputText
                        label='NIT'
                        name='nit'
                        type='number'
                        hasErrors={error.nit}
                        value={form.nit}
                        onChange={handleFormChange}
                    />
                    <InputText
                        label='Teléfono'
                        name='phone'
                        type='number'
                        hasErrors={error.phone}
                        value={form.phone}
                        onChange={handleFormChange}
                    />
                </Stack>

                <br />

                <Stack spacing={2} direction="row-reverse">
                    <Button variant="outlined" onClick={cancel}>Cancelar</Button>
                    <Button variant="contained" onClick={validateForm}>Guardar</Button>
                </Stack>
            </Container>
        </>
    )
}

type InputTextArgs = {
    label: string
    name: string
    type: 'text' | 'number'
    value: string
    hasErrors?: boolean
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputText: FC<InputTextArgs> = ({label, name, type, value, hasErrors, onChange}: InputTextArgs): ReactElement => {

    return (
        <FormControl fullWidth>
            <InputLabel>{ label }</InputLabel>
            <Input
                type={type}
                required
                error={hasErrors}
                name={name}
                value={value}
                onChange={onChange}/>
            { hasErrors ? <FormHelperText id="my-helper-text">{`El campo ${label} es requerido`}.</FormHelperText> : ''}
        </FormControl>
    )
}
