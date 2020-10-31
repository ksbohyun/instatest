import { createContext } from "react";

const AppContext = createContext({
  showHeader: false,
  setShowHeader: () => {},
});

export default AppContext;
