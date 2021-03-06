import { Comment } from './comment';

export interface Thread {
    id: number;
    title: string;
    content: string;
    created: Date;
    username: string;
    userId: number;
    photo: string;
    comments?: Comment[];
}
