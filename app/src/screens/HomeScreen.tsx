import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { loadData } from "./utils/storage";
import { BorrowedCD, CD, Stats } from "./utils/types";

export default function HomeScreen() {
  const [cds, setCds] = useState<CD[]>([]);
  const [borrowed, setBorrowed] = useState<BorrowedCD[]>([]);
  const [stats, setStats] = useState<Stats>({ income: 0, totalBorrowed: 0 });

  useEffect(() => {
    const loadAll = async () => {
      setCds((await loadData("cds")) || []);
      setBorrowed((await loadData("borrowed")) || []);
      setStats((await loadData("stats")) || { income: 0, totalBorrowed: 0 });
    };
    loadAll();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: "bold" }}>Available CDs</Text>
      <FlatList
        data={cds}
        renderItem={({ item }) => (
          <Text>
            {item.title} - {item.artist} ({item.copies} copies)
          </Text>
        )}
      />

      <Text style={{ fontWeight: "bold", marginTop: 20 }}>Borrowed CDs</Text>
      <FlatList
        data={borrowed}
        renderItem={({ item }) => (
          <Text>
            {item.borrower} borrowed{" "}
            {cds.find((c) => c.id === item.cdId)?.title}| Due:{" "}
            {new Date(item.dueDate).toLocaleDateString()}
          </Text>
        )}
      />

      <Text style={{ marginTop: 20 }}>Total Income: PHP {stats.income}</Text>
      <Text>Total Borrowed CDs: {stats.totalBorrowed}</Text>
    </View>
  );
}
