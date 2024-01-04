import { View, TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  textField: {
    backgroundColor: '#fff',
    paddingHorizontal: 23,
    paddingVertical: 11,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 38,
    marginTop: 20,
    height: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 0,
    elevation: 4,
    width: '80%',
    gap: 10,
    borderWidth: 1,
    borderColor: '#E2E1E5'
  },
  input: {
    marginLeft: 10,
    fontSize: 12,
  },
});

const TextField = ({ icon, ...rest }) => {
  return (
    <View style={styles.textField}>
      {icon && icon}
      <TextInput style={styles.input} {...rest} />
    </View>
  );
};

export default TextField;
