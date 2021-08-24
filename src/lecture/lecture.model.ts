export type Lecture = {
    id: number,
    title: string,
    description: string,
    videoURL: string,
    author: string,
    price: number,
    status: Status,
}

export type Status = 'PUBLIC' | 'PRIVATE';

export const PRIVATE: Status = 'PRIVATE';
export const PUBLIC: Status = 'PUBLIC';