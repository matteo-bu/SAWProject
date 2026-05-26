interface User {
    name: string;
    projects: Project[];
}

interface Project {
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
    number: string;
    subtitle: string;
    versions: string[];
    platforms: string[];
    changelod: string;
}