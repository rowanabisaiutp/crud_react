import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const Add = () => {
    const [pcs, setPcs] = useState({
        nombre: '',
        modelo: '',
        nserie: '',
        teclado: '',
        mouse: '',
        observacion: '',
        estado_id: '', // Cambiado de 'estado' a 'estado_id'
        mesa_id:''
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
            <br />
            <br />
            <br />
            <div className='row'>
                <div className='col-md-12'>
                    <h3>Agregar nuevo PC</h3>
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
                            <FormControl className="form-control">
                                <InputLabel htmlFor="observacion">Observaciones</InputLabel>
                                <Select
                                    native
                                    value={pcs.observacion}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: 'observacion',
                                        id: 'observacion',
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={'Sin Observación'}>Sin Observación</option>
                                    <option value={'Con Observación'}>Con Observación</option>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="mb-3 mt-3">
                            <FormControl className="form-control">
                                <InputLabel htmlFor="teclado">Teclado</InputLabel>
                                <Select
                                    native
                                    value={pcs.teclado}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: 'teclado',
                                        id: 'teclado',
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={'1'}>1</option>
                                    <option value={'2'}>2</option>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="mb-3 mt-3">
                            <FormControl className="form-control">
                                <InputLabel htmlFor="mouse">Mouse</InputLabel>
                                <Select
                                    native
                                    value={pcs.mouse}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: 'mouse',
                                        id: 'mouse',
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={'1'}>1</option>
                                    <option value={'2'}>2</option>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="mb-3 mt-3">
                            <FormControl className="form-control">
                                <InputLabel htmlFor="estado_id">Activo/inactivo</InputLabel>
                                <Select
                                    native
                                    value={pcs.estado_id}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: 'estado_id',
                                        id: 'estado_id',
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={'1'}>1</option>
                                    <option value={'2'}>2</option>
                                    <option value={'3'}>3</option>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="mb-3 mt-3">
                            <FormControl className="form-control">
                                <InputLabel htmlFor="estado_id">Mesa</InputLabel>
                                <Select
                                    native
                                    value={pcs.mesa_id}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: 'mesa_id',
                                        id: 'mesa_id',
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={'1'}>1</option>
                                    <option value={'2'}>2</option>
                                    <option value={'3'}>3</option>
                                </Select>
                            </FormControl>
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
