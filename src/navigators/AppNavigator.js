import React from 'react';
import {
  createStackNavigator, createBottomTabNavigator, createDrawerNavigator
} from 'react-navigation';

import {
  movieList, movieDetail, commentList, createOrEditMovie, SideBar, TabHeader, TabBar
} from 'src/scenes';

const getNavigationConfig = title =>
   ({
     navigationOptions: () => ({
       header: props => <TabHeader {...props} title={title} />
     })
   })
;

const movieNav = createStackNavigator(
  {
    movieList: { screen: movieList },
    movieDetail: {
      screen: movieDetail,
      ...getNavigationConfig('Movie Detail')
    },
    editMovie: {
      screen: createOrEditMovie,
      ...getNavigationConfig('Edit Movie') },
    addMovie: {
      screen: createOrEditMovie,
      ...getNavigationConfig('Add Movie') }
  },
  getNavigationConfig()
);

const commentNav = createStackNavigator(
  {
    commentList: { screen: commentList }
  },
  getNavigationConfig()
);

const mainTab = createBottomTabNavigator(
  {
    movieNav: { screen: movieNav },
    commentNav: { screen: commentNav }
  },
  {
    tabBarPosition: 'bottom',
    headerMode: 'screen',
    swipeEnabled: true,
    tabBarComponent: props => <TabBar {...props} />,
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: navigation.state.index === 0
    })
  }
);

export const AppNavigator = createDrawerNavigator(
  {
    mainTab: { screen: mainTab }
  },
  {
    headerMode: 'screen',
    contentComponent: props => <SideBar {...props} />,
    drawerWidth: 298
  }
);


export default AppNavigator;
