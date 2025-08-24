

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Button, TextInput, FlatList,
  TouchableWithoutFeedback, Keyboard, TouchableOpacity, ScrollView} from 'react-native';
import { CalendarList } from 'react-native-calendars';
import Modal from 'react-native-modal';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('Hotels');
  const [dates, setDates] = useState('');
  
  const [range, setRange] = useState({ start: '', end: '' });
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [isRoomSheetVisible, setRoomSheetVisible] = useState(false);
  const [adultsCount, setAdultsCount] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [roomsCount, setRoomsCount] = useState(1);
  const [selectedChildIndex, setSelectedChildIndex] = useState(null);
  const [childrenAges, setChildrenAges] = useState([]);
  const [isAgeModalVisible, setIsAgeModalVisible] = useState(false);
  const [tempAge, setTempAge] = useState('');

const [isLocationModalVisible, setLocationModalVisible] = useState(false);
const [searchText, setSearchText] = useState('');
const [selectedLocation, setSelectedLocation] = useState('');



  const today = dayjs().format('YYYY-MM-DD');
  const maxDate = dayjs().add(1, 'year').format('YYYY-MM-DD');

  const handleDayPress = (day) => {
    if (!range.start || range.end) {
      setRange({ start: day.dateString, end: '' });
    } else {
      if (dayjs(day.dateString).isAfter(dayjs(range.start))) {
        setRange({ start: range.start, end: day.dateString });
        setDates(`${range.start} - ${day.dateString}`);
        setCalendarVisible(false);
      } else {
        setRange({ start: day.dateString, end: '' });
      }
    }
  };
  const getMarkedDates = () => {
    const marked = {};
    if (range.start) {
      marked[range.start] = {
        startingDay: true,
        color: '#FFA726',
        textColor: '#fff',
      };
    }
    if (range.end) {
      marked[range.end] = {
        endingDay: true,
        color: '#FFA726',
        textColor: '#fff',
      };
      let current = dayjs(range.start).add(1, 'day');
      while (current.isBefore(dayjs(range.end))) {
        marked[current.format('YYYY-MM-DD')] = {
          color: '#FFE0B2',
          textColor: '#000',
        };
        current = current.add(1, 'day');
      }
    }
    return marked;
  };

  const renderTabIcon = (tab) => {
    switch (tab) {
       
      case 'Hotels':
        return <Icon name="hotel" size={22} color={activeTab === tab ? '#FF7A00' : 'grey'} style={{ marginRight: 5 }} />;
      case 'Schools':
        return <Icon name="graduation-cap" size={22} color={activeTab === tab ? '#FF7A00' : 'grey'} style={{ marginRight: 5 }} />;
        default:
      case 'Visa':
        return <Icon name="credit-card-alt" size={22} color={activeTab === tab ? '#FF7A00' : 'grey'} style={{ marginRight: 5 }} />;

        return null;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Direct</Text>
      </View>

      <View style={styles.tabs}>
        {['Visas', 'Hotels', 'Schools'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.tabItem}
            onPress={() => setActiveTab(tab)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {renderTabIcon(tab)}
              <Text style={{ color: activeTab === tab ? '#FF7A00' : 'grey' }}>{tab}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>


<View>
<TouchableOpacity onPress={() => setLocationModalVisible(true)} style={styles.searchRow}>
  <Icon name="map-marker" size={20} color="#FF7A00" style={styles.icon} />
  <Text style={styles.inputText}>
    {selectedLocation || 'Where are you going?'}
  </Text>
</TouchableOpacity>

        <TouchableOpacity onPress={() => setCalendarVisible(true)} style={styles.searchRow}>
          <Icon name="calendar" size={20} color="#FF7A00" style={styles.icon} />
          <Text style={styles.inputText}>
            {dates || 'Select your dates'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setRoomSheetVisible(true)} style={styles.searchRow}>
          <Icon name="users" size={20} color="#FF7A00" style={styles.icon} />
          <Text style={styles.inputText}>
            {`${roomsCount} Room - ${adultsCount} Adults - ${childrenCount} Children`}
          </Text>
        </TouchableOpacity>

        <View style={styles.searchButton
        }>
          <Button title="SEARCH" color="#FF7A00" onPress={() => alert('Searching...')} />
        </View>
      </View>

      <View style={styles.bottomInfo}>
        <Text style={styles.whyTitle}>Why Direct?</Text>
        <Text style={styles.greyText}>Multiple payment option</Text>
        <Text style={styles.partnerText}>In Partnership with</Text>

</View>

<Modal isVisible={isLocationModalVisible}
  onBackdropPress={() => setLocationModalVisible(false)}
  style={{ margin: 0, justifyContent: 'flex-end' }}
>
  <View style={styles.modalContainer}>
 
    <View style={styles.modalHeader}>
       <Icon name="search" size={20} color="#FF7A00" style={{ position: 'absolute', left: 20, top: 56, zIndex: 1 }} />
  <TextInput
    placeholder="Search"
    placeholderTextColor="#999"
    style={styles.modalSearchInput}
    value={searchText}
    onChangeText={setSearchText}
  />
  
      <TouchableOpacity onPress={() => setSearchText('')}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity> 
    </View>
    <Text style={{fontSize:20, paddingHorizontal: 20, margin:15}}>Recommended Searches</Text>

    <FlatList 
      data={
        ['Cairo', 'Hurghada', 'Sharm El Sheikh', 'Luxor', 'Alexandria'].filter((item) =>
          item.toLowerCase().includes(searchText.toLowerCase())
        )
      }
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.resultItem}
          onPress={() => {
            setSelectedLocation(item);
            setSearchText('');
            setLocationModalVisible(false);
          }}
         
        >
          <View style={{ flexDirection: 'row', alignItems: 'center'  ,paddingHorizontal:20}}>
          <Icon name="map-marker" size={30} color="#FF7A00" style={{ marginRight: 8 }} />
          <Text style={{ color: '#FF7A00', fontSize: 16 }}>{item}</Text>
        </View>
        <Text style={{ color: 'gray', fontSize: 14, marginLeft: 26 }}>Egypt</Text>
           
        </TouchableOpacity>
      )}
    />
  </View>
  
  
</Modal>
    <Modal isVisible={isCalendarVisible}
        onBackdropPress={() => setCalendarVisible(false)}
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select your dates</Text>
          <CalendarList
            minDate={today}
            maxDate={maxDate}
            pastScrollRange={0}
            futureScrollRange={12}
            scrollEnabled
            markingType="period"
            markedDates={getMarkedDates()}
            onDayPress={handleDayPress}
          />
        </View>
      </Modal>

<Modal isVisible={isRoomSheetVisible}
  onBackdropPress={() => setRoomSheetVisible(false)}
  style={{ justifyContent: 'flex-end', margin: 0 }}
>
  <View style={styles.modalContent}>
    <ScrollView>
      <Text style={styles.modalTitle}>Select Rooms and Guest Count</Text>
      <View style={styles.counterRow}>
        <Text style={{ flex: 1, fontSize: 16 }}>🛏️ Rooms</Text>
        <TouchableOpacity
          style={styles.counterBtn}
          onPress={() => setRoomsCount(Math.max(1, roomsCount - 1))}
        >
          <Text style={{ fontSize: 18 }}>−</Text>
        </TouchableOpacity>
        <Text style={styles.counterText}>{roomsCount}</Text>
        <TouchableOpacity
          style={styles.counterBtn}
          onPress={() => setRoomsCount(roomsCount + 1)}
        >
          <Text style={{ fontSize: 18 }}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.counterRow}>
        <Text style={{ flex: 1, fontSize: 16 }}>🧍 Adults</Text>
        <TouchableOpacity
          style={styles.counterBtn}
          onPress={() => setAdultsCount(Math.max(1, adultsCount - 1))}
        >
          <Text style={{ fontSize: 18 }}>−</Text>
        </TouchableOpacity>
        <Text style={styles.counterText}>{adultsCount}</Text>
        <TouchableOpacity
          style={styles.counterBtn}
          onPress={() => setAdultsCount(Math.min(30, adultsCount + 1))}
        >
          <Text style={{ fontSize: 18 }}>+</Text>
        </TouchableOpacity>
      </View>

    
      <View style={styles.counterRow}>
        <Text style={{ flex: 1, fontSize: 16 }}>
          👶 Children <Text style={{ fontSize: 12, color: 'grey' }}>17 Years or less</Text>
        </Text>
        <TouchableOpacity
          style={styles.counterBtn}
          onPress={() => {
           if (childrenCount < 10) {
         setChildrenCount(prev => prev + 1);
         setChildrenAges(prev => [...prev, '']);
         setSelectedChildIndex(childrenCount);
         setIsAgeModalVisible(true);
}
          }}
        >
          <Text style={{ fontSize: 18 }}>−</Text>
         </TouchableOpacity>
         <Text style={styles.counterText}>{childrenCount}</Text>
         <TouchableOpacity
          style={styles.counterBtn}
          onPress={() => {
            if (childrenCount < adultsCount) {
              const newIndex = childrenCount;
              setChildrenCount(prev => prev + 1);
              setChildrenAges(prev => [...prev, '']);
              setSelectedChildIndex(newIndex);
              setIsAgeModalVisible(true);
            }
          }}
        >
          <Text style={{ fontSize: 18 }}>+</Text>
        </TouchableOpacity>
      </View>
      {childrenAges.map((age, index) => (
        <View key={index} style={[styles.counterRow, { marginLeft: 5 }]}>
          <Text style={{ flex: 1 }}>{`Child ${index + 1}`}</Text>
          <Text style={{ flex: 1 }}>{age ? `${age}` : 'Select Age'}</Text>
          <TouchableOpacity
            onPress={() => {
              const updated = [...childrenAges];
              updated.splice(index, 1);
              setChildrenAges(updated);
              setChildrenCount(updated.length);
            }}
          >
            <Text style={{ color: 'red', fontWeight: 'bold' }}>✕</Text>
          </TouchableOpacity>
        </View>
      ))}
      <View style={styles.searchButton}>
        <Button title="CONTINUE" color="#FF7A00" onPress={() => setRoomSheetVisible(false)} />
      </View>
    </ScrollView>
  </View>
