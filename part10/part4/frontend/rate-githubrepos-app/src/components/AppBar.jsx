import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { appBarStyles } from '../theme';
import { Link, useLocation } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { IconButton, Menu } from 'react-native-paper';
import { ME } from '../graphql/queries';

const AppBarTab = ({ to, text }) => {
  return (
    <Link to={to} underlayColor="#f0f4f7">
      <View style={appBarStyles.tab}>
        <Text style={appBarStyles.tabText}>{text}</Text>
      </View>
    </Link>
  );
};

const AppBar = ({ setOrdering }) => {
  const { data } = useQuery(ME);
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  // eslint-disable-next-line no-unused-vars

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const handleOrdering = (orderBy, orderDirection) => {
    setOrdering({ orderBy, orderDirection });
    closeMenu();
  };

  return (
    <View style={[appBarStyles.container, appBarStyles.appBar]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <View style={appBarStyles.tabsContainer}>
          <AppBarTab to="/" text="Repositories" />
        </View>
        <View style={appBarStyles.tabsContainer}>
          {data && data?.me && location.pathname !== '/createreview' && (
            <AppBarTab to="/createreview" text="Create a review" />
          )}
        </View>
        <View style={appBarStyles.tabsContainer}>
          {data && data?.me && (
            <AppBarTab to="/myreviews" text="My Reviews" />
          )}
        </View>
        <View style={appBarStyles.tabsContainer}>
          {data && data?.me ? (
            <AppBarTab to="/signout" text="Sign Out" />
          ) : (
            <AppBarTab to="/signin" text="Sign In" />
          )}
        </View>
        <View style={appBarStyles.tabsContainer}>
          {!data?.me && (
            <AppBarTab to="/signup" text="Sign Up" />
          )}
        </View>
      </ScrollView>
      {location.pathname === '/' && (<Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <IconButton
            icon="sort"
            style={{ backgroundColor: '#6dbfb8' }}
            size={25}
            onPress={openMenu}
            title="Order repositories"
          >
          </IconButton>
        }
      >
        <Menu.Item
          title="Sort repositories:"
        />
        <Menu.Item
          onPress={() => handleOrdering('CREATED_AT', 'DESC')}
          title="Latest on top"
        />
        <Menu.Item
          onPress={() => handleOrdering('RATING_AVERAGE', 'DESC')}
          title="Highest rated on top"
        />
        <Menu.Item
          onPress={() => handleOrdering('RATING_AVERAGE', 'ASC')}
          title="Lowest rated on top"
        />
      </Menu>)}
    </View>
  );
};

export default AppBar;