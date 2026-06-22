export interface Project {
    id: string;
    userid: string;
    username: string;
    name: string;
    summary: string;
    tags: string[];
    downloads: number;
    files: File[];
    license: string;
}

export interface File {
    id: string;
    title: string;
    versions: string[];
    platforms: string[];
    downloads: number;
    link: string;
    changelog: string;
}

export interface Server {
    id: string;
    userid: string;
    name: string;
    summary: string;
    tags: string[];
}

export interface ProjectServerExtra {
    description: string
    issuetracker: string;
    sourcecode: string;
    wikipage: string;
    discord: string;
    donation: string;
}