</Modal>
<Modal isVisible={isAgeModalVisible}
  onBackdropPress={() => setIsAgeModalVisible(false)}
  style={{ justifyContent: 'flex-end', margin: 0 }}
>
  <View style={{
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '50%',
    paddingHorizontal: 20,
    paddingVertical: 15
  }}>
    <Text style={{
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10
    }}>Select Child Age</Text>

    <ScrollView>
      {['Less than 1 year old',
        ...Array.from({ length: 17 }, (_, i) => `${i + 1} Years old`)
      ].map((ageLabel, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setTempAge(ageLabel)}
          style={{
            paddingVertical: 10,
            borderBottomColor: '#ddd',
            borderBottomWidth: 1
          }}
        >
          <Text style={{ textAlign: 'center', fontSize: 16 }}>{ageLabel}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>

    <TouchableOpacity
      style={{
        marginTop: 10,
        backgroundColor: '#FF7A00',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center'
      }}
      onPress={() => {
        if (selectedChildIndex !== null && tempAge) {
          const updated = [...childrenAges];
          updated[selectedChildIndex] = tempAge;
          setChildrenAges(updated);
          setIsAgeModalVisible(false);
          setTempAge('');
        }
      }}
    >
      <Text style={{ color: 'white', fontWeight: 'bold' }}>CONFIRM</Text>
    </TouchableOpacity>
  </View>
</Modal>
 </View>

 )}

