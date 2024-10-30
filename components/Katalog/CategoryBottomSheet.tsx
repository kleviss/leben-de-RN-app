import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

import { CategoryBottomSheetProps } from '@/types/katalog.types';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ThemedText } from '@/components/ThemedText';
import { getModalStyles } from '@/styles/katalog.styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const renderBackdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop
    {...props}
    appearsOnIndex={0}
    disappearsOnIndex={-1}
  />
);

export const CategoryBottomSheet: React.FC<CategoryBottomSheetProps> = ({
  categories,
  bottomSheetModalRef,
  snapPoints,
  handleSheetChanges,
  handleCardPress,
  colorScheme,
}) => {
  const insets = useSafeAreaInsets();
  const dynamicStyles = getModalStyles(colorScheme);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
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
        style={[
          dynamicStyles.modalContent,
          { paddingBottom: insets.bottom + 60 }
        ]}
      >
        <ThemedText style={dynamicStyles.modalTitle as TextStyle}>
          Kategorien
        </ThemedText>
        {categories.map((category, index) => (
          <React.Fragment key={category._id}>
            <TouchableOpacity
              onPress={() => handleCardPress(category._id)}
              style={dynamicStyles.optionItem as ViewStyle}
              activeOpacity={0.7}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons
                  name="folder-outline"
                  size={28}
                  color={Colors[colorScheme ?? 'light'].text}
                  style={{ marginRight: 12 }}
                />
                <View>
                  <ThemedText style={dynamicStyles.optionText}>
                    {category.name}
                  </ThemedText>
                  <ThemedText
                    style={{
                      fontSize: 13,
                      color: Colors[colorScheme ?? 'light'].textSecondary,
                      marginTop: 0
                    }}
                  >
                    {category.numQuestions} Fragen
                  </ThemedText>
                </View>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors[colorScheme ?? 'light'].textSecondary}
              />
            </TouchableOpacity>
            {index < categories.length - 1 && (
              <View style={dynamicStyles.separator} />
            )}
          </React.Fragment>
        ))}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};