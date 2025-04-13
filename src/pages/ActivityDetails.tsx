import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Sample Bangalore route coordinates (lat, lon)
const routeCoordinates: LatLngExpression[] = [
  [12.9716, 77.5946],  // Start point (Bangalore city center)
  [12.9352, 77.6244],  // Intermediate point
  [12.9249, 77.6930]   // End point (another location in Bangalore)
];

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { 
  Timer,
  Flame,
  Navigation,
  Heart,
  Plus,
} from 'lucide-react';

const mockActivityData = {
  summary: {
    type: 'Running',
    duration: '45 mins',
    distance: '5.8 km',
    calories: 450,
    avgPace: '7:45 /km',
    avgHeartRate: 145,
  },
  heartRateData: Array.from({ length: 45 }, (_, i) => ({
    minute: i + 1,
    heartRate: Math.floor(130 + Math.random() * 40),
  })),
  paceData: Array.from({ length: 6 }, (_, i) => ({
    kilometer: i + 1,
    pace: Math.floor(440 + Math.random() * 40),
  })),
  elevationData: Array.from({ length: 6 }, (_, i) => ({
    kilometer: i + 1,
    elevation: Math.floor(50 + Math.random() * 30),
  })),
};

function StatCard({ icon: Icon, label, value, unit }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <span className="text-gray-600">{label}</span>
      </div>
      <div className="text-2xl font-bold">
        {value}
        <span className="text-sm font-normal text-gray-500 ml-1">{unit}</span>
      </div>
    </div>
  );
}

function ActivityDetails() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [personalNote, setPersonalNote] = useState('');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Activity Details</h1>
          <p className="text-gray-500">Morning Run • Thursday, March 14, 2024</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          Add Activity
        </button>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          icon={Timer}
          label="Duration"
          value={mockActivityData.summary.duration}
        />
        <StatCard
          icon={Navigation}
          label="Distance"
          value={mockActivityData.summary.distance}
        />
        <StatCard
          icon={Flame}
          label="Calories"
          value={mockActivityData.summary.calories}
          unit="kcal"
        />
        <StatCard
          icon={Heart}
          label="Avg Heart Rate"
          value={mockActivityData.summary.avgHeartRate}
          unit="bpm"
        />
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-8">
          {['overview', 'heart rate', 'pace', 'route', 'elevation', 'notes'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`py-4 px-2 border-b-2 transition-colors ${
                selectedTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        {selectedTab === 'overview' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Activity Overview</h2>
            <div className="grid grid-cols-2 gap-8">
              {/* Heart Rate Chart */}
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-4">Heart Rate</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockActivityData.heartRateData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="minute" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="heartRate" 
                        stroke="#DC2626" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Pace Chart */}
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-4">Pace per Kilometer</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockActivityData.paceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="kilometer" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="pace" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'heart rate' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Heart Rate Analysis</h2>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockActivityData.heartRateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="minute" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="heartRate" 
                    stroke="#DC2626" 
                    strokeWidth={2}
                    name="Heart Rate (bpm)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {selectedTab === 'pace' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Pace Analysis</h2>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockActivityData.paceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="kilometer" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="pace" 
                    fill="#3B82F6" 
                    name="Pace (min/km)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {selectedTab === 'route' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Route Map</h2>
            <div className="h-96 bg-gray-100 rounded-lg">
              <MapContainer center={[12.9716, 77.5946]} zoom={12} className="h-full w-full">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Polyline positions={routeCoordinates} color="blue" />
                <Marker position={[12.9716, 77.5946]}>
                  <Popup>Start: Bangalore City Center</Popup>
                </Marker>
                <Marker position={[12.9249, 77.6930]}>
                  <Popup>End: Another Location</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        )}

        {selectedTab === 'elevation' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Elevation Profile</h2>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockActivityData.elevationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="kilometer" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="elevation" 
                    stroke="#34D399" 
                    strokeWidth={2}
                    name="Elevation (m)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {selectedTab === 'notes' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Personal Notes</h2>
            <textarea
              value={personalNote}
              onChange={(e) => setPersonalNote(e.target.value)}
              placeholder="Add your notes here..."
              className="w-full p-4 bg-gray-100 rounded-lg"
              rows={5}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ActivityDetails;
