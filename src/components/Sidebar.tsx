
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Activity, 
  Heart, 
  Target, 
  User, 
  MessageSquare,
  Dumbbell
} from 'lucide-react';

function Sidebar() {
  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/activity', icon: Activity, label: 'Activity' },
    { path: '/insights', icon: Heart, label: 'Health Insights' },
    { path: '/goals', icon: Target, label: 'Goals' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/contact', icon: MessageSquare, label: 'Contact' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6 fixed h-screen overflow-y-auto">
      <div className="flex items-center gap-2 mb-8">
        <Dumbbell className="w-8 h-8 text-blue-600" />
        <span className="text-xl font-bold">FitTrack</span>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;