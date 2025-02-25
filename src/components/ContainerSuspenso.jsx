import React, { useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { TextField, Box } from "@mui/material";

const ContainerSuspenso = ({ 
    abrir, 
    fecharContainerSuspenso,
    editandoCliente,  

    nome, 
    telefone, 
    cidade, 
    estado, 
    
    setNomeTemp, 
    setTelefoneTemp, 
    setCidadeTemp, 
    setEstadoTemp }) => {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const modalRef = useRef(null);


    useEffect(() => {
        if (abrir && modalRef.current) {
            modalRef.current.focus();
        }
    }, [abrir]);

    


    return (
        <React.Fragment>

            <Dialog
                fullScreen={fullScreen}
                open={abrir}
                onClose={fecharContainerSuspenso}
                aria-labelledby="responsive-dialog-title"
                aria-hidden={false}  
                
            >
                
                <IconButton
                    aria-label="close"
                    onClick={fecharContainerSuspenso}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    }}
                >
                    <ClearIcon />
                </IconButton>

                <DialogTitle id="responsive-dialog-title">
                    {"Editar dados do cliente:"}
                </DialogTitle>

                <DialogContent
                   
                    style={{
                        width: '500px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                    
                >

                    <Box
                     component="form"
                     onSubmit={(e) => {
                        e.preventDefault();
                        editandoCliente()
                    }}
                    >


                        <TextField
                            label="Nome"
                            name="name"
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={nome}
                            onChange={(e) => setNomeTemp(e.target.value)}
                        />
                        <TextField
                            label="Telefone"
                            name="telefone"
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={telefone}
                            onChange={(e) => setTelefoneTemp(e.target.value)}
                        />
                        <TextField
                            label="Cidade"
                            name="cidade"
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={cidade}
                            onChange={(e) => setCidadeTemp(e.target.value)}
                        />
                        <TextField
                            label="Estado"
                            name="estado"
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={estado}
                            onChange={(e) => setEstadoTemp(e.target.value)}
                        />
                        <Button type='submit' autoFocus >
                            Atualizarrr
                        </Button>

                    </Box>


                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default ContainerSuspenso;
