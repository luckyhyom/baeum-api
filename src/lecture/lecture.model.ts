export type Lecture = {
    id: number,
    title: string,
    description: string,
    videoURL: string,
    author: string,
    price: number,
    status: Status,
}

// export type inputData = {
// }

export type Status = 'PUBLIC' | 'PRIVATE';