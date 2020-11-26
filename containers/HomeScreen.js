import React, { useState, useEffect } from "react";

import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import axios from "axios";

import { FontAwesome } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      "https://express-airbnb-api.herokuapp.com/rooms"
    );

    // console.log(response.data);
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const displayStars = (ratingValue) => {
    const tab = [];

    for (let i = 1; i <= 5; i++) {
      if (ratingValue >= i) {
        tab.push(<FontAwesome name="star" size={24} color="#FFB100" key={i} />);
      } else {
        tab.push(<FontAwesome name="star" size={24} color="#BCBCBC" key={i} />);
      }
    }

    return tab;
  };

  return isLoading ? (
    <ActivityIndicator size="large" color="#00ff00" />
  ) : (
    <FlatList
      data={data}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={() => {
              navigation.navigate("Room", {
                id: item._id,
              });
            }}
          >
            <ImageBackground
              source={{
                uri: item.photos[0].url,
              }}
              style={styles.imgBg}
            >
              <View style={styles.priceView}>
                <Text style={styles.price}>{item.price} €</Text>
              </View>
            </ImageBackground>

            <View style={styles.infos}>
              <View style={styles.infosView}>
                <Text style={styles.txtView} numberOfLines={1}>
                  {item.title}
                </Text>

                <View style={styles.ratingView}>
                  {displayStars(item.ratingValue)}
                  <Text style={styles.txtreviews}>{item.reviews} reviews</Text>
                </View>
              </View>

              <Image
                source={{
                  uri: item.user.account.photo.url,
                }}
                style={styles.userPic}
              />
            </View>
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item) => item._id}
    />
  );
}

const styles = StyleSheet.create({
  touchableOpacity: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  imgBg: {
    height: 200,
    width: "100%",
    justifyContent: "flex-end",
  },
  priceView: {
    height: 30,
    width: 100,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  price: {
    color: "white",
  },
  infos: {
    height: 100,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userPic: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  infosView: {
    backgroundColor: "white",
    width: "70%",
  },

  txtView: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 5,
  },

  ratingView: {
    flexDirection: "row",
    alignItems: "center",
  },

  txtreviews: {
    color: "#BBBBBB",
  },
});
