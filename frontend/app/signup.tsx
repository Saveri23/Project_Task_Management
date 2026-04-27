import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.root}
    >
      {/* Background grid lines */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {[...Array(8)].map((_, i) => (
          <View key={i} style={[styles.gridLine, { top: `${i * 13}%` as any }]} />
        ))}
      </View>

      <View style={[styles.card, isWeb && styles.cardWeb]}>
        {/* Brand mark */}
        <View style={styles.brandRow}>
          <View style={styles.brandDot} />
          <Text style={styles.brandText}>PLATFORM</Text>
        </View>

        <Text style={styles.title}>Create{"\n"}Account.</Text>
        <Text style={styles.subtitle}>Join your workspace today</Text>

        {/* Name Input */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>FULL NAME</Text>
          <TextInput
            placeholder="John Doe"
            placeholderTextColor="#3D4F6B"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
          <TextInput
            placeholder="you@example.com"
            placeholderTextColor="#3D4F6B"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
        </View>

        {/* CTA */}
        <TouchableOpacity
          style={styles.btn}
          onPress={sendOtp}
          activeOpacity={0.85}
        >
          <Text style={styles.btnText}>Send OTP →</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footerRow}>
          <View style={styles.footerDivider} />
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.footerLink}>Sign in instead</Text>
          </TouchableOpacity>
          <View style={styles.footerDivider} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#060A12",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  gridLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "#0F172A",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#0C1420",
    borderWidth: 1,
    borderColor: "#1A2740",
    borderRadius: 24,
    padding: 32,
  },
  cardWeb: {
    maxWidth: 460,
    padding: 40,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 28,
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
  title: {
    color: "#F1F5F9",
    fontSize: 38,
    fontWeight: "800",
    letterSpacing: -1,
    lineHeight: 44,
    marginBottom: 10,
  },
  subtitle: {
    color: "#475569",
    fontSize: 14,
    marginBottom: 28,
    lineHeight: 20,
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
    borderWidth: 1,
    borderColor: "#1E293B",
  },
  btn: {
    backgroundColor: "#818CF8",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 24,
  },
  btnText: {
    color: "#0C1420",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  footerDivider: {
    flex: 1,
    height: 1,
    backgroundColor: "#1E293B",
  },
  footerLink: {
    color: "#64748B",
    fontSize: 13,
    fontWeight: "600",
  },
});