import React from 'react';
import { connect } from 'react-redux';
import { commentListSelector } from 'src/data/selectors';
import { FlatList } from 'react-native';
import {
  Text, ListItem, Body, Card, CardItem, Left, Content, Thumbnail
} from 'native-base';


class commentList extends React.Component {

  renderItem = ({ item }) =>
    (
      <ListItem>
        <Content>
          <Card style={{ flex: 0 }}>
            <CardItem>
              <Left>
                <Thumbnail source={{ uri: item.movie.imageUrl }} />
                <Body>
                  <Text>{item.movie.title}</Text>
                  <Text note>{item.createdDatetime}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Text note>
                  {item.comment}
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </ListItem>
    )
  ;
  render() {
    return (
      <FlatList
        data={this.props.data}
        renderItem={this.renderItem}
        keyExtractor={item => item.id.toString()}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    // Bind with selector
    data: commentListSelector(state, ownProps)
  };
}

export default connect(mapStateToProps)(commentList);
