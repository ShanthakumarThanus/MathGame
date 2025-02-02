import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import MathGame from "./MathGame"; // 🔹 Vérifie le bon import

export default function App() {
  const [difficulty, setDifficulty] = useState(null);

  if (difficulty) {
    return <MathGame difficulty={difficulty} onBack={() => setDifficulty(null)} />; // 🔹 Vérifie que `onBack` est bien passé
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Choisis la difficulté</Text>

      <View style={{ marginVertical: 10 }}>
        <Button title="Easy" onPress={() => setDifficulty("easy")} />
      </View>

      <View style={{ marginVertical: 10 }}>
        <Button title="Hard" onPress={() => setDifficulty("hard")} />
      </View>
    </View>
  );
}