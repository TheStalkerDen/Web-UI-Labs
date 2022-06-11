import { Store } from "vuex";
import { State } from "@/store";

export function getConfiguredWS(store: Store<State>) {
  const ws = new WebSocket("ws://127.0.0.1:8000/ws");
  ws.onopen = function (event) {
    console.log("Successfully connected to the websocket...");
  };

  ws.onmessage = async function (event) {
    const data = JSON.parse(event.data);
    switch (data["type"]) {
      case "added_new_question":
        console.log("Update questions lists");
        await store.dispatch("LOAD_QUESTIONS");
        break;
      case "deleted_question":
        console.log("Update questions lists");
        await store.dispatch("LOAD_QUESTIONS");
        break;
      default:
        console.log(`Unknown event with type ${data["type"]}`);
        break;
    }
  };
  return ws;
}
