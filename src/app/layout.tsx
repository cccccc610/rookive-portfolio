import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '周琪雯 | 角色原画作品集',
    template: '%s | 周琪雯',
  },
  description:
    '周琪雯的角色原画作品集 - 10年腾讯游戏美术经验，擅长美少女角色设计、QQ人画风、二次元角色原画',
  keywords: [
    '周琪雯',
    '角色原画',
    '游戏美术',
    '腾讯',
    '宝可梦大集结',
    '洛克王国',
    '二次元',
    '美少女',
    'QQ人',
    '游戏设计',
  ],
  authors: [{ name: '周琪雯', url: 'https://rookive.com' }],
  generator: 'Coze Code',
  openGraph: {
    title: '周琪雯 | 角色原画作品集',
    description: '10年腾讯游戏美术经验，擅长美少女角色设计、QQ人画风',
    type: 'website',
    locale: 'zh_CN',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.COZE_PROJECT_ENV === 'DEV';

  return (
    <html lang="zh-CN">
      <body className={`antialiased`}>
        {isDev && <Inspector />}
        {children}
      </body>
    </html>
  );
}
