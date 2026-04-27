import React, { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useAppDispatch, useAppSelector } from "../../src/redux/hooks";
import { fetchTasks } from "../../src/redux/taskSlice";

export default function TaskScreen() {
  const dispatch = useAppDispatch();

  const { list } = useAppSelector((state) => state.tasks);
  const selectedProject = useAppSelector(
    (state) => state.projects.list.find((p) => p.selected)
  );

  useEffect(() => {
    if (selectedProject?._id) {
      dispatch(fetchTasks(selectedProject._id));
    }
  }, [selectedProject]);

  return (
    <View style={{ flex: 1, padding: 15, backgroundColor: "#0F172A" }}>
      <Text style={{ color: "#fff", fontSize: 20 }}>
        Tasks
      </Text>

      {!selectedProject && (
        <Text style={{ color: "#aaa", marginTop: 10 }}>
          Select a project first
        </Text>
      )}

      <FlatList
        data={list}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#1E293B",
              padding: 10,
              marginTop: 10,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "#fff" }}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}