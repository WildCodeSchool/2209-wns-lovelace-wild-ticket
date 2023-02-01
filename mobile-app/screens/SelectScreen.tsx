import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView, Button
} from "react-native";
import React, { useState } from "react";
import { RootStackScreenProps } from "../types";

type ItemData = {
  id: string;
  title: string;
};

const DATA: ItemData[] = [
  {
    id: "1",
    title: "1",
  },
  {
    id: "2",
    title: "2",
  },
  {
    id: "3",
    title: "3",
  },
  {
    id: "4",
    title: "4",
  },
  {
    id: "5",
    title: "5",
  },
  {
    id: "6",
    title: "6",
  },
  {
    id: "7",
    title: "7",
  },
  {
    id: "8",
    title: "8",
  },
];

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const Item = ({ item, onPress, backgroundColor, textColor }: ItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, { backgroundColor }]}
  >
    <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
  </TouchableOpacity>
);

const SelectScreen = ({ navigation }: RootStackScreenProps<"Select">) => {
  const [selectedId, setSelectedId] = useState<string>();

  const renderItem = ({ item }: { item: ItemData }) => {
    const backgroundColor = item.id === selectedId ? "red" : "#f9c2ff";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeaderBoutton}>
        <Button
          title="Retour"
          onPress={() => navigation.navigate("Home")}
        />
        <Button
          title="Continuer"
          onPress={() => navigation.navigate("Restaurants")}
        />
      </View>
      <SafeAreaView style={styles.container}  >
        <Text>Sélectionnez le nombre de couverts</Text>
        <FlatList
          data={DATA}
          numColumns={4}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          style= {styles.containerSelectBouton}
        />
        <Text>
          Pour plus de 8 couverts, merci de vous renseigner directement auprès
          du restaurant souhaité.
        </Text>
      </SafeAreaView>
    </View>
  );
};

export default SelectScreen;

const styles = StyleSheet.create({
  container: { marginTop: 50, marginLeft: 50, marginRight: 50 },
  containerHeaderBoutton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerButton: {
    alignItems: "center",
    justifyContent: "flex-start",
    height: "auto",
    width: "100%",
    borderWidth: 5,
    borderColor: "red",
  },
  containerSelectBouton: {
    borderWidth: 5,
    borderColor: "red",
    height: "75%",
    width: "55%",
  },
  boutonSelect: {
    borderRadius: 10,
    borderWidth: 3,
    height: 150,
    width: 150,
    margin: 20,
  },
  button: {
    borderRadius: 10,
    height: 60,
    width: 225,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
