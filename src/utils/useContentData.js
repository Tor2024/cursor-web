import { useState, useEffect, useCallback } from 'react';

/**
 * Universal hook for loading content data (news, portfolio, etc.)
 * @param {string} type - Content type: 'news' or 'portfolio'
 * @returns {Object} - { items, loading, error, refetch }
 */
export function useContentData(type) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/${type}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${type}`);
      }
      const data = await response.json();
      setItems(data.data || []);
    } catch (err) {
      console.error(`Error fetching ${type}:`, err);
      // Fallback to localStorage
      try {
        const localData = localStorage.getItem(`admin_${type}`);
        if (localData) {
          const parsed = JSON.parse(localData);
          setItems(parsed);
        } else {
          setItems([]);
        }
      } catch (e) {
        setItems([]);
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    items,
    loading,
    error,
    refetch: fetchData,
  };
}

