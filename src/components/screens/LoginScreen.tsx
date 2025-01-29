import * as React from "react";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { AuthService } from "../../services/auth";
import { Dialogs } from "@nativescript/core";

type LoginScreenProps = {
    route: RouteProp<MainStackParamList, "Login">,
    navigation: FrameNavigationProp<MainStackParamList, "Login">,
};

export function LoginScreen({ navigation }: LoginScreenProps) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Dialogs.alert({
                title: "Error",
                message: "Please fill in all fields",
                okButtonText: "OK"
            });
            return;
        }

        setIsLoading(true);
        try {
            await AuthService.getInstance().login(email, password);
            navigation.navigate("Home");
        } catch (error) {
            Dialogs.alert({
                title: "Error",
                message: "Invalid credentials",
                okButtonText: "OK"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <scrollView className="bg-gray-100">
            <stackLayout className="p-6">
                <label className="text-3xl font-bold text-center mb-8" text="MedConnect" />
                
                <stackLayout className="bg-white rounded-lg p-4 mb-4">
                    <label className="text-gray-600 mb-2" text="Email" />
                    <textField
                        className="border-b border-gray-300 p-2"
                        keyboardType="email"
                        autocorrect={false}
                        autocapitalizationType="none"
                        text={email}
                        onTextChange={(e) => setEmail(e.value)}
                    />
                </stackLayout>

                <stackLayout className="bg-white rounded-lg p-4 mb-6">
                    <label className="text-gray-600 mb-2" text="Password" />
                    <textField
                        className="border-b border-gray-300 p-2"
                        secure={true}
                        text={password}
                        onTextChange={(e) => setPassword(e.value)}
                    />
                </stackLayout>

                <button
                    className="bg-blue-600 text-white rounded-lg p-4 mb-4"
                    text={isLoading ? "Logging in..." : "Login"}
                    onTap={handleLogin}
                    isEnabled={!isLoading}
                />

                <button
                    className="text-blue-600"
                    text="Don't have an account? Register"
                    onTap={() => navigation.navigate("Register")}
                />
            </stackLayout>
        </scrollView>
    );
}