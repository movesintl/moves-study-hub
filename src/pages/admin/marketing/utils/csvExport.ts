import { MarketingConsent } from '../types';

export const exportToCSV = (data: MarketingConsent[], filename: string = 'marketing-consents') => {
  // Define CSV headers
  const headers = [
    'Name',
    'Email', 
    'Phone',
    'Source',
    'Consent Date',
    'Status'
  ];

  // Convert data to CSV rows
  const csvRows = data.map(consent => [
    `"${consent.student_name.replace(/"/g, '""')}"`, // Escape quotes in names
    `"${consent.student_email}"`,
    `"${consent.student_phone || 'N/A'}"`,
    `"${consent.source || 'Unknown'}"`,
    `"${new Date(consent.consent_date).toLocaleDateString()}"`,
    `"${consent.is_active ? 'Active' : 'Inactive'}"`
  ]);

  // Combine headers and data
  const csvContent = [
    headers.join(','),
    ...csvRows.map(row => row.join(','))
  ].join('\n');

  // Create and download the file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

export const exportSelectedToCSV = (
  allConsents: MarketingConsent[], 
  selectedIds: string[], 
  filename: string = 'selected-marketing-consents'
) => {
  const selectedConsents = allConsents.filter(consent => selectedIds.includes(consent.id));
  exportToCSV(selectedConsents, filename);
};

export const exportActiveConsentsToCSV = (
  allConsents: MarketingConsent[], 
  filename: string = 'active-marketing-consents'
) => {
  const activeConsents = allConsents.filter(consent => consent.is_active);
  exportToCSV(activeConsents, filename);
};