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
import { COLORS } from "../src/styles/theme";
import API from "../src/services/api";

export default function Login() {
  const { width } = useWindowDimensions();
  const isWeb = width > 600;

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const sendOtp = async () => {
    try {
      setLoading(true);
      setSuccessMsg("");
      await API.post("/auth/send-otp", { email });

      setSuccessMsg(`OTP sent to ${email}`);

      setTimeout(() => {
        router.push({
          pathname: "/otp",
          params: { email },
        });
      }, 1200);
    } catch (err) {
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.root}
    >
      {/* Background grid lines for depth */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {[...Array(8)].map((_, i) => (
          <View
            key={i}
            style={[styles.gridLine, { top: `${i * 13}%` as any }]}
          />
        ))}
      </View>

      <View style={[styles.card, isWeb && styles.cardWeb]}>
        {/* Brand mark */}
        <View style={styles.brandRow}>
          <View style={styles.brandDot} />
          <Text style={styles.brandText}>PLATFORM</Text>
        </View>

        <Text style={styles.title}>Welcome{"\n"}Back.</Text>
        <Text style={styles.subtitle}>Sign in to continue to your workspace</Text>

        {/* Success Message Card */}
        {successMsg ? (
          <View style={styles.successCard}>
            <View style={styles.successIconWrap}>
              <Text style={styles.successIcon}>✓</Text>
            </View>
            <View>
              <Text style={styles.successTitle}>OTP Dispatched</Text>
              <Text style={styles.successBody}>{successMsg}</Text>
            </View>
          </View>
        ) : null}

        {/* Input */}
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
          style={[styles.btn, loading && styles.btnLoading]}
          onPress={sendOtp}
          activeOpacity={0.85}
          disabled={loading}
        >
          {loading ? (
            <View style={styles.btnInner}>
              <View style={styles.spinner} />
              <Text style={styles.btnText}>Sending OTP...</Text>
            </View>
          ) : (
            <Text style={styles.btnText}>Send OTP →</Text>
          )}
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footerRow}>
          <View style={styles.footerDivider} />
          <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text style={styles.footerLink}>Create an account</Text>
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
    shadowColor: "#38BDF8",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 40,
    elevation: 10,
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
    backgroundColor: "#38BDF8",
    borderRadius: 8,
  },
  brandText: {
    color: "#38BDF8",
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
  successCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0D2A1E",
    borderWidth: 1,
    borderColor: "#14532D",
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    gap: 14,
  },
  successIconWrap: {
    width: 36,
    height: 36,
    backgroundColor: "#166534",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  successIcon: {
    color: "#4ADE80",
    fontSize: 16,
    fontWeight: "800",
  },
  successTitle: {
    color: "#4ADE80",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 2,
  },
  successBody: {
    color: "#86EFAC",
    fontSize: 12,
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
    backgroundColor: "#38BDF8",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 24,
  },
  btnLoading: {
    backgroundColor: "#1E293B",
  },
  btnInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  spinner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#334155",
    borderTopColor: "#38BDF8",
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
