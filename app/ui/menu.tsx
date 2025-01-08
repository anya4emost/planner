'use client';
import React from 'react';
import './index.module.css';
import { BookOutlined, CalendarOutlined, HomeOutlined, UnorderedListOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu as MenuAnt } from 'antd';
import Link from 'next/link';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: 'home',
        label: <Link href='/main'>Главная</Link>,
        icon: <HomeOutlined />,
    },
    {
        key: 'tasks',
        label: <Link href='/todos'>Список задач</Link>,
        icon: <UnorderedListOutlined />,
    },
    {
        key: 'events',
        label: <Link href='/events'>Календарь событий</Link>,
        icon: <CalendarOutlined />,
    },
    {
        key: 'planning',
        label: <Link href='/planning'>Планирование</Link>,
        icon: <BookOutlined />,
    },
    // {
    //     key: 'sub1',
    //     label: 'Navigation One',
    //     icon: <MailOutlined />,
    //     children: [
    //         {
    //             key: 'g1',
    //             label: 'Item 1',
    //             type: 'group',
    //             children: [
    //                 { key: '1', label: 'Option 1' },
    //                 { key: '2', label: 'Option 2' },
    //             ],
    //         },
    //         {
    //             key: 'g2',
    //             label: 'Item 2',
    //             type: 'group',
    //             children: [
    //                 { key: '3', label: 'Option 3' },
    //                 { key: '4', label: 'Option 4' },
    //             ],
    //         },
    //     ],
    // },
    // {
    //     key: 'sub2',
    //     label: 'Navigation Two',
    //     icon: <AppstoreOutlined />,
    //     children: [
    //         { key: '5', label: 'Option 5' },
    //         { key: '6', label: 'Option 6' },
    //         {
    //             key: 'sub3',
    //             label: 'Submenu',
    //             children: [
    //                 { key: '7', label: 'Option 7' },
    //                 { key: '8', label: 'Option 8' },
    //             ],
    //         },
    //     ],
    // },
    // {
    //     type: 'divider',
    // },
    // {
    //     key: 'sub4',
    //     label: 'Navigation Three',
    //     icon: <SettingOutlined />,
    //     children: [
    //         { key: '9', label: 'Option 9' },
    //         { key: '10', label: 'Option 10' },
    //         { key: '11', label: 'Option 11' },
    //         { key: '12', label: 'Option 12' },
    //     ],
    // },
    // {
    //     key: 'grp',
    //     label: 'Group',
    //     type: 'group',
    //     children: [
    //         { key: '13', label: 'Option 13' },
    //         { key: '14', label: 'Option 14' },
    //     ],
    // },
];

export const Menu: React.FC = () => {
    const onClick = (e) => {
        console.log('click', e);
}
    return (
        <MenuAnt
            onClick={onClick}
            style={{ width: 256, height: 'calc(100vh - 64px)' }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
        />
    );
};