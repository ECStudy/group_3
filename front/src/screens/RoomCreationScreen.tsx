import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Badge, Button, ButtonGroup, Input} from '@rneui/base';

const RoomCreationScreen = () => {
  const [selectedGenderOption, setSelectedGenderOption] = useState(0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Page Title */}
      <Text style={styles.pageTitle}>방 만들기</Text>

      {/* Current Location */}
      <View style={styles.section}>
        <Input
          placeholder="출발지 검색"
          inputContainerStyle={styles.inputContainer}
        />
        <Input
          placeholder="도착지 검색"
          inputContainerStyle={styles.inputContainer}
        />
      </View>

      {/* Route Buttons */}
      <View style={styles.routeButtons}>
        <Badge value="📍 현위치" status="primary" />
        <Badge value="🗺️ 지도에서 선택" status="primary" />
        <Badge value="🏠 집" status="warning" />
        <Badge value="🏢 회사" status="warning" />
      </View>

      <Text style={styles.estimate}>
        예상 시간 46분 | 예상 택시요금 25,100원
      </Text>

      <View style={styles.section}>
        <Text style={styles.subheading}>출발 일시</Text>
        <View style={styles.datePicker}>
          <Input
            placeholder="2024.10.04"
            inputContainerStyle={styles.dateInputContainer}
            containerStyle={styles.inputHalf}
          />
          <Input
            placeholder="08:54"
            inputContainerStyle={styles.timeInputContainer}
            containerStyle={styles.inputHalf}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheading}>동승자 성별</Text>
        <ButtonGroup
          buttons={['성별무관', '동성끼리 탑승']}
          selectedIndex={selectedGenderOption}
          onPress={setSelectedGenderOption}
          containerStyle={styles.genderGroup}
        />
      </View>

      <Input
        placeholder="하고 싶은 말 (선택)"
        inputContainerStyle={styles.optionalInputContainer}
        maxLength={20}
      />

      <Button title="만들기" buttonStyle={styles.submitButton} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  section: {
    marginVertical: 0,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  routeButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  routeButton: {
    width: '22%',
  },
  estimate: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
  },
  subheading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  datePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputHalf: {
    width: '48%',
  },
  dateInputContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  timeInputContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  genderGroup: {
    marginTop: 10,
  },
  optionalInputContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
  },
});

export default RoomCreationScreen;
