import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useBasket } from '../context/BasketContext';

export default function ProductDetails({ route, navigation }) {
  const { id } = route.params;
  const { addItem } = useBasket();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `https://my-json-server.typicode.com/benirvingplt/products/products/${id}`
          
        );
        const data = await res.json();
        setProduct(data);
      } catch (e) {
        console.error('Failed to fetch product:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  if (!product) {
    return <Text style={{ padding: 16 }}>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description || 'No description available'}</Text>

      <Button
        title="Add to Basket"
        onPress={() => {
          addItem(product);
          navigation.navigate('Basket'); // Go straight to basket if you want
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  name: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  price: { fontSize: 18, color: 'green', marginBottom: 10 },
  description: { fontSize: 16, marginBottom: 20 },
});







