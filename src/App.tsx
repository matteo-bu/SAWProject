import { BrowserRouter, Route, Routes} from 'react-router'
import { MainPage } from './pages/main'
import { Mods } from './pages/mods'
import './app.css';
import { ProfilePage } from './pages/profile';
import { useState } from 'react';
import type { User } from 'firebase/auth';
import { UserContext } from './functions/user';

function App() {

  const [user, setUser] = useState<User | null>(null);

  return (
    <>
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
            {/* <Route path="/project/:id" element={<ProjectPage />}/> 
            <Route path="/server/:id" element={<ServerPage />}/>*/}
          </Routes>
        </BrowserRouter>
      </UserContext>
    </>
  )
}

export default App