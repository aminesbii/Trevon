import { images, offers } from "@/constants";
import React from "react";
import { FlatList, Pressable, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import cn from 'clsx';
 
export default function App() {
  return (
   <SafeAreaView>
      <FlatList 
        data={offers} 
        renderItem={({ item, index }) => {
          const isEven:any = index % 2 === 0;
          return(
            <View>
              <Pressable 
                className={cn("offer-card" , isEven ? 'flex-row-reverse' : 'flex-row')} 
                style={{ backgroundColor: item.color }}
              >
                {({ pressed}) => (
                   <React.Fragment>
                      <View className={"h-full w-1/2"}>
                         <Image source={item.image} className={"size-full"} resizeMode={"contain"} />
                      </View> 

                      <View className={"offer-card__info"}>
                          <Text className="h1-bold text-white leading-tight">
                            {item.title}
                          </Text>
                          <Image source={images.arrowRight} />
                      </View>
                   </React.Fragment>
                )}
              </Pressable>
            </View>
          )
        } }>
       </FlatList>
   </SafeAreaView>
  );
}