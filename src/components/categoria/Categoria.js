import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Space, Tag } from 'antd';
import { GET_CATEGORIAS, DELETE_CATEGORIA } from '../../graphql/querys';
import { Boton } from '../botones/Boton';
import { Tabla } from '../tabla/Tabla';
import styled from 'styled-components';
import moment from 'moment';
import { Modals } from '../modales/Modals';
import { AgregarCategoria } from './AgregarCategoria';
import Swal from 'sweetalert2';

export const Categoria = () => {

    const [visible, setVisible] = useState(false);

    const { loading, error, data } = useQuery(GET_CATEGORIAS);
    const [ deleteCategoria ] = useMutation(DELETE_CATEGORIA, {
        refetchQueries: [ {query: GET_CATEGORIAS} ]
    });
    

    if (loading) {
        return (
            <h1>Loading....</h1>
        )
    }

    if (error) {
        return (
            <h1>errro</h1>
        )

    }

    const colums = [
        {
            title: 'Nombre',
            key: 'nombre',
            dataIndex: 'nombre',
            render: (_, record) => <p>{record.nombre}</p>
        },
        {
            title: 'Color',
            key: 'nombre',
            dataIndex: 'color',
            render: (_, record) => (
                <Tag color={record.color} key={record.color} >
                    <span style={{ textTransform: 'capitalize' }} >{record.color}</span>
                </Tag>
            )
        },
        {
            title: 'Fecha ingreso',
            key: 'fechaIngreso',
            width: 200,
            align: 'center',
            dataIndex: 'fechaIngreso',
            render: (_, record) => <p>{moment().format('DD/MM/YYYY')}</p>
        },
        {
            title: 'Acciones',
            key: 'acciones',
            width: 50,
            align: 'center',
            dataIndex: 'acciones',
            render: (_, record) => (
                <Space>
                    <Boton
                        nombre='Acualizar'
                        color='warning'
                        icon={<i className="far fa-edit"></i>}
                        accion={ () => handleUpdate(record) }
                    />
                    <Boton
                        nombre='Eliminar'
                        color='danger'
                        icon={<i className="fas fa-trash-alt"></i>}
                        accion={() => deleteConfirm(record)}
                    />
                </Space>
            )
        }
    ];

    const showModal = () => {

        setVisible(true);
    }

    const calcelModal = () => {
        setVisible(false)

    }

    const deleteConfirm = (categoria) => {

        Swal.fire({
            icon: 'warning',
            title: `Esta seguro de eliminar la categoria ${ categoria.nombre}?`,
            text: 'Una vez que lo elimine no podra recuperarlo',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then(({ isConfirmed }) => {

            if(isConfirmed){
                handleDelete(categoria._id);
            }

        })

    }

    const handleDelete = async (_id) => {
        try {
            
            const response = await deleteCategoria({ variables: {id: _id} });
    
            Swal.fire({
                title:'Success',
                text: response.data.deleteCategoria.message,
                icon:'success',
                confirmButtonText:'Aceptar'
            });

        } catch (error) {
            Swal.fire({
                title:'Oop!',
                text:'Ocurrio un error al intentar eliminar la categroia',
                icon:'error',
                confirmButtonText:'Aceptar'
            });
        }
    }

    const handleUpdate = (categoria) =>{

        console.log(categoria);

    }

    return (
        <Contenedor>
            <div className="titulo">
                <h1>Categorias</h1>
            </div>
            <div className="agregar-categoria mb-3">
                <Boton
                    nombre='Agregar'
                    color='info'
                    icon={<i className="far fa-plus-square"></i>}
                    accion={showModal}
                />
            </div>
            <div className="contenedor-tabla">
                {
                    !loading && (
                        <Tabla
                            loading={loading}
                            colums={colums}
                            data={data.categorias}
                            paginacion={false}
                        />
                    )
                }
            </div>
            <Modals
                visible={visible}
                calcel={calcelModal}
            >
                <AgregarCategoria closeModal={calcelModal} />
            </Modals>
        </Contenedor>
    )
}

const Contenedor = styled.div`
    display: grid;
    grid-template-columns: 70%;
    justify-content: center;

    .ant-tag {
        height: 37px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
    }
`;


