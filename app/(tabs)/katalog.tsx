import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { StyleSheet, View, SafeAreaView, Modal, TouchableOpacity, FlatList, useColorScheme, Button, Image, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { Divider } from 'react-native-paper';
import { CATEGORIES_API } from '../../api/routes/index.js';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PanResponder, Pressable } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

interface Category {
  _id: string;
  name: string;
  label: string;
  imageUrl: string;
  description: string;
  numQuestions: number;
}

export default function KatalogScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Gesamtfragenkatalog');
  const [isLoading, setIsLoading] = useState(true);
  const [hasRequestFailed, setHasRequestFailed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  // Change the ref type
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['55%', '75%'], [])

  // Update the open/close methods
  const openPicker = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const closePicker = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(CATEGORIES_API.GET_ALL);
      const data = await response.json();
      // sort data with gesamtfragenkatalog first
      const gesamtfragenkatalog = data.find(category => category.name === 'Gesamtfragenkatalog');
      const rest = data.filter(category => category.name !== 'Gesamtfragenkatalog');
      setCategories([gesamtfragenkatalog, ...rest]);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setHasRequestFailed(true);
    } finally {
      setIsLoading(false);
    }
  };
  const baseColor = Colors[colorScheme ?? 'light'].background;
  const backgroundColor = baseColor === '#ffffff' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.2)';

  const handleCardPress = (category: string) => {
    closePicker();
    router.push({
      pathname: '/questions/[category]',
      params: { category: encodeURIComponent(category) }
    });
  };


  const renderCard = ({ item }: { item: Category }) => (
    <TouchableOpacity onPress={() => handleCardPress(item._id)}>
      <View style={[styles.wrapper, { backgroundColor }]}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <ThemedText style={styles.cardTitle}>{item.name}</ThemedText>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </View>
          <View style={styles.cardContent}>
            <ThemedText style={styles.cardSubtitle}>{item.numQuestions} Fragen</ThemedText>
          </View>

          {item.imageUrl ? <Image source={{ uri: item.imageUrl }} style={styles.cardImage} /> :
            <View style={styles.cardImagePlaceholder}>
              {isLoading && <ActivityIndicator size="small" color={Colors[colorScheme ?? 'light'].tint} />}
              <ThemedText>Kein Bild verfügbar</ThemedText>
            </View>
          }
        </View>
      </View>
      <Divider style={{ marginBottom: 24, marginTop: 12, marginHorizontal: 16 }} />
    </TouchableOpacity>
  );

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    []
  );

  const getModalStyles = (colorScheme: string | null | undefined) => ({
    modalContent: {
      padding: 16,
      marginBottom: 16,
    },
    modalTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 26,
      textAlign: 'center',
      color: Colors[colorScheme ?? 'light'].text,
    },
    optionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 8,
      marginBottom: 2,
      backgroundColor: Colors[colorScheme ?? 'light'].background,
      borderRadius: 12,
    },
    optionText: {
      fontSize: 14,
      color: Colors[colorScheme ?? 'light'].text,
      marginBottom: -8,
    },
    separator: {
      height: 1,
      backgroundColor: Colors[colorScheme ?? 'light'].border,
      marginVertical: 2,
    }
  });

  const dynamicStyles = getModalStyles(colorScheme);

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={[styles.header, { backgroundColor: 'transparent' }]}>
        <ThemedText type="title">Fragenkatalog</ThemedText>
        <TouchableOpacity onPress={openPicker} style={styles.pickerButton}>
          <ThemedText numberOfLines={1} style={styles.pickerButtonText}>
            Alle Fragen
          </ThemedText>
          <Ionicons name="chevron-down" size={24} color={colorScheme === 'dark' ? 'white' : 'black'} />
        </TouchableOpacity>
      </ThemedView>
      {isLoading ? <View style={styles.middleScreenContainer}>
        <ActivityIndicator size="large" color={Colors[colorScheme ?? 'light'].tint} />
      </View> :
        hasRequestFailed && !isLoading ?
          <View style={styles.middleScreenContainer}>
            <ThemedText>Fehler beim Laden der Kategorien</ThemedText>
            <Button title="Erneut versuchen" onPress={fetchCategories} />
          </View> :
          <ThemedView style={styles.content}>
            <FlatList
              data={categories}
              renderItem={renderCard}
              keyExtractor={(item) => item._id}
            />
          </ThemedView>
      }

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        topInset={insets.top}
        // bottomInset={insets.bottom}
        handleStyle={{
          paddingTop: 12, // Add some padding at the top
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
        <BottomSheetScrollView style={[dynamicStyles.modalContent, { paddingBottom: insets.bottom + 60 }]}>
          <ThemedText style={dynamicStyles.modalTitle as TextStyle}>
            Kategorien
          </ThemedText>
          {categories.map((category, index) => (
            <React.Fragment key={category._id}>
              {/* @ts-ignore */}
              <TouchableOpacity
                onPress={() => handleCardPress(category._id)}
                style={dynamicStyles.optionItem as ViewStyle}
                activeOpacity={0.7}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {/* Optional: Add an icon for each category */}
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
                    <ThemedText style={{
                      fontSize: 13,
                      color: Colors[colorScheme ?? 'light'].textSecondary,
                      marginTop: 0
                    }}>
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


    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,

  },
  content: {
    flex: 1,
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  optionItem: {
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 160,
    padding: 10,
    // borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,

  },
  pickerButtonText: {
    fontWeight: 'bold',
    marginRight: 5,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    padding: 8,
  },
  categoryList: {
    paddingVertical: 8,
  },
  optionText: {
    fontSize: 16,
  },
  wrapper: {
    marginBottom: 12,
    padding: 24,
    borderRadius: 16,
  },
  card: {
    // marginBottom: 24,
    // borderRadius: 20,
    // overflow: 'hidden',
    // backgroundColor: '#fff',
    // shadowColor: '#1d1e1f',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,

  },
  cardContent: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // padding: 16,
    // margin: 10,
    // backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backdropFilter: 'blur(10px)', // For web
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  cardSubtitle: {
    fontSize: 14,
    color: 'white',
    marginBottom: 8,
  },
  cardImagePlaceholder: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    backgroundColor: '#8e8d8d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },


});
