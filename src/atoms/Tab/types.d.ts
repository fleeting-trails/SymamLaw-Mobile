namespace PropTypes {
    type TabPrimary = {
        tabs: Array<{
            key: string,
            title: string,
            children: () => React.JSX.Element
        }>
    }
}