'use client';

import React from 'react';
import { FileText, Plus } from 'lucide-react';
import { MASTER_TEMPLATES, Template } from '@/lib/constants';

interface TemplateGridProps {
    handleCreate: (template: Template) => void;
}

export default function TemplateGrid({ handleCreate }: TemplateGridProps) {
    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <div className="mb-6 hidden md:block">
                <h2 className="text-2xl font-bold text-gray-800">選用打印模版</h2>
                <p className="text-sm text-gray-500 mt-1">請選擇下方適用的疏文或牌位樣式進行內容編輯。</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {MASTER_TEMPLATES.map((t) => (
                    <div
                        key={t.id}
                        className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl hover:border-blue-300 transition-all active:scale-[0.98] group cursor-pointer flex flex-col"
                        onClick={() => handleCreate(t)}
                    >
                        <div className="h-40 sm:h-48 flex items-center justify-center relative p-4" style={{ backgroundColor: t.bgColor }}>
                            {/* 模擬紙張圖示 */}
                            <div
                                className="border-2 border-dashed w-16 h-28 sm:w-20 sm:h-36 flex flex-col items-center justify-center transition-colors bg-white/50 shadow-sm"
                                style={{ borderColor: t.color }}
                            >
                                <FileText className="w-6 h-6 sm:w-8 sm:h-8 mb-2 opacity-50" style={{ color: t.color }} />
                                <span className="text-[8px] font-mono opacity-50 uppercase" style={{ color: t.color }}>
                                    Preview
                                </span>
                            </div>
                            <div className="absolute top-3 right-3 bg-white/80 backdrop-blur px-2 py-1 rounded text-[10px] text-gray-600 font-mono shadow-sm">
                                ID: {t.id}
                            </div>
                        </div>
                        <div className="p-4 sm:p-5 border-t border-gray-100 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-gray-800 text-base sm:text-lg mb-1 truncate">{t.name}</h3>
                                <p className="text-xs text-gray-500 mb-4">{t.size} | 直式排版</p>
                            </div>
                            <button className="w-full bg-slate-800 text-white text-sm font-bold py-2.5 rounded-xl group-hover:bg-blue-600 transition-colors flex justify-center items-center gap-2">
                                <Plus className="w-4 h-4" /> 編輯此模版
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
