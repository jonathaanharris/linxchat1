import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  Modal,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Pressable,
  Dimensions,
  Image,
  SafeAreaView,
  Share
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Carousel from "react-native-snap-carousel";
const { height, width } = Dimensions.get("screen");
import content from "../data/shirt.json";
import ImageModal from 'react-native-image-modal';


const Home = () => {

  const [indexData, setIndexData] = useState(0);
  const [qty, setQty] = useState(0);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          `Kaos Polos Berkualitas ${content.data[indexData].color} dengan harga ${content.data[indexData].price} https://expo.dev/@jonathaanharris/linxchat
          `,
      });


    } catch (error) {
      alert(error.message);
    }
  };
  const changeData = (e) => {
    setIndexData(e)
  }
  const handleSubmit = (idx) => {
    setIndexData(idx)
  }

  const subtractHandler = () => {
    if (qty > 0) { setQty(qty - 1) }
  }


  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          height: 250,
          width: width * 0.8,
        }}
      // onPress={() => setModalVisible(true)}

      >
        <ImageModal
          resizeMode="contain"
          style={{
            width: width * 0.8,
            height: 250,
          }}
          source={item?.image ? { uri: item?.image } : null}
        />
      </TouchableOpacity >
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ScrollView style={{ width: Dimensions.get("window").width }}>
          <Carousel
            data={content.data ? content.data : null}
            renderItem={renderItem}
            sliderWidth={width * 1}
            itemWidth={width * 0.8}
            layout={"default"}
            onSnapToItem={changeData}
            firstItem={indexData}
          />
          <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
            <Text
              style={{
                fontSize: 18,
                marginTop: 15,
                marginLeft: 15,
                marginRight: 15,
                fontWeight: 'bold',
                // borderBottomWidth: 2,
                borderColor: "#C0C0C0",
              }}
            >
              Kaos Polos Berkualitas
            </Text>
            <View style={{ flexDirection: "row", marginTop: 15, marginRight: 15 }}>
              <TouchableOpacity onPress={onShare} >
                <Ionicons name="md-share-social-sharp" size={24} color="black" style={{ marginRight: 10 }} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="heart-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text
              style={{
                fontSize: 15,
                marginTop: 8,
                marginLeft: 15,
                marginRight: 15,
                borderBottomWidth: 3,
                borderColor: 'grey',
                color: 'red'
              }}
            >
              Rp {
                content.data[indexData].price
              }
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
          >
            <View
              style={{
                flex: 1,
                height: 6,
                backgroundColor: '#D3D3D3',
                marginHorizontal: 15,
              }}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text
              style={{
                fontSize: 17,
                marginLeft: 15,
                marginTop: 11,
                marginRight: 20,
                fontWeight: 'bold',
                borderBottomWidth: 3,
                borderColor: 'grey',
              }}
            >
              Warna
            </Text>
            {
              content.data.map((contentGambar, idx) => {
                return (
                  <View key={idx} style={{ marginRight: 10, marginTop: 3 }}>
                    <TouchableOpacity style={{ backgroundColor: "white", width: 60, paddingVertical: 8, borderRadius: 10, justifyContent: 'center', marginTop: 4, borderColor: '#A9A9A9', borderWidth: 1 }}
                      onPress={() => handleSubmit(idx)}>
                      <Text style={{ fontSize: 11, fontWeight: 'bold', color: 'black', textAlign: 'center', marginVertical: 1 }}>
                        {contentGambar.color}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )
              })
            }
          </View>
          <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
            <Text
              style={{
                fontSize: 18,
                marginTop: 25,
                marginLeft: 15,
                marginRight: 15,
                fontWeight: 'bold',
                // borderBottomWidth: 2,
                borderColor: "#C0C0C0",
              }}
            >
              Ukuran
            </Text>
            <View style={{ flexDirection: "row", marginTop: 15, marginRight: 15 }}>
              <TouchableOpacity style={{ backgroundColor: "#white", width: 60, paddingVertical: 8, borderRadius: 10, justifyContent: 'center', marginTop: 4, borderColor: '#A9A9A9', borderWidth: 1, marginRight: 10 }}>
                <Text style={{ fontSize: 11, fontWeight: 'bold', color: 'black', textAlign: 'center', marginVertical: 1 }}>
                  M
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: "white", width: 60, paddingVertical: 8, borderRadius: 10, justifyContent: 'center', marginTop: 4, borderColor: '#A9A9A9', borderWidth: 1 }}>
                <Text style={{ fontSize: 11, fontWeight: 'bold', color: 'black', textAlign: 'center', marginVertical: 1 }}>
                  L
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
            <Text
              style={{
                fontSize: 18,
                marginTop: 25,
                marginLeft: 15,
                marginRight: 15,
                fontWeight: 'bold',
                // borderBottomWidth: 2,
                borderColor: "#C0C0C0",
              }}
            >
              Jumlah
            </Text>
            <View style={{ flexDirection: "row", marginTop: 20, marginRight: 15 }}>
              <TouchableOpacity onPress={subtractHandler}>
                <Ionicons name="md-remove-circle" size={24} color="grey" style={{ marginRight: 8 }} />
              </TouchableOpacity>
              <Text style={{ marginRight: 8, marginTop: 4 }}> {qty} </Text>
              <TouchableOpacity onPress={() => setQty(qty + 1)}>
                <Ionicons name="add-circle" size={24} color="#02075d" />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}
          >
            <View
              style={{
                flex: 1,
                height: 6,
                backgroundColor: '#D3D3D3',
                marginHorizontal: 15,
              }}
            />
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                fontSize: 18,
                marginTop: 15,
                marginLeft: 15,
                marginRight: 15,
                fontWeight: 'bold',
                // borderBottomWidth: 2,
                borderColor: "#C0C0C0",
              }}
            >
              Deskripsi
            </Text>
            <Text
              style={{
                fontSize: 16,
                marginRight: 15,
                fontWeight: '300',
                marginLeft: 15,
                marginTop: 5,
                // borderBottomWidth: 2,
                borderColor: "#C0C0C0",
              }}>
              Kaos Polos Uniqlo. Bermacam warna dan ukuran.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});


export default Home