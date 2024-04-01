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
                const res = await axios.get('http://localhost:9000/api')
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
            await axios.delete(`http://localhost:9000/api/${id}`)
            window.location.reload()
        }catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="container">
            <h2 className="w-100 d-flex justify-content-center p-3"> Hola mundo</h2>
            <div className="row">
                <div className="col-md-12">
                <p><Link to="/add" className="btn btn-success">Nuevo</Link></p>
                <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Numero</th>
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
                    pcs.map((pc, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
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