'use client';

import React from 'react';
import { Menu, Home, ChevronRight, Search } from 'lucide-react';

interface HeaderProps {
    view: string;
    setIsSidebarOpen: (v: boolean) => void;
    isDesktopSidebarOpen: boolean;
    setIsDesktopSidebarOpen: (v: boolean) => void;
}

export default function Header({ view, setIsSidebarOpen, isDesktopSidebarOpen, setIsDesktopSidebarOpen }: HeaderProps) {
    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 shrink-0 print-hidden z-10 transition-all duration-300">
            <div className="flex items-center gap-4">
                {/* 手機版漢堡選單按鈕 */}
                <button className="lg:hidden p-2 -ml-2 hover:bg-gray-100 rounded-lg text-gray-600" onClick={() => setIsSidebarOpen(true)}>
                    <Menu className="w-6 h-6" />
                </button>
                {/* 桌面版漢堡選單切換按鈕 */}
                <button
                    className="hidden lg:flex p-2 -ml-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
                    onClick={() => setIsDesktopSidebarOpen(!isDesktopSidebarOpen)}
                    title={isDesktopSidebarOpen ? '收起側邊欄' : '展開側邊欄'}
                >
                    <Menu className="w-5 h-5" />
                </button>

                <div className="hidden md:flex items-center text-sm font-medium text-gray-500">
                    <Home className="w-4 h-4 mr-2" />
                    系統主頁 <ChevronRight className="w-4 h-4 mx-1" />
                    <span className="text-gray-800">{view === 'grid' ? '模版列表' : view === 'list' ? '歷史紀錄' : '內容編輯器'}</span>
                </div>
                <div className="md:hidden font-bold text-gray-800 text-lg">
                    {view === 'grid' ? '模版中心' : view === 'list' ? '歷史紀錄' : '內容編輯'}
                </div>
            </div>

            <div className="flex items-center gap-4 lg:gap-6">
                {/* 搜尋框 (僅桌面顯示) */}
                <div className="relative hidden lg:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="搜尋姓名、電話..."
                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none w-64 transition-all"
                    />
                </div>
                {/* 管理員狀態 */}
                <div className="flex items-center gap-3 lg:border-l lg:border-gray-200 lg:pl-6">
                    <div className="hidden sm:block text-right">
                        <p className="text-sm font-bold text-gray-700 leading-tight">管理員帳號</p>
                        <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest flex items-center justify-end gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span> ONLINE
                        </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md cursor-pointer border-2 border-white ring-2 ring-gray-100">
                        A
                    </div>
                </div>
            </div>
        </header>
    );
}
