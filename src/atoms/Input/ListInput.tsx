import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import useAppTheme from "../../hooks/useAppTheme";
import CustomText from "../CustomText/CustomText";
import { CrossIcon } from "../../assets/Icons";
import { TouchableRipple } from "react-native-paper";

export default function ListInput({
  label,
  inputStyle,
  onChange,
  defaultValue = [],
  ...props
}: PropTypes.ListInput) {
  const theme = useAppTheme();
  const styles = createStyles({ theme });
  const [values, setValues] = useState<string[]>(defaultValue);
  const [input, setInput] = useState<string>("");

  const handleAddItems = () => {
    setValues([
        ...values,
        input
    ])
    setInput("");
  }
  const handleRemoveItem = (index : number) => {
    const _values = values.filter((value, i) => i !== index)
    setValues(_values)
    if (onChange) {
        onChange(_values);
    }
  }
  return (
    <View>
      {label && (
        <CustomText style={styles.labelStyle} variant="400">
          {label}
        </CustomText>
      )}
      <TextInput
        {...props}
        style={[styles.textStyle, inputStyle]}
        onSubmitEditing={handleAddItems}
        value={input}
        onChangeText={(text) => setInput(text)}
      />
      <View style={styles.itemsContainer}>
        {values.map((value,i) => (
            <View key={`${value}_${i}`} style={styles.item}>
                <CustomText lightText>{value}</CustomText>
                <TouchableRipple onPress={() => handleRemoveItem(i)}>
                    <CrossIcon scale={0.5}/>
                </TouchableRipple>
            </View>
        ))}
      </View>
    </View>
  );
}

const createStyles = ({ theme }: Config.ThemedStyle) => {
  return StyleSheet.create({
    labelStyle: {
      fontSize: 14,
      color: theme.colors.primaryGray,
    },
    textStyle: {
      paddingVertical: 6,
      borderBottomColor: theme.colors.primaryGrayLight,
      //   borderWidth: 1,
      borderRadius: 3,
      borderBottomWidth: 1.5,
      color: theme.colors.text,
    },
    itemsContainer: {
        marginTop: 10,
        flexDirection: 'row',
        gap: 5,
        flexWrap: 'wrap'
    },
    item: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 8,
        paddingHorizontal: 10,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        borderRadius: 3
    }
  });
};
