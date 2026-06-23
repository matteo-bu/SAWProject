import { BrowserRouter, Route, Routes} from 'react-router'
import { MainPage } from './pages/main'
import { Mods } from './pages/mods'
import './app.css';
import { ProfilePage } from './pages/profile';
import { useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { getData, UserContext } from './functions/user';
import { getProjectInfo, ProjectContext } from './functions/project';
import type { Project } from './misc/types';
import { db } from './firebase/config';
import { collection, getDocs } from '@firebase/firestore';
import { ProjectPage } from './pages/project';
import { ProjectEditGeneralPage } from './pages/projecteditgeneral';
import { ProjectEditTagsPage } from './pages/projectedittags';
import { ProjectEditFilesPage } from './pages/projecteditfiles';

function App() {

  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[] | []>([]);

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

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <>
      <ProjectContext value={{ projects, setProjects }}>
      <UserContext value={{ user, setUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />}/>
            <Route path="/discover/mods" element={<Mods />}/>
            <Route path="/discover/resourcepacks" element={<MainPage />}/>
            <Route path="/discover/datapacks" element={<MainPage />}/>
            <Route path="/discover/shaders" element={<MainPage />}/>
            <Route path="/discover/plugins" element={<MainPage />}/>
            <Route path="/discover/servers" element={<MainPage />}/>
            <Route path="/profile" element={<ProfilePage />}/>
            <Route path="/project/:id" element={<ProjectPage />}/>
            <Route path="/project/:id/edit/general" element={<ProjectEditGeneralPage />}/>
            <Route path="/project/:id/edit/tags" element={<ProjectEditTagsPage />}/>
            <Route path="/project/:id/edit/files" element={<ProjectEditFilesPage />}/>
            {/*<Route path="/server/:id" element={<ServerPage />}/>*/}
          </Routes>
        </BrowserRouter>
      </UserContext>
      </ProjectContext>
    </>
  )
}

export default App