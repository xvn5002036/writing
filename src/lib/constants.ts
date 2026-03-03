export interface Template {
    id: number;
    name: string;
    size: string;
    color: string;
    bgColor: string;
}

export const MASTER_TEMPLATES: Template[] = [
    { id: 97, name: '四聯祈福小牌位', size: '190x280mm', color: '#8B0000', bgColor: '#fff5f5' },
    { id: 82, name: '往生蓮位', size: '125x364mm', color: '#b45309', bgColor: '#fffef0' },
    { id: 98, name: '往生牒殼', size: '128x390mm', color: '#b45309', bgColor: '#fffef0' },
    { id: 102, name: '水陸往生牒心', size: '297x420mm', color: '#334155', bgColor: '#ffffff' },
    { id: 99, name: '延生牒殼', size: '125x390mm', color: '#8B0000', bgColor: '#fff5f5' },
    { id: 110, name: '化解太歲祈福文疏', size: '210x297mm', color: '#8B0000', bgColor: '#ffffff' },
];
