import { useContext } from "react";
import { NotificationContext } from "../contexts";

/**
 *  isOpen: (true|false)
 *  message: Add a message that you want to show on alert content
 *  severity: (info|success|warning|error)
 */

export const useNotification = () => useContext(NotificationContext);
