import React from 'react'
import Home from './pages/Home'
import StarPlanning from './pages/StarPlanning'
import Destinations from './pages/Destinations'
import SmoothScroll from './components/shared/SmoothScroll'
import AiPlanned from './pages/AiPlanned'
import TravelSmart from './pages/TravelSmart'
import ReadyForAdventure from './pages/ReadyForAdventure'
import Sidebar from "./components/shared/Sidebar"

function App() {
  return (
    <>
      <Home />
      <StarPlanning />
      <Destinations />
      <SmoothScroll />
      <AiPlanned />
      <TravelSmart />
      <ReadyForAdventure />
      <Sidebar />
    </>
  )
}

export default App