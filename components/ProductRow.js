import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProductRow = ({ item }) => {
  return (
    <View style={styles.row}>
      <Text>{item.name}</Text>
      <Text>S/. {item.price}</Text>
    </View>
  );
};

export default React.memo(ProductRow);

const styles = StyleSheet.create({
  row: {
    padding: 10,
    borderBottomWidth: 1,
  },
});