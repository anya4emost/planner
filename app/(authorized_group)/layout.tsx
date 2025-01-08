'use client';
import { MenuProps } from "antd";
import { Menu as SiderMenu } from "../ui/menu";
import styles from "./layout.module.css";
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
const { Header, Content, Sider } = Layout;

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    // const onClick: MenuProps['onClick'] = () => {
    //     console.log('click ');
    // };

    // const items1: MenuProps['items'] = ['Задачи', 'Цели', 'Войти', 'Выйти'].map((key) => ({
    //     key,
    //     label: <Link href='/aims'>{key}</Link>
    // }));

    const items1: MenuProps['items'] = [
        {
            key: 'todos',
            label: <Link href='/todos'>Задачи</Link>
        },
        {
            key: 'aims',
            label: <Link href='/aims'>Цели</Link>
        },
        {
            key: 'logout',
            label: <Link href='/login'>Выйти</Link>
        }
    ]
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const menuOnClick = (e) => {
        if (e.key === 'Цели') {

        }
        console.log('menuOnClick', e);
    }

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) return null;

    return (
        <html lang="en">
            <body>
                <Suspense fallback={<p>Loading feed...</p>}>
                    <Layout>
                        <Header style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="demo-logo" />
                            <Menu
                                onClick={menuOnClick}
                                theme="dark"
                                mode="horizontal"
                                defaultSelectedKeys={['2']}
                                items={items1}
                                style={{ flex: 1, minWidth: 0, justifyContent: 'flex-end' }}
                            />
                        </Header>
                        <Layout>
                            <Sider width={256} style={{ background: colorBgContainer }}>
                                <SiderMenu />
                            </Sider>
                            <Layout style={{ padding: '0' }}>
                                {/* <Breadcrumb
                                items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
                                style={{ margin: '16px 0' }}
                            /> */}
                                <Content
                                    style={{
                                        padding: 24,
                                        margin: 0,
                                        minHeight: 280,
                                        background: colorBgContainer,
                                        //borderRadius: borderRadiusLG,
                                    }}
                                >
                                    {children}
                                </Content>
                            </Layout>
                        </Layout>
                    </Layout>
                </Suspense>
            </body>
        </html>
    );
}