import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Modal, TouchableOpacity, FlatList, useColorScheme, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';

const bundeslaender = [
  'Gesamtfragenkatalog', 'Allgemeine Fragen', 'Nordrhein-Westfalen', 'Bayern', 'Baden-Württemberg', 'Niedersachsen',
  'Hessen', 'Sachsen', 'Rheinland-Pfalz', 'Berlin', 'Schleswig-Holstein',
  'Brandenburg', 'Sachsen-Anhalt', 'Thüringen', 'Hamburg', 'Mecklenburg-Vorpommern',
  'Saarland', 'Bremen'
];

const bundeslaender2 = [
  { name: 'Gesamtfragenkatalog', label: 'Alle Fragen', img: require('@/assets/images/allgemeine.jpg'), numQuestions: 300 },
  // { name: 'Allgemeine Fragen', label: 'Allgemeine Fragen', img: require('@/assets/images/bundeslaender/germany.png') },
  { name: 'Nordrhein-Westfalen', label: 'Nordrhein-Westfalen', img: require('@/assets/images/nrw.jpg'), numQuestions: 160 },
  { name: 'Bayern', label: 'Bayern', img: require('@/assets/images/bayern.jpg'), numQuestions: 160 },
  { name: 'Baden-Württemberg', label: 'Baden-Württemberg', img: require('@/assets/images/baden-wuerttemberg.jpg'), numQuestions: 160 },
  { name: 'Niedersachsen', label: 'Niedersachsen', img: require('@/assets/images/niedersachsen.jpg'), numQuestions: 160 },
  { name: 'Hessen', label: 'Hessen', img: require('@/assets/images/hessen.jpg'), numQuestions: 160 },
  { name: 'Sachsen', label: 'Sachsen', img: require('@/assets/images/sachsen.jpg'), numQuestions: 160 },
  { name: 'Rheinland-Pfalz', label: 'Rheinland-Pfalz', img: require('@/assets/images/rheinland-pfalz.jpg'), numQuestions: 160 },
  { name: 'Berlin', label: 'Berlin', img: require('@/assets/images/berlin.jpg'), numQuestions: 160 },
  { name: 'Schleswig-Holstein', label: 'Schleswig-Holstein', img: require('@/assets/images/schleswig-holstein.jpg'), numQuestions: 160 },
  { name: 'Brandenburg', label: 'Brandenburg', img: require('@/assets/images/brandenburg.jpg'), numQuestions: 160 },
  { name: 'Sachsen-Anhalt', label: 'Sachsen-Anhalt', img: require('@/assets/images/sachsen-anhalt.jpg'), numQuestions: 160 },
  { name: 'Thüringen', label: 'Thüringen', img: require('@/assets/images/thueringen.jpg'), numQuestions: 160 },
  { name: 'Hamburg', label: 'Hamburg', img: require('@/assets/images/hamburg.jpg'), numQuestions: 160 },
  { name: 'Mecklenburg-Vorpommern', label: 'Mecklenburg-Vorpommern', img: require('@/assets/images/mecklenburg-vorpommern.jpg'), numQuestions: 160 },
  { name: 'Saarland', label: 'Saarland', img: require('@/assets/images/saarland.jpg'), numQuestions: 160 },
  { name: 'Bremen', label: 'Bremen', img: require('@/assets/images/bremen.jpg'), numQuestions: 160 }
];

export default function ExploreScreen() {
  const router = useRouter();
  const [selectedBundesland, setSelectedBundesland] = useState('Gesamtfragenkatalog');
  const [modalVisible, setModalVisible] = useState(false);
  const colorScheme = useColorScheme();

  const openPicker = () => setModalVisible(true);
  const closePicker = () => setModalVisible(false);

  const selectBundesland = (land: string) => {
    setSelectedBundesland(land);
    closePicker();
  };

  const handleCardPress = (category: string) => {
    router.push({
      pathname: '/questions/[category]',
      params: { category: encodeURIComponent(category) }
    });
  };

  const renderCard = ({ item }: { item: { img: any; name: string; numQuestions: number } }) => (
    // <View style={[styles.wrapper, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
    <TouchableOpacity onPress={() => handleCardPress(item.name)}>
      <View style={[styles.wrapper, { backgroundColor: 'black' }]}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <ThemedText style={styles.cardTitle}>{item.name}</ThemedText>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </View>
          <View style={styles.cardContent}>
            <ThemedText style={styles.cardSubtitle}>{item.numQuestions} Fragen</ThemedText>
          </View>
          <Image source={item.img} style={styles.cardImage} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={[styles.header, { backgroundColor: 'transparent' }]}>
        <ThemedText type="title">Fragenkatalog</ThemedText>
        <TouchableOpacity onPress={openPicker} style={styles.pickerButton}>
          <ThemedText numberOfLines={1} style={styles.pickerButtonText}>
            {selectedBundesland === 'Gesamtfragenkatalog' ? 'Alle Fragen' : selectedBundesland}
          </ThemedText>
          <Ionicons name="chevron-down" size={24} color={colorScheme === 'dark' ? 'white' : 'black'} />
        </TouchableOpacity>
      </ThemedView>
      <ThemedView style={[styles.content, {
        borderStyle: 'solid',
        borderWidth: 0,
        borderColor: 'red',
        borderRadius: 20,
        marginBottom: 16,
        paddingBottom: -16,
      }]}>

        {selectedBundesland === 'Gesamtfragenkatalog' ? (
          <FlatList
            data={bundeslaender2}
            renderItem={renderCard}
            keyExtractor={(item) => item.name}
          />
        ) : (
          <ThemedText>
            {selectedBundesland === 'Gesamtfragenkatalog' ? 'Alle Fragen' :
              selectedBundesland === 'Allgemeine Fragen' ? selectedBundesland :
                'Bundesweit & ' + selectedBundesland + ' spezifische Fragen'}
          </ThemedText>)}
      </ThemedView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closePicker}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalView, { backgroundColor: colorScheme === 'dark' ? '#1c1c1e' : 'white' }]}>
            <TouchableOpacity style={styles.closeButton} onPress={closePicker}>
              <Ionicons name="close" size={24} color={colorScheme === 'dark' ? 'white' : 'black'} />
            </TouchableOpacity>
            <FlatList
              data={bundeslaender}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => selectBundesland(item)}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <ThemedText>{item}</ThemedText>
                    {selectedBundesland === item && <Ionicons name="checkmark" size={24} color="white" />}
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  content: {
    flex: 1,
    padding: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    maxHeight: '80%',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  optionItem: {
    padding: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },
  wrapper: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 16,
  },
  card: {
    // marginBottom: 24,
    // borderRadius: 20,
    // overflow: 'hidden',
    // backgroundColor: '#fff',
    // shadowColor: '#000',
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
});
