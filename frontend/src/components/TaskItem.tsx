import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from "react-native";
import React from "react";

interface Task {
  _id: string;
  title: string;
  completed: boolean;
}

interface Props {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onDelete?: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete }: Props) {
  const { width } = useWindowDimensions();
  const isWeb = width > 768;

  return (
    <TouchableOpacity
      onPress={() => onToggle(task._id, !task.completed)}
      activeOpacity={0.85}
      style={[
        styles.card,
        task.completed && styles.cardCompleted,
        isWeb && styles.cardWeb,
      ]}
    >
      {/* Left accent bar */}
      <View style={[styles.accent, task.completed && styles.accentCompleted]} />

      {/* Checkbox */}
      <View style={[styles.checkbox, task.completed && styles.checkboxCompleted]}>
        {task.completed && <Text style={styles.checkmark}>✓</Text>}
      </View>

      {/* Text */}
      <View style={styles.textWrap}>
        <Text style={[styles.title, task.completed && styles.titleCompleted]}>
          {task.title}
        </Text>
        <Text style={[styles.meta, task.completed && styles.metaCompleted]}>
          {task.completed ? "Completed" : "Tap to complete"}
        </Text>
      </View>

      {/* Delete */}
      {onDelete && (
        <TouchableOpacity
          onPress={() => onDelete(task._id)}
          style={styles.deleteBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.deleteBtnText}>✕</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0C1420",
    borderWidth: 1,
    borderColor: "#1A2740",
    borderRadius: 16,
    marginBottom: 10,
    overflow: "hidden",
    gap: 14,
    paddingRight: 16,
  },
  cardWeb: {
    borderRadius: 14,
    // subtle hover-ready shadow on web
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  cardCompleted: {
    backgroundColor: "#0A1F15",
    borderColor: "#14532D",
  },
  accent: {
    width: 3,
    alignSelf: "stretch",
    backgroundColor: "#38BDF8",
  },
  accentCompleted: {
    backgroundColor: "#22C55E",
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#334155",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 2,
  },
  checkboxCompleted: {
    backgroundColor: "#166534",
    borderColor: "#22C55E",
  },
  checkmark: {
    color: "#4ADE80",
    fontSize: 13,
    fontWeight: "900",
  },
  textWrap: {
    flex: 1,
    paddingVertical: 18,
  },
  title: {
    color: "#F1F5F9",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 3,
    letterSpacing: -0.1,
  },
  titleCompleted: {
    color: "#4ADE80",
    textDecorationLine: "line-through",
  },
  meta: {
    color: "#334155",
    fontSize: 11,
    letterSpacing: 0.2,
  },
  metaCompleted: {
    color: "#166534",
  },
  deleteBtn: {
    backgroundColor: "#1C0A0A",
    borderWidth: 1,
    borderColor: "#7F1D1D",
    borderRadius: 8,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteBtnText: {
    color: "#F87171",
    fontSize: 12,
    fontWeight: "800",
  },
});