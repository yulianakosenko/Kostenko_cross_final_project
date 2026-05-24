import React, { useState } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import AppStatusBar from "../components/AppStatusBar";
import BottomTabBar from "../components/BottomTabBar";
import PrimaryButton from "../components/PrimaryButton";
import ScreenHeader from "../components/ScreenHeader";

import { COLORS, SHADOW, SPACING } from "../constants/theme";

import { tabs } from "../data/mockData";

export default function ShoppingScreen({ navigation }) {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Chicken Breast",
      amount: "800 g",
      price: "€8.50",
      completed: false,
    },

    {
      id: 2,
      name: "Avocado",
      amount: "4 pcs",
      price: "€5.20",
      completed: false,
    },

    {
      id: 3,
      name: "Greek Yogurt",
      amount: "1 kg",
      price: "€4.90",
      completed: false,
    },

    {
      id: 4,
      name: "Brown Rice",
      amount: "2 kg",
      price: "€6.10",
      completed: false,
    },
  ]);

  const toggleProduct = (id) => {
    const updated = products.map((item) =>
      item.id === id
        ? {
            ...item,
            completed: !item.completed,
          }
        : item,
    );

    setProducts(updated);
  };

  const allCompleted = products.every((item) => item.completed);

  return (
    <View style={styles.container}>
      <AppStatusBar />

      <ScreenHeader title="Shopping List" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Weekly Budget</Text>

          <Text style={styles.summaryPrice}>€24.70</Text>

          <Text style={styles.summarySubtitle}>
            Healthy groceries for your personalized meal plan
          </Text>
        </View>

        {products.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.left}>
              <TouchableOpacity
                onPress={() => toggleProduct(item.id)}
                style={[
                  styles.checkbox,

                  item.completed && styles.checkboxActive,
                ]}
              >
                {item.completed && <Text style={styles.check}>✓</Text>}
              </TouchableOpacity>

              <View>
                <Text style={styles.name}>{item.name}</Text>

                <Text style={styles.amount}>{item.amount}</Text>
              </View>
            </View>

            <Text style={styles.price}>{item.price}</Text>
          </View>
        ))}

        {allCompleted && (
          <View style={styles.completedBox}>
            <Text style={styles.completedText}>✅ Shopping Completed</Text>
          </View>
        )}

        <View style={styles.buttonSection}>
          <PrimaryButton
            title="Open Summary"
            onPress={() => navigation.navigate("summary")}
          />
        </View>
      </ScrollView>

      <BottomTabBar
        activeTab="shopping"
        onTabPress={(tab) => {
          if (tab === "home") {
            navigation.navigate("home");
          }

          if (tab === "shopping") {
            navigation.navigate("shopping");
          }

          if (tab === "history") {
            navigation.navigate("history");
          }

          if (tab === "meal") {
            navigation.navigate("meal");
          }

          if (tab === "summary") {
            navigation.navigate("summary");
          }
        }}
        tabs={tabs}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: COLORS.background,
  },

  scrollContent: {
    paddingHorizontal: SPACING.md,

    paddingTop: SPACING.sm,

    paddingBottom: 160,
  },

  summaryCard: {
    backgroundColor: COLORS.primarySoft,

    borderRadius: SPACING.xl,

    padding: SPACING.xl,

    marginBottom: SPACING.lg,
  },

  summaryTitle: {
    fontSize: 16,

    color: COLORS.primaryDark,

    marginBottom: SPACING.sm,
  },

  summaryPrice: {
    fontSize: 44,

    fontWeight: "700",

    color: COLORS.primaryDark,

    marginBottom: SPACING.sm,
  },

  summarySubtitle: {
    fontSize: 15,

    lineHeight: 24,

    color: COLORS.textMuted,
  },

  card: {
    backgroundColor: COLORS.surface,

    borderRadius: SPACING.xl,

    padding: SPACING.lg,

    marginBottom: SPACING.md,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    ...SHADOW,
  },

  left: {
    flexDirection: "row",

    alignItems: "center",

    gap: SPACING.md,
  },

  checkbox: {
    width: 26,

    height: 26,

    borderRadius: 999,

    borderWidth: 2,

    borderColor: COLORS.primary,
  },

  checkboxActive: {
    backgroundColor: COLORS.primary,

    justifyContent: "center",

    alignItems: "center",
  },

  check: {
    color: "#fff",

    fontWeight: "700",
  },

  name: {
    fontSize: 17,

    fontWeight: "600",

    color: COLORS.text,

    marginBottom: 4,
  },

  amount: {
    fontSize: 14,

    color: COLORS.textMuted,
  },

  price: {
    fontSize: 16,

    fontWeight: "700",

    color: COLORS.primaryDark,
  },

  completedBox: {
    backgroundColor: COLORS.primarySoft,

    padding: 18,

    borderRadius: 20,

    alignItems: "center",

    marginTop: 10,

    marginBottom: 20,
  },

  completedText: {
    fontSize: 16,

    fontWeight: "700",

    color: COLORS.primaryDark,
  },

  buttonSection: {
    marginTop: 10,

    marginBottom: 40,
  },
});
