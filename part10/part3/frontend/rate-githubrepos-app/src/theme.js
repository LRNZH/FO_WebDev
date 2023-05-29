import { StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';

const defaultFontFamily = 'System';
const androidFontFamily = 'Roboto';
const iosFontFamily = 'Arial';

export const mainStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    padding: 10,
    fontFamily: Platform.select({
      android: androidFontFamily,
      ios: iosFontFamily,
      default: defaultFontFamily,
    }),
  },
  repositoryList: {},
});

export const appBarStyles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    paddingVertical: 20,
    paddingHorizontal: 25,
    fontFamily: Platform.select({
      android: androidFontFamily,
      ios: iosFontFamily,
      default: defaultFontFamily,
    }),
  },
    tabsContainer: {
    marginLeft: 'auto',
    marginRight: 180
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    paddingVertical: 20,
    paddingHorizontal: 25,
    fontFamily: Platform.select({
      android: androidFontFamily,
      ios: iosFontFamily,
      default: defaultFontFamily,
    }),
  },
  tabText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export const signInStyles = StyleSheet.create({
  container: {
    padding: 15,
    fontFamily: Platform.select({
      android: androidFontFamily,
      ios: iosFontFamily,
      default: defaultFontFamily,
    }),
  },
  input: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    fontFamily: Platform.select({
      android: androidFontFamily,
      ios: iosFontFamily,
      default: defaultFontFamily,
    }),
  },
  button: {
    backgroundColor: '#0366d6',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    fontFamily: Platform.select({
      android: androidFontFamily,
      ios: iosFontFamily,
      default: defaultFontFamily,
    }),
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: Platform.select({
      android: androidFontFamily,
      ios: iosFontFamily,
      default: defaultFontFamily,
    }),
  },
});

export const repositoryItemStyles = StyleSheet.create({
  container: {
    marginTop: 20,
    fontFamily: Platform.select({
      android: androidFontFamily,
      ios: iosFontFamily,
      default: defaultFontFamily,
    }),
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    fontFamily: Platform.select({
      android: androidFontFamily,
      ios: iosFontFamily,
      default: defaultFontFamily,
    }),
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 15,
    marginRight: 10,
    fontFamily: Platform.select({
      android: androidFontFamily,
      ios: iosFontFamily,
      default: defaultFontFamily,
    }),
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    fontFamily: Platform.select({
      android: androidFontFamily,
      ios: iosFontFamily,
      default: defaultFontFamily,
    }),
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    fontFamily: Platform.select({
      android: androidFontFamily,
      ios: iosFontFamily,
      default: defaultFontFamily,
    }),
  },
  description: {
    color: 'gray',
    marginBottom: 5,
    fontFamily: Platform.select({
      android: androidFontFamily,
      ios: iosFontFamily,
      default: defaultFontFamily,
    }),
  },
  countsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    fontFamily: Platform.select({
      android: androidFontFamily,
      ios: iosFontFamily,
      default: defaultFontFamily,
    }),
  },
  countItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: Platform.select({
      android: androidFontFamily,
      ios: iosFontFamily,
      default: defaultFontFamily,
    }),
  },
  countLabel: {
    color: 'gray',
    fontSize: 12,
    fontFamily: Platform.select({
      android: androidFontFamily,
      ios: iosFontFamily,
      default: defaultFontFamily,
    }),
  },
  countText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Platform.select({
      android: androidFontFamily,
      ios: iosFontFamily,
      default: defaultFontFamily,
    }),
  },
  languageContainer: {
    backgroundColor: 'lightblue',
    padding: 5,
    borderRadius: 50,
    marginTop: 5,
    alignItems: 'center',
    fontFamily: Platform.select({
      android: androidFontFamily,
      ios: iosFontFamily,
      default: defaultFontFamily,
    }),
  },
  languageText: {
    color: 'black',
    fontSize: 12,
    fontFamily: Platform.select({
      android: androidFontFamily,
      ios: iosFontFamily,
      default: defaultFontFamily,
    }),
  },
});