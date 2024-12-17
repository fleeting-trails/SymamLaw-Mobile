import React, { useState } from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import useAppTheme from "../../hooks/useAppTheme";

function TabPrimary({ tabs, onIndexChange, tabStyle, tabLabelStyle, ...props }: PropTypes.TabPrimary) {
  const theme = useAppTheme();
  const [index, setIndex] = useState(0);
  const renderScene = SceneMap(
    tabs.reduce((acc: any, curr: any) => ({ ...acc, [curr.key]: curr.children }), {})
  );
  const [routes] = useState(tabs.map((t: any) => ({ key: t.key, title: t.title })));

  const handleSetIndex = (index : number) => {
    if (onIndexChange) onIndexChange(index);
    setIndex(index);

  }
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      // initialLayout={{ width: 100 }}
      
      {...props}
      renderTabBar={(tabBarProps) => (
        <TabBar
          indicatorStyle={{ backgroundColor: theme.colors.textPrimary }}
          activeColor={theme.colors.textPrimary}
          labelStyle={[{ color: theme.colors.textPrimary }, tabLabelStyle]}
          style={{ backgroundColor: theme.colors.background }}
          tabStyle={tabStyle}
          {...tabBarProps}
        />
      )}
    />
  );
}

export default TabPrimary;
