import { FlatList, SafeAreaView, useColorScheme } from 'react-native';
import React, { useCallback, useMemo, useRef } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { CategoryBottomSheet } from '@/components/Katalog/CategoryBottomSheet';
import { CategoryCard } from '@/components/Katalog/CategoryCard';
import { ErrorView } from '@/components/Katalog/ErrorView';
import { KatalogHeader } from '@/components/Katalog/KatalogHeader';
import { LoadingView } from '@/components/Katalog/LoadingView';
import { ThemedView } from '@/components/ThemedView';
import { createStyles } from '@/styles/katalog.styles';
import { useCategories } from '@/hooks/useCategories';
import { useRouter } from 'expo-router';

export default function KatalogScreen() {
  const { categories, isLoading, hasRequestFailed, fetchCategories } = useCategories();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['55%', '75%'], []);
  const styles = createStyles(colorScheme);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleCardPress = useCallback((category: string) => {
    bottomSheetModalRef.current?.dismiss();
    router.push({
      pathname: '/questions/[category]',
      params: { category: encodeURIComponent(category) }
    });
  }, [router]);

  return (
    <SafeAreaView style={styles.container}>
      <KatalogHeader
        onPickerPress={() => bottomSheetModalRef.current?.present()}
      />

      {isLoading ? (
        <LoadingView />
      ) : hasRequestFailed ? (
        <ErrorView onRetry={fetchCategories} />
      ) : (
        <ThemedView style={styles.content}>
          <FlatList
            data={categories}
            renderItem={({ item }) => (
              <CategoryCard
                item={item}
                onPress={handleCardPress}
                colorScheme={colorScheme}
                isLoading={isLoading}
              />
            )}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </ThemedView>
      )}

      <CategoryBottomSheet
        categories={categories}
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        handleSheetChanges={handleSheetChanges}
        handleCardPress={handleCardPress}
        colorScheme={colorScheme}
      />
    </SafeAreaView>
  );
}