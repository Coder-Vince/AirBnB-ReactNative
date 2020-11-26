import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { Text, View, ActivityIndicator } from "react-native";
import axios from "axios";

// export default function RoomScreen({ route }) {
//   console.log("https://express-airbnb-api.herokuapp.com/rooms/{id}");
//   console.log(route);
//   return (
//     <View>
//       <Text>ROOM id : {route.params.id}</Text>
//     </View>
//   );
// }

export default function RoomScreen({ route }) {
  console.log(route);
  const { id } = {route.params.id};
  console.log(
    `https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`
  );
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      `https://express-airbnb-api.herokuapp.com/rooms${route.params.id}`
    );

    // console.log(response.data);
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return isLoading ? (
    <ActivityIndicator size="large" color="#00ff00" />
  ) : (
    <View>
      <Text>ROOM id : {route.params.id}</Text>
    </View>
  );
}
