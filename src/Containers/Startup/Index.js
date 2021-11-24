import React, { useEffect } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { useTheme } from "@/Theme";
import InitStartup from "@/Store/Startup/Init";

const IndexStartupContainer = () => {
  const { Colors } = useTheme();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(InitStartup.action());
  }, [dispatch]);

  return <View flex={1} backgroundColor={Colors.primary} />;
};

export default IndexStartupContainer;
