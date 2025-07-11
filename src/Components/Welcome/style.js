import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  imageContainer: {
    height: '60%',
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  circleImagesContainer: {
    position: 'absolute',
    bottom: -30,
    right: 20,
    flexDirection: 'row',
  },
  circleImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginLeft: -20,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#4A4A4A',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#7A7A7A',
  },
  button: {
    backgroundColor: '#8B4513',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: width * 0.8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInText: {
    fontSize: 16,
    color: '#4A4A4A',
  },
  signInLink: {
    color: '#8B4513',
    fontWeight: 'bold',
  },
});

export default styles;