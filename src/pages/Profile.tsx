import React, { useState } from 'react';
import { 
  Mail,
  Bell,
  Smartphone,
  Moon,
  Settings,
  Camera,
  Edit2,
  Save
} from 'lucide-react';

const mockUser = {
  name: 'Kiran Badakambi',
  email: 'kiranrajbadakambi@gmail.com',
  avatar: '/kiru_raj.jpg',
  stats: {
    memberSince: 'March 2024',
    workoutsCompleted: 48,
    achievementsEarned: 12,
  },
  preferences: {
    notifications: true,
    darkMode: false,
    units: 'metric',
  },
  devices: [
    { name: 'Apple Watch Series 8', connected: true, lastSync: '2 mins ago' },
    { name: 'Fitbit Charge 5', connected: false, lastSync: '2 days ago' },
  ],
};

function ProfileSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState(mockUser);

  const handleSave = () => {
    setEditMode(false);
    // Here you would typically save to backend
    console.log('Saving user data:', userData);
  };

  const handleChange = (field: string, value: any) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-gray-500">Manage your account settings and preferences</p>
      </div>

      {/* Profile Overview */}
      <div className="bg-white p-8 rounded-xl shadow-sm">
        <div className="flex items-start gap-8">
          <div className="relative">
            <img
              src={userData.avatar}
              alt="Profile"
              className="w-24 h-24 rounded-full"
            />
            <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <h2 className="text-2xl font-bold">{userData.name}</h2>
              {editMode ? (
                <button
                  onClick={handleSave}
                  className="p-2 text-green-500 hover:bg-green-50 rounded-full"
                >
                  <Save className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              )}
            </div>
            <p className="text-gray-500 mb-4">{userData.email}</p>
            <div className="flex gap-8">
              <div>
                <div className="text-sm text-gray-500">Member Since</div>
                <div className="font-medium">{userData.stats.memberSince}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Workouts</div>
                <div className="font-medium">{userData.stats.workoutsCompleted}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Achievements</div>
                <div className="font-medium">{userData.stats.achievementsEarned}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Personal Information */}
        <ProfileSection title="Personal Information">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={userData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                disabled={!editMode}
                className="w-full p-2 border rounded-lg disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={userData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                disabled={!editMode}
                className="w-full p-2 border rounded-lg disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <button className="text-blue-600 text-sm font-medium">
                Change Password
              </button>
            </div>
          </form>
        </ProfileSection>

        {/* Connected Devices */}
        <ProfileSection title="Connected Devices">
          <div className="space-y-4">
            {userData.devices.map((device, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="font-medium">{device.name}</div>
                    <div className="text-sm text-gray-500">
                      Last synced: {device.lastSync}
                    </div>
                  </div>
                </div>
                <div className={`text-sm ${device.connected ? 'text-green-600' : 'text-gray-500'}`}>
                  {device.connected ? 'Connected' : 'Disconnected'}
                </div>
              </div>
            ))}
            <button className="w-full p-4 border-2 border-dashed border-gray-200 rounded-lg text-gray-500 hover:border-gray-300 hover:text-gray-600">
              + Connect New Device
            </button>
          </div>
        </ProfileSection>

        {/* Notifications */}
        <ProfileSection title="Notifications">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="font-medium">Push Notifications</div>
                  <div className="text-sm text-gray-500">
                    Receive alerts for activities and goals
                  </div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked={userData.preferences.notifications} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="font-medium">Email Notifications</div>
                  <div className="text-sm text-gray-500">
                    Receive weekly progress reports
                  </div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </ProfileSection>

        {/* Preferences */}
        <ProfileSection title="Preferences">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="font-medium">Dark Mode</div>
                  <div className="text-sm text-gray-500">
                    Switch to dark theme
                  </div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked={userData.preferences.darkMode} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="font-medium">Units</div>
                  <div className="text-sm text-gray-500">
                    Choose your preferred measurement system
                  </div>
                </div>
              </div>
              <select 
                className="p-2 border rounded-lg"
                value={userData.preferences.units}
                onChange={(e) => handleChange('preferences', { ...userData.preferences, units: e.target.value })}
              >
                <option value="metric">Metric (km, kg)</option>
                <option value="imperial">Imperial (mi, lb)</option>
              </select>
            </div>
          </div>
        </ProfileSection>
      </div>
    </div>
  );
}

export default Profile;