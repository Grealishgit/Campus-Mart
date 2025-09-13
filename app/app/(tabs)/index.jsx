import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Text } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import TopHeader from '@/components/TopHeader';
import SafeScreen from '@/components/SafeScreen';
import SearchContainer from '@/components/SearchContainer';

export default function HomeScreen() {
  return (
    <SafeScreen>
      <View style={styles.container}>
        <TopHeader />
        <SearchContainer />
      </View>
    </SafeScreen>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  }
});
