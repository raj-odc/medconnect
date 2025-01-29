import * as React from "react";
import { Profile } from "../data/mockData";
import { StyleSheet } from "react-nativescript";

interface ProfileCardProps {
  profile: Profile;
  onPress: () => void;
}

export function ProfileCard({ profile, onPress }: ProfileCardProps) {
  return (
    <gridLayout 
      className="bg-white rounded-lg p-4 m-2"
      rows="auto, auto, auto"
      columns="80, *"
      onTap={onPress}
    >
      <image
        row={0}
        col={0}
        rowSpan={3}
        src={profile.avatar}
        className="rounded-full w-20 h-20"
      />
      <label
        row={0}
        col={1}
        className="font-bold text-lg"
        text={profile.name}
      />
      <label
        row={1}
        col={1}
        className="text-gray-600"
        text={`${profile.specialty} at ${profile.hospital}`}
      />
      <label
        row={2}
        col={1}
        className="text-blue-600"
        text={`${profile.connections} connections`}
      />
    </gridLayout>
  );
}