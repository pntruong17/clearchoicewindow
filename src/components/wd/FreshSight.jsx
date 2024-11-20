import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { state } from '../../store'

export function FreshSight(props) {
  const frame2 = useRef()
  const frame = useRef()
  const snap = useSnapshot(state)
  const { nodes, materials } = useGLTF('/FreshSight.glb')

  function checkMatt2() {
    switch (snap.mat) {
      case '#FEFEFE':
        return materials.white;
      case '#8D7D73':
        return materials.clay;
      case '#CFC0A1':
        return materials.sandtone;
      case '#07080B':
        return materials.white;
      case '#52462A':
        return materials.white;
      default:
        return 'Invalid value';
    }
  }
  function checkMatt1() {
    switch (snap.mat) {
      case '#FEFEFE':
        return materials.white;
      case '#8D7D73':
        return materials.clay;
      case '#CFC0A1':
        return materials.sandtone;
      case '#07080B':
        return materials.black;
      case '#52462A':
        return materials.bronze;
      default:
        return 'Invalid value';
    }
  }
  useFrame((state, delta) => {
    !snap.intro && easing.dampE(frame.current.rotation, [0, -45, 0], 0.5, delta)
    snap.anims[0] && !snap.anims[1] ? easing.damp3(frame2.current.position, [0, 0.9, 0], 0.4, delta) : easing.damp3(frame2.current.position, [0, 0.0, 0], 0.4, delta)
    snap.anims[1] ? easing.damp3(frame2.current.position, [0, -0.9, 0], 0.4, delta) : easing.damp3(frame2.current.position, [0, 0.0, 0], 0.4, delta)
    snap.anims[1] ? easing.dampE(frame2.current.rotation, [0, 0, -45], 0.3, delta) : easing.dampE(frame2.current.rotation, [0, 0.0, 0], 0.3, delta)
  })
  return (
    <group ref={frame} {...props} dispose={null} >
      <group ref={frame2} >
        <mesh geometry={nodes.Cube010_2.geometry} material={materials.metal} />
        <mesh geometry={nodes.Cube010.geometry} material={checkMatt2()} />
        <mesh geometry={nodes.Cube010_1.geometry} material={materials.glass} />
      </group>
      <mesh geometry={nodes.Cube031_3.geometry} material={materials.metal} />
      <mesh geometry={nodes.cut1022.geometry} material={checkMatt2()} visible={snap.grid} />{/* grid */}
      <mesh geometry={nodes.Cube031.geometry} material={checkMatt1()} /> {/* mat truoc */}
      <mesh geometry={nodes.Cube031_1.geometry} material={checkMatt2()} />
      <mesh geometry={nodes.Cube031_2.geometry} material={materials.glass} />
      {/* <group visible={false}>
        <mesh geometry={nodes.clay.geometry} material={materials.clay} scale={0.149} />
        <mesh geometry={nodes.sandtone.geometry} material={materials.sandtone} scale={0.149} />
        <mesh geometry={nodes.black.geometry} material={materials.black} scale={0.149} />
      </group> */}
    </group>
  )
}

useGLTF.preload('/FreshSight.glb')
