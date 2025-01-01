namespace PropTypes {
    type TabPrimary = import('react-native-tab-view').TabViewProps & {
        tabs: Array<{
            key: string,
            title: string,
            children: () => React.JSX.Element,
            tabStyle?: import('react-native').ViewStyle,
            tablLabelStyle?: import('react-native').TextStyle,
        }>
    }
}