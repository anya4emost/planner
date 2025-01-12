'use client'

import React, { useState, useEffect } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import styles from "./page.module.css";
import { tasksRequest } from '../../../api/requests';
import { CreateTaskModal } from './_ui/modals/createTaskModal/createTaskModal';

export default function todos() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [tasks, setTasks] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const fetchTasks = async () => {
    try {
      let requestResult = await tasksRequest();
      if (requestResult.error) {
        throw new Error(requestResult.error.message);
      }
      setTasks(requestResult.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  const onSuccessCreateTask = async () => {
    fetchTasks();
  }

  const handleOk = () => {
    console.log('сохранились');
    
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className={styles['task-heading']}><h1>ЗАДАЧИ</h1>
        <PlusCircleOutlined onClick={openModal} style={{ fontSize: '24px', color: '#08c', marginLeft: '8px' }} />
      </div>
      <br />
      <ul>
        {tasks.map((task) => {
          return (
            <li className={styles['task-string']} key={task.id}><input type='checkbox' /><h3> {task.name}: {task.description}</h3></li>
          )
        })}
      </ul>

      <CreateTaskModal onSuccessCreateTask={onSuccessCreateTask} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}/>
    </div>
  )
}
