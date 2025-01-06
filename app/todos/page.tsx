'use client'

import React, { useState } from 'react'
import { Modal } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import styles from "./page.module.css";


const tasks = [
  {
    id: 1,
    name: 'прочитать книгу',
    description: 'Просто делай. Делай просто'
  },
  {
    id: 2,
    name: 'помыть полы',
    description: ''
  },
  {
    id: 3,
    name: 'изучить nextjs',
    description: ''
  },

]

export default function user() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log('сохранились');
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className={styles['task-heading']}><h1>ЗАДАЧИ</h1><PlusCircleOutlined onClick={openModal} style={{ fontSize: '24px', color: '#08c', marginLeft: '8px' }} /></div>

      <br />
      {tasks.map((task) => {
        return (
          <h3 key={task.id}> {task.id}. {task.name}</h3>
        )
      })}

      <Modal title="Создать задачу" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <form action="" method="post">
          <label htmlFor="task-name">
            Название:
            <input id="task-name" type="text" name="name"/>
          </label>
          <label htmlFor="description">
            Описание:
            <textarea id="description"/>
          </label>
          <label htmlFor="icon">
            Иконка:
            <select name="city" id="icon">
              <option value="">-- Выберите город --</option>
              <option value="petersburg">Санкт-Петербург</option>
              <option value="samara">Самара</option>
              <option value="perm">Пермь</option>
              <option value="novosibirsk">Новосибирск</option>
            </select>
          </label>
          <button type="submit">Сохранить</button>
        </form>
      </Modal>
    </div>
  )
}
