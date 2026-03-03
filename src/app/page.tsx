'use client';

import React, { useState, useEffect } from 'react';
import { MASTER_TEMPLATES, Template } from '@/lib/constants';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import TemplateGrid from '@/components/TemplateGrid';
import HistoryList from '@/components/HistoryList';
import Editor from '@/components/Editor';

export default function App() {
  const [view, setView] = useState('grid');
  const [records, setRecords] = useState<any[]>([]);
  const [activeTemplate, setActiveTemplate] = useState<Template | null>(MASTER_TEMPLATES[5]);

  // 手機端專用狀態
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editorTab, setEditorTab] = useState('form');

  // 表單資料狀態
  const [formData, setFormData] = useState({
    id: '' as string | number,
    name: '',
    address: '',
    lunarDate: '甲辰年',
    lunarMonth: '正月',
    lunarDay: '初一',
    zodiac: '龍',
    wish: '消災解厄，吉祥如意',
    offerer: '信士張某某',
  });

  // 確保在客戶端掛載後才顯示，避免伺服器端與客戶端渲染畫面不一致 (Hydration Error)
  const [mounted, setMounted] = useState(false);

  // 初始化與讀取 LocalStorage
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('ritual_pro_github_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setRecords(parsed);
      }
    } catch (e) {
      console.error('歷史紀錄讀取失敗', e);
    }
  }, []);

  // 建立新疏文
  const handleCreate = (template: Template) => {
    setActiveTemplate(template);
    setFormData({ ...formData, id: Date.now(), name: '', address: '' });
    setView('editor');
    setEditorTab('form');
    setIsSidebarOpen(false);
  };

  // 儲存紀錄
  const handleSave = () => {
    if (!formData.name) {
      alert('請至少輸入對象姓名！');
      return;
    }
    const newRecords = [formData, ...records.filter((r) => r.id !== formData.id)];
    setRecords(newRecords);
    localStorage.setItem('ritual_pro_github_v3', JSON.stringify(newRecords));
    setView('list');
  };

  // 刪除紀錄
  const deleteRecord = (id: number) => {
    if (confirm('確定要刪除這筆紀錄嗎？')) {
      const updated = records.filter((r) => r.id !== id);
      setRecords(updated);
      localStorage.setItem('ritual_pro_github_v3', JSON.stringify(updated));
    }
  };

  const printDoc = () => {
    if (typeof window !== 'undefined') window.print();
  };

  if (!mounted) {
    return null; // 防止伺服器與客戶端渲染標記不一致
  }

  return (
    <div className="min-h-screen flex text-gray-800 relative w-full overflow-hidden">
      <Sidebar
        view={view}
        setView={setView}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* --- 主內容區 --- */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden w-full relative">
        <Header view={view} setIsSidebarOpen={setIsSidebarOpen} />

        {/* 動態內容視圖 */}
        <main className="flex-1 overflow-y-auto w-full relative">
          {view === 'grid' && <TemplateGrid handleCreate={handleCreate} />}

          {view === 'list' && (
            <HistoryList
              records={records}
              setFormData={setFormData}
              setView={setView}
              setEditorTab={setEditorTab}
              deleteRecord={deleteRecord}
            />
          )}

          {view === 'editor' && (
            <Editor
              formData={formData}
              setFormData={setFormData}
              activeTemplate={activeTemplate}
              editorTab={editorTab}
              setEditorTab={setEditorTab}
              setView={setView}
              handleSave={handleSave}
              printDoc={printDoc}
            />
          )}
        </main>
      </div>
    </div>
  );
}
