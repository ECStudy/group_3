import {createSlice} from '@reduxjs/toolkit';
import {ChatMessage, RoomData} from '../../../sampleData';

/**
 */

const initialState: {room_datas: RoomData[]} = {room_datas: []};
/**
 */
const RoomDatasSlice = createSlice({
  name: 'roomDatas',
  initialState,
  reducers: {
    setRoomDatas(state, action: {payload: RoomData[]}) {
      return {
        ...state,
        room_datas: [...action.payload], // Immer 없이 수동으로 상태 업데이트
      };
    },

    addRoomData(state, action: {payload: RoomData}) {
      state.room_datas.push(action.payload);
    },

    setChatData(
      state,
      action: {payload: {room_id: string; chat_data: ChatMessage}},
    ) {
      state.room_datas.forEach(room_data => {
        if (room_data.room_id === action.payload.room_id) {
          room_data.chat_data = [
            ...room_data.chat_data,
            action.payload.chat_data,
          ];
          return;
        }
      });
    },
  },
});

/**
 * Reducer 메서드를 정의하여 외부에서 Redux의 상태를 변경할 수 있도록 구성합니다.
 */
export const {setRoomDatas, addRoomData, setChatData} = RoomDatasSlice.actions;

export default RoomDatasSlice.reducer;
