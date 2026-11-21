import React from 'react';
import { Hero } from '../components/Hero';
import { AboutGenesis } from '../components/AboutGenesis';
import { Experience } from '../components/Experience';
import { PassCTA } from '../components/PassCTA';

export const Home: React.FC = () => {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <AboutGenesis />
      <Experience />
      <PassCTA />
    </main>
  );
};
