import { useState } from 'react';
import Shell from '@/components/med/Shell';
import { NavKey } from '@/lib/medData';
import Dashboard from '@/components/med/sections/Dashboard';
import MedCard from '@/components/med/sections/MedCard';
import Labs from '@/components/med/sections/Labs';
import Documents from '@/components/med/sections/Documents';
import Symptoms from '@/components/med/sections/Symptoms';
import Family from '@/components/med/sections/Family';
import Cycle from '@/components/med/sections/Cycle';
import DoctorAccess from '@/components/med/sections/DoctorAccess';
import SettingsPage from '@/components/med/sections/SettingsPage';

const Index = () => {
  const [active, setActive] = useState<NavKey>('home');

  const render = () => {
    switch (active) {
      case 'home': return <Dashboard onNavigate={setActive} />;
      case 'card': return <MedCard />;
      case 'labs': return <Labs />;
      case 'docs': return <Documents />;
      case 'symptoms': return <Symptoms />;
      case 'family': return <Family />;
      case 'cycle': return <Cycle />;
      case 'access': return <DoctorAccess />;
      case 'settings': return <SettingsPage />;
      default: return <Dashboard onNavigate={setActive} />;
    }
  };

  return (
    <Shell active={active} onNavigate={setActive}>
      <div key={active}>{render()}</div>
    </Shell>
  );
};

export default Index;
