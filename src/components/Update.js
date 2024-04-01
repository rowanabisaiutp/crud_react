import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Update = () => {
    const { id } = useParams();
    const [pcs, setPcs] = useState({
        nombre: '',
        modelo: '',
        mouse: '',
        nserie: '',
        observacion: '',
        teclado: '',
        estado_id: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPcs((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        axios.get(`http://localhost:9000/api/${id}`)
            .then(res => {
                setPcs(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:9000/api/${id}`, pcs);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container">
            <h1>Edit</h1>
            <form onSubmit={handleClick}>
                <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input type="text" className="form-control" value={pcs.nombre} name="nombre" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Model:</label>
                    <input type="text" className="form-control" value={pcs.modelo} name="modelo" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mouse:</label>
                    <input type="text" className="form-control" value={pcs.mouse} name="mouse" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Serial Number:</label>
                    <input type="text" className="form-control" value={pcs.nserie} name="nserie" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Observation:</label>
                    <input type="text" className="form-control" value={pcs.observacion} name="observacion" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Keyboard:</label>
                    <input type="text" className="form-control" value={pcs.teclado} name="teclado" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Status:</label>
                    <input type="text" className="form-control" value={pcs.estado_id} name="estado_id" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Guardar cambios</button>
                <Link to="/" className="btn btn-danger">Cancelar</Link>
            </form>
        </div>
    );
}

export default Update;
