export type Product = {
    id: number,
    title: string,
    description: string,
    videoURL: string,
    author: string,
    price: number,
    status: Status,
}

type Status = 'PUBLIC' | 'PRIVATE';