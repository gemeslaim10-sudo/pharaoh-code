'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getHomeContent, updateHomeContent } from '@/app/actions/dashboard/homeContent';
import {
  type HomeContentData,
  type HomeWorkflowStepContent,
  INITIAL_HOME_CONTENT,
  EMPTY_WORKFLOW_STEP,
} from '@/types/homeContent';

export type HomeContentTabId = 'hero' | 'headers' | 'workflow' | 'creative';

export function useHomeContentForm() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<HomeContentTabId>('hero');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [form, setForm] = useState<HomeContentData>(INITIAL_HOME_CONTENT);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const content = await getHomeContent();
      if (content && Object.keys(content).length > 0) {
        setForm(prev => {
          const rawSteps = content.workflow?.steps;
          const steps: HomeWorkflowStepContent[] = Array.isArray(rawSteps) && rawSteps.length > 0
            ? rawSteps.map((step: any) => ({ ...EMPTY_WORKFLOW_STEP, ...(step || {}) }))
            : prev.workflow.steps;

          return {
            hero: { ...prev.hero, ...(content.hero || {}) },
            portfolio: { ...prev.portfolio, ...(content.portfolio || {}) },
            services: { ...prev.services, ...(content.services || {}) },
            clients: { ...prev.clients, ...(content.clients || {}) },
            creative: { ...prev.creative, ...(content.creative || {}) },
            workflow: { ...prev.workflow, ...(content.workflow || {}), steps },
            team: { ...prev.team, ...(content.team || {}) },
            testimonials: { ...prev.testimonials, ...(content.testimonials || {}) },
          };
        });
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setMessage(null);

    try {
      const token = await user.getIdToken();
      // Drop completely blank steps, otherwise the site would render empty cards
      // instead of falling back to the built-in default workflow steps.
      const cleanSteps = (form.workflow.steps || []).filter(step =>
        (step.title_ar || step.title_en || step.description_ar || step.description_en || step.iconSvg || '').trim() !== ''
      );
      const payload: HomeContentData = {
        ...form,
        workflow: { ...form.workflow, steps: cleanSteps },
      };
      const res = await updateHomeContent(token, payload);
      if (res.success) {
        setMessage({ type: 'success', text: 'تم حفظ نصوص الصفحة الرئيسية ونشر التحديثات بنجاح!' });
      } else {
        setMessage({ type: 'error', text: res.error || 'حدث خطأ أثناء الحفظ.' });
      }
    } catch (err) {
      const error = err as Error;
      setMessage({ type: 'error', text: error.message || 'حدث خطأ غير متوقع.' });
    } finally {
      setSaving(false);
    }
  };

  return { loading, saving, activeTab, setActiveTab, message, form, setForm, handleSave };
}
