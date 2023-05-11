import { React } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Button
} from "react-native";
import SpecificationItem from "./SpecificationItem";
import useFetch from "../hook/useFetch";

const Specification = () => {
  const {data, isLoading, error, refetch} = useFetch('contractors?namePart=bu');

  return (
    <View style={{ marginTop: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20 }}>Specification List</Text>
        <TouchableOpacity>
          <Text>Show all</Text>
        </TouchableOpacity>
      </View>
      <View>
      <Button
      disabled={false}
      title="Get Data"
      onPress={() => {
        refetch();
      }}
      />
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList 
            data ={data}
            renderItem={({item}) => (
                <SpecificationItem item={item}/>
            )}
            keyExtractor={item =>item.id}
          />
        )}
      </View>
    </View>
  );
};

export default Specification;
