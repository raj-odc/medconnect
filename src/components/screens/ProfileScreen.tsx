import * as React from "react";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { mockProfiles, mockPosts } from "../../data/mockData";
import { PostCard } from "../PostCard";

type ProfileScreenProps = {
    route: RouteProp<MainStackParamList, "Profile">,
    navigation: FrameNavigationProp<MainStackParamList, "Profile">,
};

export function ProfileScreen({ route, navigation }: ProfileScreenProps) {
    const profileId = route.params?.profileId;
    const profile = mockProfiles.find(p => p.id === profileId);
    const userPosts = mockPosts.filter(post => post.userId === profileId);

    React.useEffect(() => {
        navigation.setOptions({ title: profile?.name || "Profile" });
    }, [profile]);

    if (!profile) return null;

    return (
        <scrollView className="bg-gray-100">
            <stackLayout>
                <stackLayout className="bg-white p-4">
                    <image
                        src={profile.avatar}
                        className="rounded-full w-32 h-32 self-center"
                    />
                    <label className="text-2xl font-bold text-center mt-2" text={profile.name} />
                    <label className="text-gray-600 text-center" text={`${profile.specialty} • ${profile.experience} years`} />
                    <label className="text-gray-600 text-center" text={profile.hospital} />
                    <label className="text-center mt-2" text={profile.bio} />
                    <label className="text-blue-600 text-center mt-2" text={`${profile.connections} connections`} />
                </stackLayout>

                <label className="text-xl font-bold p-4">Posts</label>
                {userPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </stackLayout>
        </scrollView>
    );
}