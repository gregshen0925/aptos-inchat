import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher({
  appId: "1505769",
  key: "28400a36845ae4962915",
  secret: "b520eb181bfd7859f4e8",
  cluster: "ap3",
  useTLS: true,
});

export const clientPusher = new ClientPusher("28400a36845ae4962915", {
  cluster: "ap3",
  forceTLS: true,
});
