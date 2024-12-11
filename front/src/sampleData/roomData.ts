import {Socket} from 'socket.io-client';

export interface RoomData {
  socket?: Socket;
  room_id: string;
  title: string;
  sub_title: string;
}

export type ChatMessage = {
  id: string;
  text: string;
  isSentByUser: boolean;
};

const room_data: RoomData[] = [
  {
    room_id: '1',
    title: '재석',
    sub_title: '이카운트 -> 고덕역',
  },
  {
    room_id: '2',
    title: '준하',
    sub_title: '이카운트 -> 천호역',
  },
];

export {room_data};
