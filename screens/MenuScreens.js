// import React from "react";
// import { View, Text, FlatList, ActivityIndicator, RefreshControl } from "react-native";
// import useMenu from "../hooks/useMenu";

// export default function MenuScreen() {
//   const { menu, loading, error, reload } = useMenu();

//   if (loading && menu.length === 0) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <Text>Failed to load menu.</Text>
//       </View>
//     );
//   }

//   return (
//     <FlatList
//       data={menu}
//       keyExtractor={(item, index) => String(index)}
//       refreshControl={<RefreshControl refreshing={loading} onRefresh={reload} />}
//       contentContainerStyle={{ padding: 16 }}
//       renderItem={({ item }) => (
//         <View style={{ padding: 12, backgroundColor: "#fff", borderRadius: 8, marginBottom: 12 }}>
//           <Text style={{ fontWeight: "bold" }}>{item.name || "Unnamed"}</Text>
//           <Text>{item.description || "No description"}</Text>
//         </View>
//       )}
//     />
//   );
// }
