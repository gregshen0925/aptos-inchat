import { Message } from "../typing";

const fetcher = async () => {
  const res = await fetch("/api/getMessagesPublic");
  const data = await res.json();
  const messages: Message[] = data.messages;

  return messages;
};

export default fetcher;
