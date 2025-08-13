 
// import React from 'react';
// import { View, Text, FlatList, Button, TextInput } from 'react-native';
// import { useBasket } from '../context/BasketContext';

// export default function BasketScreen() {
//   const { basket, removeFromBasket, updateQuantity } = useBasket();

//   return (
//     <FlatList
//       data={basket}
//       keyExtractor={item => item.id.toString()}
//       renderItem={({ item }) => (
//         <View style={{ padding: 10, borderBottomWidth: 1 }}>
//           <Text>{item.name}</Text>
//           <Text>${item.price}</Text>
//           <TextInput
//             style={{ borderWidth: 1, padding: 5 }}
//             keyboardType="numeric"
//             value={item.quantity.toString()}
//             onChangeText={(text) => updateQuantity(item.id, parseInt(text))}
//           />
//           <Button title="Remove" onPress={() => removeFromBasket(item.id)} />
//         </View>
//       )}
//     />
//   );
// }


import React from 'react';
import { View, Text, FlatList, Pressable, TextInput, StyleSheet } from 'react-native';
import { useBasket } from '../context/BasketContext'; // make sure path/casing matches

export default function BasketScreen() {
  // Expecting your BasketContext to export: items, removeItem, updateQty, clear, total
  const { items, removeItem, updateQty, clear, total } = useBasket();

  const handleChangeQty = (id, text) => {
    // Allow empty field while typing; don’t update yet
    if (text === '') return;
    const n = parseInt(text, 10);
    if (Number.isNaN(n)) return;
    if (n <= 0) {
      // if zero or negative, remove the item
      removeItem(id);
      return;
    }
    updateQty(id, n);
  };

  const renderItem = ({ item }) => {
    const qty = Number(item.qty ?? item.quantity ?? 1);
    const title = item.title ?? item.name ?? 'Untitled';
    const price = Number(item.price ?? 0);

    return (
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
        </View>

        {/* Quantity controls */}
        <View style={styles.qtyWrap}>
          <Pressable style={styles.qtyBtn} onPress={() => updateQty(item.id, Math.max(qty - 1, 0))}>
            <Text style={styles.qtyBtnTxt}>−</Text>
          </Pressable>

          <TextInput
            style={styles.qtyInput}
            keyboardType="number-pad"
            value={String(qty)}
            onChangeText={(t) => handleChangeQty(item.id, t)}
          />

          <Pressable style={styles.qtyBtn} onPress={() => updateQty(item.id, qty + 1)}>
            <Text style={styles.qtyBtnTxt}>＋</Text>
          </Pressable>
        </View>

        <Pressable style={styles.remove} onPress={() => removeItem(item.id)}>
          <Text style={styles.removeTxt}>Remove</Text>
        </Pressable>
      </View>
    );
  };

  if (!items || items.length === 0) {
    return (
      <View style={styles.empty}>
        <Text>Your basket is empty.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={items}
        keyExtractor={(it, idx) => String(it?.id ?? idx)}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.total}>Total: ${Number(total || 0).toFixed(2)}</Text>
        <Pressable style={styles.clear} onPress={clear}>
          <Text style={styles.clearTxt}>Clear Basket</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    elevation: 1,
  },
  title: { fontSize: 16, fontWeight: '600' },
  price: { fontSize: 13, opacity: 0.8, marginTop: 2 },
  qtyWrap: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  qtyBtn: { backgroundColor: '#eee', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  qtyBtnTxt: { fontSize: 16, fontWeight: '700' },
  qtyInput: {
    width: 48, height: 36, borderWidth: 1, borderColor: '#ddd',
    borderRadius: 8, textAlign: 'center'
  },
  remove: { marginLeft: 8, backgroundColor: '#d33', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8 },
  removeTxt: { color: '#fff', fontWeight: '600' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  footer: {
    borderTopWidth: 1, borderColor: '#eee', padding: 12,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
  },
  total: { fontSize: 18, fontWeight: '700' },
  clear: { backgroundColor: '#111', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10 },
  clearTxt: { color: '#fff', fontWeight: '600' },
});
