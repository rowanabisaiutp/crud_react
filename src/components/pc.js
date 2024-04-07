import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Pcs = () => {
    const [pcs, setPcs] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        const traerPcs = async () => {
            try {
                const res = await axios.get('http://localhost/xampp/api_rest_php/')
                setPcs(res.data)
            } catch (err) {
                console.log(err)
            }
        };
        traerPcs()
    }, [])

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost/xampp/api_rest_php/index.php?id=${selectedId}`);
            window.location.reload();
        } catch (error) {
            console.error('Error al eliminar:', error);
        }
    }

    const handleOpenDialog = (id) => {
        setSelectedId(id);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setSelectedId(null);
        setOpen(false);
    };

    return (
        <div className="container">
            <h2 className="w-100 d-flex justify-content-center p-3">ADMIN: sala de computo</h2>
            <div className="row">
                <div className="col-md-12">
                <p><Link to="/add" className="btn btn-success">Nuevo</Link></p>
                <table className="table table-bordered">
            <thead>
                <tr>
                    <th>id</th>
                    <th>Nombre</th>
                    <th>modelo</th>
                    <th>num_serie</th>
                    <th>teclado</th>
                    <th>mouse</th>
                    <th>Observacion</th>
                    <th>estado_id</th>
                </tr>
            </thead>
            <tbody>
                {
                    pcs.map((pc) => {
                        return (
                            <tr key={pc.id}>
                                <td>{pc.id}</td>
                                <td>{pc.nombre}</td>
                                <td>{pc.modelo}</td>
                                <td>{pc.nserie}</td>
                                <td>{pc.teclado}</td>
                                <td>{pc.mouse}</td>
                                <td>{pc.observacion}</td>
                                <td>{pc.estado_id}</td>
                                <td>
                                    <Link to={`/update/${pc.id}`} className="btn btn-info mx-2">Edit</Link>
                                    <Button onClick={() => handleOpenDialog(pc.id)} variant="contained" color="secondary">Eliminar</Button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
                </div>
            </div>
            <Dialog
                open={open}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirmación de eliminación</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Estás seguro de que deseas eliminar este PC?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleDelete} color="secondary" autoFocus>
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Pcs;
