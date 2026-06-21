//users -> userid

interface UserFire {
    name: string;
    progressionnumber: number;
}

//projects -> projectid

interface ProjectFire {
    userid: string;
    name: string;
    summary: string;
    description: string;
    tags: string[];
    downloads: number;
    files: FileFire[];
    license: string;
    issuetracker: string;
    sourcecode: string;
    wikipage: string;
    discord: string;
    donation: string;
}

interface FileFire {
    id: string;
    title: string;
    versions: string[];
    platforms: string[];
    downloads: number;
    changelog: string;
}

//servers -> serverid

interface ServerFire {
    userid: string;
    name: string;
    summary: string;
    description: string;
    tags: string[];
    issuetracker: string;
    sourcecode: string;
    wikipage: string;
    discord: string;
    donation: string;
}