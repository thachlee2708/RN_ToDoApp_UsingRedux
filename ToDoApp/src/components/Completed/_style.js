import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {},
  list: {},
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  titleText: {fontSize: 18},
});

export const inputAndroid = {
  color: 'black',
  alignItems: 'center',
  paddingHorizontal: 10,
  paddingVertical: 0,
  fontSize: 12,
  borderWidth: 1,
  borderRadius: 5,
};
export const inputIOS = {
  color: 'black',
  justifyContent: 'center',
  fontSize: 12,
  padding: 5,
  borderWidth: 1,
  borderRadius: 5,
};
