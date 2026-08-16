'use client';

import { useState } from 'react';
import { Skill, Stat } from './workFormTypes';

export function useWorkSkillsAndStats() {
  const [skills, setSkills] = useState<Skill[]>([{ name: '', value: '' }]);
  const [stats, setStats] = useState<Stat[]>([{ value: '', label: '' }]);

  const handleAddSkill = () => setSkills(prev => [...prev, { name: '', value: '' }]);
  const handleRemoveSkill = (index: number) => setSkills(prev => prev.filter((_, i) => i !== index));
  const handleSkillChange = (index: number, field: keyof Skill, val: string) => {
    setSkills(prev => prev.map((s, i) => i === index ? { ...s, [field]: val } : s));
  };

  const handleAddStat = () => setStats(prev => [...prev, { value: '', label: '' }]);
  const handleRemoveStat = (index: number) => setStats(prev => prev.filter((_, i) => i !== index));
  const handleStatChange = (index: number, field: keyof Stat, val: string) => {
    setStats(prev => prev.map((s, i) => i === index ? { ...s, [field]: val } : s));
  };

  const resetSkillsAndStats = () => {
    setSkills([{ name: '', value: '' }]);
    setStats([{ value: '', label: '' }]);
  };

  return {
    skills, setSkills, stats, setStats,
    handleAddSkill, handleRemoveSkill, handleSkillChange,
    handleAddStat, handleRemoveStat, handleStatChange,
    resetSkillsAndStats
  };
}
