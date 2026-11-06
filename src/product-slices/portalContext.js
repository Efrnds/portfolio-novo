import { createContext } from "react";

// A shared context keeps upstream Radix portals inside their own theme boundary.
export const PortalContainer = createContext(null);
export const DemoBrowserNavigation = createContext(null);
