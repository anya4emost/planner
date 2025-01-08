'use client'

import React, { useState } from 'react'
import { registrationRequest } from '../../api/requests';

export default function registration() {

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
            let requestResult = await registrationRequest(name, password);
            if (requestResult.error) {
                throw new Error(requestResult.error.message);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h1>Регистрация</h1>
            <form autoComplete="false" onSubmit={handleSubmit} >
                <label htmlFor="task-name">
                    Имя пользователя:
                    <input autoComplete="nope" onChange={(event) => handleSetState(event, 'name')} id="user-name" type="text" value={name} />
                </label>
                <label htmlFor="password">
                    Пароль:
                    <input autoComplete="new-password" onChange={(event) => handleSetState(event, 'password')} aria-autocomplete="list" id="password" type="password" value={password} />
                </label>
                
                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>
    )
}