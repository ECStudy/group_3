import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {navigations} from '../constants';
import {Button, SearchBar} from '@rneui/themed';
import {ListItem} from '@rneui/themed';
import {FlatList} from 'react-native-gesture-handler';
import {RoomData} from '../sampleData';
import {RootState} from '../modules/redux/RootReducer';
import {useDispatch, useSelector} from 'react-redux';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {DrawerParamList} from '../navigation/DrawerNavigator';
import {setRoomDatas} from '../modules/redux/slice/RoomDatasSlice';

type MainScreenProps = DrawerScreenProps<
  DrawerParamList,
  typeof navigations.MAIN
>;
function MainScreen({navigation}: MainScreenProps) {
  const [search_value, setSearchValue] = useState('');
  const room_datas = useSelector((state: RootState) => state.roomDatas);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch 요청 보내기
    fetch('http://localhost:3000/rooms') // NestJS 서버 URL
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: RoomData[]) => {
        dispatch(setRoomDatas(data));
      })
      .catch(error => {
        console.error('Error fetching room data:', error);
      });
  }, [dispatch]);

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
          data={room_datas.room_datas}
          renderItem={item => (
            <ListItem onPress={() => onPressListItemContent(item.item)}>
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
