import * as React from 'react';
//import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useAuth } from '../context/authContext/authContext';
import { ActivityIndicator, View } from 'react-native';

//Components
import WelcomeAppScreen from '../Components/Welcome';
import SignIn from '../Components/authentication/signIn';
import CreateAccount from '../Components/authentication/register';
import NewPassword from '../Components/authentication/newPassword';
import VerifyCode from '../Components/authentication/verification';
import LocationAccessScreen from '../Components/Location/homeLocation';
import LocationEntryScreen from '../Components/Location/locate';
import Home from '../Components/home';
import ProductDetailsScreen from '../Components/Products/productDetails';
import WishListScreen from '../Components/Products/wishList';
import CartScreen from '../Components/Cart';
import ChooseShipping from '../Components/CompleteOrder/chooseShipping';
import ShippingAddress from '../Components/CompleteOrder/shippingAdress';
import PaymentMethods from '../Components/CompleteOrder/paymentMethod';
import SearchScreen from '../Components/Search/searchMain';
import SearchScreenResult from '../Components/Search/searchResult';
import Filter from '../Components/Filter';
import CheckoutScreen from '../Components/CompleteOrder/checkOut';
import AddCardScreen from '../Components/CompleteOrder/addCard';
import PaymentSuccessScreen from '../Components/CompleteOrder/paymentComplete';
import TrackOrderScreen from '../Components/TrackOrder';
import OrderScreen from '../Components/Order';
import ReviewScreen from '../Components/CompleteOrder/reviewOrder';
import NotificationScreen from '../reusableComponents/Notification';
import SettingsScreen from '../Components/authentication/settings';
import BusinessToolsScreen from '../Components/authentication/business tools';
import MyCompanyScreen from '../Components/authentication/myCompany';
import MyAgenciesScreen from '../Components/authentication/myAgencies';
import HelpCenter from '../Components/Utilities/helpPage';
import PrivacyPolicy from '../Components/Utilities/privacyPolicy';
import InviteFriends from '../Components/Utilities/inviteFriends';
import PasswordManager from '../Components/authentication/passwordManager';
import ProfileScreen from '../Components/authentication/accountProfile';
import ChatScreen from '../Components/Chat';
import ConversationsScreen from '../Components/Chat/conversation';
import NewConversationScreen from '../Components/Chat/conversation/newConversation';
import ProductCatalogue from '../Components/catalogue/producerCatalogue';
import CustomProductCatalogue from '../Components/catalogue/customerCatalogue';
import SellingPoints from '../Components/catalogue/sellingPoints';
import DeliveryOptions from '../Components/catalogue/deliveryOptions';
import RatingScreen from '../Components/Rating';
import SellerManagement from '../Components/vendors';
import LanguageSelector from '../Components/authentication/languageSelector';
import LanguageSettingsScreen from '../Components/authentication/languageSelector/LanguageSettingsScreen';
import CreateOrganizationScreen from '../Components/organisation/createOrganization';

import { CartProvider } from '../context/cartContext';
import { NotificationContextProvider } from '../reusableComponents/paymentStatus';
import { SharedPostsProvider } from '../context/postContext/sharedPostsContext';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

// Composant de chargement
const LoadingScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#8B4513" />
    </View>
);

// HOC pour protéger les routes
const withAuth = (Component) => (props) => {
    const { isAuthenticated, loading } = useAuth() || {};
    const { navigation } = props;

    React.useEffect(() => {
        if (!loading && !isAuthenticated) {
            // Rediriger vers la page SignIn si non authentifié
            navigation.replace('SignIn');
        }
    }, [isAuthenticated, loading, navigation]);

    if (loading) {
        return <LoadingScreen />;
    }

    // Si authentifié, afficher le composant, sinon la redirection sera effectuée par useEffect
    return isAuthenticated ? <Component {...props} /> : <LoadingScreen />;
};

