import React from 'react';
import { Modal } from 'antd';

export const Modals = ({ children, visible, calcel }) => {

    return (
        <Modal
            visible={ visible }
            footer={ false }
            onCancel={ calcel }
        >
            { children }
        </Modal>
    )
}
