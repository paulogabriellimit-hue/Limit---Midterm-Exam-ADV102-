import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { borrowCD } from "./utils/cdActions";

export default function BorrowCDScreen() {
  const [cdId, setCdId] = useState("");
  const [borrower, setBorrower] = useState("");

  return (
    <View style={{ padding: 20 }}>
      <Text>Borrow a CD</Text>
      <TextInput placeholder="CD ID" value={cdId} onChangeText={setCdId} />
      <TextInput
        placeholder="Borrower Name"
        value={borrower}
        onChangeText={setBorrower}
      />
      <Button title="Borrow" onPress={() => borrowCD(cdId, borrower)} />
    </View>
  );
}
