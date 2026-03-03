'use client';

import React from 'react';
import { LayoutGrid, List, User, Settings, X } from 'lucide-react';

interface SidebarProps {
    view: string;
    setView: (v: string) => void;
    isSidebarOpen: boolean;
    setIsSidebarOpen: (v: boolean) => void;
}

export default function Sidebar({ view, setView, isSidebarOpen, setIsSidebarOpen }: SidebarProps) {
    const NavItem = ({ icon: Icon, label, target }: { icon: any; label: string; target: string }) => (
        <button
            onClick={() => {
                setView(target);
                setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-all mb-1 ${view === target ? 'text-white bg-blue-600 shadow-md shadow-blue-600/30 font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                }`}
        >
            <Icon className="w-5 h-5" />
            <span className="ml-4 text-sm">{label}</span>
        </button>
    );

    return (
        <>
            {/* --- 左側：專業深色側邊欄 (桌面版) --- */}
            <aside className="hidden lg:flex w-[260px] bg-[#001529] flex-col shrink-0 print-hidden z-20 shadow-xl">
                <div className="h-16 flex items-center px-6 bg-[#002140] border-b border-gray-800 shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded flex items-center justify-center text-white font-black shadow-lg shadow-blue-500/50">禪</div>
                    <span className="ml-3 text-white font-bold tracking-widest text-sm">疏文管理中心 Pro</span>
                </div>
                <nav className="flex-1 py-6 px-3 overflow-y-auto">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-4 mb-2">系統模組</div>
                    <NavItem icon={LayoutGrid} label="模版中心" target="grid" />
                    <NavItem icon={List} label="歷史紀錄" target="list" />

                    <div className="my-6 border-t border-gray-700/50 mx-4"></div>

                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-4 mb-2">管理設定</div>
                    <button className="w-full flex items-center px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-gray-200 transition-all mb-1">
                        <User className="w-5 h-5" /> <span className="ml-4 text-sm">帳號設定</span>
                    </button>
                    <button className="w-full flex items-center px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-gray-200 transition-all">
                        <Settings className="w-5 h-5" /> <span className="ml-4 text-sm">系統參數</span>
                    </button>
                </nav>
                <div className="p-5 bg-[#000c17] shrink-0">
                    <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-[10px] text-gray-400 mb-1 uppercase tracking-wider">Next.js Edition</p>
                        <p className="text-white text-xs font-mono font-bold">Version 4.0 Pro</p>
                    </div>
                </div>
            </aside>

            {/* --- 手機側邊欄抽屜 (Mobile Drawer) --- */}
            <div className={`lg:hidden fixed inset-0 z-[100] transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none print-hidden'}`}>
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
                <div className={`absolute left-0 top-0 bottom-0 w-72 bg-[#001529] shadow-2xl transition-transform duration-300 flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="h-16 flex items-center px-6 bg-[#002140] border-b border-gray-800 shrink-0 justify-between">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold">禪</div>
                            <span className="ml-3 text-white font-bold">疏文中心 Pro</span>
                        </div>
                        <button className="text-gray-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <nav className="flex-1 py-4 px-3 overflow-y-auto">
                        <NavItem icon={LayoutGrid} label="模版中心" target="grid" />
                        <NavItem icon={List} label="歷史紀錄" target="list" />
                    </nav>
                </div>
            </div>
        </>
    );
}
