export interface EventsEnrolled {
    event_id: number;       // Foreign key referencing event table
    user_id: number;        // Foreign key referencing user table
    attended: string;      // Whether the user attended the event
    date: Date;           // Date of enrollment or attendance
    event_desc?: string;    // Event description (from event table, optional for joined queries)
    user_name?: string;     // User name (from user table, optional for joined queries)
}
