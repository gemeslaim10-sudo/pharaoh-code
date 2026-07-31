'use client';

import UnifiedContactForm from '@/components/shared/UnifiedContactForm';
import { useTranslation } from '@/contexts/LanguageContext';

export default function ContactForm() {
    const { t } = useTranslation();

    return (
        <UnifiedContactForm 
            badgeText=""
            title=""
            subtitle=""
            buttonText={t('contact.sendBtn')}
        />
    );
}
