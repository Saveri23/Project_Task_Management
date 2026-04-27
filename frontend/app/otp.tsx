import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState, useRef } from "react";
import { router, useLocalSearchParams } from "expo-router";
import API from "../src/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Otp() {
  const { email } = useLocalSearchParams();
  const { width } = useWindowDimensions();
  const isWeb = width > 600;

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "verifying" | "success" | "error">("idle");

  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (val: string, idx: number) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 3) inputs.current[idx + 1]?.focus();
    if (!val && idx > 0) inputs.current[idx - 1]?.focus();
  };

  const fullOtp = otp.join("");

  const verifyOtp = async () => {
    try {
      setLoading(true);
      setStatus("verifying");

      const res = await API.post("/auth/verify-otp", { email, otp: fullOtp });

      await AsyncStorage.setItem("token", res.data.token);

      setStatus("success");
      console.log("LOGIN SUCCESS:", res.data);

      setTimeout(() => {
        router.replace("/(tabs)/projects");
      }, 1500);
    } catch (err: any) {
      console.log(err.response?.data || err.message);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.root}
    >
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {[...Array(8)].map((_, i) => (
          <View key={i} style={[styles.gridLine, { top: `${i * 13}%` as any }]} />
        ))}
      </View>

      <View style={[styles.card, isWeb && styles.cardWeb]}>
        <View style={styles.brandRow}>
          <View style={styles.brandDot} />
          <Text style={styles.brandText}>VERIFICATION</Text>
        </View>

        <Text style={styles.title}>Enter{"\n"}Your Code.</Text>
        <Text style={styles.subtitle}>
          A 4-digit OTP was sent to{"\n"}
          <Text style={styles.emailHighlight}>{email}</Text>
        </Text>

        {status === "verifying" && (
          <View style={[styles.statusCard, styles.statusVerifying]}>
            <View style={styles.statusIconWrap}>
              <Text style={styles.statusIcon}>⟳</Text>
            </View>
            <View>
              <Text style={[styles.statusTitle, { color: "#38BDF8" }]}>Verifying Code</Text>
              <Text style={[styles.statusBody, { color: "#7DD3FC" }]}>Checking your OTP…</Text>
            </View>
          </View>
        )}

        {status === "success" && (
          <View style={[styles.statusCard, styles.statusSuccess]}>
            <View style={[styles.statusIconWrap, { backgroundColor: "#166534" }]}>
              <Text style={styles.statusIcon}>✓</Text>
            </View>
            <View>
              <Text style={[styles.statusTitle, { color: "#4ADE80" }]}>Verified!</Text>
              <Text style={[styles.statusBody, { color: "#86EFAC" }]}>Redirecting to dashboard…</Text>
            </View>
          </View>
        )}

        {status === "error" && (
          <View style={[styles.statusCard, styles.statusError]}>
            <View style={[styles.statusIconWrap, { backgroundColor: "#7F1D1D" }]}>
              <Text style={styles.statusIcon}>✕</Text>
            </View>
            <View>
              <Text style={[styles.statusTitle, { color: "#F87171" }]}>Invalid OTP</Text>
              <Text style={[styles.statusBody, { color: "#FCA5A5" }]}>Please try again or resend.</Text>
            </View>
          </View>
        )}

        {/* 4 OTP Square Boxes */}
        <View style={styles.otpRow}>
          {otp.map((digit, idx) => (
            <TextInput
              key={idx}
              ref={(r) => { inputs.current[idx] = r; }}
              value={digit}
              onChangeText={(val) => handleChange(val, idx)}
              keyboardType="numeric"
              maxLength={1}
              selectTextOnFocus
              style={[
                styles.otpBox,
                digit ? styles.otpBoxFilled : null,
                status === "error" ? styles.otpBoxError : null,
                status === "success" ? styles.otpBoxSuccess : null,
              ]}
              cursorColor="#38BDF8"
            />
          ))}
        </View>

        <TouchableOpacity
          onPress={verifyOtp}
          style={[
            styles.btn,
            fullOtp.length < 4 && styles.btnDisabled,
            status === "success" && styles.btnSuccess,
          ]}
          disabled={loading || fullOtp.length < 4}
          activeOpacity={0.85}
        >
          <Text
            style={[
              styles.btnText,
              fullOtp.length < 4 && { color: "#475569" },
              status === "success" && { color: "#0D2A1E" },
            ]}
          >
            {status === "success" ? "✓ Verified" : loading ? "Verifying…" : "Verify OTP →"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resendRow}>
          <Text style={styles.resendText}>Didn't receive code? </Text>
          <Text style={styles.resendLink}>Resend</Text>
        </TouchableOpacity>
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
    marginBottom: 24,
    lineHeight: 22,
  },
  emailHighlight: {
    color: "#94A3B8",
    fontWeight: "700",
  },
  statusCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    gap: 14,
    borderWidth: 1,
  },
  statusVerifying: {
    backgroundColor: "#0C2233",
    borderColor: "#1E4A6B",
  },
  statusSuccess: {
    backgroundColor: "#0D2A1E",
    borderColor: "#14532D",
  },
  statusError: {
    backgroundColor: "#1C0A0A",
    borderColor: "#7F1D1D",
  },
  statusIconWrap: {
    width: 36,
    height: 36,
    backgroundColor: "#1E3A5F",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  statusIcon: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "900",
  },
  statusTitle: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 2,
  },
  statusBody: {
    fontSize: 12,
  },
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 28,
  },
  otpBox: {
    flex: 1,
    aspectRatio: 1,
    maxWidth: 72,
    backgroundColor: "#080C14",
    borderWidth: 1.5,
    borderColor: "#1E293B",
    borderRadius: 14,
    color: "#F1F5F9",
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
  },
  otpBoxFilled: {
    borderColor: "#38BDF8",
    backgroundColor: "#0A1929",
  },
  otpBoxError: {
    borderColor: "#EF4444",
    backgroundColor: "#1C0A0A",
  },
  otpBoxSuccess: {
    borderColor: "#22C55E",
    backgroundColor: "#0D2A1E",
  },
  btn: {
    backgroundColor: "#38BDF8",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 20,
  },
  btnDisabled: {
    backgroundColor: "#0F172A",
    borderWidth: 1,
    borderColor: "#1E293B",
  },
  btnSuccess: {
    backgroundColor: "#22C55E",
  },
  btnText: {
    color: "#0C1420",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  resendRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  resendText: {
    color: "#475569",
    fontSize: 13,
  },
  resendLink: {
    color: "#38BDF8",
    fontSize: 13,
    fontWeight: "700",
  },
});