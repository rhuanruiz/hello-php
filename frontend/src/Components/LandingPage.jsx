import React, { 
    useState
} from 'react';
import { 
  Box
} from '@mui/material';
import Clientes from './Clientes';


const style = {
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(31, 30, 30)'
};

const LandingPage = ({ clientes }) => {
    return (
        <Box sx={style}>
            <Clientes clientes={clientes} />
        </Box>
    );
};

export default LandingPage;
