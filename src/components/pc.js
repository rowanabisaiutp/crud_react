import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const columns = [
  { id: 'nombre', label: 'Nombre', minWidth: 100 },
  { id: 'modelo', label: 'Modelo', minWidth: 100 },
  { id: 'nserie', label: 'Número de Serie', minWidth: 100 },
  { id: 'teclado', label: 'Teclado', minWidth: 100 },
  { id: 'mouse', label: 'Ratón', minWidth: 100 },
  { id: 'observacion', label: 'Observación', minWidth: 100 },
  { id: 'estado', label: 'Estado', minWidth: 100 },
  { id: 'estado_id', label: 'Num estado', minWidth: 100 },
  { id: 'numero_mesa', label: 'Mesa', minWidth: 100 },

  { id: 'actions', label: 'Edit/Elim', minWidth: 100 }
];

const Pcs = () => {
    const [pcs, setPcs] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);

    useEffect(() => {
        const traerPcs = async () => {
            try {
                const res = await axios.get('https://octavoapi.fly.dev/api')
                setPcs(res.data)
            } catch (err) {
                console.log(err)
            }
        };
        traerPcs()
    }, [])

    const handleDelete = async () => {
        try {
            await axios.delete(`https://octavoapi.fly.dev/api/{selectedId}`);
            setOpen(false);
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 5));
        setPage(0);
    };

    return (
        <div className="container">
            <br></br>
            <br></br>
            <br></br>
            <h2 className="w-100 d-flex justify-content-center p-3">ADMIN: sala de computo</h2>
            <div className="row">
                <div className="col-md-12">
                    <p><Link to="/add" className="btn btn-success">Nuevo</Link></p>
                    <Paper>
                      <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              {columns.map((column) => (
                                <TableCell
                                  key={column.id}
                                  align="left"
                                  style={{ minWidth: column.minWidth }}
                                >
                                  {column.label}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {pcs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((pc) => {
                              return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={pc.id}>
                                  {columns.map((column) => {
                                    const value = pc[column.id];
                                    if (column.id === 'actions') {
                                      return (
                                        <TableCell key={column.id} align="left">
                                          <Link to={`/update/${pc.id}`}><EditIcon color="primary" /></Link>
                                          <Button onClick={() => handleOpenDialog(pc.id)}><DeleteIcon color="secodary"/></Button>
                                        </TableCell>
                                      );
                                    } else {
                                      return (
                                        <TableCell key={column.id} align="left">
                                          {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </TableCell>
                                      );
                                    }
                                  })}
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <TablePagination
                        rowsPerPageOptions={[4, 6, 8]}
                        component="div"
                        count={pcs.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </Paper>
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