import React, { useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../src/redux/hooks";
import {
  fetchTasks,
  updateTask,
  deleteTask,
  createTask,
} from "../../src/redux/taskSlice";
import TaskItem from "../../src/components/TaskItem";

export default function TaskScreen() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.list);
  const { width } = useWindowDimensions();
  const isWeb = width > 768;

  const projectId = "123";

  useEffect(() => {
    dispatch(fetchTasks(projectId));
  }, []);

  const handleToggle = (id: string, completed: boolean) => {
    dispatch(updateTask({ id, data: { completed } }));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  const handleAdd = () => {
    dispatch(createTask({ title: "New Task", projectId }));
  };

  const completed = tasks.filter((t) => t.completed).length;
  const total = tasks.length;

  return (
    <View style={styles.root}>
      {/* Web sidebar-aware centering */}
      <View style={[styles.inner, isWeb && styles.innerWeb]}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerAccent} />
          <View style={{ flex: 1 }}>
            <Text style={styles.headerLabel}>PROJECT · {projectId}</Text>
            <Text style={styles.headerTitle}>Tasks</Text>
          </View>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{total}</Text>
          </View>
        </View>

        {/* Progress Bar */}
        {total > 0 && (
          <View style={styles.progressWrap}>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${Math.round((completed / total) * 100)}%` as any },
                ]}
              />
            </View>
            <Text style={styles.progressLabel}>
              {completed}/{total} done
            </Text>
          </View>
        )}

        <View style={styles.divider} />

        {/* Add Button */}
        <TouchableOpacity
          onPress={handleAdd}
          style={styles.addBtn}
          activeOpacity={0.85}
        >
          <Text style={styles.addBtnText}>＋ Add Task</Text>
        </TouchableOpacity>

        {/* Empty State */}
        {tasks.length === 0 && (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>◈</Text>
            <Text style={styles.emptyTitle}>No Tasks Yet</Text>
            <Text style={styles.emptySubtitle}>
              Hit "Add Task" to create your first one
            </Text>
          </View>
        )}

        {/* List */}
        <FlatList
          data={tasks}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#060A12",
    alignItems: "center",
  },
  inner: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  // Web: constrain width and center
  innerWeb: {
    maxWidth: 720,
    paddingHorizontal: 40,
    paddingTop: 48,
  },

  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 16,
  },
  headerAccent: {
    width: 4,
    height: 40,
    backgroundColor: "#38BDF8",
    borderRadius: 4,
  },
  headerLabel: {
    color: "#38BDF8",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 3,
    marginBottom: 2,
  },
  headerTitle: {
    color: "#F1F5F9",
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  countBadge: {
    backgroundColor: "#1E293B",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 50,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  countText: {
    color: "#94A3B8",
    fontSize: 13,
    fontWeight: "700",
  },

  /* Progress */
  progressWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  progressTrack: {
    flex: 1,
    height: 4,
    backgroundColor: "#1E293B",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#22C55E",
    borderRadius: 4,
  },
  progressLabel: {
    color: "#475569",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
    minWidth: 50,
    textAlign: "right",
  },

  divider: {
    height: 1,
    backgroundColor: "#1E293B",
    marginBottom: 16,
  },

  /* Add */
  addBtn: {
    backgroundColor: "#38BDF8",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 16,
  },
  addBtnText: {
    color: "#0C1420",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.3,
  },

  /* Empty */
  emptyCard: {
    marginTop: 40,
    backgroundColor: "#0C1420",
    borderWidth: 1,
    borderColor: "#1A2740",
    borderRadius: 20,
    padding: 36,
    alignItems: "center",
  },
  emptyIcon: {
    color: "#334155",
    fontSize: 40,
    marginBottom: 16,
  },
  emptyTitle: {
    color: "#94A3B8",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 8,
  },
  emptySubtitle: {
    color: "#475569",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
  },
});