import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, FlatList, Pressable } from 'react-native'
import { useFonts } from 'expo-font';
import { Chip } from 'react-native-paper';

import { RestaurantItemCard } from '../components';

import { useNavigation } from '@react-navigation/native';

import useStore from '../store/store';

import { restairantItems } from '../data/restaurantItems'


const RestaurantScreen = ({naviagation, route}) => {

  const {restaurant_name, rating, distance, reviews, cusines, filters, res_items} = route.params.item;

  const {menuItems, addToCart, totalPrice, cartItems, removeFromCart} = useStore((state) => ({
    menuItems: state.menuItems,
    addToCart: state.addToCart,
    totalPrice: state.totalPrice,
    cartItems: state.cartItems,
    removeFromCart: state.removeFromCart,
  }))

  
  const navigation = useNavigation()

    const [fontsLoaded] = useFonts({
        'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
        'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
        'SourceSerifPro-Regular': require('../../assets/fonts/SourceSerifPro-Regular.ttf'),
    });
  
  return (
    <SafeAreaView style={{backgroundColor:"#1c1c27", width:"100%", height:"100%", flexDirection:"column", justifyContent:"flex-start", alignItems:"center", paddingTop:15}}>
        <ScrollView style={{width:"90%", height:"100%", marginTop:10, marginBottom:Number(`${cartItems.length > 0 ? 60 : 0}`) }}>
          {/* <ScrollView style={{backgroundColor:"#28293d", borderRadius:12, borderWidth:1}}> */}

          <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", borderRadius:12,marginBottom:10, backgroundColor:"#28293d",}}>

            <View style={{paddingHorizontal:10, paddingVertical:15, flex:3,}}>
              <Text style={{fontFamily:"Poppins-Bold", fontSize:18,color:"#e5e1d8"}}>{restaurant_name}</Text>
              <Text style={{fontFamily:"Poppins-Bold", fontSize:10,color:"#e5e1d8"}}>
                {cusines.map((item, index) => {
                  return item + ", "
                })}
              </Text>
              <Text style={{fontFamily:"Poppins-Bold", fontSize:9,color:"gray"}}>Sealdah, Kolkata</Text>
              <Text style={{fontFamily:"Poppins-Bold", fontSize:12,color:"#e5e1d8"}}>40-45 min | {distance}km away</Text>
            </View>

            <Pressable style={{flex:1, marginRight:10, borderRadius:12, height:110, paddingVertical:12, backgroundColor:"#1c1c27"}}
              onPress={() => navigation.navigate("ReviewScreen")}
            >
              <Text style={{fontFamily:"Poppins-SemiBold", fontSize:20, alignSelf:"center", color:"#ef845d", height:"40%"}}>{rating}</Text>

              <View style={{flexDirection:"column", justifyContent:"center", alignItems:"center", alignSelf:"center",height:"60%" }}>
                <Text style={{fontFamily:"Poppins-Medium", fontSize:12, color:"#ffad16"}}>{reviews}</Text>
                <Text style={{fontFamily:"Poppins-Medium", fontSize:12, color:"#ffad16"}}>Reviews</Text>
              </View>
            </Pressable>

          </View>

          <View style={{width:"100%", flexDirection:"row", justifyContent:"flex-start",}}>
            <ScrollView horizontal style={{width:"100%"}}>
              {
                filters.map((item, index) => {
                  return <Chip key={index} style={{marginRight:10, marginVertical:10}} >{item}</Chip>
                })
              }
            </ScrollView>
          </View>

              {/* <SectionList
                  sections={restairantItems}
                  renderItem={({item}) => {
                    <RestaurantItemCard item={item}/>
                  }}
                  keyExtractor={item => item.id}
              /> */}

              {
                res_items.map((item, index) => {
                  return <RestaurantItemCard item={item} key={index}  />
                })
              }

          {/* </ScrollView> */}
        </ScrollView>

            {
                cartItems.length > 0 ? <View style={{position:"absolute", bottom:0, width:"100%", height:60,zIndex:40, backgroundColor:"#1c1c27", flexDirection:"row", justifyContent:"space-between", alignItems:"center", paddingHorizontal:20}}>
                    <View style={{flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                        <Text style={{fontFamily:"Poppins-SemiBold", fontSize:12, color:"#e5e1d8", textTransform:"uppercase"}}>{cartItems.length} Item Added</Text>
                        <Text style={{fontFamily:"Poppins-SemiBold", fontSize:12, color:"#e5e1d8"}}>Subtotal : ₹{totalPrice}</Text>    
                    </View>
                    <Pressable style={{backgroundColor:"#ffad16", padding:5,paddingHorizontal:10, borderRadius:5}} onPress={() => navigation.navigate('Cart')}>
                        <Text style={{fontFamily:"Poppins-Medium", fontSize:12, color:"#1c1c27"}}>Next</Text>
                    </Pressable>
                </View> : null
            }
        
    </SafeAreaView>
  )
}

export default RestaurantScreen