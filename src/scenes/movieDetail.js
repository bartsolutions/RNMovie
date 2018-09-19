import React from 'react';
import { FlatList, Image, View } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {
  Text, ListItem, Body, Card, CardItem, Right, Left, Fab
} from 'native-base';

import * as ActionTypes from 'src/data/actionTypes';
import { movieDetailSelector } from 'src/data/selectors';

class MovieDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      promotVisible: false
    };
  }

  toggleCommentDialog = (text) => {
    this.setState({ promotVisible: !this.state.promotVisible });
    const { dispatch } = this.props.navigation;
    if (text) {
      const payload = {
        comment: text,
        movie: this.props.id };
      dispatch({
        type: ActionTypes.CREATE_MOVIE_COMMNENT, comment: payload });
    }
  }

  renderMovieDetail = () => {
    const { title, content, imageUrl } = this.props;
    return (
      <Card>
        <CardItem cardBody>
          <Image
            source={{ uri: imageUrl }}
            style={{ height: 200, width: null, flex: 1 }}
          />
        </CardItem>
        <CardItem>
          <Body>
            <Text>{title}</Text>
            <Text note>{content}</Text>
          </Body>
        </CardItem>
      </Card>
    );
  }
  renderCommmentItem = ({ item }) => {
    const { comment, createdDatetime } = item;
    return (
      <ListItem avatar>
        <Left style={{ width: 20 }} />
        <Body>
          <Text>Comment:</Text>
          <Text note>{comment}</Text>
        </Body>
        <Right>
          <Text note>{createdDatetime}</Text>
        </Right>
      </ListItem>
    );
  };

  render() {
    console.log(this.props);
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={this.renderMovieDetail}
          data={this.props.comments}
          renderItem={this.renderCommmentItem}
          keyExtractor={comment => comment.id.toString()}
        />
        <Fab
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={this.toggleCommentDialog}
        >
          <MaterialCommunityIcons name="pencil" />
        </Fab>
        <DialogInput
          dialogStyle={{ backgroundColor: 'rgba(220,220,220, 1)' }}
          isDialogVisible={this.state.promotVisible}
          title={'Add Comment'}
          hintInput={'Say something about this movie'}
          submitInput={this.toggleCommentDialog}
          closeDialog={this.toggleCommentDialog}
        />

      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return movieDetailSelector(state, ownProps);
}

export default connect(mapStateToProps)(MovieDetail);
