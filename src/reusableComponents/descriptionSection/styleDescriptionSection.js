import { StyleSheet, Dimensions, StatusBar } from 'react-native';

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({

  descriptionContainer: {
    marginTop: 2,
  },
  description: {
    color: '#FFF',
    fontSize: 18,
    lineHeight: 20,
  },
  descriptionText: {
    color: '#FFF',
    fontSize: 18,
    lineHeight: 20,
  },
  seeMoreButton: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeMoreText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  expandedDescription: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    padding: 16,
    paddingBottom: 90, // Account for bottom tabs
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  expandedDescriptionContent: {
    color: '#FFF',
    fontSize: 18,
    lineHeight: 22,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 8,
  },
  descriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  descriptionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
});