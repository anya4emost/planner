'use client';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { Layout, Menu, MenuProps } from "antd";
import { Header } from "antd/es/layout/layout";
import { logoutRequest } from "../api/requests";
import { useRouter } from "next/navigation";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter();

  const onLogout = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const responseResult = await logoutRequest();
      if (responseResult.success) {
        router.push('/login');
      } else {
        throw new Error(responseResult.error)
      }
    } catch (e) {
      console.error(e);
    }
  }

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
      label: <Link onClick={onLogout} href='/login'>Выйти</Link>
    }
  ]

  const menuOnClick = (e) => {
    if (e.key === 'Цели') {

    }
    console.log('menuOnClick', e);
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
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
            {children}
          </Layout>
        </Suspense>
      </body>
    </html>
  );
}
