'use server';

import fs from 'fs';
import path from 'path';

/**
 * Scans the (frontend) app directory for available pages.
 * Returns a list of { value, label } objects for the dropdown.
 * Excludes utility/layout pages and only includes actual service-type pages.
 */
export async function getAvailablePages(): Promise<{ value: string; label: string }[]> {
    const excludedDirs = new Set([
        'start-project',
        'contact',
        'about',
        'portfolio',
        'team',
        'clients',
        'services',
        'privacy-policy',
        'terms-conditions',
    ]);

    try {
        const frontendDir = path.join(process.cwd(), 'src', 'app', '(frontend)');
        const entries = fs.readdirSync(frontendDir, { withFileTypes: true });

        const pages: { value: string; label: string }[] = [];

        for (const entry of entries) {
            if (!entry.isDirectory()) continue;
            if (excludedDirs.has(entry.name)) continue;

            // Check if this directory has a page.tsx file
            const pagePath = path.join(frontendDir, entry.name, 'page.tsx');
            if (!fs.existsSync(pagePath)) continue;

            pages.push({
                value: `/${entry.name}`,
                label: entry.name,
            });
        }

        // Sort alphabetically by label
        pages.sort((a, b) => a.label.localeCompare(b.label));

        return pages;
    } catch (error) {
        console.error('Failed to scan available pages:', error);
        return [];
    }
}
