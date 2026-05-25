import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import { nutritionSummary } from "../data/nutritionData";

const NutritionCard = ({ title, value, unit }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardValue}>
        {value}
        <Text style={styles.unit}> {unit}</Text>
      </Text>
    </View>
  );
};

const ProgressBar = ({ progress }) => {
  return (
    <View style={styles.progressContainer}>
      <View style={[styles.progressFill, { width: `${progress}%` }]} />
    </View>
  );
};

export default function NutritionInsightsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nutrition Insights</Text>

      <NutritionCard
        title="Calories"
        value={nutritionSummary.calories}
        unit="kcal"
      />

      <ProgressBar progress={80} />

      <NutritionCard
        title="Protein"
        value={nutritionSummary.protein}
        unit="g"
      />

      <ProgressBar progress={70} />

      <NutritionCard title="Carbs" value={nutritionSummary.carbs} unit="g" />

      <ProgressBar progress={60} />

      <NutritionCard title="Fats" value={nutritionSummary.fats} unit="g" />

      <ProgressBar progress={50} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 24,
    marginTop: 10,
  },

  card: {
    backgroundColor: "#1E293B",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },

  cardTitle: {
    color: "#94A3B8",
    fontSize: 16,
    marginBottom: 8,
  },

  cardValue: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "700",
  },

  unit: {
    fontSize: 18,
    color: "#CBD5E1",
  },

  progressContainer: {
    width: "100%",
    height: 10,
    backgroundColor: "#334155",
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#22C55E",
    borderRadius: 10,
  },
});