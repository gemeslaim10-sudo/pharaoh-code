'use client';

import DashboardSettingsScriptsCore from '@/components/dashboard/settings/DashboardSettingsScriptsCore';
import DashboardSettingsScriptsForms from '@/components/dashboard/settings/DashboardSettingsScriptsForms';
import DashboardSettingsScriptsHandlers from '@/components/dashboard/settings/DashboardSettingsScriptsHandlers';
import DashboardSettingsHeader from '@/components/dashboard/settings/DashboardSettingsHeader';
import SettingsIdentity from '@/components/dashboard/settings/SettingsIdentity';
import SettingsSecurity from '@/components/dashboard/settings/SettingsSecurity';
import SettingsSocial from '@/components/dashboard/settings/SettingsSocial';
import SettingsSystem from '@/components/dashboard/settings/SettingsSystem';

export default function DashboardSettings() {
    return (
        <>
            <DashboardSettingsScriptsCore />
            <DashboardSettingsScriptsForms />
            <DashboardSettingsScriptsHandlers />
            
            <DashboardSettingsHeader />
            <SettingsIdentity />
            <SettingsSecurity />
            <SettingsSocial />
            <SettingsSystem />
        </>
    );
}
