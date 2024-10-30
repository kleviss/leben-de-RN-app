import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';

export interface Category {
  _id: string;
  name: string;
  label: string;
  imageUrl: string;
  description: string;
  numQuestions: number;
}

export interface CategoryCardProps {
  item: Category;
  onPress: (id: string) => void;
  colorScheme: string | null | undefined;
  isLoading?: boolean;
}

export interface CategoryBottomSheetProps {
  categories: Category[];
  bottomSheetModalRef: React.RefObject<any>;
  snapPoints: string[];
  handleSheetChanges: (index: number) => void;
  handleCardPress: (id: string) => void;
  colorScheme: string | null | undefined;
}
