import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

// 🔥 Project type
interface Project {
  _id: string;
  title: string;
  description?: string;
}

// 🔥 Props type
interface Props {
  project: Project;
  onDelete?: (id: string) => void;
}

export default function ProjectCard({ project, onDelete }: Props) {
  return (
    <View
      style={{
        backgroundColor: "#1E293B",
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
      }}
    >
      {/* Title */}
      <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
        {project.title}
      </Text>

      {/* Description */}
      {project.description && (
        <Text style={{ color: "#aaa", marginTop: 5 }}>
          {project.description}
        </Text>
      )}

      {/* Delete Button */}
      {onDelete && (
        <TouchableOpacity onPress={() => onDelete(project._id)}>
          <Text style={{ color: "red", marginTop: 10 }}>
            Delete
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}