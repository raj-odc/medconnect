import * as React from "react";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { mockProfiles } from "../../data/mockData";
import { PostCard } from "../PostCard";
import { ProfileCard } from "../ProfileCard";
import { AuthService } from "../../services/auth";
import { StorageService } from "../../services/storage";
import { Dialogs } from "@nativescript/core";

type HomeScreenProps = {
    route: RouteProp<MainStackParamList, "Home">,
    navigation: FrameNavigationProp<MainStackParamList, "Home">,
};

export function HomeScreen({ navigation }: HomeScreenProps) {
    const currentUser = AuthService.getInstance().getCurrentUser();
    const [posts, setPosts] = React.useState([]);
    const [showNewPostDialog, setShowNewPostDialog] = React.useState(false);
    const [newPostContent, setNewPostContent] = React.useState("");

    React.useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = () => {
        const storageService = StorageService.getInstance();
        setPosts(storageService.getPosts());
    };

    const handleCreatePost = () => {
        Dialogs.prompt({
            title: "Create Post",
            message: "What's on your mind?",
            okButtonText: "Post",
            cancelButtonText: "Cancel",
            defaultText: ""
        }).then(result => {
            if (result.result && result.text) {
                const storageService = StorageService.getInstance();
                storageService.addPost({
                    userId: currentUser.id,
                    content: result.text,
                    type: 'DISCUSSION',
                    likes: 0,
                    comments: 0,
                    timestamp: new Date().toISOString()
                });
                loadPosts();
            }
        });
    };

    const handleLike = (postId: string) => {
        const storageService = StorageService.getInstance();
        storageService.toggleLike(postId, currentUser.id);
        loadPosts();
    };

    const handleComment = (postId: string) => {
        Dialogs.prompt({
            title: "Add Comment",
            message: "Write your comment",
            okButtonText: "Comment",
            cancelButtonText: "Cancel",
            defaultText: ""
        }).then(result => {
            if (result.result && result.text) {
                const storageService = StorageService.getInstance();
                storageService.addComment(postId, result.text);
                loadPosts();
            }
        });
    };

    return (
        <scrollView className="bg-gray-100">
            <stackLayout>
                <gridLayout columns="*, auto" className="p-4 bg-white">
                    <label col={0} className="text-lg" text={`Welcome, ${currentUser?.name}`} />
                    <button
                        col={1}
                        className="text-red-600"
                        text="Logout"
                        onTap={() => {
                            AuthService.getInstance().logout();
                            navigation.navigate("Login");
                        }}
                    />
                </gridLayout>

                <label className="text-xl font-bold p-4">Suggested Connections</label>
                <scrollView orientation="horizontal" className="mb-4">
                    {mockProfiles.map(profile => (
                        <ProfileCard
                            key={profile.id}
                            profile={profile}
                            onPress={() => navigation.navigate("Profile", { profileId: profile.id })}
                        />
                    ))}
                </scrollView>

                <gridLayout columns="*, *" className="p-4">
                    <button
                        col={0}
                        className="bg-blue-600 text-white rounded-lg p-2 m-1"
                        text="View Events"
                        onTap={() => navigation.navigate("Events")}
                    />
                    <button
                        col={1}
                        className="bg-green-600 text-white rounded-lg p-2 m-1"
                        text="Create Post"
                        onTap={handleCreatePost}
                    />
                </gridLayout>

                <label className="text-xl font-bold p-4">Recent Posts</label>
                {posts.map(post => (
                    <PostCard 
                        key={post.id} 
                        post={post}
                        onLike={() => handleLike(post.id)}
                        onComment={() => handleComment(post.id)}
                        currentUserId={currentUser.id}
                    />
                ))}
            </stackLayout>
        </scrollView>
    );
}