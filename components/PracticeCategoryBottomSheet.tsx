import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ThemedText } from '@/components/ThemedText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const renderBackdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop
    {...props}
    appearsOnIndex={0}
    disappearsOnIndex={-1}
  />
);

export interface PracticeCategoryBottomSheetProps {
  categories: any[];  // Define the type based on your actual category data structure
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  snapPoints: (string | number)[];
  handleCategoryChange: (categoryName: string) => void;
  colorScheme: string | null | undefined;
}

export const PracticeCategoryBottomSheet: React.FC<PracticeCategoryBottomSheetProps> = ({
  categories,
  bottomSheetModalRef,
  snapPoints,
  handleCategoryChange,
  colorScheme,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      topInset={insets.top}
      handleStyle={{
        paddingTop: 12,
        paddingBottom: 12,
      }}
      backgroundStyle={{
        backgroundColor: Colors[colorScheme ?? 'light'].background,
        shadowColor: Colors[colorScheme ?? 'light'].shadow,
      }}
      handleIndicatorStyle={{
        backgroundColor: Colors[colorScheme ?? 'light'].border,
        width: 40,
        height: 4,
      }}
      style={{
        paddingBottom: 30,
      }}
    >
      <BottomSheetScrollView
        style={{
          padding: 16,
          paddingBottom: insets.bottom + 60
        }}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={category._id}
            onPress={() => handleCategoryChange(category.name)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 12,
              paddingHorizontal: 16,
              justifyContent: 'space-between',
              marginBottom: index === categories.length - 1 ? 60 : 0
            }}
          >
            <ThemedText style={{ fontSize: 16, color: Colors[colorScheme ?? 'light'].text, }}>
              {category.name}
            </ThemedText>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors[colorScheme ?? 'light'].textSecondary}
            />
          </TouchableOpacity>
        ))}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};