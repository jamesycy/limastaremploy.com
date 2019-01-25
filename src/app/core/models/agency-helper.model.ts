export interface AgencyHelper {
    // Firestore ID
    id: string;
    tripid: string;

    // Informations
    op: string;
    name: string;
    nationality: Nationality;
    birthday: string;
    duty: string;
    experience: string;

    // Jobs
    jobs: Jobs;

    // Links
    links: string[];

    // Status
    available: boolean;
    hold: boolean;
    private: boolean;

    // Media, Video & Images
    youtube: string;
    photo: string;
    biodata: string;
}

export interface Jobs {
    baby: boolean;
    children: boolean;
    elderly: boolean;
    pets: boolean;
    cleaning: boolean;
    cooking: boolean;
}

export enum Nationality {
    Indonesian = 'Indonesian',
    Filipino = 'Filipino'
}
