import { Canvas } from '@react-three/fiber'
import { Environment, Center, PresentationControls } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import { state } from './store'
import { Overlay } from './components/Overlay'
import Window_1 from './components/Window_1'
import './App.css'

function App({ position = [0, 0, 1.68], fov = 50 }) {
  const snap = useSnapshot(state)
  return (
    <>
      <Canvas shadows camera={{ position, fov }} gl={{ preserveDrawingBuffer: true }} eventSource={document.getElementById('root')} eventPrefix="client">
        <color attach="background" args={[snap.color]} />
        <fog attach="fog" args={['black', 15, 22.5]} />
        <ambientLight intensity={0.5 * Math.PI} />
        <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
        <PresentationControls
          speed={1.5}
          global
          zoom={0.7}
          polar={[-1, Math.PI / 4]}
        >
          <Window_1 />
        </PresentationControls>
      </Canvas>
      <Overlay />

    </>
  )
}

export default App
