import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {StackParamList} from '../navigation/StackNavigator';
import {navigations} from '../constants';
import {Button, SearchBar} from '@rneui/themed';
import {ListItem} from '@rneui/themed';
import {FlatList} from 'react-native-gesture-handler';
import {room_data, RoomData} from '../sampleData';

type MainScreenProps = StackScreenProps<
  StackParamList,
  typeof navigations.MAIN
>;
function MainScreen({navigation}: MainScreenProps) {
  const [search_value, setSearchValue] = useState('');

  const updateSearch = useCallback((search: string) => {
    setSearchValue(search);
  }, []);

  const onPressListItemContent = useCallback(
    (item: RoomData) => {
      navigation.navigate('chat', item);
    },
    [navigation],
  );

  const onPressCreateRoom = () => {
    // 방만들기 버튼 클릭 시 처리 로직 추가
    console.log('방만들기 버튼 클릭');
    navigation.navigate(navigations.CREATION_ROOM);
  };

  return (
    <SafeAreaView style={styles.main_container}>
      <SearchBar
        placeholder="지역을 입력해주세요"
        onChangeText={updateSearch}
        value={search_value}
        platform={'android'}
      />
      <View style={styles.contents_container}>
        <FlatList
          data={room_data}
          renderItem={item => (
            <ListItem>
              <ListItem.Content>
                <ListItem.Title
                  onPress={() => onPressListItemContent(item.item)}>
                  {item.item.title}
                </ListItem.Title>
                <ListItem.Subtitle>{item.item.sub_title}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          )}
        />
      </View>
      <View style={styles.bottom_container}>
        <Button title={'방만들기'} onPress={onPressCreateRoom} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  contents_container: {
    flex: 1,
  },

  bottom_container: {},
});

export default MainScreen;
