'use client';
import { Menu as SiderMenu } from "../ui/menu";
import styles from "./layout.module.css";
import { Breadcrumb, Layout, theme } from 'antd';
import { Suspense, useEffect, useState } from "react";
const { Header, Content, Sider } = Layout;

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
        
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) return null;

    return (
        <Suspense fallback={<p>Loading feed...</p>}>
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
        </Suspense>
    );
}