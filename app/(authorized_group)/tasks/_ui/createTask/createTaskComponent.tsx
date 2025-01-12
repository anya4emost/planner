'use client';

import { PlusCircleOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { CreateTaskModal } from '../../../todos/_ui/modals/createTaskModal/createTaskModal';

export default function CreateTaskComponent() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log('isModalOpen', isModalOpen);
    const openModal = () => {
        console.log('openModal');
        setIsModalOpen(true);
    };

    const onSuccessCreateTask = async () => {
        console.log('revalidate tasks');
    }

    const handleOk = () => {
        console.log('сохранились');

        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

  return (<>
      <PlusCircleOutlined onClick={openModal} style={{ fontSize: '24px', color: '#08c', marginLeft: '8px' }} />

      <CreateTaskModal onSuccessCreateTask={onSuccessCreateTask} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} />
  </>
  )
}
