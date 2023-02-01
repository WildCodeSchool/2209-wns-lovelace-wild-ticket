import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GetRestaurantsQuery } from '../gql/graphql';
import { gql, useQuery } from '@apollo/client';
import Restaurant from '../components/Restaurant';
import { RootStackScreenProps } from '../types';


export const GET_RESTAURANTS = gql`
  query GetRestaurants {
    getRestaurants {
      id
      name
    }
  }
`;

const RestaurantsScreen = ({ navigation }: RootStackScreenProps<"Restaurants">) => {
  const { data } = useQuery<GetRestaurantsQuery>(GET_RESTAURANTS);
  return (
    <View>
       <View style={styles.containerHeaderBoutton}>
        <Button
          title="Retour"
          onPress={() => navigation.navigate("Select")}
        />
        <Button
          title="Continuer"
          onPress={() => navigation.navigate("Ticket")}
        />
      </View>
      <Text>RestaurantsScreen</Text>
      <ScrollView style={styles.restaurantList}>
        {data?.getRestaurants.map((restaurant) => (
          <View key={restaurant.id}>
            <Restaurant {...restaurant} />
          </View>

        ))}
      </ScrollView>
    </View>
  )
}

export default RestaurantsScreen

const styles = StyleSheet.create({
  container: { marginTop: 50, marginLeft: 50, marginRight: 50 },
  containerHeaderBoutton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "bold",
  },
  restaurantList: {
    padding: 12,
    width: "100%",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
})