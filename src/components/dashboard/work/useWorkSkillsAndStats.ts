'use client';

import { useState } from 'react';
import { Skill, Stat } from './workFormTypes';

export function useWorkSkillsAndStats() {
  const [skills, setSkills] = useState<Skill[]>([{ name: '', name_en: '', value: '' }]);
  const [stats, setStats] = useState<Stat[]>([{ value: '', label: '', label_en: '' }]);

  const handleAddSkill = () => setSkills(prev => [...prev, { name: '', name_en: '', value: '' }]);
  const handleRemoveSkill = (index: number) => setSkills(prev => prev.filter((_, i) => i !== index));
  const handleSkillChange = (index: number, field: keyof Skill, val: string) => {
    setSkills(prev => prev.map((s, i) => i === index ? { ...s, [field]: val } : s));
  };

  const handleAddStat = () => setStats(prev => [...prev, { value: '', label: '', label_en: '' }]);
  const handleRemoveStat = (index: number) => setStats(prev => prev.filter((_, i) => i !== index));
  const handleStatChange = (index: number, field: keyof Stat, val: string) => {
    setStats(prev => prev.map((s, i) => i === index ? { ...s, [field]: val } : s));
  };

  const resetSkillsAndStats = () => {
    setSkills([{ name: '', name_en: '', value: '' }]);
    setStats([{ value: '', label: '', label_en: '' }]);
  };

  return {
    skills, setSkills, stats, setStats,
    handleAddSkill, handleRemoveSkill, handleSkillChange,
    handleAddStat, handleRemoveStat, handleStatChange,
    resetSkillsAndStats
  };
}
