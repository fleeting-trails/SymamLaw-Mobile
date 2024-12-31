import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import CustomText from "../CustomText/CustomText";
import useAppTheme from "../../hooks/useAppTheme";

const SelectPrimary: React.FC<PropTypes.SelectPrimary> = ({
  label,
  options,
  placeholder = "Select an option",
  onSelect,
}: PropTypes.SelectPrimary) => {
  const theme = useAppTheme();
  const styles = createStyles({ theme });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  return (
    <View style={styles.container}>
      {label && (
        <CustomText
          style={{
            fontSize: 16,
            marginBottom: 6
          }}
          variant="300"
        >
          {label}
        </CustomText>
      )}
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.selectedText}>{selectedOption || placeholder}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.optionsContainer}>
          <FlatList
            // scrollEnabled={false}
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleSelect(item.value)}
              >
                <Text style={styles.optionText}>{item.value}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

function createStyles({ theme }: { theme: Config.Theme }) {
  return StyleSheet.create({
    container: {
      width: "100%",
    },
    dropdown: {
      padding: 15,
      borderWidth: 1,
      borderColor: theme.colors.primaryGray,
      borderRadius: 5,
    },
    selectedText: {
      fontSize: 16,
      color: theme.colors.text
    },
    optionsContainer: {
      marginTop: 5,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      maxHeight: 150,
    },
    option: {
      padding: 10,
    },
    optionText: {
      fontSize: 16,
    },
  });
}

export default SelectPrimary;
