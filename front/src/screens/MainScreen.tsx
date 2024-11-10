import {StackScreenProps} from '@react-navigation/stack';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {StackParamList} from '../navigation/StackNavigator';
import {navigations} from '../constants';
import {Button, SearchBar} from '@rneui/themed';
import {ListItem} from '@rneui/themed';
import {FlatList} from 'react-native-gesture-handler';

type MainScreenProps = StackScreenProps<
  StackParamList,
  typeof navigations.MAIN
>;
const list_data = [
  {title: '하하', sub_title: '이카운트 -> 고덕역'},
  {title: '재석', sub_title: '이카운트 -> 천호역'},
  {title: '준하', sub_title: '이카운트 -> 잠실역'},
  {title: '하하', sub_title: '이카운트 -> 고덕역'},
  {title: '재석', sub_title: '이카운트 -> 천호역'},
  {title: '준하', sub_title: '이카운트 -> 잠실역'},
  {title: '하하', sub_title: '이카운트 -> 고덕역'},
  {title: '재석', sub_title: '이카운트 -> 천호역'},
  {title: '준하', sub_title: '이카운트 -> 잠실역'},
];
function MainScreen({navigation}: MainScreenProps) {
  const [search_value, setSearchValue] = useState('');

  const updateSearch = (search: string) => {
    setSearchValue(search);
  };

  const onPressCreateRoom = () => {
    // 방만들기 버튼 클릭 시 처리 로직 추가
    console.log('방만들기 버튼 클릭');
    navigation.navigate(navigations.CREATION_ROOM);
  };

  return (
    <View style={styles.main_container}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search_value}
        platform={'android'}
      />
      <View style={styles.contents_container}>
        <FlatList
          data={list_data}
          renderItem={item => (
            <ListItem>
              <ListItem.Content>
                <ListItem.Title>{item.item.title}</ListItem.Title>
                <ListItem.Subtitle>{item.item.sub_title}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          )}
        />
      </View>
      <View style={styles.bottom_container}>
        <Button title={'방만들기'} onPress={onPressCreateRoom} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  main_container: {
    margin: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  contents_container: {
    flex: 1,
  },

  bottom_container: {},
});

export default MainScreen;
