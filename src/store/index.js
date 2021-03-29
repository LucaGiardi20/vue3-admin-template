import { createStore, createLogger } from "vuex";
import auth from "./modules/auth";
import app from "./modules/app";

const debug = process.env.NODE_ENV !== "production";

export default createStore({
  modules: {
    auth,
    app
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
