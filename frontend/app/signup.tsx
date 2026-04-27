import { View, Text, TextInput, TouchableOpacity, useWindowDimensions } from "react-native";
import { router } from "expo-router";
import React, { useState } from "react";
import API from "../src/services/api";

export default function Signup() {
  const { width } = useWindowDimensions();
  const isWeb = width > 600;

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const sendOtp = async () => {
    try {
      await API.post("/auth/send-otp", { email });
console.log("Sending OTP for:", email);
      router.push({
        pathname: "/otp",
        params: { email },
      });
    } catch (err) {
      alert("Error sending OTP");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#0F172A", justifyContent: "center", alignItems: "center", padding: 20 }}>
      <View style={{ width: isWeb ? 400 : "100%", backgroundColor: "#1E293B", padding: 25, borderRadius: 16 }}>
        
        <Text style={{ color: "#fff", fontSize: 26, marginBottom: 20 }}>
          Create Account 🚀
        </Text>

        <TextInput
          placeholder="Name"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
          style={inputStyle}
        />

        <TextInput
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          style={inputStyle}
        />

        <TouchableOpacity
          style={{
            backgroundColor: "#6366F1",
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
          }}
          onPress={sendOtp}
        >
          <Text style={{ color: "#fff" }}>Send OTP</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={{ color: "#aaa", marginTop: 15 }}>
            Already have account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const inputStyle = {
  backgroundColor: "#0F172A",
  color: "#fff",
  padding: 12,
  borderRadius: 10,
  marginBottom: 12,
};