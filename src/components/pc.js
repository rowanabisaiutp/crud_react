import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Pcs = () => {
    const [pcs, setPcs] = useState([]);

    useEffect(() => {
        const traerPcs = async () => {
            try {
                const res = await axios.get('http://localhost/xampp/api_rest_php/')
                setPcs(res.data)
            } catch (err) {
                console.log(err)
            };

        };
        traerPcs()
    }, [])

    console.log(pcs)

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost/xampp/api_rest_php/index.php?id=${id}`);
            window.location.reload();
        } catch (error) {
            if (error.response) {
                // El servidor respondió con un código de estado diferente de 2xx
                console.log('Error de respuesta del servidor:', error.response.data);
                console.log('Código de estado:', error.response.status);
            } else if (error.request) {
                // La solicitud se realizó pero no se recibió respuesta
                console.log('No se recibió respuesta del servidor:', error.request);
            } else {
                // Ocurrió un error al configurar la solicitud
                console.log('Error al configurar la solicitud:', error.message);
            }
            console.log('Error general:', error.config);
        }
    }
    

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
                    pcs.map((pc, ) => {
                        return (
                            <tr>
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
                                    <button onClick={()=>handleDelete(pc.id)} className="btn btn-danger">Eliminar</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
                </div>
            </div>
        </div>
    )
}

export default Pcs