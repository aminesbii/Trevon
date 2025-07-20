import { View, Text, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import seed from "@/lib/seed";

const profile = () => {
  return <SafeAreaView>
     <Text>Hi</Text>
     <Button title="Seed" onPress={() => seed().catch((error) => console.log('failed to seed data', error) )} />
  </SafeAreaView>;
};

export default profile;
