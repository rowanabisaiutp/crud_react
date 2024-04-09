import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pcs, setPcs] = useState({
        nombre: '',
        modelo: '',
        mouse: '',
        nserie: '',
        observacion: '',
        teclado: '',
        estado_id: '',
        mesa_id: ''
    });
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost/xampp/api_rest_php/index.php?id=${id}`);
                setPcs(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPcs((prev) => ({ ...prev, [name]: value }));
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = async () => {
        try {
            await axios.put(`http://localhost/xampp/api_rest_php/index.php?id=${id}`, pcs);
            navigate("/");
        } catch (err) {
            console.error('Error updating PC:', err);
        }
    };

    return (
        <div className="container">
            <br /><br />
            <h1>Editar PC</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleClickOpen(); }}>
                <div className="mb-3">
                    <label className="form-label">Nombre:</label>
                    <input type="text" className="form-control" value={pcs.nombre} name="nombre" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Modelo:</label>
                    <input type="text" className="form-control" value={pcs.modelo} name="modelo" onChange={handleChange} />
                </div>
                <div className="mb-3">
                <label className="form-label">Mouse:</label>
                    <input type="number" className="form-control" value={pcs.mouse} name="mouse" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Número de Serie:</label>
                    <input type="text" className="form-control" value={pcs.nserie} name="nserie" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Observación:</label>
                    <input type="text" className="form-control" value={pcs.observacion} name="observacion" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Teclado:</label>
                    <input type="text" className="form-control" value={pcs.teclado} name="teclado" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Estado:</label>
                    <input type="text" className="form-control" value={pcs.estado_id} name="estado_id" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mesa:</label>
                    <input type="text" className="form-control" value={pcs.mesa_id} name="mesa_id" onChange={handleChange} />
                </div>
                <Button type="submit" className="btn btn-primary">Guardar cambios</Button>
                <Link to="/" className="btn btn-danger">Cancelar</Link>
            </form>

            {/* Diálogo de confirmación */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirmación</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Estás seguro de que deseas guardar los cambios?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirm} color="primary" autoFocus>
                        Guardar cambios
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Update;
