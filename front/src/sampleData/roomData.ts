export interface RoomData {
  room_id: string;
  title: string;
  sub_title: string;
  chat_data: ChatMessage[];
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
    chat_data: [{id: '재석', text: '안녕?', isSentByUser: false}],
  },
  {
    room_id: '2',
    title: '준하',
    sub_title: '이카운트 -> 천호역',
    chat_data: [
      {id: '준하', text: '반가워?', isSentByUser: false},
      {id: '형돈', text: '어쩔', isSentByUser: true},
    ],
  },
];

export {room_data};
