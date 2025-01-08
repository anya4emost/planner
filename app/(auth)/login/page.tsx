
'use client'
import React, { useState } from 'react'
import { loginRequest } from '../../../api/requests';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function login() {
    const router = useRouter();

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSetState = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        if (fieldName === 'name') {
            setName(event.target.value);
        }
        if (fieldName === 'password') {
            setPassword(event.target.value);
        }
    }

    const handleSubmit = async (event: any) => {

        event.preventDefault(); // предотвращаем стандартное поведение сабмита формы
        try {
            let requestResult = await loginRequest(name, password);
            if (requestResult.error) {
                throw new Error(requestResult.error.message);
            }
            if (requestResult.success) {
                router.push('/todos');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h1>Логин</h1>

            <form autoComplete="false" onSubmit={handleSubmit}>
                <label htmlFor="task-name">
                    Имя пользователя:
                    <input autoComplete="nope" onChange={(event) => handleSetState(event, 'name')} id="user-name" type="text" value={name} />
                </label>
                <label htmlFor="password">
                    Пароль:
                    <input autoComplete="new-password" aria-autocomplete="list" onChange={(event) => handleSetState(event, 'password')} id="password" type="password" value={password} />
                </label>

                <button type="submit">Войти</button>

                <Link href='/todos'> My Tasks</Link>
            </form>
        </div>
    )
}