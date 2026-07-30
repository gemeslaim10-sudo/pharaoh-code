'use client';

import { useEffect } from 'react';
import { getDashboardChartsData } from '@/app/actions/dashboard';
import { auth } from '@/lib/firebase/config';

export default function DashboardScriptsCharts() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initCharts = (lineData: number[], pieData: number[]) => {
        if (!window.$ || !window.Chart) {
            setTimeout(() => initCharts(lineData, pieData), 100);
            return;
        }

        window.$(document).ready(function() {
            const lineChartEl = document.getElementById('lineChart') as HTMLCanvasElement | null;
            if(lineChartEl && window.Chart) {
                const existingLineChart = (window as any).Chart.getChart(lineChartEl);
                if (existingLineChart) existingLineChart.destroy();
                
                const ctxLine = lineChartEl.getContext('2d');
                if (ctxLine) {
                    new window.Chart(ctxLine, {
                        type: 'line',
                        data: {
                            labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو'],
                            datasets: [{
                                label: 'الطلبات',
                                data: lineData,
                                borderColor: '#C5A16F',
                                backgroundColor: 'rgba(197, 161, 111, 0.05)',
                                borderWidth: 2,
                                tension: 0.4,
                                fill: true,
                                pointBackgroundColor: '#FFFFFF',
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { display: false } },
                            scales: {
                                y: { grid: { color: 'rgba(255, 255, 255, 0.03)' }, ticks: { color: '#9ca3af', font: { family: 'Tajawal', size: 10 } } },
                                x: { grid: { display: false }, ticks: { color: '#9ca3af', font: { family: 'Tajawal', size: 10 } } }
                            }
                        }
                    });
                }
            }

            const pieChartEl = document.getElementById('pieChart') as HTMLCanvasElement | null;
            if(pieChartEl && window.Chart) {
                const existingPieChart = (window as any).Chart.getChart(pieChartEl);
                if (existingPieChart) existingPieChart.destroy();
                
                const ctxPie = pieChartEl.getContext('2d');
                if (ctxPie) {
                    new window.Chart(ctxPie, {
                        type: 'doughnut',
                        data: {
                            labels: ['تطبيقات', 'أنظمة ERP', 'مواقع الكترونية', 'تسويق وسيو'],
                            datasets: [{
                                data: pieData,
                                backgroundColor: ['#C5A16F', '#3b82f6', '#8b5cf6', '#10b981'],
                                borderWidth: 4,
                                borderColor: '#112240'
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    position: window.innerWidth < 640 ? 'bottom' : 'right',
                                    labels: { color: '#d1d5db', font: { family: 'Tajawal', size: 11 } }
                                }
                            }
                        }
                    });
                }
            }
        });
    };

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
        let lineData = [0, 0, 0, 0, 0, 0, 0];
        let pieData = [0, 0, 0, 0];

        if (user) {
            try {
                const token = await user.getIdToken();
                const data = await getDashboardChartsData(token);
                lineData = data.lineChartData;
                pieData = data.pieChartData;
            } catch (e) {
                console.error("Failed to fetch dynamic chart data, using defaults.");
            }
        }

        initCharts(lineData, pieData);
    });
    
    return () => unsubscribe();
  }, []);

  return null;
}
