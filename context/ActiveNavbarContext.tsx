import { createContext, useState, useContext } from "react";

type NavType = string;

interface ActiveNavContextType {
  active: NavType;
  setActive: (active: NavType) => void;
}

const ActiveNavContext = createContext<ActiveNavContextType | undefined>(
  undefined
);

export const useActiveNav = () => {
  const context = useContext(ActiveNavContext);
  if (!context) {
    throw new Error(
      "useActiveNav must be used within an ActiveNavbarContextProvider"
    );
  }
  return context;
};

export const ActiveNavbarContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [active, setActive] = useState<NavType>("/dashboard/home");

  return (
    <ActiveNavContext.Provider value={{ active, setActive }}>
      {children}
    </ActiveNavContext.Provider>
  );
};

export default ActiveNavbarContextProvider;
