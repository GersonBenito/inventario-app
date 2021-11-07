import React from 'react';
import { Table } from 'antd';
import styled from 'styled-components';

export const Tabla = ({ colums, data, loading, paginacion }) => {

    return (
        <Contendor>
            <Table
                columns={ colums }
                loading={ loading }
                dataSource={ data }
                pagination={ paginacion }
                scroll={{ x: 768 }}
            />
        </Contendor>
    )
}

const Contendor = styled.div`
 
`;
