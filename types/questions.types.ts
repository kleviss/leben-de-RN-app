export interface Question {
  _id: string;
  categoryId: string;
  question: string;
  options: string[];
  answer: string;
  difficulty: string;
  images: string[];
}

export interface QuestionCardProps {
  item: Question;
  colorScheme: string | null | undefined;
}
