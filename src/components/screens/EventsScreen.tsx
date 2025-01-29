import * as React from "react";
import { RouteProp } from '@react-navigation/core';
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { EventCard } from "../EventCard";
import { StorageService } from "../../services/storage";
import { Dialogs } from "@nativescript/core";
import { AuthService } from "../../services/auth";

type EventsScreenProps = {
    route: RouteProp<MainStackParamList, "Events">,
    navigation: FrameNavigationProp<MainStackParamList, "Events">,
};

export function EventsScreen({ navigation }: EventsScreenProps) {
    const [events, setEvents] = React.useState([]);
    const [showingMyEvents, setShowingMyEvents] = React.useState(false);
    const currentUser = AuthService.getInstance().getCurrentUser();

    React.useEffect(() => {
        loadEvents();
    }, [showingMyEvents]);

    const loadEvents = () => {
        const storageService = StorageService.getInstance();
        const allEvents = storageService.getEvents();
        if (showingMyEvents) {
            setEvents(allEvents.filter(event => event.organizerId === currentUser.id));
        } else {
            setEvents(allEvents);
        }
    };

    const handleCreateEvent = () => {
        Dialogs.prompt({
            title: "Create Event",
            message: "Event Title",
            okButtonText: "Next",
            cancelButtonText: "Cancel",
            defaultText: ""
        }).then(titleResult => {
            if (titleResult.result && titleResult.text) {
                const title = titleResult.text;
                Dialogs.action({
                    message: "Select Event Type",
                    cancelButtonText: "Cancel",
                    actions: ["CONFERENCE", "WORKSHOP", "WEBINAR"]
                }).then(typeResult => {
                    if (typeResult !== "Cancel") {
                        Dialogs.confirm({
                            title: "Event Format",
                            message: "Is this a virtual event?",
                            okButtonText: "Yes",
                            cancelButtonText: "No"
                        }).then(virtualResult => {
                            if (virtualResult !== undefined) {
                                const storageService = StorageService.getInstance();
                                storageService.addEvent({
                                    title,
                                    type: typeResult,
                                    date: new Date().toISOString(),
                                    organizer: currentUser.name,
                                    organizerId: currentUser.id,
                                    participants: 0,
                                    virtual: virtualResult
                                });
                                loadEvents();
                            }
                        });
                    }
                });
            }
        });
    };

    const handleRegisterForEvent = (eventId: string) => {
        const storageService = StorageService.getInstance();
        storageService.registerForEvent(eventId, currentUser.id);
        loadEvents();
    };

    return (
        <scrollView className="bg-gray-100">
            <stackLayout>
                <gridLayout columns="*, *, *" className="p-4">
                    <button
                        col={0}
                        className={`${!showingMyEvents ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} rounded-lg p-2 m-1`}
                        text="All Events"
                        onTap={() => setShowingMyEvents(false)}
                    />
                    <button
                        col={1}
                        className={`${showingMyEvents ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} rounded-lg p-2 m-1`}
                        text="My Events"
                        onTap={() => setShowingMyEvents(true)}
                    />
                    <button
                        col={2}
                        className="bg-green-600 text-white rounded-lg p-2 m-1"
                        text="Create"
                        onTap={handleCreateEvent}
                    />
                </gridLayout>

                {events.map(event => (
                    <EventCard
                        key={event.id}
                        event={event}
                        onPress={() => {
                            Dialogs.confirm({
                                title: event.title,
                                message: `Would you like to register for this ${event.type.toLowerCase()}?`,
                                okButtonText: "Register",
                                cancelButtonText: "Cancel"
                            }).then(result => {
                                if (result) {
                                    handleRegisterForEvent(event.id);
                                }
                            });
                        }}
                    />
                ))}

                {events.length === 0 && (
                    <label 
                        className="text-gray-500 text-center p-4" 
                        text={showingMyEvents ? "You haven't created any events yet" : "No events available"}
                    />
                )}
            </stackLayout>
        </scrollView>
    );
}