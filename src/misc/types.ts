export interface Project {
    id: string;
    username: string;
    name: string;
    summary: string;
    tags: string[];
    downloads: number;
}

export interface Server {
    id: string;
    name: string;
    summary: string;
    tags: string[];
}