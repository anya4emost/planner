import React, { useEffect, useState } from 'react'
import { Input, Modal, Select, Typography } from 'antd';
import { aimsRequest, createTaskRequest } from '../../../../../../api/requests';
import styles from './index.module.css';

const { Text, Link, Title } = Typography;
const { TextArea } = Input;

interface ICreateTaskModal {
    open?: boolean;
    onOk: () => void;
    onCancel: () => void;
    onSuccessCreateTask: () => void;
}
export const CreateTaskModal: React.FC<ICreateTaskModal> = ({ open, onOk, onCancel, onSuccessCreateTask }) => {
    const [aims, setAims] = useState([]);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Analysis');
    const [icon, setIcon] = useState('');
    const [color, setColor] = useState('');
    const [type, setType] = useState('Important');
    const [currentAimId, setCurrentAimId] = useState('');
    useEffect(() => {
        async function fetchAims() {
            try {
                let requestResult = await aimsRequest();
                if (requestResult.error) {
                    throw new Error(requestResult.error.message);
                }
                setAims(requestResult.data);
            } catch (error) {
                console.error(error);
            }
        };
        if (open) {
            fetchAims();
        }

    }, [open]);

    const selectOnChangeHandler = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        console.log('select e', e);
        setCurrentAimId(e);
    }

    const handleSetState = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        if (fieldName === 'name') {
            setName(event.target.value);
        }
    }

    const handleDescritionSetState = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setDescription(event.target.value);
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log('handleSubmit', handleSubmit);
        try {
            const responseResult = await createTaskRequest(
                name,
                description,
                status,
                icon,
                color,
                type,
                currentAimId);
            console.log('responseResult', responseResult);
            if (responseResult.success) {
                onSuccessCreateTask();
            } else {
                throw new Error(responseResult.error)
            }
        } catch (e) {
            console.error(e);
        }
        
        onOk();
    }

    const title = <Title level={4}>Создать задачу</Title>;

    return (
        <Modal title={title} open={open} onOk={handleSubmit} onCancel={onCancel}>
            <form onSubmit={handleSubmit} action="" method="post">
                <div className={styles['form-content']}>
                    
                    <input id="status" type="hidden" name="status" value='Analysis' />
                    <div className={styles.row}>
                        <div className={styles.label}><Text strong>Название</Text></div>
                        <Input
                            onChange={(e) => handleSetState(e, 'name')}
                            placeholder="название задачи"
                            id="task-name"
                            value={name}
                            name="name"/>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.label}><Text strong>Описание</Text></div>
                        <TextArea
                            onChange={(e) => handleDescritionSetState(e)}
                            id="description"
                            rows={4}
                            placeholder=""
                            maxLength={300}
                            value={description}
                        />
                    </div>

                    <div className={styles.row}>
                        <div className={styles.label}><Text strong>Цель</Text></div>
                        <Select
                            defaultValue=""
                            style={{ width: 250 }}
                            onChange={selectOnChangeHandler}
                            options={[
                                { value: '', label: '-- Выберите цель --' },
                                ...aims.map(aim => {
                                    return { value: aim.id, label: aim.name }
                                })
                            ]}
                        />
                    </div>
                </div>
                {/* <button type="submit">Сохранить</button> */}
            </form>
        </Modal>
    )
}
