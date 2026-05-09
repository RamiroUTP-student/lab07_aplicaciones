import React, { useState, useRef, useMemo, useCallback } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";

import products from "./data/products";
import ProductRow from "./components/ProductRow";

export default function App() {
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");

  const inputRef = useRef(null);

  // 🔹 useMemo: filtrar y ordenar
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      )
      .filter((p) =>
        minPrice ? p.price >= parseInt(minPrice) : true
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [query, minPrice]);

  // 🔹 useCallback: handlers
  const onChangeQuery = useCallback((text) => {
    setQuery(text);
  }, []);

  const onChangeMinPrice = useCallback((text) => {
    setMinPrice(text);
  }, []);

  const clear = useCallback(() => {
    setQuery("");
    setMinPrice("");
    inputRef.current?.focus();
  }, []);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const renderItem = useCallback(({ item }) => {
    return <ProductRow item={item} />;
  }, []);

  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        placeholder="Buscar..."
        value={query}
        onChangeText={onChangeQuery}
        style={styles.input}
      />

      <TextInput
        placeholder="Precio mínimo"
        value={minPrice}
        onChangeText={onChangeMinPrice}
        keyboardType="numeric"
        style={styles.input}
      />

      <Button title="Foco" onPress={focusInput} />
      <Button title="Limpiar" onPress={clear} />

      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
});