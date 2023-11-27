import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { initUsername } from "../redux/actions";

import LoginField from "../components/LoginField";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const nav = useNavigation();

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = () => {
    if (!username || !password) {
      alert("Please fill all required fields");
      return;
    }

    dispatch(initUsername(username));

    nav.navigate("Default");
  };

  return (
    <View style={styles.base}>
      <View style={styles.logo}>
        <Image
          source={require("../icons/Logo.png")}
          style={{ width: 82, height: 90.2, resizeMode: "contain" }}
        />
      </View>
      <View style={{ marginHorizontal: "20%", marginVertical: 50 }}>
        <LoginField
          label="Username"
          icon="person-circle-outline"
          onChangeText={setUsername}
        />
        <View style={{ height: 23 }}></View>
        <LoginField
          label="Password"
          icon="key"
          secureTextEntry
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.5}
        onPress={handleLogin}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 700 }}>
          Sign Up
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          alignSelf: "center",
          marginTop: 8,
          fontSize: 12,
          fontWeight: 300,
        }}
      >
        Already have an account?{" "}
        <Text
          style={{ color: "#2340DC", fontWeight: "bold" }}
          onPress={() => nav.navigate("Login")}
        >
          Login
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  logo: {
    width: 127,
    height: 116.361,
    backgroundColor: "#FFFFFF",
    elevation: 5,
    borderRadius: 80,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    shadowColor: "#000000",
    marginTop: 80,
  },
  button: {
    backgroundColor: "#2340DC",
    height: 45,
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 4,
  },
});
