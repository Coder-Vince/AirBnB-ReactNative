import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

export default function SignInScreen({ setToken }) {
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("nono@airbnb-api.com");
  const [password, setPassword] = useState("pass");

  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.SafeArea}>
      <KeyboardAwareScrollView contentContainerStyle={{ alignItems: "center" }}>
        <View style={styles.Container}>
          <View style={styles.SignTop}>
            <Image
              source={require("../assets/logo.png")}
              resizeMode="contain"
              style={styles.logo}
            ></Image>
            <Text style={styles.signin1}>Sign in</Text>
          </View>
          <View style={styles.SignMid}>
            {/* <Text>Name: </Text> */}
            <TextInput
              placeholder="Email"
              style={styles.Email}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
            {/* <Text>Password: </Text> */}
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              style={styles.Password}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
          </View>
          <View style={styles.SignBottom}>
            {email && password ? null : <Text>Please fill all fields</Text>}
            {isLoading === true ? (
              <ActivityIndicator size="large" />
            ) : (
              <TouchableOpacity
                style={styles.button}
                // <Button we cannot style buttons better use TouchableOpacity
                //   title="Sign in"
                onPress={async () => {
                  setIsLoading(true);
                  // const userToken = "secret-token";
                  // setToken(userToken);
                  try {
                    const response = await axios.post(
                      "https://express-airbnb-api.herokuapp.com/user/log_in",
                      { email: email, password: password },
                      {
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    );
                    setIsLoading(false);
                    // console.log(response.data);

                    setToken(response.data.token);
                  } catch (error) {
                    alert("An error occurred");
                  }
                }}
              >
                <Text>Sign in</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text>No account? Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeArea: {
    flex: 1,
    backgroundColor: "white",
    // alignItems: "center",

    // justifyContent: "space-between",
  },

  Container: {
    // flex: 1,
    // borderColor: "pink",
    // borderWidth: 4,
    // height: "100%",
    width: "100%",
    // justifyContent: "space-evenly",
  },

  // TOP Screen

  SignTop: {
    // borderColor: "pink",
    // borderWidth: 4,
    alignItems: "center",
  },

  logo: {
    marginTop: 40,
    height: 150,
    width: 100,
  },

  signin1: {
    color: "black",
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 20,
  },

  // MID Screen

  SignMid: {
    marginTop: 50,
    marginBottom: 80,
    height: 150,
    padding: 30,
    // borderColor: "pink",
    // borderWidth: 4,
    alignItems: "flex-start",
  },

  Email: {
    padding: 10,
    width: "100%",
    color: "black",
    fontSize: 20,
    fontWeight: "400",
    marginBottom: 20,
    opacity: 0.7,
    borderBottomColor: "red",
    borderBottomWidth: 1,
  },

  Password: {
    padding: 10,
    width: "100%",
    color: "black",
    fontSize: 20,
    fontWeight: "400",
    marginBottom: 20,
    opacity: 0.7,
    borderBottomColor: "red",
    borderBottomWidth: 1,
  },

  // BOTTOM Screen

  SignBottom: {
    // borderColor: "pink",
    // borderWidth: 4,
    alignItems: "center",
  },

  button: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 13,
    borderColor: "red",
    opacity: 0.8,
    borderWidth: 2,
    borderRadius: 30,
    width: 150,
    marginBottom: 12,
    marginTop: 10,
  },
});
