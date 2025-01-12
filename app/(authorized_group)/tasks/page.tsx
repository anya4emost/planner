import React, { Suspense } from 'react'
import { serversTasksRequest } from '../../../api/serverRequests';
import { cookies } from 'next/headers';
import CreateTaskComponent from './_ui/createTask/createTaskComponent';

async function Tasks() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access-token')?.value;
    const refreshToken = cookieStore.get('refresh-token')?.value;
    let tasks;
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

    return (
        <ul>
            {tasks.map((task: { id: React.Key | null | undefined; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => {
                return (
                    <li key={task.id}><input type='checkbox' /><h3> {task.name}: {task.description}</h3></li>
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
            <CreateTaskComponent />
            <Tasks />
        </div>
    )
}
