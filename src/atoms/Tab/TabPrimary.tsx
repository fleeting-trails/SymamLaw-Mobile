import React, { useState } from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import useAppTheme from "../../hooks/useAppTheme";

function TabPrimary({ tabs }: PropTypes.TabPrimary) {
  const theme = useAppTheme();
  const [index, setIndex] = useState(0);
  const renderScene = SceneMap(
    tabs.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.children }), {})
  );
  const [routes] = useState(tabs.map((t) => ({ key: t.key, title: t.title })));
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      // initialLayout={{ width: 100 }}
      renderTabBar={(props) => (
        <TabBar
          indicatorStyle={{ backgroundColor: theme.colors.textPrimary }}
          activeColor={theme.colors.textPrimary}
          labelStyle={{ color: theme.colors.textPrimary }}
          style={{ backgroundColor: theme.colors.background }}
          {...props}
        />
      )}
    />
  );
}

export default TabPrimary;
