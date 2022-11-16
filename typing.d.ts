export type Message = {
  id: string;
  message: string;
  create_at: number;
  username: string;
  userAddress?: string;
  profilePic: string;
  email?: string;
};

export type ChatInfo = {
  creator: string;
  chatName: string;
  chatImage: string;
  description: string;
};
