import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { HomeScreen } from "./screens/HomeScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { EventsScreen } from "./screens/EventsScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { RegisterScreen } from "./screens/RegisterScreen";
import { AuthService } from "../services/auth";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    React.useEffect(() => {
        const authService = AuthService.getInstance();
        // Initial auth check
        setIsAuthenticated(authService.isAuthenticated());

        // Set up an interval to check authentication status
        const interval = setInterval(() => {
            const currentAuthState = authService.isAuthenticated();
            if (currentAuthState !== isAuthenticated) {
                setIsAuthenticated(currentAuthState);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isAuthenticated]);

    return (
        <BaseNavigationContainer>
            <StackNavigator.Navigator
                initialRouteName={isAuthenticated ? "Home" : "Login"}
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#2563eb",
                    },
                    headerTintColor: "#ffffff",
                    headerShown: true,
                }}
            >
                <StackNavigator.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <StackNavigator.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{ headerShown: false }}
                />
                <StackNavigator.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: "MedConnect" }}
                />
                <StackNavigator.Screen
                    name="Profile"
                    component={ProfileScreen}
                />
                <StackNavigator.Screen
                    name="Events"
                    component={EventsScreen}
                    options={{ title: "Professional Events" }}
                />
            </StackNavigator.Navigator>
        </BaseNavigationContainer>
    );
};