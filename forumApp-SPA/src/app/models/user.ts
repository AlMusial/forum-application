import { Thread } from './thread';
import { Photo } from './photo';

export interface User {
    id: number;
    username: string;
    birth: Date;
    created: Date;
    lastActive: Date;
    profilePhoto: string;
    info?: string;
    threads?: Thread[];
    comments?: Comment[];
    photo?: Photo;
}

