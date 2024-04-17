import { useIsFocused } from "@react-navigation/native";
import { useAppDispatch } from "../redux/hooks";
import { useEffect } from "react";
import { setTopNavigationEnabled } from "../redux/slices/header";

export default function useDisableNavbar() {
  const dispatch = useAppDispatch();
  const screenFocused = useIsFocused();
  useEffect(() => {
    if (screenFocused) {
      dispatch(setTopNavigationEnabled(false));
    }
  }, [screenFocused]);
}