const MainRouter = () => {
    const { isAuthenticated, loading } = useAuth() || {};

    if (loading) {
        return <LoadingScreen />;
    }

    // Routes publiques
    const publicScreens = (
        <>
            <Stack.Screen name="Welcome" component={WelcomeAppScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }}/>
            <Stack.Screen name="CreateA" component={CreateAccount} options={{ headerShown: false }}/>
            <Stack.Screen name="NewPass" component={NewPassword} options={{ headerShown: false }}/>
            <Stack.Screen name="Verify" component={VerifyCode} options={{ headerShown: false }}/>
            <Stack.Screen name="Help" component={HelpCenter} options={{ headerShown: false }}/>
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerShown: false }}/>
            <Stack.Screen name="Invite" component={InviteFriends} options={{ headerShown: false }}/>
            <Stack.Screen name="LanguageSelector" component={LanguageSelector} options={{ headerShown: false }} />
        </>
    );

  // Routes protégées (qui nécessitent une authentification)
  const protectedScreens = (
    <>
      <Stack.Screen name="LocationAccess" component={withAuth(LocationAccessScreen)} options={{ headerShown: false }}/>
      <Stack.Screen name="LocationEntry" component={withAuth(LocationEntryScreen)} options={{ headerShown: false }}/>
      <Stack.Screen name="WishList" component={withAuth(WishListScreen)} options={{ headerShown: false }}/>
      <Stack.Screen name="Cart" component={withAuth(CartScreen)} options={{ headerShown: false }}/>
      <Stack.Screen name="ChooseShipping" component={withAuth(ChooseShipping)} options={{ headerShown: false }}/>
      <Stack.Screen name="ShippingAddress" component={withAuth(ShippingAddress)} options={{ headerShown: false }}/>
      <Stack.Screen name="PaymentMethods" component={withAuth(PaymentMethods)} options={{ headerShown: false }}/>
      <Stack.Screen name="Checkout" component={withAuth(CheckoutScreen)} options={{ headerShown: false }}/>
      <Stack.Screen name="AddCard" component={withAuth(AddCardScreen)} options={{ headerShown: false }}/>
      <Stack.Screen name="PaymentSuccess" component={withAuth(PaymentSuccessScreen)} options={{ headerShown: false }}/>
      <Stack.Screen name="Chat" component={withAuth(ChatScreen)} options={{ headerShown: false }}/>
      <Stack.Screen name="Conversation" component={withAuth(ConversationsScreen)} options={{headerShown: false}}/>
      <Stack.Screen name="NewConversation" component={withAuth(NewConversationScreen)} options={{headerShown: false}}/>
      <Stack.Screen name="TrackOrder" component={withAuth(TrackOrderScreen)} options={{ headerShown: false }}/>
      <Stack.Screen name="OrderScreen" component={withAuth(OrderScreen)} options={{ headerShown: false }}/>
      <Stack.Screen name="Review" component={withAuth(ReviewScreen)} options={{ headerShown: false }}/>
      <Stack.Screen name="Notification" component={withAuth(NotificationScreen)} options={{ headerShown: false }}/>
      <Stack.Screen name="Settings" component={withAuth(SettingsScreen)} options={{ headerShown: false }}/>
      <Stack.Screen name="profile" component={withAuth(ProfileScreen)} options={{ headerShown: false }}/>
      <Stack.Screen name="PC" component={withAuth(ProductCatalogue)} options={{ headerShown: false }}/>
      <Stack.Screen name="BusinessTools" component={withAuth(BusinessToolsScreen)} options={{ headerShown: false }} />
      <Stack.Screen name="Rating" component={withAuth(RatingScreen)} options={{ headerShown: false }} />
      <Stack.Screen name="MyCompany" component={withAuth(MyCompanyScreen)} options={{ headerShown: false }} />
      <Stack.Screen name="MyAgencies" component={withAuth(MyAgenciesScreen)} options={{ headerShown: false }} />
      <Stack.Screen name="MyVendors" component={withAuth(SellerManagement)} options={{ headerShown: false }} />
      <Stack.Screen name="PasswordManager" component={PasswordManager} options={{ headerShown: false }}/>
      <Stack.Screen name="LanguageSettings" component={withAuth(LanguageSettingsScreen)} options={{ headerShown: false }}/>
      <Stack.Screen name="CreateOrganization" component={withAuth(CreateOrganizationScreen)} options={{ headerShown: false }} />
    </>
  );

    return (
        <Stack.Navigator initialRouteName={isAuthenticated ? "Home" : "Welcome"}>
            {/* La page d'accueil est toujours accessible, mais peut être protégée au niveau du composant */}
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Filter" component={Filter} options={{ headerShown: false }}/>

            <Stack.Screen name="CPC" component={CustomProductCatalogue} options={{ headerShown: false }}/>
            <Stack.Screen name="SellingPoints" component={SellingPoints} options={{ headerShown: false }}/>
            <Stack.Screen name="DeliveryOptions" component={DeliveryOptions} options={{ headerShown: false }}/>

            {/* Ajouter les écrans en fonction de l'état d'authentification */}
            {publicScreens}
            {protectedScreens}
        </Stack.Navigator>
    );
};

const AppRouter = () => {
    return (
        <NavigationContainer>
            <NotificationContextProvider>
                <CartProvider>
                    <SharedPostsProvider>
                        <MainRouter />
                    </SharedPostsProvider>
                </CartProvider>
            </NotificationContextProvider>
        </NavigationContainer>
    );
};

export default AppRouter;