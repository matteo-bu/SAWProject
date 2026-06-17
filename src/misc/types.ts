//users -> userid

interface User {
    name: string;
    progressionnumber: number;
}

//projects -> projectid

interface Project {
    userid: string;
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

interface File {
    id: string;
    title: string;
    versions: string[];
    platforms: string[];
    downloads: number;
    changelog: string;
}

//servers -> serverid

interface Server {
    userid: string;
    name: string;
    description: string;
    tags: string[];
    issuetracker: string;
    sourcecode: string;
    wikipage: string;
    discord: string;
    donation: string;
}