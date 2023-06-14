import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

export const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <Avatar.Icon size={64} icon="account" />
          <Title>John Doe</Title>
          <Paragraph>Email: johndoe@example.com</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => console.log('Edit pressed')}>
            Edit Profile
          </Button>
          <Button mode="outlined" onPress={() => console.log('Logout pressed')}>
            Logout
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // justifyContent: 'center',
  },
});

export default ProfileScreen;