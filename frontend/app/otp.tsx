import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import API from "../src/services/api";

// ✅ use AsyncStorage for React Native (safe for web + mobile)
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Otp() {
  const { email } = useLocalSearchParams();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyOtp = async () => {
    try {
      setLoading(true);

      const res = await API.post("/auth/verify-otp", {
        email,
        otp,
      });

      // 🔥 SAVE TOKEN (IMPORTANT)
      await AsyncStorage.setItem("token", res.data.token);

      console.log("LOGIN SUCCESS:", res.data);

      // 🔥 GO TO PROJECTS
      router.replace("/(tabs)/projects");
    } catch (err: any) {
      console.log(err.response?.data || err.message);
      alert("Invalid OTP or expired");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0F172A",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Text style={{ color: "#fff", fontSize: 24, marginBottom: 20 }}>
        Enter OTP
      </Text>

      <TextInput
        placeholder="Enter OTP"
        placeholderTextColor="#aaa"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        style={{
          backgroundColor: "#1E293B",
          color: "#fff",
          padding: 12,
          borderRadius: 10,
          marginBottom: 15,
        }}
      />

      <TouchableOpacity
        onPress={verifyOtp}
        style={{
          backgroundColor: loading ? "#555" : "#22C55E",
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
        }}
        disabled={loading}
      >
        <Text style={{ color: "#fff" }}>
          {loading ? "Verifying..." : "Verify OTP"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}