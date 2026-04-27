import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, Button } from "react-native";
import { useAppDispatch, useAppSelector } from "../../src/redux/hooks";
import {
  fetchTasks,
  createTask,
  deleteTask,
} from "../../src/redux/taskSlice";

export default function TaskScreen() {
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector((state) => state.tasks);

  const [title, setTitle] = useState("");

  const projectId = "123"; // 🔥 replace with selected projectId

  // 🔥 LOAD TASKS
  useEffect(() => {
    dispatch(fetchTasks(projectId));
  }, [dispatch]);

  // 🔥 ADD TASK
  const handleAdd = () => {
    if (!title) return;

    dispatch(
      createTask({
        title,
        projectId,
      })
    );

    setTitle("");
  };

  return (
    <View style={{ flex: 1, padding: 15, backgroundColor: "#0F172A" }}>
      
      <Text style={{ color: "#fff", fontSize: 20 }}>Tasks</Text>

      {/* INPUT */}
      <TextInput
        placeholder="Enter task"
        placeholderTextColor="#999"
        value={title}
        onChangeText={setTitle}
        style={{
          backgroundColor: "#1E293B",
          color: "#fff",
          padding: 10,
          marginVertical: 10,
          borderRadius: 8,
        }}
      />

      <Button title="Add Task" onPress={handleAdd} />

      {loading && <Text style={{ color: "#fff" }}>Loading...</Text>}

      {/* LIST */}
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

            <Button
              title="Delete"
              onPress={() => dispatch(deleteTask(item._id))}
            />
          </View>
        )}
      />
    </View>
  );
}