const styles = StyleSheet.create({
  container: { flex: 1,
     backgroundColor: 'white' },
  header: {
    backgroundColor: '#FF7A00',
    height: 100,
    paddingVertical: 20,
    alignItems: 'center',
    padding: 30,
  },
  headerText: { color: 'white', fontSize: 25, fontWeight: 'bold', padding: 15 },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f8f8f8',
    paddingVertical: 10,
     marginBottom : 20,
     color: 'orange',
  },
  tabItem: { width: 100, 
     margin : 10, 
     alignItems: 'center' },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  icon: { marginRight: 10 },
  inputText: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
  },
  searchButton: { marginTop: 10, paddingHorizontal:10, borderCurve: 10},
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    paddingHorizontal : 10,
    borderColor: '#eee',
    backgroundColor: '#f9f9f9',
  },
  bottomInfo: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 'auto',
    paddingBottom: 20,
  },
  whyTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  greyText: { fontSize: 15, color: 'grey', textAlign: 'center', marginBottom: 10 },
  partnerText: { fontSize: 10, marginBottom: 20, textAlign: 'center' },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },

  modalTitle: { 
  fontSize: 18, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  counterBtn: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#FF7A00',
    borderRadius: 6,
    backgroundColor: '#fff',
    width: 40,
    alignItems: 'center',
  },
  counterText: { fontSize: 16, marginHorizontal: 10, minWidth: 30, textAlign: 'center' },
  ageRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 8,
  gap: 10,
},
ageInput: {
  flex: 1,
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 6,
  padding: 8,
  marginLeft: 10,
},
suggestionItem: {
  padding: 12,
  borderBottomWidth: 1,
  borderColor: '#eee',
  backgroundColor: '#f9f9f9',
  alignItems: 'center',
},
modalContainer: {
  flex: 1,
  backgroundColor: '#fff',
},
modalHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#FF7A00',
  paddingTop: 50,
  paddingBottom: 10,
  paddingHorizontal: 10,
  width: '100%',                
},

modalSearchInput: {
  flex: 1,
  backgroundColor: '#fff',
  paddingHorizontal: 40,
  borderRadius: 6,
  height: 40,
  fontSize: 16,
  color: '#000',
},
cancelText: {
  color: '#fff',
  marginLeft: 10,
  fontWeight: 'bold',
},
resultItem: {
  padding: 12,
  borderBottomColor: '#eee',
  borderBottomWidth: 1,
},
});


