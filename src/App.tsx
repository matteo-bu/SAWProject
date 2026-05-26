import { BrowserRouter, Route, Routes} from 'react-router'
import { Main } from './pages/main'
import { Mods } from './pages/mods'
import './app.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="/discover/mods" element={<Mods />}/>
          <Route path="/discover/resourcepacks" element={<Main />}/>
          <Route path="/discover/datapacks" element={<Main />}/>
          <Route path="/discover/shaders" element={<Main />}/>
          <Route path="/discover/plugins" element={<Main />}/>
          <Route path="/discover/servers" element={<Main />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App