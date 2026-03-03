'use client';

import React from 'react';
import { Database, Edit3, Trash2, Inbox } from 'lucide-react';

interface HistoryListProps {
    records: any[];
    setFormData: (data: any) => void;
    setView: (view: string) => void;
    setEditorTab: (tab: string) => void;
    deleteRecord: (id: number) => void;
}

export default function HistoryList({ records, setFormData, setView, setEditorTab, deleteRecord }: HistoryListProps) {
    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                <div className="p-4 md:p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <h2 className="font-bold text-gray-800 flex items-center gap-2">
                        <Database className="w-5 h-5 text-blue-600" /> 本地歷史存檔
                    </h2>
                    <span className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">共 {records.length} 筆資料</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[600px]">
                        <thead className="bg-white border-b border-gray-200 text-xs font-black text-gray-400 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 w-24">紀錄編號</th>
                                <th className="px-6 py-4">對象資料</th>
                                <th className="px-6 py-4">農曆時辰</th>
                                <th className="px-6 py-4 text-center">狀態</th>
                                <th className="px-6 py-4 text-right">系統操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {records.map((r) => (
                                <tr key={r.id} className="hover:bg-blue-50/50 transition-colors group">
                                    <td className="px-6 py-4 text-xs font-mono text-gray-400">#{r.id.toString().slice(-6)}</td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-800 text-sm">{r.name}</div>
                                        <div className="text-[11px] text-gray-500 mt-0.5">
                                            生肖屬 {r.zodiac} | 供養：{r.offerer}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {r.lunarDate} {r.lunarMonth} {r.lunarDay}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-200">
                                            已存檔
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => {
                                                    setFormData(r);
                                                    setView('editor');
                                                    setEditorTab('form');
                                                }}
                                                className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                                title="編輯紀錄"
                                            >
                                                <Edit3 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => deleteRecord(r.id)}
                                                className="p-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                                title="刪除紀錄"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {records.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <Inbox className="w-12 h-12 mb-3 text-gray-300" />
                                            <p className="text-sm font-medium">目前尚無任何列印紀錄</p>
                                            <p className="text-xs mt-1">在模版中心編輯後儲存即可在此顯示</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
