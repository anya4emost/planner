import React from 'react'
import styles from './index.module.css';

const DragableRowTask = ({ task }) => {
    const onDragStartHandler = (e, task) => { 
        console.log('onDragStart', e);
        console.log('drag task', task);
    };
    const onDragLeaveHandler = (e) => {
        console.log('onDragLeave', e);
    };
    const onDragEndHandler = (e) => {
        console.log('onDragEnd', e);
    };
    const onDragOverHandler = (e) => {
        e.preventDefault();
        // console.log('onDragOver', e);
    };
    const onDropHandler = (e, task) => {
        e.preventDefault();
        console.log('onDrop', e);
        console.log('drop task', task);
    };
  return (
      <div
          onDragStart={(e) => { onDragStartHandler(e, task) }}
          onDragLeave={onDragLeaveHandler}
          onDragEnd={onDragEndHandler}
          onDragOver={onDragOverHandler}
          onDrop={(e) => { onDropHandler(e, task) }}
          draggable={true}
          className={styles.task}
      >
          <h6 key={task.id}> <strong>{task.name}</strong>: {task.description}</h6>
      </div>
  )
}

export default DragableRowTask
