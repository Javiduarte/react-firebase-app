import { useContext } from "react";
import { GlobalContext } from "../store";

/**
 *
 */

export const useGlobal = () => useContext(GlobalContext);
