import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RootStackScreenProps } from '../types'

const HomeScreen = ({ navigation }: RootStackScreenProps<"Home">) => {
  return (
    <View style ={styles.container}>
      <Pressable onPress={() => navigation.navigate("Select")} style= {styles.button}>
        <Text style={styles.text}>Appuyez pour continuer</Text>
      </Pressable>
    </View>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: 'none',
    borderWidth: 3,
    height: 60,
    width: 225
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
})