

import React from 'react'
import { serversTasksRequest } from '../../../api/serverRequests';
import { cookies } from 'next/headers';
import CreateTaskComponent from './_ui/createTask/createTaskComponent';
import TaskCard from './_ui/taskCard/TaskCard';
import { TTask } from '../../../entities/task';
import styles from './page.module.css';

async function Tasks() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access-token')?.value;
    const refreshToken = cookieStore.get('refresh-token')?.value;
    let tasks: TTask[]=[];
    try {
        const tasksResult = await serversTasksRequest(accessToken, refreshToken);
        if (tasksResult.error) {
            console.log('tasksResult', tasksResult);
            // throw new Error(tasksResult.error.message);
        }
        tasks = tasksResult.data;
    } catch (error) {
        console.error(error);
    }
    if (!tasks) {
        return null;
    }
    console.log('tasks', tasks);

    return (
        <ul className={styles['all-tasks']}>
            {tasks.map((task: { id: React.Key | null | undefined; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => {
                return (
                    <TaskCard task={task} key={task.id} />
                )
            })}
        </ul>
    )
}

export default function tasks() {
    return (
        <div>
            <h1>Мои Задачи</h1>
            <h5>загрузка списка задач осуществляется на сервере</h5>
            <CreateTaskComponent/>
            <Tasks />
        </div>
    )
}
