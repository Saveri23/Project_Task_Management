import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../src/redux/hooks";
import {
  fetchProjects,
  createProject,
  deleteProject,
} from "../../src/redux/projectSlice";

export default function ProjectScreen() {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((state) => state.projects);

  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [selectedProject, setSelectedProject] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  // 🔥 ADD PROJECT
  const handleAdd = async () => {
    if (!title) return;

    await dispatch(
      createProject({
        title,
        description,
      })
    );

    setTitle("");
    setDescription("");
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1, padding: 15, backgroundColor: "#0F172A" }}>
      
      {/* ADD BUTTON */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          backgroundColor: "#22C55E",
          padding: 12,
          borderRadius: 8,
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          + Add Project
        </Text>
      </TouchableOpacity>

      {/* PROJECT LIST */}
      <FlatList
        data={list}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedProject(item)}
            style={{
              backgroundColor:
                selectedProject?._id === item._id ? "#334155" : "#1E293B",
              padding: 15,
              marginBottom: 10,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16 }}>
              {item.title}
            </Text>

            <Text style={{ color: "#aaa" }}>{item.description}</Text>

            {/* DELETE */}
            <TouchableOpacity
              onPress={() => dispatch(deleteProject(item._id))}
              style={{
                marginTop: 8,
                backgroundColor: "red",
                padding: 6,
                borderRadius: 5,
                width: 80,
              }}
            >
              <Text style={{ color: "#fff", textAlign: "center" }}>
                Delete
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

      {/* 🔥 MODAL FORM */}
      <Modal visible={modalVisible} animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: "#0F172A",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 22, marginBottom: 10 }}>
            Add Project
          </Text>

          <TextInput
            placeholder="Title"
            placeholderTextColor="#999"
            value={title}
            onChangeText={setTitle}
            style={{
              backgroundColor: "#1E293B",
              color: "#fff",
              padding: 10,
              marginBottom: 10,
              borderRadius: 8,
            }}
          />

          <TextInput
            placeholder="Description"
            placeholderTextColor="#999"
            value={description}
            onChangeText={setDescription}
            style={{
              backgroundColor: "#1E293B",
              color: "#fff",
              padding: 10,
              marginBottom: 20,
              borderRadius: 8,
            }}
          />

          {/* ADD BUTTON */}
          <TouchableOpacity
            onPress={handleAdd}
            style={{
              backgroundColor: "#22C55E",
              padding: 12,
              borderRadius: 8,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>
              Add
            </Text>
          </TouchableOpacity>

          {/* CANCEL */}
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{
              backgroundColor: "#EF4444",
              padding: 12,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}