import { Thread } from './thread';

export interface User {
    id: number;
    username: string;
    created: Date;
    lastActive: Date;
    profilePhoto: string;
    info?: string;
    threads?: Thread[];
    comments?: Comment[];
}

