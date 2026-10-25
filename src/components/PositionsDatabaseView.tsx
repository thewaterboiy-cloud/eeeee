import React, { useState, useMemo } from 'react';
import { 
  Search, 
  BookOpen, 
  Plus, 
  ExternalLink, 
  UserPlus, 
  Filter,
  CheckCircle,
  Building2,
  FileText,
  Clock
} from 'lucide-react';
import { PositionItem } from '../types';
import { POSITION_CATEGORIES } from '../data/positionsData';

interface PositionsDatabaseViewProps {
  positions: PositionItem[];
  onAddCustomPosition: (newPos: PositionItem) => void;
  onSelectPositionForNewDeclarant: (position: PositionItem) => void;
}

export const PositionsDatabaseView: React.FC<PositionsDatabaseViewProps> = ({
  positions,
  onAddCustomPosition,
  onSelectPositionForNewDeclarant,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddCustomOpen, setIsAddCustomOpen] = useState(false);

  // Form state for adding custom agency position
  const [customName, setCustomName] = useState('');
  const [customAgency, setCustomAgency] = useState('');
  const [customCategory, setCustomCategory] = useState('specific_risk');
  const [customBasis, setCustomBasis] = useState('ประกาศคณะกรรมการ ป.ป.ช. / ระเบียบหน่วยงาน');
  const [customDays, setCustomDays] = useState(60);
  const [customTarget, setCustomTarget] = useState('ส่วนราชการต้นสังกัด และ ป.ป.ช.');
  const [customDesc, setCustomDesc] = useState('');

  // Filtering positions
  const filteredPositions = useMemo(() => {
    return positions.filter(p => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      if (!matchCat) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.agencyGroup.toLowerCase().includes(q) ||
        p.statutoryBasis.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.submissionTarget.toLowerCase().includes(q)
      );
    });
  }, [positions, selectedCategory, searchQuery]);

  const handleSaveCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || !customAgency.trim()) return;

    const newPos: PositionItem = {
      id: `custom-pos-${Date.now()}`,
      name: customName.trim(),
      agencyGroup: customAgency.trim(),
      category: customCategory,
      statutoryBasis: customBasis.trim(),
      defaultDays: customDays || 60,
      submissionTarget: customTarget.trim(),
      description: customDesc.trim() || 'ตำแหน่งที่ต้องยื่นตามที่หน่วยงานกำหนด',
      isCustom: true,
    };

    onAddCustomPosition(newPos);
    setCustomName('');
    setCustomAgency('');
    setCustomDesc('');
    setIsAddCustomOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Banner & Search Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                ฐานข้อมูลตำแหน่งที่มีหน้าที่ยื่นบัญชีทรัพย์สินและหนี้สิน
              </h1>
              <p className="text-sm text-slate-500">
                สืบค้นตำแหน่งตาม พ.ร.ป. ป.ป.ช. 2561 (มาตรา 102/105) และประกาศกำหนดตำแหน่งล่าสุด พร้อมเพิ่มตำแหน่งเฉพาะหน่วยงานได้
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsAddCustomOpen(true)}
            className="px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg shadow-sm transition-colors flex items-center gap-1.5 whitespace-nowrap self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>เพิ่มตำแหน่งของหน่วยงาน</span>
          </button>
        </div>

        {/* Live Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาชื่อตำแหน่ง เช่น นายก, ผู้ว่าฯ, อธิบดี, กรรมการ, ผอ.กอง, ที่ดิน, หรือค้นหาตามสังกัด/กฎหมาย..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 px-2 py-1"
            >
              ล้าง
            </button>
          )}
        </div>

        {/* Category Filter Segments (Zero-pill button controls) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-4 text-xs font-medium">
          {POSITION_CATEGORIES.map(cat => {
            const count = cat.id === 'all' 
              ? positions.length 
              : positions.filter(p => p.category === cat.id).length;
            
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600'
                }`}
              >
                <span>{cat.name}</span>
                <span className="ml-1.5 text-[11px] opacity-70 font-mono">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count & Status */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <div>
          พบตำแหน่งที่ตรงกับเงื่อนไข <span className="font-semibold text-slate-900 font-mono">{filteredPositions.length}</span> ตำแหน่ง
        </div>
        <div className="text-slate-400">
          คลิกปุ่ม &quot;สร้างผู้ยื่น&quot; เพื่อบันทึกรายชื่อผู้มีหน้าที่ยื่นในตำแหน่งนั้นได้ทันที
        </div>
      </div>

      {/* Positions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPositions.map(pos => (
          <div
            key={pos.id}
            className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between hover:border-slate-300 transition-colors shadow-xs"
          >
            <div>
              {/* Header: Title and Custom tag */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {pos.name}
                </h3>
                {pos.isCustom && (
                  <span className="text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-medium shrink-0">
                    กำหนดเอง
                  </span>
                )}
              </div>

              {/* Agency Group */}
              <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-3">
                <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-medium text-slate-700">{pos.agencyGroup}</span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-500 line-clamp-3 mb-4 leading-relaxed">
                {pos.description}
              </p>

              {/* Statutory details metadata with unboxed dividers */}
              <div className="space-y-1.5 text-[11px] text-slate-500 border-t border-slate-100 pt-3">
                <div className="flex items-center gap-1 text-slate-600">
                  <FileText className="w-3 h-3 text-slate-400" />
                  <span className="font-medium">ฐานอำนาจ:</span>
                  <span className="text-slate-700">{pos.statutoryBasis}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-600">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span className="font-medium">กำหนดยื่น:</span>
                  <span className="font-mono text-slate-700">ภายใน {pos.defaultDays} วัน</span>
                </div>
                <div className="flex items-center gap-1 text-slate-600">
                  <span className="font-medium">ยื่นต่อ:</span>
                  <span className="text-slate-700">{pos.submissionTarget}</span>
                </div>
              </div>
            </div>

            {/* Card Action */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => onSelectPositionForNewDeclarant(pos)}
                className="w-full py-2 px-3 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100/80 active:bg-blue-200 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>เพิ่มผู้มีหน้าที่ยื่นในตำแหน่งนี้</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredPositions.length === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">ไม่พบตำแหน่งที่ค้นหา</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            ลองปรับเปลี่ยนคำค้นหา หรือกดปุ่ม &quot;เพิ่มตำแหน่งของหน่วยงาน&quot; เพื่อสร้างรายการตำแหน่งเฉพาะตามโครงสร้างองค์กรของคุณ
          </p>
          <button
            type="button"
            onClick={() => setIsAddCustomOpen(true)}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500"
          >
            <Plus className="w-4 h-4" />
            <span>เพิ่มตำแหน่งใหม่เดี๋ยวนี้</span>
          </button>
        </div>
      )}

      {/* Modal to Add Custom Agency Position */}
      {isAddCustomOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900">
                เพิ่มตำแหน่งที่ต้องยื่นของหน่วยงาน
              </h2>
              <button
                type="button"
                onClick={() => setIsAddCustomOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCustom} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  ชื่อตำแหน่ง *
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น ผู้อำนวยการฝ่ายการเงิน, เจ้าหน้าที่ตรวจสอบ..."
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    สังกัด / หน่วยงาน *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น กองคลัง / สำนักปลัด"
                    value={customAgency}
                    onChange={(e) => setCustomAgency(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    หมวดหมู่
                  </label>
                  <select
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="specific_risk">ตำแหน่งเฉพาะ/ความเสี่ยงสูง</option>
                    <option value="high_civil">ข้าราชการระดับบริหาร/อำนวยการ</option>
                    <option value="local_gov">องค์กรปกครองส่วนท้องถิ่น</option>
                    <option value="state_enterprise">รัฐวิสาหกิจ/องค์การมหาชน</option>
                    <option value="political">ตำแหน่งทางการเมือง</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    ระยะเวลายื่น (วัน)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="180"
                    value={customDays}
                    onChange={(e) => setCustomDays(Number(e.target.value) || 60)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    หน่วยงานที่รับยื่น
                  </label>
                  <input
                    type="text"
                    value={customTarget}
                    onChange={(e) => setCustomTarget(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  ฐานอำนาจกฎหมาย / มติ / ประกาศ
                </label>
                <input
                  type="text"
                  value={customBasis}
                  onChange={(e) => setCustomBasis(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  คำอธิบายหรือขอบเขตหน้าที่
                </label>
                <textarea
                  rows={2}
                  value={customDesc}
                  onChange={(e) => setCustomDesc(e.target.value)}
                  placeholder="รายละเอียดตำแหน่ง เช่น ผู้มีอำนาจลงนามจัดซื้อจัดจ้าง..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddCustomOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold shadow-sm"
                >
                  บันทึกตำแหน่งใหม่
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
