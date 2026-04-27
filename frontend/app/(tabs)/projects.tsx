import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../src/redux/hooks";
import {
  fetchProjects,
  createProject,
  deleteProject,
} from "../../src/redux/projectSlice";
import ProjectCard from "../../src/components/ProjectCard";

export default function ProjectScreen() {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((state) => state.projects);
  const { width } = useWindowDimensions();
  const isWeb = width > 768;

  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [titleFocused, setTitleFocused] = useState(false);
  const [descFocused, setDescFocused] = useState(false);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleAdd = async () => {
    if (!title) return;
    await dispatch(createProject({ title, description }));
    setTitle("");
    setDescription("");
    setModalVisible(false);
  };

  return (
    <View style={styles.root}>
      <View style={[styles.inner, isWeb && styles.innerWeb]}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerAccent} />
          <View style={{ flex: 1 }}>
            <Text style={styles.headerLabel}>WORKSPACE</Text>
            <Text style={styles.headerTitle}>Projects</Text>
          </View>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{list.length}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Add Button */}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.addBtn}
          activeOpacity={0.85}
        >
          <Text style={styles.addBtnText}>＋ New Project</Text>
        </TouchableOpacity>

        {/* Project List */}
        <FlatList
          data={list}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingBottom: 40 }}
          ListEmptyComponent={
            <View style={styles.emptyCard}>
              <Text style={styles.emptyIcon}>◈</Text>
              <Text style={styles.emptyTitle}>No Projects Yet</Text>
              <Text style={styles.emptySubtitle}>
                Tap "New Project" to get started
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() =>
                setSelectedProject(
                  selectedProject?._id === item._id ? null : item
                )
              }
            >
              <ProjectCard
                project={item}
                isSelected={selectedProject?._id === item._id}
                onDelete={(id) => dispatch(deleteProject(id))}
              />
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.modalOverlay}
        >
          <View style={[styles.modalCard, isWeb && styles.modalCardWeb]}>

            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <View style={styles.brandRow}>
                <View style={styles.brandDot} />
                <Text style={styles.brandText}>NEW PROJECT</Text>
              </View>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeBtn}
              >
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalTitle}>Add{"\n"}Project.</Text>

            {/* Title */}
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>PROJECT TITLE</Text>
              <TextInput
                placeholder="e.g. Mobile App Redesign"
                placeholderTextColor="#3D4F6B"
                value={title}
                onChangeText={setTitle}
                onFocus={() => setTitleFocused(true)}
                onBlur={() => setTitleFocused(false)}
                style={[styles.input, titleFocused && styles.inputFocused]}
              />
            </View>

            {/* Description */}
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>DESCRIPTION</Text>
              <TextInput
                placeholder="What's this project about?"
                placeholderTextColor="#3D4F6B"
                value={description}
                onChangeText={setDescription}
                onFocus={() => setDescFocused(true)}
                onBlur={() => setDescFocused(false)}
                multiline
                numberOfLines={3}
                style={[
                  styles.input,
                  styles.inputMultiline,
                  descFocused && styles.inputFocused,
                ]}
              />
            </View>

            {/* Actions */}
            <TouchableOpacity
              onPress={handleAdd}
              style={[styles.modalAddBtn, !title && styles.modalAddBtnDisabled]}
              activeOpacity={0.85}
              disabled={!title}
            >
              <Text
                style={[
                  styles.modalAddBtnText,
                  !title && { color: "#334155" },
                ]}
              >
                Create Project →
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.modalCancelBtn}
              activeOpacity={0.85}
            >
              <Text style={styles.modalCancelBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
    marginBottom: 20,
  },
  headerAccent: {
    width: 4,
    height: 40,
    backgroundColor: "#818CF8",
    borderRadius: 4,
  },
  headerLabel: {
    color: "#818CF8",
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
  divider: {
    height: 1,
    backgroundColor: "#1E293B",
    marginBottom: 16,
  },

  /* Add Button */
  addBtn: {
    backgroundColor: "#818CF8",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 20,
  },
  addBtnText: {
    color: "#0C1420",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.3,
  },

  /* Empty */
  emptyCard: {
    marginTop: 50,
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

  /* Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalCard: {
    width: "100%",
    backgroundColor: "#0C1420",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    borderColor: "#1A2740",
    padding: 32,
    paddingBottom: 48,
  },
  modalCardWeb: {
    maxWidth: 500,
    borderRadius: 24,
    marginBottom: 40,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  brandDot: {
    width: 8,
    height: 8,
    backgroundColor: "#818CF8",
    borderRadius: 8,
  },
  brandText: {
    color: "#818CF8",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 4,
  },
  closeBtn: {
    width: 32,
    height: 32,
    backgroundColor: "#1E293B",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtnText: {
    color: "#64748B",
    fontSize: 13,
    fontWeight: "700",
  },
  modalTitle: {
    color: "#F1F5F9",
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: -1,
    lineHeight: 40,
    marginBottom: 24,
  },
  inputWrapper: {
    marginBottom: 18,
  },
  inputLabel: {
    color: "#334155",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2.5,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#080C14",
    color: "#F1F5F9",
    padding: 16,
    borderRadius: 12,
    fontSize: 15,
    borderWidth: 1.5,
    borderColor: "#1E293B",
  },
  inputFocused: {
    borderColor: "#818CF8",
  },
  inputMultiline: {
    height: 90,
    textAlignVertical: "top",
  },
  modalAddBtn: {
    backgroundColor: "#818CF8",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  modalAddBtnDisabled: {
    backgroundColor: "#1E293B",
  },
  modalAddBtnText: {
    color: "#0C1420",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  modalCancelBtn: {
    backgroundColor: "#080C14",
    borderWidth: 1,
    borderColor: "#1E293B",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  modalCancelBtnText: {
    color: "#475569",
    fontSize: 14,
    fontWeight: "700",
  },
});