import { Outlet } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import SiteNavbar from '../components/SiteNavbar';

export default function SiteLayout() {
  const { isDark, toggle, t } = useTheme('light');

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} font-sans transition-colors duration-300`}>
      <SiteNavbar isDark={isDark} toggle={toggle} t={t} />
      <Outlet context={{ isDark, toggle, t }} />
    </div>
  );
}
