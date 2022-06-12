import { Store } from "vuex";
import { State } from "@/store";

export function getConfiguredWS(store: Store<State>) {
  let query = "";
  if (store.state.accessToken != "") {
    query = `?token=${store.state.accessToken}`;
  }
  const ws = new WebSocket(`ws://127.0.0.1:8000/ws${query}`);
  ws.onopen = function (event) {
    console.log("Successfully connected to the websocket...");
  };

  ws.onmessage = async function (event) {
    const data = JSON.parse(event.data);
    switch (data["type"]) {
      case "added_new_question":
        console.log("Update questions list");
        await store.dispatch("LOAD_QUESTIONS");
        break;
      case "deleted_question": {
        const questionId = data["questionId"];
        console.log(`Delete question with id=${questionId} from  list`);
        await store.dispatch("LOAD_QUESTIONS");
        break;
      }
      case "vote_for_answer": {
        const questionId = data["questionId"];
        await store.dispatch(
          "INCR_TOTAL_VOTES_FOR_QUESTION_IN_LIST",
          questionId
        );
        if (
          store.state.currentQuestion != null &&
          store.state.currentQuestion.id == questionId
        ) {
          const answerId = data["answerId"];
          await store.dispatch(
            "INCR_VOTES_IN_CURRENT_QUESTION_ANSWER",
            answerId
          );
        }
        break;
      }
      case "list_of_online_users": {
        const onlineUsers = data["users"];
        await store.dispatch("SET_ONLINE_USERS", onlineUsers);
        break;
      }
      case "added_new_user": {
        const newUser = data["username"];
        await store.dispatch("ADD_TO_ONLINE_USERS", newUser);
        break;
      }
      case "user_disconnected": {
        const user = data["username"];
        await store.dispatch("REMOVE_FROM_ONLINE_USERS", user);
        break;
      }
      default:
        console.log(`Unknown event with type ${data["type"]}`);
        break;
    }
  };
  return ws;
}
