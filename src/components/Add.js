import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
    const [pcs, setPcs] = useState({
        nombre: '',
        modelo: '',
        nserie: '',
        teclado: '',
        mouse: '',
        observacion: '',
        estado_id: ''
    })

    const navigate = useNavigate();
    const handleChange = (e) => {
        setPcs((prev) => ({ ...prev, [e.target.name]: e.target.value}));
    }

    const handleClick = async (e) => {
        e.preventDefault();
            try {
                await axios.post("http://localhost:9000/api", pcs);
                navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container">
        <h2 className='w-100 d-flex justify-content-center p-3'>Add New User</h2>
            <div className='row'>
                <div className='col-md-12'>
                    <h3>Add Your Detail</h3>
                    <form>
                        <div className="mb-3 mt-3">
                            <label className="form-label"> Nombre:</label>
                            <input type="text" className="form-control" id="name" placeholder="Nombre" name="name" onChange={handleChange} />
                        </div>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Modelo:</label>
                            <input type="text" className="form-control" id="email" placeholder="Modelo" name="email" onChange={handleChange} required/>
                        </div>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Numero de serie:</label>
                            <input type="text" className="form-control" placeholder="Numero de serie" onChange={handleChange} required/>
                        </div>
                        <div className="mb-3 mt-3">
                            <label className="form-label">observaciones:</label>
                            <input type="text" className="form-control" placeholder="observaciones" onChange={handleChange} required/>
                        </div>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Teclado</label>
                            <input type="text" className="form-control" placeholder="Teclado" onChange={handleChange} required/>
                        </div>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Activo/inactivo</label>
                            <input type="text" className="form-control" placeholder="Activo/inactivo" onChange={handleChange} required/>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={handleClick}>Agregar nuevo pc</button>
                        <Link to="/" className="btn btn-danger">Cancelar</Link>
                    </form>
                </div>
            </div>
    </div>
    )
}

export default Add