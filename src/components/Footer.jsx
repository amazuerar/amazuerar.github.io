import { Activity } from 'lucide-react';
import { MODELS } from '../data/models';
import { VERIFIED_DATE_LONG } from '../data/atlasConfig';

export default function Footer({ t }) {
  return (
    <footer className={`fixed bottom-0 left-0 right-0 h-10 border-t px-6 flex items-center justify-between text-[10px] font-black uppercase tracking-widest transition-colors z-[80] ${t.footerBg}`}>
      <div className="flex gap-10">
        <span className="flex items-center gap-2">
          <Activity size={10} className="text-blue-400" />
          Active Registry: {MODELS.length}
        </span>
      </div>
      <div className="hidden sm:block">Snapshot: {VERIFIED_DATE_LONG}</div>
    </footer>
  );
}
