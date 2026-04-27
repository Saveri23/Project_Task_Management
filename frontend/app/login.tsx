import { View, Text, TextInput, TouchableOpacity, useWindowDimensions } from "react-native";
import { router } from "expo-router";
import React, { useState } from "react";
import { COLORS } from "../src/styles/theme";
import API from "../src/services/api";

export default function Login() {
  const { width } = useWindowDimensions();
  const isWeb = width > 600;

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    try {
      setLoading(true);
      await API.post("/auth/send-otp", { email });

      router.push({
        pathname: "/otp",
        params: { email },
      });
    } catch (err) {
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#0F172A", justifyContent: "center", alignItems: "center" }}>
      <View style={{ width: isWeb ? 400 : "90%", padding: 20, backgroundColor: "#1E293B", borderRadius: 16 }}>
        
        <Text style={{ color: "#fff", fontSize: 26, marginBottom: 20 }}>
          Login 🚀
        </Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          style={{
            backgroundColor: "#0F172A",
            color: "#fff",
            padding: 12,
            borderRadius: 10,
            marginBottom: 15,
          }}
        />

        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
          }}
          onPress={sendOtp}
        >
          <Text style={{ color: "#fff" }}>
            {loading ? "Sending..." : "Send OTP"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/signup")}>
          <Text style={{ color: "#aaa", marginTop: 15 }}>
            Don't have account? Signup
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}