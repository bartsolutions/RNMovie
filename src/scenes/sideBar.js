import React from 'react';
import { Image } from 'react-native';
import { Container, Content, Text, List, ListItem } from 'native-base';

export default class SideBar extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <Image
            source={{
              uri: 'https://eastonialeopards.com/wp-content/uploads/2017/04/movie-article.jpg'
            }}
            style={{
              height: 120,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          />
          <List>
            <ListItem
              button
              onPress={() => this.props.navigation.navigate('addMovie')}
            >
              <Text>Add Movie</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
