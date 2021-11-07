import React from 'react';
import { Formik, Form, Field } from 'formik';
import Swal from 'sweetalert2';
import { Space } from 'antd';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { Boton } from '../botones/Boton';
import { ADD_CATEGORIA, GET_CATEGORIAS, UPDATE_CATEGORIA } from '../../graphql/querys';

export const AgregarCategoria = ({ closeModal, updateData, accion }) => {

    const [ agregarCategoria ] = useMutation(ADD_CATEGORIA,{
        refetchQueries: [ {query: GET_CATEGORIAS} ]
    });

    const [ actualizarCategoria ] = useMutation(UPDATE_CATEGORIA, {
        refetchQueries:[ {query: GET_CATEGORIAS} ]
    });

    const initialValues = accion === 'update' ? updateData : {
        nombre: '',
        color: ''
    }

    const validation = yup.object().shape({
        nombre: yup.string().min(5, '6 Caracteres minimo')
                            .max(9, '9 Caracteres maximo')
                            .required('Campo nombre es requerido'),
        color: yup.string().required('Campo color es requerido')
        
    });

    const handleSumbit = async (values, resetForm) =>{

        try {

            if(accion === 'update'){

                if(values.__typename){

                    delete values.__typename;
                    delete values._id;
                }

                const { data } = await actualizarCategoria({ variables: { id: updateData._id, data: values } });

                resetForm();
                closeModal();
        
                Swal.fire({
                    title:'Success',
                    text: data.updateCategoria.message,
                    icon:'success',
                    confirmButtonText:'Aceptar'
                });

            }else{

                const { data } = await agregarCategoria({ variables:{ post: values } });
               
                resetForm();
                closeModal();
        
                Swal.fire({
                    title:'Success',
                    text: data.addCategoria.message,
                    icon:'success',
                    confirmButtonText:'Aceptar'
                });

            }
            
        } catch (error) {
            resetForm();
            closeModal();
            Swal.fire({
                title:'Oop!',
                text: 'Ocurrio un error al intentar procesar la peticion',
                icon: 'error',
                confirmButtonText:'Aceptar'
            });
        }


    }


    return (
        <>

            <h3>
                { accion === 'update' ? 'Actualizar': 'Agregar' } categoria</h3>
            <Formik
                initialValues={ initialValues }
                validationSchema={ validation }
                onSubmit={ (values, { resetForm }) => handleSumbit( values, resetForm ) }
                enableReinitialize={ true }
            >
                {
                    ({ errors, touched }) => (
                        <Form>
                            <div className="form-row">
                                <div className="col-md-6 mb-3">
                                    <label>Nombre</label>
                                    <Field type="text" className="form-control" name='nombre' />
                                    {errors.nombre && touched.nombre && ( <p className="text-danger">{ errors.nombre }</p> )}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Color</label>
                                    <Field type="text" className="form-control" name='color' />
                                    { errors.color && touched.color && ( <p className="text-danger">{ errors.color }</p> ) }
                                </div>
                            </div>
                            <div className="text-right">
                                <Space>
                                    <Boton 
                                        nombre={ accion === 'update' ? 'Actualizar' : 'Enviar' }
                                        color='info'
                                        icon={ accion === 'update' ? <i className="fas fa-pencil-alt"></i> : <i className="far fa-save"></i> }
                                        type='submit'
                                    />
                                    <Boton
                                        nombre='Cancelar'
                                        color='warning'
                                        icon={ <i className="fas fa-times"></i> }
                                        accion={ ()=>closeModal() }
                                        type='button'
                                    />
                                </Space>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </>
    )
}
