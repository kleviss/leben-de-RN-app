import { useEffect, useState } from 'react';

import { QUESTIONS_API } from '@/api/routes';
import { Question } from '@/types/questions.types';

export const useQuestions = (categoryId: string) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasRequestFailed, setHasRequestFailed] = useState(false);

  const fetchQuestions = async () => {
    console.log('trying to fetch questions');
    try {
      setIsLoading(true);
      const response = await fetch(QUESTIONS_API.GET_V2);
      const data = await response.json();

      const filteredQuestions =
        categoryId === 'Gesamtfragenkatalog'
          ? data
          : data.filter((q: Question) => q.categoryId === categoryId);

      setQuestions(filteredQuestions);
      setHasRequestFailed(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setHasRequestFailed(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [categoryId]);

  return { questions, isLoading, hasRequestFailed, fetchQuestions };
};
