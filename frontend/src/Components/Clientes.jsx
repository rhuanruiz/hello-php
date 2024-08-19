import React, { 
    useState, 
    useEffect 
  } from 'react';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Box, 
    Button, 
    Paper,
    Alert,
    Link,
    Typography
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import axios from 'axios';
import CriarCliente from './CriarCliente';
  
  
export default function Clientes() {

    const [clientes, setClientes] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/clientes`);
                setClientes(response.data);
            } catch (error) {
                console.error('Ocorreu um erro, tente novamente.\nErro:', error);
            }
        };
        fetchClientes();
    }, []);

    const idade = (data_nascimento) => {
        const atual = new Date();
        const nascimento = new Date(data_nascimento);
        let idade = atual.getFullYear() - nascimento.getFullYear();
        const mes = atual.getMonth() - nascimento.getMonth();
        if (mes < 0 || (mes === 0 && atual.getDate() < nascimento.getDate())) {
            idade--;
        }
        return idade;
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };
    
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleDelete = async (cliente) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/clientes/excluir/${cliente.id}`);
            window.location.reload(true);
        } catch (error) {
            setFeedback({
                type: 'error',
                message: 'Ocorreu um erro, tente novamente.'
            });
            console.error('Ocorreu um erro, tente novamente.\nErro:', error);
        }
    };

    return (
        <Box>
            <Button style={{marginBottom:"0.1rem", backgroundColor:"green"}} variant="contained" startIcon={<AddCircleIcon />} onClick={handleOpenModal}>Cadastrar Cliente</Button>
            <CriarCliente open={openModal} onClose={handleCloseModal} />
            <Box sx={{ height: '25rem', overflowY: 'auto', justifyContent: 'center', alignItems: 'center' }}>
                <TableContainer component={ Paper }>
                    <Table sx={{ minWidth: 650, textAlign: 'center'}} aria-label="clientes">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Nome</TableCell>
                                <TableCell align="center">Telefone</TableCell>
                                <TableCell align="center">Idade</TableCell>
                                <TableCell align="center">CPF</TableCell>
                                <TableCell align="center">Email</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {clientes.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        Ainda não há clientes cadastradas.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                clientes.map((cliente) => (
                                    <TableRow key={ cliente.id }>
                                        <TableCell component="th" scope="row">{ cliente.nome }</TableCell>
                                        <TableCell>{cliente.telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3')}</TableCell>
                                        <TableCell>{idade(cliente.data_nascimento)}</TableCell>
                                        <TableCell>{cliente.cpf ? cliente.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : 'Não informado'}</TableCell>
                                        <TableCell>
                                            {cliente.email ? (
                                                <Link 
                                                    href={`mailto:${cliente.email}`} 
                                                    color="inherit" 
                                                    underline="hover" 
                                                    sx={{
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(0, 255, 0, 0.1)',
                                                        },
                                                        '&:focus': {
                                                            backgroundColor: 'rgba(0, 255, 0, 0.2)',
                                                        },
                                                    }}
                                                >
                                                    {cliente.email}
                                                </Link>
                                            ) : 'Não informado'}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton 
                                                aria-label="delete" 
                                                onClick={() => handleDelete(cliente)}
                                                sx={{
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(0, 255, 0, 0.1)',
                                                    },
                                                    '&:focus': {
                                                        backgroundColor: 'rgba(0, 255, 0, 0.2)',
                                                    },
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>                                            
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table> 
                    {feedback && (
                        <Alert icon={feedback.type === 'success' ? <CheckIcon /> : <ErrorIcon />} severity={feedback.type}>
                            {feedback.message}
                        </Alert>
                    )} 
                </TableContainer>
            </Box>
        </Box>
    );
}