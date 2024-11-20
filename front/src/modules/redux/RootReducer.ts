import {combineReducers} from '@reduxjs/toolkit';
import roomDatasSlice from './slice/RoomDatasSlice';
import templateUserSlice from './slice/TemplateUserSlice';

/**
 * 사용 목적에 따라서 Slice 단위로 분리하여서 Root Reducer를 구성합니다.
 */
const RootReducer = combineReducers({
  templateUser: templateUserSlice,
  roomDatas: roomDatasSlice,
});

export type RootState = ReturnType<typeof RootReducer>;

export default RootReducer;
