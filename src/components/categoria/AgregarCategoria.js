import React from 'react';
import { Formik, Form, Field } from 'formik';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { Boton } from '../botones/Boton';
import { ADD_CATEGORIA, GET_CATEGORIAS } from '../../graphql/querys';

export const AgregarCategoria = ({ closeModal, updateData }) => {

    const [ agregarCategoria ] = useMutation(ADD_CATEGORIA,{
        refetchQueries: [ {query: GET_CATEGORIAS} ]
    });

    const initialValues = {
        nombre: '',
        color: '',
    }

    const validation = yup.object().shape({
        nombre: yup.string().min(5, '6 Caracteres minimo')
                            .max(9, '9 Caracteres maximo')
                            .required('Campo nombre es requerido'),
        color: yup.string().required('Campo color es requerido')
        
    });

    const handleSumbit = async (values, resetForm) =>{

        try {
            
            const { data } = await agregarCategoria({ variables:{ post: values } });
           
            resetForm();
            closeModal();
    
            Swal.fire({
                title:'Success',
                text: data.addCategoria.message,
                icon:'success',
                confirmButtonText:'Aceptar'
            });

        } catch (error) {
            resetForm();
            closeModal();
            Swal.fire({
                title:'Oop!',
                text:'Ocurrio un error al intentar agregar la categroia',
                icon:'error',
                confirmButtonText:'Aceptar'
            });
        }


    }


    return (
        <>

            <h3>agregar Categoria</h3>
            <Formik
                initialValues={ initialValues }
                validationSchema={ validation }
                onSubmit={ (values, { resetForm }) => handleSumbit( values, resetForm ) }
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
                            <Boton 
                                nombre='Enviar'
                                color='info'
                                icon={ <i className="far fa-save"></i> }
                                type='submit'
                            />
                        </Form>
                    )
                }
            </Formik>
        </>
    )
}
