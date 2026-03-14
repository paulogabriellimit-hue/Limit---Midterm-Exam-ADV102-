import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { returnCD } from "./utils/cdActions";

export default function ReturnCDScreen() {
  const [borrowId, setBorrowId] = useState("");

  return (
    <View style={{ padding: 20 }}>
      <Text>Return a CD</Text>
      <TextInput
        placeholder="Borrow Record ID"
        value={borrowId}
        onChangeText={setBorrowId}
      />
      <Button title="Return" onPress={() => returnCD(borrowId)} />
    </View>
  );
}
