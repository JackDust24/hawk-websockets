import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import axios from 'axios';
import { NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // For the ">" icon
import Colors from '../utils/colors';

const API = process.env.BACKEND_URL || 'http://192.168.0.125:8000/api/users';
//TODO: When implementation of adding user, we will use the ID.
const TEST_USER_ID = '67401144c5a36096ed4fa60d';

export function RewardsScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const [rewardsInUse, setRewardsInUse] = useState([]);

  // Fetch rewards data
  useEffect(() => {
    const fetchRewards = async () => {
      const URL = `${API}/get/retrieveAllRewardsInUseForUser/${TEST_USER_ID}`;
      try {
        const response = await axios.get(URL);
        setRewardsInUse(response.data.data);
      } catch (error) {
        console.error('Error fetching rewards:', error);
      }
    };

    fetchRewards();
  }, []);

  // Render each item in the rewards list
  const renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate('RewardDetail', { reward: item })}
      >
        <View style={styles.itemLeft}>
          {/* Placeholder image */}
          <Image
            style={styles.image}
            source={
              item.rewardImage && item.rewardImage.trim() !== ''
                ? { uri: item.rewardImage }
                : require('../assets/images/reward-test.jpg')
            }
          />
        </View>
        <View style={styles.itemMiddle}>
          <Text style={styles.rewardTitle}>{item.rewardTitle}</Text>
          <Text style={styles.vendorName}>{item.vendorName}</Text>
          <Text
            style={styles.vendorName}
          >{`${item.rewardStampsUsed}/${item.rewardStamps}`}</Text>
        </View>
        <Ionicons
          name='chevron-forward'
          size={24}
          color={Colors.blueParagraph}
          style={styles.icon}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <FlatList
        data={rewardsInUse}
        renderItem={renderItem}
        keyExtractor={(item) => item.rewardId.toString()} // Unique ID for each item
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0, // Adjusts for the status bar height
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // For Android shadow effect
  },
  itemLeft: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginRight: 15,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Keeps image aspect ratio
  },
  itemMiddle: {
    flex: 1,
    justifyContent: 'center',
    color: Colors.blueParagraph,
  },
  rewardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: Colors.blueHeader,
  },
  vendorName: {
    fontSize: 14,
    color: Colors.blueParagraph,
    marginBottom: 5,
  },
  stampsText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.blueParagraph,
  },
  icon: {
    alignSelf: 'center',
  },
});
