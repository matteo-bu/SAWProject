import { BrowserRouter, Route, Routes} from 'react-router'
import { MainPage } from './pages/main'
import { ModsPage } from './pages/mods'
import './app.css';
import { ProfilePage } from './pages/profile';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { getData, UserContext } from './functions/user';
import { getProjectInfo, ProjectContext } from './functions/project';
import type { Project, Server } from './misc/types';
import { auth, db } from './firebase/config';
import { collection, getDocs } from '@firebase/firestore';
import { ProjectPage } from './pages/project';
import { ProjectEditGeneralPage } from './pages/projecteditgeneral';
import { ProjectEditTagsPage } from './pages/projectedittags';
import { ProjectEditFilesPage } from './pages/projecteditfiles';
import { FileEditPage } from './pages/fileedit';
import { FileViewPage } from './pages/fileview';
import { getServerInfo, ServerContext } from './functions/server';
import { ServerPage } from './pages/server';
import { ServerEditGeneralPage } from './pages/servereditgeneral';
import { ServerEditTagsPage } from './pages/serveredittags';
import { CategorysContext, LicenseContext, LoadersContext, SearchContext, SortByContext, VersionsContext } from './functions/filtering';
import { ResourcePacksPage } from './pages/resourcepacks';
import { DataPacksPage } from './pages/datapacks';
import { ShadersPage } from './pages/shaders';
import { PluginsPage } from './pages/plugns';
import { ServersPage } from './pages/servers';

function App() {

  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[] | []>([]);
  const [servers, setServers] = useState<Server[]>([]);

  const [versions, setVersions] = useState<string []>([]);
  const [loaders, setLoaders] = useState<string []>([]);
  const [categorys, setCategorys] = useState<string []>([]);
  const [license, setLicense] = useState("");
  const [sortBy, setSortBy] = useState("Downloads");
  const [search, setSearch] = useState("");

  async function loadProjects(){
    try {
          const projectsCollection = await getDocs(collection(db, "projects"));
          projectsCollection.forEach(async (doc) => {
            const info = await getProjectInfo(doc.id);
            if (!info) return;

            const { Id, UserId, Name, Summary, Tags, Downloads, Files, License } = info;
            const { getName } = getData(UserId());
            
            const n: Project = {
              id: Id(),
              userid: UserId(),
              username: await getName() || "",
              name: Name(),
              summary: Summary(),
              tags: Tags(),
              downloads: Downloads(),
              files: Files(),
              license: License()
            };
            setProjects(p => [...p, n]);
          });
    } catch (error) {
      console.error("Error loading projects: ", error);
    }
  }

  async function loadServers(){
    try {
          const serversCollection = await getDocs(collection(db, "servers"));
          serversCollection.forEach(async (doc) => {
            const info = await getServerInfo(doc.id);
            if (!info) return;

            const { Id, UserId, Name, Summary, Tags, Versions } = info;
            
            const n: Server = {
              id: Id(),
              userid: UserId(),
              name: Name(),
              summary: Summary(),
              tags: Tags(),
              versions: Versions()
            };
            setServers(p => [...p, n]);
          });
    } catch (error) {
      console.error("Error loading servers: ", error);
    }
  }

  useEffect(() => {
    loadProjects();
    loadServers();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <SearchContext value={{search, setSearch}}>
      <SortByContext value={{sortBy, setSortBy}}>
      <VersionsContext value={{versions, setVersions}}>
      <LoadersContext value={{loaders, setLoaders}}>
      <CategorysContext value={{categorys, setCategorys}}>
      <LicenseContext value={{license, setLicense}}>
      <ServerContext value={{ servers, setServers }}>
      <ProjectContext value={{ projects, setProjects }}>
      <UserContext value={{ user, setUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />}/>
            <Route path="/discover/mods" element={<ModsPage />}/>
            <Route path="/discover/resourcepacks" element={<ResourcePacksPage />}/>
            <Route path="/discover/datapacks" element={<DataPacksPage />}/>
            <Route path="/discover/shaders" element={<ShadersPage />}/>
            <Route path="/discover/plugins" element={<PluginsPage />}/>
            <Route path="/discover/servers" element={<ServersPage />}/>
            <Route path="/profile" element={<ProfilePage />}/>
            <Route path="/project/:id" element={<ProjectPage />}/>
            <Route path="/project/:id/edit/general" element={<ProjectEditGeneralPage />}/>
            <Route path="/project/:id/edit/tags" element={<ProjectEditTagsPage />}/>
            <Route path="/project/:id/edit/files" element={<ProjectEditFilesPage />}/>
            <Route path="/project/:id/edit/file/:fileid" element={<FileEditPage />}/>
            <Route path="/project/:id/:fileid" element={<FileViewPage />}/>
            <Route path="/server/:id" element={<ServerPage />}/>
            <Route path="/server/:id/edit/general" element={<ServerEditGeneralPage />}/>
            <Route path="/server/:id/edit/tags" element={<ServerEditTagsPage />}/>
          </Routes>
        </BrowserRouter>
      </UserContext>
      </ProjectContext>
      </ServerContext>
      </LicenseContext>
      </CategorysContext>
      </LoadersContext>
      </VersionsContext>
      </SortByContext>
      </SearchContext>
    </>
  )
}

export default App