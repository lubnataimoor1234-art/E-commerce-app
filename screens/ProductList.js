
import React, { useState, useEffect, useMemo } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Pressable, Text } from 'react-native';
import useProducts from '../hooks/useProducts';
import ProductItem from '../components/ProductItem';

export default function ProductList({ navigation }) {
  const { products, loading } = useProducts();

  const [menu, setMenu] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [loadingMenu, setLoadingMenu] = useState(true);

  // Fetch menu categories
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('https://my-json-server.typicode.com/benirvingplt/products/menu');
        const data = await res.json();
        setMenu(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Menu fetch error:', err);
        setMenu([]);
      } finally {
        setLoadingMenu(false);
      }
    })();
  }, []);

  // Filter products by selected menu (assumes product.menuId matches menu.id)
  const filteredProducts = useMemo(() => {
    if (!selectedMenu) return products;
    return products.filter((p) => String(p.menuId) === String(selectedMenu));
  }, [products, selectedMenu]);

  if (loading || loadingMenu) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* MENU LIST */}
      <FlatList
        data={[{ id: 'all', name: 'All' }, ...menu]}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => String(item?.id ?? item?.key ?? item?.name ?? index)}
        contentContainerStyle={styles.menuContainer}
        renderItem={({ item }) => {
          const label = item.name ?? item.title ?? item.key ?? 'Unnamed';
          const isActive = selectedMenu ? String(selectedMenu) === String(item.id) : item.id === 'all';
          return (
            <Pressable
              onPress={() => setSelectedMenu(item.id === 'all' ? null : item.id)}
              style={[styles.chip, isActive && styles.chipActive]}
            >
              <Text style={[styles.chipText, isActive && styles.chipTextActive]} numberOfLines={1}>
                {label}
              </Text>
             </Pressable>
          );
        }}
      />

      {/* PRODUCT LIST */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item, index) => String(item?.id ?? index)}
        contentContainerStyle={{ paddingTop: 8 }}
        renderItem={({ item }) => (
          <ProductItem
            product={item}
            onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    paddingBottom: 8,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#eee',
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: '#111',
  },
  chipText: {
    fontSize: 14,
  },
  chipTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
});





