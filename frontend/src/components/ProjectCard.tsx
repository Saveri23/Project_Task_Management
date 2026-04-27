import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from "react-native";
import React from "react";

interface Project {
  _id: string;
  title: string;
  description?: string;
}

interface Props {
  project: Project;
  isSelected?: boolean;
  onDelete?: (id: string) => void;
}

export default function ProjectCard({ project, isSelected, onDelete }: Props) {
  const { width } = useWindowDimensions();
  const isWeb = width > 768;

  return (
    <View
      style={[
        styles.card,
        isSelected && styles.cardSelected,
        isWeb && styles.cardWeb,
      ]}
    >
      {/* Top accent line */}
      <View style={[styles.accentLine, isSelected && styles.accentLineSelected]} />

      <View style={styles.body}>
        {/* Icon + Title */}
        <View style={styles.titleRow}>
          <View style={[styles.iconWrap, isSelected && styles.iconWrapSelected]}>
            <Text style={[styles.iconText, isSelected && styles.iconTextSelected]}>◈</Text>
          </View>
          <Text style={styles.title} numberOfLines={1}>{project.title}</Text>
        </View>

        {/* Description */}
        {project.description && (
          <Text style={styles.description} numberOfLines={2}>
            {project.description}
          </Text>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <View style={[styles.badge, isSelected && styles.badgeSelected]}>
            <View style={[styles.badgeDot, isSelected && styles.badgeDotSelected]} />
            <Text style={[styles.badgeText, isSelected && styles.badgeTextSelected]}>
              {isSelected ? "Selected" : "Active"}
            </Text>
          </View>

          {onDelete && (
            <TouchableOpacity
              onPress={() => onDelete(project._id)}
              style={styles.deleteBtn}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.deleteBtnText}>✕ Delete</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0C1420",
    borderWidth: 1,
    borderColor: "#1A2740",
    borderRadius: 18,
    marginBottom: 12,
    overflow: "hidden",
  },
  cardSelected: {
    borderColor: "#818CF8",
    shadowColor: "#818CF8",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 10,
  },
  cardWeb: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  accentLine: {
    height: 3,
    width: "35%",
    backgroundColor: "#818CF8",
    opacity: 0.5,
  },
  accentLineSelected: {
    width: "60%",
    opacity: 1,
  },
  body: {
    padding: 18,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  iconWrap: {
    width: 34,
    height: 34,
    backgroundColor: "#1E293B",
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapSelected: {
    backgroundColor: "#1E1B4B",
  },
  iconText: {
    color: "#475569",
    fontSize: 15,
  },
  iconTextSelected: {
    color: "#818CF8",
  },
  title: {
    color: "#F1F5F9",
    fontSize: 16,
    fontWeight: "700",
    flex: 1,
    letterSpacing: -0.2,
  },
  description: {
    color: "#475569",
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 14,
    paddingLeft: 44,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 44,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#0D2A1E",
    borderWidth: 1,
    borderColor: "#14532D",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeSelected: {
    backgroundColor: "#1E1B4B",
    borderColor: "#3730A3",
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: "#4ADE80",
  },
  badgeDotSelected: {
    backgroundColor: "#818CF8",
  },
  badgeText: {
    color: "#4ADE80",
    fontSize: 11,
    fontWeight: "700",
  },
  badgeTextSelected: {
    color: "#818CF8",
  },
  deleteBtn: {
    backgroundColor: "#1C0A0A",
    borderWidth: 1,
    borderColor: "#7F1D1D",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  deleteBtnText: {
    color: "#F87171",
    fontSize: 12,
    fontWeight: "700",
  },
});