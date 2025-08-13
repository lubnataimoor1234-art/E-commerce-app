import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProductItem({ product, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.name}>{product.name}</Text>
      <Text>${product.price}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { padding: 12, borderWidth: 1, borderRadius: 8, marginBottom: 10 },
  name: { fontWeight: 'bold', marginBottom: 4 },
});




// src/components/ProductItem.js
// import React from "react";
// import { View, Text, Image, Pressable } from "react-native";

// export default function ProductItem({ product, onPress }) {
//   return (
//     <Pressable
//       onPress={onPress}
//       style={{
//         backgroundColor: "#fff",
//         borderRadius: 12,
//         marginBottom: 12,
//         overflow: "hidden",
//         elevation: 2,
//       }}
//     >
//       {!!product.image && (
//         <Image source={{ uri: product.image }} style={{ width: "100%", height: 140, backgroundColor: "#eee" }} />
//       )}
//       <View style={{ padding: 12 }}>
//         <Text style={{ fontSize: 16, fontWeight: "600" }} numberOfLines={1}>
//           {product.title}
//         </Text>
//         <Text style={{ opacity: 0.8, marginTop: 4 }}>
//           ${Number(product.price || 0).toFixed(2)}
//         </Text>
//       </View>
//     </Pressable>
//   );
// }
