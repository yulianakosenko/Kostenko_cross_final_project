import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

import { useEffect, useState } from "react";

import { Ionicons } from "@expo/vector-icons";

import AppStatusBar from "../components/AppStatusBar";
import BottomTabBar from "../components/BottomTabBar";
import ScreenHeader from "../components/ScreenHeader";

import { COLORS, SHADOW, SPACING } from "../constants/theme";

import { tabs } from "../data/mockData";

import { getMealHistory, deleteMealPlan } from "../utils/storage";

export default function HistoryScreen({ navigation }) {
  const [historyPlans, setHistoryPlans] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const data = await getMealHistory();

    setHistoryPlans(data);
  };

  const handleDelete = async (id) => {
    await deleteMealPlan(id);

    loadHistory();
  };

  const latestPlan = historyPlans[0];

  const previousPlans = historyPlans.slice(1);

  return (
    <View style={styles.container}>
      <AppStatusBar />

      <ScreenHeader title="History" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {historyPlans.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🥗</Text>

            <Text style={styles.emptyTitle}>No plans yet</Text>

            <Text style={styles.emptyText}>
              Your generated AI meal plans will appear here.
            </Text>
          </View>
        ) : (
          <>
            <Text style={styles.section}>This Week</Text>

            {latestPlan && (
              <TouchableOpacity
                style={styles.planCard}
                onPress={() =>
                  navigation.navigate("meal", {
                    historyItem: latestPlan,
                  })
                }
              >
                <Image
                  source={{
                    uri: latestPlan.image,
                  }}
                  style={styles.image}
                />

                <View style={styles.info}>
                  <Text style={styles.title}>{latestPlan.days} Days Plan</Text>

                  <Text style={styles.meta}>
                    2 people • {latestPlan.calories} kcal
                  </Text>

                  <Text style={styles.date}>May 12, 2026</Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={22}
                  color={COLORS.textMuted}
                />
              </TouchableOpacity>
            )}

            {previousPlans.length > 0 && (
              <>
                <Text style={styles.section}>Previous Plans</Text>

                {previousPlans.map((plan) => (
                  <TouchableOpacity
                    key={plan.id}
                    style={styles.planCard}
                    onPress={() =>
                      navigation.navigate("meal", {
                        historyItem: plan,
                      })
                    }
                  >
                    <Image
                      source={{
                        uri: plan.image,
                      }}
                      style={styles.image}
                    />

                    <View style={styles.info}>
                      <Text style={styles.title}>{plan.days} Days Plan</Text>

                      <Text style={styles.meta}>
                        2 people • {plan.calories} kcal
                      </Text>

                      <Text style={styles.date}>Apr 28, 2026</Text>
                    </View>

                    <TouchableOpacity onPress={() => handleDelete(plan.id)}>
                      <Ionicons
                        name="trash-outline"
                        size={20}
                        color={COLORS.textMuted}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </>
            )}
          </>
        )}
      </ScrollView>

      <BottomTabBar
        activeTab="history"
        onTabPress={(tab) => {
          navigation.navigate(tab);
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

    paddingBottom: 160,
  },

  section: {
    fontSize: 22,

    fontWeight: "700",

    color: COLORS.text,

    marginBottom: 18,

    marginTop: 10,
  },

  planCard: {
    backgroundColor: COLORS.surface,

    borderRadius: 22,

    padding: 14,

    flexDirection: "row",

    alignItems: "center",

    marginBottom: 16,

    ...SHADOW,
  },

  image: {
    width: 72,

    height: 72,

    borderRadius: 18,

    marginRight: 14,
  },

  info: {
    flex: 1,
  },

  title: {
    fontSize: 17,

    fontWeight: "700",

    color: COLORS.text,

    marginBottom: 4,
  },

  meta: {
    fontSize: 14,

    color: COLORS.textMuted,

    marginBottom: 4,
  },

  date: {
    fontSize: 13,

    color: COLORS.textMuted,
  },

  emptyState: {
    marginTop: 80,

    alignItems: "center",
  },

  emptyEmoji: {
    fontSize: 64,

    marginBottom: 18,
  },

  emptyTitle: {
    fontSize: 28,

    fontWeight: "700",

    color: COLORS.text,

    marginBottom: 10,
  },

  emptyText: {
    fontSize: 16,

    textAlign: "center",

    lineHeight: 26,

    color: COLORS.textMuted,
  },
});
