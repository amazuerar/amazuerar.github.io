import { ExternalLink, BookOpen, Library, Globe } from 'lucide-react';
import { ACKNOWLEDGMENTS } from '../data/acknowledgments';

const CATEGORY_ICONS = {
  'Guiding Surveys': BookOpen,
  'Resources': Library,
  'Official Model Blogs': Globe,
};

export default function AcknowledgmentsPage({ isDark, t }) {
  return (
    <div className="max-w-[1100px] mx-auto px-4 pb-24">
      {/* Header */}
      <div className="mb-16 pt-4">
        <span className={`text-[10px] font-black uppercase tracking-[0.6em] ${t.accent}`}>
          Sources
        </span>
        <h2 className={`text-6xl font-black tracking-tighter mt-3 mb-6 ${t.yearLabel}`}>
          Acknowledgments
        </h2>
        <p className={`text-2xl leading-relaxed font-medium tracking-tight ${isDark ? 'text-[#94A3B8]' : 'text-[#737373]'}`}>
          This atlas stands on the shoulders of the researchers, engineers, and open-source 
          communities who built and documented these models.
        </p>
      </div>

      {/* Category sections */}
      <div className="space-y-16">
        {ACKNOWLEDGMENTS.map(({ category, items }) => {
          const Icon = CATEGORY_ICONS[category] || Globe;
          return (
            <div key={category}>
              {/* Category header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2.5 rounded-xl flex-shrink-0">
                  <Icon className="text-white" size={18} />
                </div>
                <div>
                  <h3 className={`text-xl font-black tracking-tight ${t.yearLabel}`}>{category}</h3>
                  <div className={`h-[2px] w-16 mt-1.5 rounded-full ${t.accentGradient}`} />
                </div>
              </div>

              {/* Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map(item => (
                  <a
                    key={item.title}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`group block p-8 rounded-[2rem] border transition-all duration-300 ${t.card} hover:border-cyan-500/50 hover:-translate-y-1 hover:shadow-xl`}
                  >
                    <div className="flex items-start justify-between gap-6 mb-3">
                      <div className="flex-1">
                        <div className={`text-[10px] font-black uppercase tracking-widest mb-2 ${t.muted}`}>
                          {item.authors}
                        </div>
                        <h4 className={`text-lg font-black tracking-tight leading-snug group-hover:text-cyan-500 transition-colors ${t.yearLabel}`}>
                          {item.title}
                        </h4>
                      </div>
                      <ExternalLink
                        size={16}
                        className={`flex-shrink-0 mt-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${t.accent}`}
                      />
                    </div>
                    <p className={`text-[13px] leading-relaxed font-medium ${isDark ? 'text-[#4A5568]' : 'text-[#737373]'}`}>
                      {item.desc}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
