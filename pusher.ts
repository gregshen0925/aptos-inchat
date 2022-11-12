import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher({
  appId: "1505769",
  key: process.env.PUSHER_KEY!,
  secret: process.env.SERVER_PUSHER_SECRET!,
  cluster: "ap3",
  useTLS: true,
});

export const clientPusher = new ClientPusher("28400a36845ae4962915", {
  cluster: "ap3",
  forceTLS: true,
});
