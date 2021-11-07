import React from 'react';
import { Space } from 'antd';
import styled from 'styled-components';

export const Boton = ({ nombre, color, accion, icon, type }) => {
    return (
        <Contenedor>
            <button className={ `btn btn-${ color }` } onClick={ accion } type={ type } >
                <Space>{icon}{ nombre }</Space>
            </button>
        </Contenedor>
    )
}

const Contenedor = styled.div`

    /* dar estilos personalizados a los botones de bootstrap */

`
