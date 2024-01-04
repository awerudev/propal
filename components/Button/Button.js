import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#1579FF',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 41,
    shadowColor: '#000',
    shadowOffset: {
      height: 4,
      width: 0,
    },
    shadowRadius: 4,
    shadowOpacity: 0.25,
  },
  buttonTitle: {
    color: '#FFF',
  },
});

const Button = ({ title, icon, onPress, style, textStyle, width }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{width}}>
      <View style={[styles.button, style]}>
        {icon && icon}
        <Text style={[styles.buttonTitle, icon ? { marginLeft: 8 } : null, textStyle]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
