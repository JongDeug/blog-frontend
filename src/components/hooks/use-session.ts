import { useContext } from "react";
import { SessionContext } from "../providers";

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) throw new Error("SessionContext.Provider 확인 바람");
  return context;
}
