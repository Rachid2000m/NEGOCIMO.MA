import { motion } from 'motion/react';
import { Users, Package, Eye, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', visites: 4000, leads: 240 },
  { name: 'Fév', visites: 3000, leads: 139 },
  { name: 'Mar', visites: 2000, leads: 980 },
  { name: 'Avr', visites: 2780, leads: 390 },
  { name: 'Mai', visites: 1890, leads: 480 },
  { name: 'Juin', visites: 2390, leads: 380 },
  { name: 'Juil', visites: 3490, leads: 430 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-heading text-navy">Tableau de bord</h1>
        <p className="text-gray-500 mt-2">Bienvenue sur votre espace d'administration NEGOCIMO.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Visites du site" value="24.5k" trend="+12%" icon={Eye} positive />
        <StatCard title="Demandes de devis" value="142" trend="+5%" icon={Users} positive />
        <StatCard title="Produits Catalogue" value="84" trend="-2%" icon={Package} positive={false} />
        <StatCard title="Taux de conversion" value="3.2%" trend="+0.4%" icon={ArrowUpRight} positive />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold font-heading text-navy mb-6">Évolution du trafic (Visites vs Leads)</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#9CA3AF" tick={{fill: '#4B5563'}} />
              <YAxis stroke="#9CA3AF" tick={{fill: '#4B5563'}} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Line type="monotone" dataKey="visites" stroke="#1E2B3E" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
              <Line type="monotone" dataKey="leads" stroke="#C3A35C" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, icon: Icon, positive }: { title: string, value: string, trend: string, icon: any, positive: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center">
          <Icon className="w-6 h-6 text-navy" />
        </div>
        <span className={`flex items-center text-sm font-semibold px-2 py-1 rounded-full ${positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {positive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
          {trend}
        </span>
      </div>
      <div>
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <p className="text-3xl font-bold text-navy mt-1">{value}</p>
      </div>
    </motion.div>
  );
}
