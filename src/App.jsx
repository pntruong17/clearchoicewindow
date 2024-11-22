import { Suspense, useEffect, useState, useTransition } from 'react'
import { useControls } from 'leva'
import { Canvas } from '@react-three/fiber'
import { Environment, Center, PresentationControls } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import { state } from './store_win1'
import { gl } from './global'
import { Overlay } from './components/Overlay'
import Window_1 from './components/Window_1'
import { playThemeMusic } from './SoundFx'
import './App.css'

function App({ position = [0, 0, 1.68], fov = 50 }) {
  const snap = useSnapshot(state)
  const _gl = useSnapshot(gl)

  useEffect(() => {
    playThemeMusic(_gl.music)
    console.log(_gl.music)
  }, [_gl.music])

  return (
    <>
      <Canvas shadows camera={{ position, fov }} gl={{ preserveDrawingBuffer: true }} eventSource={document.getElementById('root')} eventPrefix="client">

        <fog attach="fog" args={['black', 15, 22.5]} />
        <ambientLight intensity={0.5 * Math.PI} />
        {/* <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" /> */}
        {_gl.bgStyle == 'flats' ? <Env1 /> : <Env0 />}
        <PresentationControls
          speed={1.5}
          global
          zoom={0.7}
          polar={[-1, Math.PI / 4]}
        >
          <Suspense fallback={''}>
            <Window_1 />
          </Suspense>
        </PresentationControls>
      </Canvas>
      <Overlay />

    </>
  )
}


function Env0() {
  const [preset, setPreset] = useState('sunset')
  const _gl = useSnapshot(gl)
  const [inTransition, startTransition] = useTransition()
  // const { blur } = useControls({
  //   blur: { value: 0.65, min: 0, max: 1 },
  //   preset: {
  //     value: preset,
  //     options: _gl.camOptions,
  //     onChange: (value) => startTransition(() => setPreset(value))
  //   }
  // })
  return (
    <Environment preset={_gl.envOption} background blur={0.3} />
  )

}

function Env1() {
  const snap = useSnapshot(state)
  return (
    <>
      <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
      <color attach="background" args={[snap.color]} />
    </>
  )
}


export default App
