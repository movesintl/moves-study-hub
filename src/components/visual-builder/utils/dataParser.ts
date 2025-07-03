export const parseInitialData = (initialData?: string): string => {
  if (!initialData || initialData === '{}') {
    return '';
  }

  try {
    const data = typeof initialData === 'string' ? JSON.parse(initialData) : initialData;
    return data.html || data.content || '';
  } catch (e) {
    console.warn('Failed to parse initial data, using empty content');
    return '';
  }
};