import { createContext, useContext } from "react";

interface NavigationContextType {
  goToNext: () => void;
  goToPrev: () => void;
}

const NavigationContext = createContext<NavigationContextType>({
  goToNext: () => {},
  goToPrev: () => {},
});

export const NavigationProvider = NavigationContext.Provider;
export const useNavigation = () => useContext(NavigationContext);
