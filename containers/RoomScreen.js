import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";

export default function RoomScreen({ route }) {
  console.log(route);
  const id = route.params.id;
  console.log(
    `https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`
  );
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      `https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`
    );

    // console.log(response.data);
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

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
    <View style={styles.Allview}>
      <ImageBackground
        source={{
          uri: data.photos[0].url,
        }}
        style={styles.imgBg}
      >
        <View style={styles.priceView}>
          <Text style={styles.price}>{data.price} €</Text>
        </View>
      </ImageBackground>

      <View style={styles.infos}>
        <View style={styles.infosView}>
          <Text style={styles.txtView} numberOfLines={1}>
            {data.title}
          </Text>

          <View style={styles.ratingView}>
            {displayStars(data.ratingValue)}
            <Text style={styles.txtreviews}>{data.reviews} reviews</Text>
          </View>
        </View>
        <Image
          source={{
            uri: data.user.account.photo.url,
          }}
          style={styles.userPic}
        />
      </View>
      <Text>{data.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  Allview: {
    marginBottom: 30,
    paddingHorizontal: 20,
    backgroundColor: "white",
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
