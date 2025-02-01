'use client'

import React, { useState, useEffect } from 'react';
import styles from "./page.module.css";
import { tasksRequest } from '../../../api/requests';
import { Splitter } from 'antd';
import DayTracker from '../../../components/ui/daytracker/DayTracker';
import DaySwitcherContainer from '../../../containers/DaySwitcherContainer';
import DragableRowTask from '../../../components/ui/dragableRowTask/DragableRowTask';
import SplitterWrapper from '../../../components/ui/splitterWrapper/SplitterWrapper';
import CreateTaskComponent from '../tasks/_ui/createTask/createTaskComponent';

export default function user() {
  console.log('planning rerender');
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    
    async function fetchData() {
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
    fetchData();

  }, []);

  return (
    <div>
      <div className={styles['task-heading']}>
        <h1>ПЛАНИРОВАНИЕ</h1>
        <CreateTaskComponent />
      </div>
      <Splitter style={{ height: 600, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <Splitter.Panel defaultSize="40%" min="280" max="70%">
          <SplitterWrapper>
            <DaySwitcherContainer />
            <DayTracker />
          </SplitterWrapper>
        </Splitter.Panel>
        <Splitter.Panel>
          <SplitterWrapper>
            <>
            {tasks.map((task) => {
              return (
                <DragableRowTask task={task}/>
              )
            })}
            </>
          </SplitterWrapper>
        </Splitter.Panel>
      </Splitter>
      <br />
  
    </div>
  )
}
