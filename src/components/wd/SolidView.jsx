import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { state } from '../store'
import { gl } from '../../global'

export function SolidView(props) {
  const frame1 = useRef()
  const frame2 = useRef()
  const fullWindow = useRef()
  const _gl = useSnapshot(gl)
  const _win = useSnapshot(state)[_gl.window]
  const { nodes, materials } = useGLTF('/SolidView.glb')

  function setMat() {
    switch (_win.colorSelected) {
      case _win.color[0]:
        return materials.white;
      case _win.color[1]:
        return materials.beige;

      default:
        return 'Invalid value';
    }
  }

  function switchScreen(_screenOption) {
    if (_win.screenOption == _screenOption) {
      return true
    } else {
      return false
    }
  }

  function gridSwitch(style, option) {
    if (_win.gridOption == 'No Grid') return false;
    let _op = _win.gridOptions[option + 1];
    let _style = _win.gridStyles[style - 1];
    //console.log(_op + " " + _style)
    //return (_op == _win.gridOption && _style == _win.gridStyle || style == 1 && _win.gridStyle == state.gridStyles[2]) ? true : false;
    return (_op == _win.gridOption && _style == _win.gridStyle) ? true : false;
  }

  useFrame((state, delta) => {
    !_gl.intro && easing.dampE(fullWindow.current.rotation, [0, -45, 0], 0.5, delta)
    _win.anims[0] && !_win.anims[1] ? easing.damp3(frame2.current.position, [0, 0.9, 0], 0.4, delta) : easing.damp3(frame2.current.position, [0, 0.0, 0], 0.4, delta)
    _win.anims[1] ? easing.damp3(frame2.current.position, [0, -0.9, 0], 0.4, delta) : easing.damp3(frame2.current.position, [0, 0.0, 0], 0.4, delta)
    _win.anims[1] ? easing.dampE(frame2.current.rotation, [0, 0, -45], 0.3, delta) : easing.dampE(frame2.current.rotation, [0, 0.0, 0], 0.3, delta)
  })

  return (
    <group ref={fullWindow} {...props} dispose={null}>
      <group position={[0, 0.006, 0]}>
        <mesh geometry={nodes.window_1.geometry} material={setMat()} />
        <mesh geometry={nodes.window_2.geometry} material={setMat()} />
      </group>

      <group ref={frame1}>
        <mesh geometry={nodes.frame1.geometry} material={setMat()} position={[-0.01, -0.003, 0.21]} />
        <mesh geometry={nodes.glass1.geometry} material={materials.glass} position={[-0.01, -0.003, 0.21]} />
        <group position={[-0.01, -0.003, 0.21]} visible={gridSwitch(1, 0)}>
          <mesh geometry={nodes.grid0_up_1.geometry} material={setMat()} />
          <mesh geometry={nodes.grid0_up_2.geometry} material={setMat()} />
        </group>
        <group position={[-0.01, -0.003, 0.21]} visible={gridSwitch()}>
          <mesh geometry={nodes.contour0_up_1.geometry} material={setMat()} />
          <mesh geometry={nodes.contour0_up_2.geometry} material={setMat()} />
        </group>
        <group position={[-0.01, -0.003, 0.21]} visible={gridSwitch(1, 1)}>
          <mesh geometry={nodes.grid1_up_1.geometry} material={setMat()} />
          <mesh geometry={nodes.grid1_up_2.geometry} material={setMat()} />
        </group>
        <group position={[-0.01, -0.003, 0.21]} visible={gridSwitch(2, 1)}>
          <mesh geometry={nodes.contour1_up_1.geometry} material={setMat()} />
          <mesh geometry={nodes.contour1_up_2.geometry} material={setMat()} />
        </group>
        <group position={[-0.01, -0.003, 0.21]} visible={gridSwitch(2, 2)}>
          <mesh geometry={nodes.contour2_up_1.geometry} material={setMat()} />
          <mesh geometry={nodes.contour2_up_2.geometry} material={setMat()} />
        </group>
        <group position={[-0.01, -0.003, 0.21]} visible={gridSwitch(1, 3)}>
          <mesh geometry={nodes.grid3_up_1.geometry} material={setMat()} />
          <mesh geometry={nodes.grid3_up_2.geometry} material={setMat()} />
        </group>
        <group position={[-0.01, -0.003, 0.21]} visible={gridSwitch(2, 3)}>
          <mesh geometry={nodes.contour3_up_1.geometry} material={setMat()} />
          <mesh geometry={nodes.contour3_up_2.geometry} material={setMat()} />
        </group>
        <group position={[-0.01, -0.003, 0.21]} visible={gridSwitch(1, 4)}>
          <mesh geometry={nodes.grid4_up_1.geometry} material={setMat()} />
          <mesh geometry={nodes.grid4_up_2.geometry} material={setMat()} />
        </group>
        <group position={[-0.01, -0.003, 0.21]} visible={gridSwitch(2, 4)}>
          <mesh geometry={nodes.contour4_up_1.geometry} material={setMat()} />
          <mesh geometry={nodes.contour4_up_2.geometry} material={setMat()} />
        </group>
        <group position={[-0.01, -0.003, 0.21]} visible={gridSwitch(1, 5)}>
          <mesh geometry={nodes.grid5_up_1.geometry} material={setMat()} />
          <mesh geometry={nodes.grid5_up_2.geometry} material={setMat()} />
        </group>
        <group position={[-0.01, -0.003, 0.21]} visible={gridSwitch(2, 5)}>
          <mesh geometry={nodes.contour5_up_1.geometry} material={setMat()} />
          <mesh geometry={nodes.contour5_up_2.geometry} material={setMat()} />
        </group>
        <group position={[-0.01, -0.003, 0.21]} visible={gridSwitch(1, 2)}>
          <mesh geometry={nodes.grid2_up_1.geometry} material={setMat()} />
          <mesh geometry={nodes.grid2_up_2.geometry} material={setMat()} />
        </group>
      </group>
      <group ref={frame2}>
        <group position={[0.016, -0.296, 0.226]} scale={0.85} visible={gridSwitch(1, 1)}>
          <mesh geometry={nodes.grid1_down_1.geometry} material={setMat()} />
          <mesh geometry={nodes.grid1_down_2.geometry} material={setMat()} />
        </group>
        <group position={[0.016, -0.296, 0.226]} visible={gridSwitch(2, 1)}>
          <mesh geometry={nodes.contour1_down_1.geometry} material={setMat()} />
          <mesh geometry={nodes.contour1_down_2.geometry} material={setMat()} />
        </group>
        <group position={[0.016, -0.296, 0.226]} scale={0.85} visible={gridSwitch(1, 2)}>
          <mesh geometry={nodes.grid2_down_1.geometry} material={setMat()} />
          <mesh geometry={nodes.grid2_down_2.geometry} material={setMat()} />
        </group>
        <group position={[0.016, -0.296, 0.226]} visible={gridSwitch(2, 2)}>
          <mesh geometry={nodes.contour2_down_1.geometry} material={setMat()} />
          <mesh geometry={nodes.contour2_down_2.geometry} material={setMat()} />
        </group>
        <group position={[0.016, -0.296, 0.226]} scale={0.85} visible={gridSwitch(1, 4)}>
          <mesh geometry={nodes.grid4_down_1.geometry} material={setMat()} />
          <mesh geometry={nodes.grid4_down_2.geometry} material={setMat()} />
        </group>
        <group position={[0.016, -0.296, 0.226]} visible={gridSwitch(2, 4)}>
          <mesh geometry={nodes.contour4_down_1.geometry} material={setMat()} />
          <mesh geometry={nodes.contour4_down_2.geometry} material={setMat()} />
        </group>
        <mesh geometry={nodes.frame2_p1.geometry} material={setMat()} position={[0.016, -0.296, 0.226]} />
        <mesh geometry={nodes.frame2.geometry} material={setMat()} position={[0.016, -0.296, 0.226]} />
        <mesh geometry={nodes.glass2.geometry} material={materials.glass} position={[0.016, -0.296, 0.226]} />
        <mesh geometry={nodes.frame2_p2.geometry} material={setMat()} position={[0.016, 0.023, 0.226]} />
      </group>
      <mesh geometry={nodes.Cube011.geometry} material={setMat()} position={[0.001, 0.006, 0]} />
      <mesh geometry={nodes.screen_frame_half.geometry} material={setMat()} position={[-0.002, 0.006, 0]} visible={switchScreen('Half Screen')} />
      <mesh geometry={nodes.screen_glass1_half.geometry} material={materials.glass} position={[0, 0.006, 0]} visible={switchScreen('Half Screen')} />
      <mesh geometry={nodes.screen_frame_full.geometry} material={setMat()} position={[-0.002, 0.006, 0]} visible={switchScreen('Full Screen')} />
      <mesh geometry={nodes.screen_glass1_full.geometry} material={materials.glass} position={[0, 0.006, 0]} visible={switchScreen('Full Screen')} />
      <mesh geometry={nodes.bottomblack.geometry} material={materials.black} position={[0, 0.006, 0]} />







    </group>
  )
}

useGLTF.preload('/SolidView.glb')
