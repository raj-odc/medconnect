import * as React from "react";
import { Event } from "../data/mockData";
import { StorageService } from "../services/storage";
import { AuthService } from "../services/auth";

interface EventCardProps {
  event: Event;
  onPress: () => void;
}

export function EventCard({ event, onPress }: EventCardProps) {
  const currentUser = AuthService.getInstance().getCurrentUser();
  const storageService = StorageService.getInstance();
  const isRegistered = storageService.isRegisteredForEvent(event.id, currentUser.id);
  const registeredCount = storageService.getEventRegistrations(event.id).length;

  return (
    <gridLayout 
      className={`${isRegistered ? 'bg-blue-50' : 'bg-white'} rounded-lg p-4 m-2`}
      rows="auto, auto, auto"
      columns="*, auto"
      onTap={onPress}
    >
      <label
        row={0}
        col={0}
        className="font-bold text-lg"
        text={event.title}
      />
      <label
        row={0}
        col={1}
        className={`${event.virtual ? 'text-green-600' : 'text-blue-600'}`}
        text={event.virtual ? 'Virtual' : 'In-Person'}
      />
      <label
        row={1}
        col={0}
        colSpan={2}
        className="text-gray-600"
        text={`${event.type} • ${event.organizer}`}
      />
      <stackLayout
        row={2}
        col={0}
        colSpan={2}
        className="mt-2"
      >
        <label className="text-gray-500" text={`Date: ${new Date(event.date).toLocaleDateString()}`} />
        <label className="text-gray-500" text={`${registeredCount} registered`} />
        {isRegistered && (
          <label className="text-green-600" text="You are registered for this event" />
        )}
      </stackLayout>
    </gridLayout>
  );
}