import React, { 
    useState
} from 'react';
import { 
    Modal, 
    Box,
    Typography, 
    TextField, 
    Button,
    Alert
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputMask from 'react-input-mask';
import dayjs from 'dayjs';
import axios from 'axios';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1em'
};

const CriarCliente = ({ open, onClose }) => {

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [data_nascimento, setDataNascimento] = useState(dayjs());
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState(null);

    const handleCreate = async () => {
        try {
            if (
                !nome.trim() ||
                !telefone.trim() ||
                !data_nascimento
            ) {
                setFeedback({
                    type: 'error',
                    message: 'Preencha os campos obrigatórios.'
                });
            } else if (nome.trim().length < 3) {
                setFeedback({
                    type: 'error',
                    message: 'Nome do cliente precisa ter no mínimo 3 caracteres.'
                });
            } else {
                const dados = {
                    nome: nome,
                    telefone: telefone.replace(/\D/g, ''),
                    data_nascimento: data_nascimento,
                    cpf: cpf.replace(/\D/g, ''),
                    email: email
                };
                const response = await axios.post(process.env.REACT_APP_API_URL + "/clientes/criar", dados);
                setFeedback({
                    type: 'success',
                    message: 'Cliente cadastrado com sucesso!'
                });
                setTimeout(() => {
                    window.location.reload(true);
                }, 1000);
            }
        } catch (error) {

            if (error.response.status === 403) {
                setFeedback({
                    type: 'error',
                    message: 'Telefone já cadastrado.'
                });
            } else {
                setFeedback({
                    type: 'error',
                    message: 'Ocorreu um erro, tente novamente.'
                });
            }
        }
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={onClose}
            >
                <Box sx={style}>
                    <Typography id="cadastrar-cliente" variant="h6" component="h2" align="center" >
                        Cadastrar Cliente
                    </Typography>
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <TextField
                            required
                            id="cliente-nome"
                            label="Nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            style={{marginRight: "1rem"}}
                        />
                        <InputMask
                            mask="(99)99999-9999"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                        >
                            {() => (
                                <TextField
                                    required
                                    id="cliente-telefone"
                                    label="Telefone"
                                />
                            )}
                        </InputMask>
                    </Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker 
                                id="cliente-data-nascimento"
                                label="Data de Nascimento *" 
                                value={data_nascimento}
                                onChange={(newValue) => setDataNascimento(newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <InputMask
                            mask="999.999.999-99"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                        >
                            {() => (
                                <TextField
                                    id="cliente-cpf"
                                    label="CPF"
                                    style={{marginRight: "1rem"}}
                                />
                            )}
                        </InputMask>
                        <TextField
                            id="cliente-email"
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Box>  
                    {feedback && (
                        <Alert icon={feedback.type === 'success' ? <CheckIcon /> : <ErrorIcon />} severity={feedback.type}>
                            {feedback.message}
                        </Alert>
                    )}
                    <Box>
                        <Button variant="contained" color="error" onClick={onClose} style={{ marginRight: '20px' }}>Fechar</Button>
                        <Button variant="contained" color="success" onClick={() => handleCreate()}>Cadastrar</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default CriarCliente;