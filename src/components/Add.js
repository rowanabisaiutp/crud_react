import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Add = () => {
    const [pcs, setPcs] = useState({
        nombre: '',
        modelo: '',
        nserie: '',
        teclado: '',
        mouse: '',
        observacion: '',
        estado_id: ''
    });

    const [open, setOpen] = useState(false); // Estado para controlar si el diálogo está abierto
    const navigate = useNavigate();

    const handleChange = (e) => {
        setPcs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = async () => {
        setOpen(false); // Cerrar el diálogo
        try {
            await axios.post("http://localhost/xampp/api_rest_php/index.php", pcs);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container">
            <h2 className='w-100 d-flex justify-content-center p-3'>Agregar nuevo PC</h2>
            <div className='row'>
                <div className='col-md-12'>
                    <h3>Add Your Detail</h3>
                    <form>
                        <div className="mb-3 mt-3">
                            <label className="form-label"> Nombre:</label>
                            <input type="text" className="form-control" placeholder="Nombre" name="nombre" onChange={handleChange} />
                        </div>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Modelo:</label>
                            <input type="text" className="form-control" placeholder="Modelo" name="modelo" onChange={handleChange} required />
                        </div>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Numero de serie:</label>
                            <input type="text" className="form-control" placeholder="Numero de serie" name="nserie" onChange={handleChange} required />
                        </div>
                        <div className="mb-3 mt-3">
                            <label className="form-label">observaciones:</label>
                            <input type="text" className="form-control" placeholder="observaciones" name="observacion" onChange={handleChange} required />
                        </div>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Teclado</label>
                            <input type="text" className="form-control" placeholder="Teclado" name="teclado" onChange={handleChange} required />
                        </div>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Activo/inactivo</label>
                            <input type="text" className="form-control" placeholder="Activo/inactivo" name="estado_id" onChange={handleChange} required />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={handleClickOpen}>Agregar nuevo PC</button>
                        <Link to="/" className="btn btn-danger">Cancelar</Link>
                    </form>
                </div>
            </div>
            {/* Diálogo de confirmación */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirmar acción</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Estás seguro de que deseas agregar este nuevo PC?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirm} color="primary" autoFocus>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Add;
