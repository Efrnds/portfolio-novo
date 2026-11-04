import { useContext } from "react";
import { SceneNavigationContext } from "../components/construction/ConstructionContext";

export function useSceneNavigation() {
  return useContext(SceneNavigationContext);
}
