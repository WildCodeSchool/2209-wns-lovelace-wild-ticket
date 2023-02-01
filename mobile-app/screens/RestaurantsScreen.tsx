import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import { GetRestaurantsQuery } from '../gql/graphql';
import { gql, useQuery } from '@apollo/client';
// import Restaurant from '../components/Restaurant';


export const GET_RESTAURANTS = gql`
  query GetRestaurants {
    getRestaurants {
      id
      name
    }
  }
`;

const RestaurantsScreen = () => {
  // const { loading, data, error } = useQuery<GetRestaurantsQuery>(GET_RESTAURANTS);
  return (
    <View>
      <Text>RestaurantsScreen</Text>
      {/* <ScrollView style={styles.restaurantList}>
        {data?.getRestaurants.map((restaurant) => (
          <View key={restaurant.id}>
            <Restaurant {...restaurant} />
          </View>

        ))}
          <Text>Test</Text>
      </ScrollView> */}
    </View>
  )
}

export default RestaurantsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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