import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Button,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamsList } from '../App';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../utils/colors';

export function RewardDetailsScreen({
  route,
}: {
  route: RouteProp<RootStackParamsList, 'RewardDetail'>;
}) {
  const { reward } = route.params;

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < reward.rewardStamps; i++) {
      if (i < reward.rewardStampsUsed) {
        stars.push(
          <FontAwesome
            key={i}
            name='star'
            size={24}
            color='#FFD700'
            style={styles.star}
          />
        );
      } else {
        stars.push(
          <FontAwesome
            key={i}
            name='star-o'
            size={24}
            color='#FFD700'
            style={styles.star}
          />
        );
      }
    }
    return stars;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image
          style={styles.image}
          source={
            reward.rewardImage && reward.rewardImage.trim() !== ''
              ? { uri: reward.rewardImage }
              : require('../assets/images/reward-test.jpg')
          }
        />
        <Text style={styles.title}>{reward.rewardTitle}</Text>
        <Text style={styles.info}>{reward.rewardInfo}</Text>
        <Text style={styles.description}>{reward.rewardDescription}</Text>
        <Text style={styles.sectionHeader}>Company Details</Text>
        <Text style={styles.vendorText}>
          <Text style={styles.bold}>Name: </Text>
          {reward.vendorName}
        </Text>
        <Text style={styles.vendorText}>
          <Text style={styles.bold}>Location: </Text>
          {reward.vendorLocation}
        </Text>
        <Text style={styles.vendorText}>
          <Text style={styles.bold}>Industry: </Text>
          {reward.vendorIndustry}
        </Text>
        <Text style={styles.sectionHeader}>Stamps Used</Text>
        <View style={styles.starsContainer}>{renderStars()}</View>
        <Button title='Contact Vendor' onPress={() => {}} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.blueHeader,
  },
  info: {
    fontSize: 18,
    color: Colors.blueParagraph,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: Colors.blueHeader,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: Colors.blueHeader,
  },
  vendorText: {
    fontSize: 16,
    marginBottom: 10,
    color: Colors.blueParagraph,
  },
  bold: {
    fontWeight: 'bold',
  },
  starsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  star: {
    marginRight: 4,
  },
});
