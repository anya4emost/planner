import React, { FC } from 'react'
import { TTask } from '../../../../../entities/task'
import styles from './taskCard.module.css';


interface ITaskCardProps {
    task: TTask;
}

const TaskCard: FC<ITaskCardProps> = ({ task }) => {
    const { name, id, aim, color, creatorId, description, doerId, icon, status, type } = task;
  return (
    <li className={styles['task-wrapper']} key={id}>
          <h3>{name}</h3>
          <p>{ description}</p>
    </li>
  )
}

export default TaskCard
