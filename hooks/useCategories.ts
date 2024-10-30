import { useEffect, useState } from 'react';

import { CATEGORIES_API } from '@/api/routes';
import { Category } from '@/types/katalog.types';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasRequestFailed, setHasRequestFailed] = useState(false);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(CATEGORIES_API.GET_ALL);
      const data = await response.json();
      const gesamtfragenkatalog = data.find((category) => category.name === 'Gesamtfragenkatalog');
      const rest = data.filter((category) => category.name !== 'Gesamtfragenkatalog');
      setCategories([gesamtfragenkatalog, ...rest]);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setHasRequestFailed(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, isLoading, hasRequestFailed, fetchCategories };
};
