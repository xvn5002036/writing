'use client';

import React from 'react';
import { ChevronLeft, Save, Printer, UserCheck, MapPin, Edit3, Eye } from 'lucide-react';
import { Template } from '@/lib/constants';

interface EditorProps {
    formData: any;
    setFormData: (data: any) => void;
    activeTemplate: Template | null;
    editorTab: string;
    setEditorTab: (tab: string) => void;
    setView: (view: string) => void;
    handleSave: () => void;
    printDoc: () => void;
}

export default function Editor({
    formData,
    setFormData,
    activeTemplate,
    editorTab,
    setEditorTab,
    setView,
    handleSave,
    printDoc,
}: EditorProps) {
    // 編輯器左側面版的展開與收合狀態 (桌面版)
    const [isFormOpen, setIsFormOpen] = React.useState(true);

    if (!activeTemplate) return null;

    return (
        <div className="flex flex-col lg:flex-row h-full overflow-hidden w-full absolute inset-0">
            {/* 手機版：頂部表單/預覽切換分頁 */}
            <div className="lg:hidden flex border-b bg-white print-hidden shrink-0 shadow-sm z-10">
                <button
                    className={`flex-1 py-3.5 text-sm font-bold border-b-2 transition-colors flex justify-center items-center gap-2 ${editorTab === 'form' ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent bg-gray-50'
                        }`}
                    onClick={() => setEditorTab('form')}
                >
                    <Edit3 className="w-4 h-4" /> 編輯參數
                </button>
                <button
                    className={`flex-1 py-3.5 text-sm font-bold border-b-2 transition-colors flex justify-center items-center gap-2 ${editorTab === 'preview' ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent bg-gray-50'
                        }`}
                    onClick={() => setEditorTab('preview')}
                >
                    <Eye className="w-4 h-4" /> 效果預覽
                </button>
            </div>

            {/* --- 編輯區：左側面板 --- */}
            <div
                className={`bg-white border-r border-gray-200 flex flex-col shrink-0 print-hidden h-full transition-[width,transform,opacity] duration-300 ease-in-out ${editorTab === 'form' ? 'flex w-full' : 'hidden lg:flex'
                    } ${isFormOpen ? 'lg:w-[420px] xl:w-[460px] translate-x-0 opacity-100' : 'lg:w-0 -translate-x-full opacity-0 overflow-hidden'}`}
            >
                {/* 操作列 */}
                <div className="p-4 border-b bg-gray-50 flex justify-between items-center shrink-0 w-[420px] xl:w-[460px]">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setView('grid')}
                            className="text-sm text-gray-500 hover:text-blue-600 flex items-center font-medium bg-white px-3 py-1.5 rounded-lg border shadow-sm"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" /> 返回模版
                        </button>
                        <button
                            onClick={() => setIsFormOpen(false)}
                            className="hidden lg:flex text-sm text-gray-500 hover:text-red-600 items-center font-medium bg-white px-3 py-1.5 rounded-lg border shadow-sm"
                            title="收起編輯面板"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" /> 收起
                        </button>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            className="px-3 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-500 hover:text-white rounded-lg transition-colors flex items-center font-bold text-sm shadow-sm"
                            title="儲存紀錄"
                        >
                            <Save className="w-4 h-4 mr-1.5" /> 儲存
                        </button>
                        <button
                            onClick={printDoc}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md shadow-blue-600/20 flex items-center font-bold text-sm"
                            title="列印"
                        >
                            <Printer className="w-4 h-4 mr-1.5" /> 列印
                        </button>
                    </div>
                </div>

                {/* 滾動表單區 */}
                <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-8 bg-white pb-24 lg:pb-6 w-[420px] xl:w-[460px]">
                    <section className="space-y-4">
                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest border-b pb-2 flex items-center gap-2">
                            <UserCheck className="w-4 h-4" /> 核心資料
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[11px] font-bold text-gray-600 mb-1.5">對象姓名</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-500 outline-none transition-all text-sm font-medium"
                                    placeholder="請輸入姓名"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-gray-600 mb-1.5">生肖</label>
                                <select
                                    value={formData.zodiac}
                                    onChange={(e) => setFormData({ ...formData, zodiac: e.target.value })}
                                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium cursor-pointer"
                                >
                                    {['鼠', '牛', '虎', '兔', '龍', '蛇', '馬', '羊', '猴', '雞', '狗', '豬'].map((z) => (
                                        <option key={z} value={z}>
                                            {z}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-gray-600 mb-1.5">農曆出生 / 往生日期</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={formData.lunarDate}
                                    onChange={(e) => setFormData({ ...formData, lunarDate: e.target.value })}
                                    className="w-1/3 p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-center focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                                    placeholder="年 (如:甲辰年)"
                                />
                                <input
                                    type="text"
                                    value={formData.lunarMonth}
                                    onChange={(e) => setFormData({ ...formData, lunarMonth: e.target.value })}
                                    className="w-1/3 p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-center focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                                    placeholder="月"
                                />
                                <input
                                    type="text"
                                    value={formData.lunarDay}
                                    onChange={(e) => setFormData({ ...formData, lunarDay: e.target.value })}
                                    className="w-1/3 p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-center focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                                    placeholder="日"
                                />
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest border-b pb-2 flex items-center gap-2">
                            <MapPin className="w-4 h-4" /> 地址與祈願
                        </h4>
                        <div>
                            <label className="block text-[11px] font-bold text-gray-600 mb-1.5">詳細地址</label>
                            <textarea
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                rows={3}
                                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all resize-none font-medium leading-relaxed"
                                placeholder="台灣省南投縣埔里鎮..."
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-gray-600 mb-1.5">祈願項目 / 超薦事由</label>
                            <input
                                type="text"
                                value={formData.wish}
                                onChange={(e) => setFormData({ ...formData, wish: e.target.value })}
                                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-gray-600 mb-1.5">供養人 / 陽上人叩拜</label>
                            <input
                                type="text"
                                value={formData.offerer}
                                onChange={(e) => setFormData({ ...formData, offerer: e.target.value })}
                                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium"
                                placeholder="如：信士某某某"
                            />
                        </div>
                    </section>

                    {/* 手機端底部按鈕，引導切換到預覽 */}
                    <button
                        onClick={() => setEditorTab('preview')}
                        className="lg:hidden w-full py-3 mt-4 bg-slate-800 text-white rounded-xl font-bold text-sm shadow-md"
                    >
                        填寫完畢，前往預覽結果
                    </button>
                </div>
            </div>

            {/* --- 預覽區：右側面板 (高保真 SVG 渲染) --- */}
            <div
                className={`flex-1 bg-[#d1d5db] overflow-auto p-4 sm:p-10 flex justify-center items-start print:p-0 print:bg-white relative transition-all duration-300 ease-in-out ${editorTab === 'preview' ? 'flex' : 'hidden lg:flex'
                    }`}
            >
                {/* 桌面版專用的「展開面板」懸浮按鈕 (只有當面板收合時顯示) */}
                {!isFormOpen && (
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur border border-l-0 border-gray-300 text-gray-700 p-2 py-4 rounded-r-xl shadow-lg hover:bg-white hover:text-blue-600 hover:pl-3 transition-all z-20 group"
                        title="展開編輯面板"
                    >
                        <ChevronLeft className="w-6 h-6 rotate-180 group-hover:scale-110 transition-transform" />
                    </button>
                )}

                {/* A4 畫布與透過 Tailwind 斷點自動縮放邏輯 */}
                <div
                    className="bg-white shadow-2xl relative print-area origin-top transition-transform duration-300 mx-auto transform scale-[0.45] sm:scale-[0.65] lg:scale-[0.85] xl:scale-100"
                    style={{
                        width: '210mm',
                        height: '297mm',
                        padding: '15mm',
                        minWidth: '210mm',
                        backgroundColor: activeTemplate.bgColor,
                    }}
                >
                    {/* SVG 高保真傳統邊框 */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 210 297">
                        {/* 外層細框 */}
                        <rect x="5" y="5" width="200" height="287" fill="none" stroke={activeTemplate.color} strokeWidth="0.5" />
                        {/* 內層粗框 */}
                        <rect x="8" y="8" width="194" height="281" fill="none" stroke={activeTemplate.color} strokeWidth="1.5" />

                        {/* 傳統角飾 (對齊內框角落) */}
                        {[
                            [8, 8],
                            [202, 8],
                            [8, 289],
                            [202, 289],
                        ].map(([x, y], i) => (
                            <circle key={i} cx={x} cy={y} r="2.5" fill={activeTemplate.color} />
                        ))}

                        {/* 右上角朱文印章：佛法僧寶 */}
                        <g transform="translate(165, 35)" opacity="0.6">
                            <rect x="0" y="0" width="26" height="26" fill="none" stroke="#dc2626" strokeWidth="1.5" />
                            <text x="13" y="10.5" textAnchor="middle" fill="#dc2626" fontSize="5.5" fontWeight="900" style={{ fontFamily: 'serif' }}>
                                佛法
                            </text>
                            <text x="13" y="19" textAnchor="middle" fill="#dc2626" fontSize="5.5" fontWeight="900" style={{ fontFamily: 'serif' }}>
                                僧寶
                            </text>
                        </g>
                    </svg>

                    {/* 疏文排版核心：直書系統 */}
                    <div className="relative h-full w-full flex flex-row-reverse justify-between items-start text-black writing-v">
                        {/* 區塊 1：文疏大標題 */}
                        <div className="flex flex-col items-center mx-6 mt-6">
                            <h1
                                className="text-[2.5rem] font-black border-4 p-3 leading-none tracking-[0.5em] shadow-sm"
                                style={{ borderColor: activeTemplate.color, color: activeTemplate.color }}
                            >
                                {activeTemplate.name}
                            </h1>
                        </div>

                        {/* 區塊 2：主要內文 */}
                        <div className="flex-1 flex flex-row-reverse items-start px-8 py-8 gap-12">
                            {/* 段落A：起手式與基本資料 */}
                            <div className="flex flex-col gap-2">
                                <p className="text-2xl font-black mb-4 tracking-widest" style={{ color: activeTemplate.color }}>
                                    伏以
                                </p>
                                <p className="text-base leading-10 tracking-widest font-bold">神威廣大，恩光普照。今有居住於：</p>
                                <p className="text-base leading-10 underline decoration-red-600 decoration-2 underline-offset-[10px] font-bold">
                                    {formData.address || '　　　　　　　　　　'}
                                </p>
                                <p className="text-base leading-10 font-bold mt-4">
                                    弟子{' '}
                                    <span className="text-[2.75rem] font-black mx-4 border-b-4 border-red-600 pb-2">
                                        {formData.name || '姓名'}
                                    </span>
                                    ，生於{' '}
                                    <span className="font-black text-lg underline decoration-red-600 decoration-2">{formData.lunarDate}</span>{' '}
                                    年{' '}
                                    <span className="font-black text-lg underline decoration-red-600 decoration-2">{formData.lunarMonth}</span>{' '}
                                    月{' '}
                                    <span className="font-black text-lg underline decoration-red-600 decoration-2">{formData.lunarDay}</span>{' '}
                                    日，屬 <span className="font-black text-2xl">{formData.zodiac}</span>。
                                </p>
                            </div>

                            {/* 段落B：祈求內容 */}
                            <div className="flex flex-col gap-2 pt-24">
                                <p className="text-base leading-10 font-black border-b-2 border-black pb-1 mb-2">
                                    誠心祈求：{formData.wish}
                                </p>
                                <p className="text-base leading-10 font-bold tracking-widest">祈願百災消除，千祥雲集。</p>
                                <p className="text-base leading-10 font-bold tracking-widest">合家平安，萬事如意。</p>
                            </div>

                            {/* 段落C：落款與日期 */}
                            <div className="flex flex-col gap-2 pt-40 items-end">
                                <p className="text-sm font-bold opacity-60 italic mb-10 tracking-widest">謹疏以聞</p>
                                <div className="flex flex-col items-center">
                                    <p className="text-base font-bold">
                                        <span className="text-sm">叩拜人：</span>
                                        <span className="text-3xl font-black mx-3">{formData.offerer}</span>
                                        <span className="text-sm font-bold">百拜</span>
                                    </p>
                                    <p className="text-sm mt-12 text-gray-700 font-mono tracking-tighter font-bold border-t border-gray-400 pt-2">
                                        天運歲次 {formData.lunarDate} {formData.lunarMonth} {formData.lunarDay} 立
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 區塊 3：左側邊界裝飾 (佛教/道教符號) */}
                        <div
                            className="w-16 border-l h-full flex flex-col items-center justify-between py-12 opacity-15 shrink-0"
                            style={{ borderColor: activeTemplate.color }}
                        >
                            <div className="text-5xl" style={{ color: activeTemplate.color }}>
                                卍
                            </div>
                            <div
                                className="flex-1 border-l-2 border-dashed my-8"
                                style={{ borderColor: activeTemplate.color }}
                            ></div>
                            <div className="text-5xl" style={{ color: activeTemplate.color }}>
                                卍
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
