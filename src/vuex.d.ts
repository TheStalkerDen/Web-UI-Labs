import { Store } from "@/store";
import User from "@/cls/model/User"; // path to store file

declare module "@vue/runtime-core" {
  interface State {
    user: User | null;
    accessToken: string;
    refreshToken: string;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
