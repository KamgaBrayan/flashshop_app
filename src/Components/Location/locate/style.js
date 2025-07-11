import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  currentLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  currentLocationText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#8B4513',
  },
  searchResultContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  searchResultTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 10,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  searchResultName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  searchResultAddress: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
});

export default styles;