'use client';

import { PlusCircleOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { CreateTaskModal } from '../modals/createTaskModal/createTaskModal';
import { useRouter } from 'next/navigation'

export default function CreateTaskComponent() {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log('isModalOpen', isModalOpen);
    const openModal = () => {
        console.log('openModal');
        setIsModalOpen(true);
    };

    const onSuccessCreateTask = async () => {
        console.log('revalidate tasks');
        router.refresh();
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
