import {StatusBar} from 'expo-status-bar';
import MainScreen from './screens/main/main-screen/MainScreen';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from "./screens/login-signup/LoginScreen";
import ExerciseDetail from "./screens/exercise-detail/ExerciseDetail";
import ChooseExercise from "./screens/choose-exercise/ChooseExercise";
import AgendaScreen from "./utils/AgendaScreen";
import ExerciseHistory from "./utils/ExerciseHistory";
import MealPlan from './screens/meal-screens/MealPlan';
import MealLog from "./screens/meal-screens/MealLog";
import SettingsScreen from "./screens/settings/SettingsScreen";
import ChartsScreen from "./screens/charts/ChartsScreen";
import SignupDetailsScreen from "./screens/login-signup/SignupDetailsScreen";
import {Appearance} from 'react-native';
import EmailPasswordScreen from "./screens/login-signup/EmailPasswordScreen";
import GoalSelectionScreen from "./screens/login-signup/GoalSelectionScreen";
import WelcomeScreen from "./screens/login-signup/WelcomeScreen";
import {UserProvider} from "./screens/login-signup/UserContext";
import SummaryScreen from "./screens/exercise-detail/SummaryScreen";
import {WorkoutLogProvider} from "./screens/exercise-detail/WorkoutLogContext";
import PreviousLogsScreen from "./screens/exercise-detail/PreviousLogsScreen";
import BodyScreen from './screens/body/BodyScreen';
import PrivacyPolicyScreen from "./screens/settings/user-settings-screens/PrivacyPolicyScreen";
import FAQScreen from "./screens/settings/user-settings-screens/FAQScreen";
import ContactUsScreen from "./screens/settings/user-settings-screens/ContactUsScreen";
import UpdateScreen from "./screens/body/UpdateScreen";
import {useState} from "react";
import {ExercisesContext} from "./context/ExercisesContext";
import ExerciseContext from './screens/exercise-detail/context/exerciseContext';
import LogoScreen from "./utils/LogoScreen";
import ChooseCategory from "./screens/choose-exercise/ChooseCategory";
import GalleryScreen from "./screens/body/GalleryScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    const colorScheme = Appearance.getColorScheme();
    const [exercisesLocal, setExercisesLocal] = useState([]);
    const [exercises, setExercises] = useState([]);

    const colors = {
        background: colorScheme === 'dark' ? '#000' : '#fff',
        text: colorScheme === 'dark' ? '#fff' : '#000',
        nav: colorScheme === 'dark' ? 'light' : 'dark'
        // ...add more color properties as needed
    };

    return (
            <UserProvider>
                <ExerciseContext.Provider value={{exercises, setExercises}}>
                    <ExercisesContext.Provider value={{exercisesLocal, setExercisesLocal}}>
                        <WorkoutLogProvider>
                            <NavigationContainer>
                                <Stack.Navigator screenOptions={{
                                    headerShown: false,
                                    cardStyle: {backgroundColor: 'transparent'},
                                    cardStyleInterpolator: ({current, next, layouts}) => {
                                        return {
                                            cardStyle: {
                                                transform: [
                                                    {
                                                        translateX: current.progress.interpolate({
                                                            inputRange: [0, 1],
                                                            outputRange: [layouts.screen.width, 0],
                                                        }),
                                                    },
                                                    {
                                                        scale: next
                                                            ? next.progress.interpolate({
                                                                inputRange: [0, 1],
                                                                outputRange: [0.6, 1],
                                                            })
                                                            : 1,
                                                    },
                                                ],
                                                opacity: current.progress.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [0, 1],
                                                }),
                                            },
                                            overlayStyle: {
                                                opacity: current.progress.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [0, 0.5],
                                                }),
                                            },
                                        };
                                    },
                                }}
                                >
                                    <Stack.Screen options={{headerShown: false}} name="LogoScreen"
                                                  component={LogoScreen}/>
                                    <Stack.Screen options={{headerShown: false, gestureEnabled: false}} name="LoginScreen" component={LoginScreen}/>
                                    <Stack.Screen options={{headerShown: false, gestureEnabled: false}}
                                                  name="MainScreen"
                                                  component={MainScreen}/>
                                    <Stack.Screen options={{headerShown: false}} name="BodyScreen"
                                                  component={BodyScreen}/>
                                    <Stack.Screen options={{headerShown: false}} name="ChooseExercise"
                                                  component={ChooseExercise}/>
                                    <Stack.Screen options={{headerShown: false}} name="ChooseCategory"
                                                  component={ChooseCategory}/>
                                    <Stack.Screen options={{headerShown: false}} name="ExerciseDetail"
                                                  component={ExerciseDetail}/>
                                    <Stack.Screen options={{headerShown: false}} name="AgendaScreen"
                                                  component={AgendaScreen}/>
                                    <Stack.Screen options={{headerShown: false}} name="HistoryView"
                                                  component={ExerciseHistory}/>
                                    <Stack.Screen options={{headerShown: false}} name="MealPlan" component={MealPlan}/>
                                    <Stack.Screen options={{headerShown: false}} name="MealLog" component={MealLog}/>
                                    <Stack.Screen options={{headerShown: false}} name="SettingsScreen"
                                                  component={SettingsScreen}/>
                                    <Stack.Screen options={{headerShown: false}} name="ChartsScreen"
                                                  component={ChartsScreen}/>
                                    <Stack.Screen options={{headerShown: false}} name="SignupDetailsScreen"
                                                  component={SignupDetailsScreen}/>
                                    <Stack.Screen options={{headerShown: false}} name="EmailPasswordScreen"
                                                  component={EmailPasswordScreen}/>
                                    <Stack.Screen options={{headerShown: false}} name="GoalSelectionScreen"
                                                  component={GoalSelectionScreen}/>
                                    <Stack.Screen options={{headerShown: false}} name="WelcomeScreen"
                                                  component={WelcomeScreen}/>
                                    <Stack.Screen options={{headerShown: false}} name="SummaryScreen"
                                                  component={SummaryScreen}/>
                                    <Stack.Screen options={{headerShown: false}} name="PreviousLogsScreen"
                                                  component={PreviousLogsScreen}/>
                                    <Stack.Screen options={{headerShown: false}} name="ContactUsScreen"
                                                  component={ContactUsScreen}/>
                                    <Stack.Screen options={{headerShown: false}} name="FAQScreen"
                                                  component={FAQScreen}/>
                                    <Stack.Screen options={{headerShown: false}} name="PrivacyPolicyScreen"
                                                  component={PrivacyPolicyScreen}/>
                                    <Stack.Screen options={{headerShown: false}} name="UpdateScreen"
                                                  component={UpdateScreen}/>
                                    <Stack.Screen options={{headerShown: false}} name="GalleryScreen"
                                                  component={GalleryScreen}/>
                                </Stack.Navigator>
                                <StatusBar style={colors.nav}/>
                            </NavigationContainer>
                        </WorkoutLogProvider>
                    </ExercisesContext.Provider>
                </ExerciseContext.Provider>
            </UserProvider>
    );
}
