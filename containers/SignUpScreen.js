import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

// export default function SignUpScreen({ setToken }) {
export default function SignUpScreen() {
  // States declaration one for each text input to inform
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    // vérifier que tous les champs sont bien remplis
    // vérifier que les 2 MDP sont identiques
    // envoyer les données vers le back

    if (email && username && description && password && confirmPassword) {
      console.log("on passe à la suite");
      if (password === confirmPassword) {
        console.log("on passe à la suite 2");

        try {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email,
              username,
              description,
              password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          console.log(response.data);
          if (response.data.token) {
            alert("TOUT EST OK");
            // setToken(response.data.token);
          } else {
            alert("An error occurred");
          }
        } catch (error) {
          alert("catch");
          console.log(Object.keys(error)); // affiche les clés de l'objet error
          console.log(error.response.data.error); // Message du type : This email already has an account.
          console.log(error.response.status); // 400 par exemple

          setErrorMessage(error.response.data.error);
        }
      } else {
        setErrorMessage("Passwords must be the same");
      }
    } else {
      setErrorMessage("Please fill in all the fields");
    }
  };

  return (
    <SafeAreaView style={styles.SafeArea}>
      <KeyboardAwareScrollView>
        <View>
          <View style={styles.SignTop}>
            <Image
              source={require("../assets/logo.png")}
              resizeMode="contain"
              style={styles.logo}
            ></Image>
            <Text style={styles.signup1}>Sign up</Text>
          </View>
          <View style={styles.SignMid}>
            {/* <Text>Name: </Text> */}
            <TextInput
              placeholder="Email"
              keyboardType={"email-address"}
              value={email}
              style={styles.TextInput}
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
            <TextInput
              placeholder="Username"
              style={styles.TextInput}
              value={username}
              onChangeText={(text) => {
                setUsername(text);
              }}
            />
            <TextInput
              placeholder="Describe"
              style={styles.Describe}
              multiline={true}
              numberOfLines={10}
              maxLength={200}
              value={description}
              onChangeText={(text) => {
                setDescription(text);
              }}
            />
            {/* <Text>Password: </Text> */}
            <TextInput
              placeholder="Password"
              blurOnSubmit={false}
              onSubmitEditing={() => Keyboard.dismiss()}
              secureTextEntry={true}
              value={password}
              style={styles.TextInput}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry={true}
              style={styles.TextInput}
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
              }}
            />
          </View>
          <View style={styles.SignBottom}>
            {/* {confirmPassword === password ? null : (
              <Text>Passwords must be the same</Text>
            )} */}
            {/* <Text>Passwords must be the same</Text> */}
            <View style={styles.errorView}>
              <Text style={styles.error}>{errorMessage}</Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              //<Button
              //title="Sign up"

              // onPress={async () => {
              //   const userToken = "secret-token";
              //   setToken(userToken);
              // }}
              onPress={handleSubmit}
            >
              <Text>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text>Already have an account? Sign in</Text>
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
    // borderColor: "pink",
    // borderWidth: 4,
    // justifyContent: "space-between",
  },

  // TOP Screen

  SignTop: {
    // borderColor: "pink",
    // borderWidth: 4,
    alignItems: "center",
  },

  logo: {
    marginTop: 10,
    height: 150,
    width: 100,
  },

  signup1: {
    color: "black",
    fontSize: 20,
    fontWeight: "500",
  },

  // MID Screen

  SignMid: {
    marginBottom: 20,
    height: 150,
    padding: 30,
    // borderColor: "pink",
    // borderWidth: 4,
    flex: 1,
    height: 415,
    // alignItems: "flex-start",
  },

  TextInput: {
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

  Describe: {
    textAlignVertical: "top",
    padding: 5,
    width: "100%",
    height: 100,
    color: "black",
    fontSize: 20,
    fontWeight: "400",
    marginTop: 15,
    marginBottom: 20,
    opacity: 0.7,
    borderColor: "red",
    borderWidth: 1,
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
    marginTop: 5,
  },

  error: {
    fontSize: 10,
    color: "red",
  },

  errorView: {
    height: 20,
    backgroundColor: "white",
    width: 300,
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
