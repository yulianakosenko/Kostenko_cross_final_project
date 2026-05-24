import React from "react";

import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Ionicons, Feather } from "@expo/vector-icons";

import AppStatusBar from "../components/AppStatusBar";
import BottomTabBar from "../components/BottomTabBar";
import PrimaryButton from "../components/PrimaryButton";
import ScreenHeader from "../components/ScreenHeader";

import { COLORS, SHADOW, SPACING } from "../constants/theme";

import { tabs } from "../data/mockData";

export default function SummaryScreen({ route, navigation }) {
  const { budget, people, days, calories, goal } = route.params || {};

  return (
    <View style={styles.container}>
      <AppStatusBar />

      <ScreenHeader title="Plan Summary" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <Text style={styles.heroLabel}>Estimated Budget Usage</Text>

          <Text style={styles.heroPrice}>€ {budget}</Text>

          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>

          <Text style={styles.heroSub}>
            Your personalized healthy meal plan is ready
          </Text>
        </View>

        <View style={styles.grid}>
          <View style={styles.infoCard}>
            <Ionicons name="people-outline" size={24} color={COLORS.primary} />

            <Text style={styles.infoValue}>{people}</Text>

            <Text style={styles.infoLabel}>People</Text>
          </View>

          <View style={styles.infoCard}>
            <Ionicons
              name="calendar-outline"
              size={24}
              color={COLORS.primary}
            />

            <Text style={styles.infoValue}>{days}</Text>

            <Text style={styles.infoLabel}>Days</Text>
          </View>

          <View style={styles.infoCard}>
            <Ionicons name="flame-outline" size={24} color={COLORS.primary} />

            <Text style={styles.infoValue}>{calories}</Text>

            <Text style={styles.infoLabel}>Calories</Text>
          </View>

          <View style={styles.infoCard}>
            <Feather name="target" size={24} color={COLORS.primary} />

            <Text style={styles.infoValue}>{goal}</Text>

            <Text style={styles.infoLabel}>Goal</Text>
          </View>
        </View>

        <View style={styles.buttonSection}>
          <PrimaryButton
            title="Open History"
            onPress={() => navigation.navigate("history")}
          />
        </View>
      </ScrollView>

      <BottomTabBar
        activeTab="summary"
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

    paddingBottom: 180,
  },

  heroCard: {
    backgroundColor: COLORS.primarySoft,

    borderRadius: 28,

    padding: SPACING.xl,

    marginBottom: SPACING.lg,
  },

  heroLabel: {
    fontSize: 15,

    color: COLORS.primaryDark,

    marginBottom: 8,
  },

  heroPrice: {
    fontSize: 46,

    fontWeight: "700",

    color: COLORS.primaryDark,

    marginBottom: 18,
  },

  progressBar: {
    height: 12,

    borderRadius: 999,

    backgroundColor: "rgba(255,255,255,0.4)",

    overflow: "hidden",

    marginBottom: 14,
  },

  progressFill: {
    width: "72%",

    height: "100%",

    backgroundColor: COLORS.primary,
  },

  heroSub: {
    fontSize: 15,

    lineHeight: 24,

    color: COLORS.textMuted,
  },

  grid: {
    flexDirection: "row",

    flexWrap: "wrap",

    justifyContent: "space-between",

    gap: 14,
  },

  infoCard: {
    width: "47%",

    backgroundColor: COLORS.surface,

    borderRadius: 24,

    padding: 22,

    alignItems: "center",

    ...SHADOW,
  },

  infoValue: {
    fontSize: 20,

    fontWeight: "700",

    color: COLORS.text,

    marginTop: 12,

    marginBottom: 4,
  },

  infoLabel: {
    fontSize: 14,

    color: COLORS.textMuted,
  },

  buttonSection: {
    marginTop: 28,
  },
});
