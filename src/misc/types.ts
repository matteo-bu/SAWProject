interface User {
    name: string;
    progressionnumber: number;
}

interface Project {
    userid: string;
    id: string;
    name: string;
    description: string;
    tags: string[];
    files: File[];
    license: string;
    issuetracker: string;
    sourcecode: string;
    wikipage: string;
    discord: string;
    donation: string;
}

interface Server {
    userid: string;
    id: string;
    name: string;
    description: string;
    tags: string[];
    issuetracker: string;
    sourcecode: string;
    wikipage: string;
    discord: string;
    donation: string;
}

interface File {
    id: string;
    number: string;
    subtitle: string;
    versions: string[];
    platforms: string[];
    downloads: number;
    changelog: string;
}