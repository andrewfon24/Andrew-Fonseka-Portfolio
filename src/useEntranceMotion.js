import { useEffect } from "react";
import { initEntranceMotion } from "./entranceMotion";

export default function useEntranceMotion() {
  useEffect(initEntranceMotion, []);
}
