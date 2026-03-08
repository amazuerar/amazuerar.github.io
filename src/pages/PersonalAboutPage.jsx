import { useOutletContext } from 'react-router-dom';

const CERTS = ['eMAPT', 'CAPT', 'CMPen (Android & iOS)', 'PMPA'];

export default function PersonalAboutPage() {
  const { isDark } = useOutletContext();
  const muted    = isDark ? 'text-[#94A3B8]' : 'text-[#737373]';
  const labelCls = isDark ? 'text-[#94A3B8]' : 'text-[#737373]';
  const border   = isDark ? 'border-[#1E2533]' : 'border-[#E5E5E5]';

  return (
    <div className="pt-24 pb-20 px-8 max-w-[1100px] mx-auto">

      {/* Two-column grid: bio left, sidebar right */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12 lg:gap-16">

        {/* ── Left: bio + certificates ── */}
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.5em] text-blue-400 mb-4">
            About
          </p>

          <h1 className="text-[36px] font-black tracking-tight leading-tight mb-6">
            Alejandro Mazuera-Rozo
          </h1>

          <div className={`space-y-4 text-[14px] font-medium leading-relaxed mb-8 ${muted}`}>
            <p>
              I'm a Mobile Security Practitioner specializing in Android and iOS penetration testing.
              I uncover vulnerabilities through static and dynamic analysis, providing actionable
              insights to improve app security and data protection. Passionate about research and driven to advance mobile security.
            </p>
            <p>
              Currently exploring on-device AI security. Embedded models inside mobile apps raise
              interesting questions. I'm still working through, mapping the attack surface one test
              at a time.{' '}
              <a href="/atlas" className="text-blue-400 hover:text-blue-300 transition-colors">
                The On-Device SLM Atlas
              </a>{' '}
              is one of those efforts.
            </p>
          </div>

          {/* Certificates */}
          <div className={`border-t pt-6 ${border}`}>
            <p className={`font-mono text-[10px] font-bold uppercase tracking-[0.3em] mb-4 ${labelCls}`}>
              Certifications
            </p>
            <div className="flex flex-wrap gap-2">
              {CERTS.map(cert => (
                <span
                  key={cert}
                  className={`font-mono text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-lg border ${
                    isDark
                      ? 'border-[#1E2533] text-[#94A3B8] bg-[#151921]'
                      : 'border-[#E5E5E5] text-[#737373] bg-[#F5F5F5]'
                  }`}
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: sidebar ── */}
        <div className="flex flex-col gap-8 lg:pt-[72px]">

          {/* Interests */}
          <div className={`border-t pt-6 ${border}`}>
            <p className={`font-mono text-[10px] font-bold uppercase tracking-[0.3em] mb-4 ${labelCls}`}>
              Interests
            </p>
            <ul className={`space-y-1.5 text-[13px] font-medium ${muted}`}>
              <li>Mobile security research</li>
              <li>Android &amp; iOS reverse engineering</li>
              <li>Dynamic and static analysis assessment</li>
            </ul>
          </div>

          {/* Social */}
          <div className={`border-t pt-6 ${border}`}>
            <p className={`font-mono text-[10px] font-bold uppercase tracking-[0.3em] mb-4 ${labelCls}`}>
              Social
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="https://www.linkedin.com/in/mazuerarozo/"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[11px] font-bold text-blue-400 hover:text-blue-300 transition-colors"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://scholar.google.com/citations?user=yAqigKAAAAAJ&hl=en"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[11px] font-bold text-blue-400 hover:text-blue-300 transition-colors"
              >
                Google Scholar ↗
              </a>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
