import React, { useRef } from 'react'
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { state } from '../store'
import { gl } from '../../global'

export function DreamGraze(props) {
  const { nodes, materials } = useGLTF('/DreamGlaze.glb')
  const offsetF2 = 0.3  // điều chỉnh gốc tọa độ xoay của vật
  const offsetPosF2 = 0 // điều chỉnh vị trí trục Y của vật
  const restPosF2 = -1 * offsetF2 - offsetPosF2 // trả về vị trí ban đầu của vật 

  const offsetF1 = 0
  const offsetPosF1 = 0
  const restPosF1 = -1 * offsetF1 - offsetPosF1
  const frame1 = useRef()
  const frame2 = useRef()
  const fullWindow = useRef()
  const _gl = useSnapshot(gl)
  const _win = useSnapshot(state)[_gl.window]

  function matInterior() {
    switch (_win.incolorSelected) {
      case _win.inColor[0]:
        return materials.White;
      case _win.inColor[1]:
        return materials.Beige;
      case _win.inColor[2]:
        return materials.GoldenOak;
      case _win.inColor[3]:
        return materials.ProvincialWood;
      case _win.inColor[4]:
        return materials.BrazilianCherryWood;

      default:
        return 'Invalid value';
    }
  }

  function matExterior() {
    switch (_win.excolorSelected) {
      case _win.exColor[0]:
        return materials.Cashmere;
      case _win.exColor[1]:
        return materials.Ivory;
      case _win.exColor[2]:
        return materials.Wicker;
      case _win.exColor[3]:
        return materials.Sandalwood;
      case _win.exColor[4]:
        return materials.Clay;
      case _win.exColor[5]:
        return materials.Sandtone;
      case _win.exColor[6]:
        return materials.AmericanBrown;
      case _win.exColor[7]:
        return materials.UniversalBrown;
      case _win.exColor[8]:
        return materials.WedgeWoodBlue;
      case _win.exColor[9]:
        return materials.OldWorldBlue;
      case _win.exColor[10]:
        return materials.ForestGreen;
      case _win.exColor[11]:
        return materials.Sable;
      case _win.exColor[12]:
        return materials.Bronze;
      case _win.exColor[13]:
        return materials.Black;
      case _win.exColor[14]:
        return materials.Cranberry;
      case _win.exColor[15]:
        return materials.Burgundy;
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
    let _styleGrid = _win.gridStyle

    if (_styleGrid != 'Contour outside Glass') {
      return (_op == _win.gridOption && style == 2) ? true : false;
    } else {
      return (_op == _win.gridOption && style == 2 || _op == _win.gridOption && style == 3) ? true : false;
    }
  }

  useFrame((state, delta) => {
    //!_gl.intro && easing.dampE(fullWindow.current.rotation, [0, 45, 0], 0.5, delta)
    _win.anims[0] && !_win.anims[1] ? easing.damp3(frame1.current.position, [0, restPosF1 - 0.5, 0], 0.4, delta) : easing.damp3(frame1.current.position, [0, restPosF1, 0], 0.4, delta)
    _win.anims[0] && !_win.anims[1] ? easing.damp3(frame2.current.position, [0, restPosF2 + 0.5, 0], 0.4, delta) : easing.damp3(frame2.current.position, [0, restPosF2, 0], 0.4, delta)

    _win.anims[1] ? easing.damp3(frame2.current.position, [0, restPosF2 + 0.1, 0], 0.4, delta) : easing.damp3(frame2.current.position, [0, restPosF2, 0], 0.4, delta)
    _win.anims[1] ? easing.dampE(frame2.current.rotation, [49, 0, 0], 0.3, delta) : easing.dampE(frame2.current.rotation, [0, 0.0, 0], 0.3, delta)

    _win.anims[1] ? easing.damp3(frame1.current.position, [0, restPosF1 - 0.3, 0], 0.4, delta) : easing.damp3(frame1.current.position, [0, restPosF1, 0], 0.4, delta)
    _win.anims[1] ? easing.dampE(frame1.current.rotation, [49, 0, 0], 0.3, delta) : easing.dampE(frame1.current.rotation, [0, 0.0, 0], 0.3, delta)
  })
  return (

    <group ref={fullWindow} {...props} dispose={null}>
      <group visible={false}>
        <mesh geometry={nodes.American_Brown.geometry} material={materials.AmericanBrown} />
        <mesh geometry={nodes.Beige.geometry} material={materials.Beige} />
        <mesh geometry={nodes.Black.geometry} material={materials.Black} />
        <mesh geometry={nodes.Burgundy.geometry} material={materials.Burgundy} />
        <mesh geometry={nodes.Cashmere.geometry} material={materials.Cashmere} />
        <mesh geometry={nodes.Clay.geometry} material={materials.Clay} />
        <mesh geometry={nodes.Cranberry.geometry} material={materials.Cranberry} />
        <mesh geometry={nodes.Ivory.geometry} material={materials.Ivory} />
        <mesh geometry={nodes.OldWorldBlue.geometry} material={materials.OldWorldBlue} />
        <mesh geometry={nodes.Sable.geometry} material={materials.Sable} />
        <mesh geometry={nodes.Sandalwood.geometry} material={materials.Sandalwood} />
        <mesh geometry={nodes.Sandtone.geometry} material={materials.Sandtone} />
        <mesh geometry={nodes.UniversalBrown.geometry} material={materials.UniversalBrown} />
        <mesh geometry={nodes.WedgeWoodBlue.geometry} material={materials.OldWorldBlue} />
        <mesh geometry={nodes.Wicker.geometry} material={materials.Wicker} />
        <mesh geometry={nodes.OakWood.geometry} material={materials.OakWood} />
        <mesh geometry={nodes.BrazilianCherryWood.geometry} material={materials.BrazilianCherryWood} />
        <mesh geometry={nodes.ProvincialWood.geometry} material={materials.ProvincialWood} />
        <mesh geometry={nodes.GoldenOak.geometry} material={materials.GoldenOak} />
        <mesh geometry={nodes.White.geometry} material={materials.White} />
      </group>
      <group ref={frame1} position={[0, -1 * offsetF1, 0]}>
        <group position={[0, offsetF1, 0]}>
          <mesh geometry={nodes.glass1.geometry} material={materials['glass.001']} />
          <mesh geometry={nodes.frame1_1.geometry} material={matExterior()} />
          <mesh geometry={nodes.frame1_2.geometry} material={matInterior()} />
          <mesh geometry={nodes.contour0_up_1.geometry} material={matExterior()} visible={gridSwitch(2, 0)} />
          <mesh geometry={nodes.contour0_up_2.geometry} material={matInterior()} visible={gridSwitch(2, 0)} />
          <mesh geometry={nodes.contour0_up_out_1.geometry} material={matExterior()} visible={gridSwitch(3, 0)} />
          <mesh geometry={nodes.contour0_up_out_2.geometry} material={matInterior()} visible={gridSwitch(3, 0)} />
          <mesh geometry={nodes.contour1_up_1.geometry} material={matExterior()} visible={gridSwitch(2, 1)} />
          <mesh geometry={nodes.contour1_up_2.geometry} material={matInterior()} visible={gridSwitch(2, 1)} />
          <mesh geometry={nodes.contour1_up_out_1.geometry} material={matExterior()} visible={gridSwitch(3, 1)} />
          <mesh geometry={nodes.contour1_up_out_2.geometry} material={matInterior()} visible={gridSwitch(3, 1)} />
          <mesh geometry={nodes.contour2_up_1.geometry} material={matExterior()} visible={gridSwitch(2, 2)} />
          <mesh geometry={nodes.contour2_up_2.geometry} material={matInterior()} visible={gridSwitch(2, 2)} />
          <mesh geometry={nodes.contour2_up_out_1.geometry} material={matExterior()} visible={gridSwitch(3, 2)} />
          <mesh geometry={nodes.contour2_up_out_2.geometry} material={matInterior()} visible={gridSwitch(3, 2)} />
          <mesh geometry={nodes.contour3_up_1.geometry} material={matExterior()} visible={gridSwitch(2, 3)} />
          <mesh geometry={nodes.contour3_up_2.geometry} material={matInterior()} visible={gridSwitch(2, 3)} />
          <mesh geometry={nodes.contour3_up_out_1.geometry} material={matExterior()} visible={gridSwitch(3, 3)} />
          <mesh geometry={nodes.contour3_up_out_2.geometry} material={matInterior()} visible={gridSwitch(3, 3)} />
        </group>
      </group>
      <group ref={frame2} position={[0, -1 * offsetF2, 0]}>
        <group position={[0, offsetF2, 0]}>
          <mesh geometry={nodes.glass2.geometry} material={materials['glass.001']} />
          <mesh geometry={nodes.frame2_p1.geometry} material={matInterior()} />
          <mesh geometry={nodes.frame2_p2.geometry} material={matInterior()} />
          <mesh geometry={nodes.frame2_1.geometry} material={matExterior()} />
          <mesh geometry={nodes.frame2_2.geometry} material={matInterior()} />
          <mesh geometry={nodes.contour0_down_1.geometry} material={matExterior()} visible={gridSwitch(2, 0)} />
          <mesh geometry={nodes.contour0_down_2.geometry} material={matInterior()} visible={gridSwitch(2, 0)} />
          <mesh geometry={nodes.contour0_down_out_1.geometry} material={matExterior()} visible={gridSwitch(3, 0)} />
          <mesh geometry={nodes.contour0_down_out_2.geometry} material={matInterior()} visible={gridSwitch(3, 0)} />
          <mesh geometry={nodes.contour1_down_1.geometry} material={matExterior()} visible={gridSwitch(2, 1)} />
          <mesh geometry={nodes.contour1_down_2.geometry} material={matInterior()} visible={gridSwitch(2, 1)} />
          <mesh geometry={nodes.contour1_down_out_1.geometry} material={matExterior()} visible={gridSwitch(3, 1)} />
          <mesh geometry={nodes.contour1_down_out_2.geometry} material={matInterior()} visible={gridSwitch(3, 1)} />
          <mesh geometry={nodes.contour2_down_1.geometry} material={matExterior()} visible={gridSwitch(2, 2)} />
          <mesh geometry={nodes.contour2_down_2.geometry} material={matInterior()} visible={gridSwitch(2, 2)} />
          <mesh geometry={nodes.contour2_down_out_1.geometry} material={matExterior()} visible={gridSwitch(3, 2)} />
          <mesh geometry={nodes.contour2_down_out_2.geometry} material={matInterior()} visible={gridSwitch(3, 2)} />
          <mesh geometry={nodes.contour3_down_1.geometry} material={matExterior()} visible={gridSwitch(2, 3)} />
          <mesh geometry={nodes.contour3_down_2.geometry} material={matInterior()} visible={gridSwitch(2, 3)} />
          <mesh geometry={nodes.contour3_down_out_1.geometry} material={matExterior()} visible={gridSwitch(3, 3)} />
          <mesh geometry={nodes.contour3_down_out_2.geometry} material={matInterior()} visible={gridSwitch(3, 3)} />
        </group>
      </group>
      <mesh geometry={nodes.Cube011.geometry} material={matInterior()} />
      <mesh geometry={nodes.screen_frame_half.geometry} material={matExterior()} visible={switchScreen('Half Screen')} />
      <mesh geometry={nodes.screen_glass1_half.geometry} material={materials['glass.001']} visible={switchScreen('Half Screen')} />
      <mesh geometry={nodes.screen_frame_full.geometry} material={matExterior()} visible={switchScreen('Full Screen')} />
      <mesh geometry={nodes.screen_glass1_full.geometry} material={materials['glass.001']} visible={switchScreen('Full Screen')} />
      <mesh geometry={nodes.bottomblack.geometry} material={matInterior()} />
      <mesh geometry={nodes.window_1.geometry} material={matExterior()} />
      <mesh geometry={nodes.window_2.geometry} material={matInterior()} />
    </group>
  )
}

useGLTF.preload('/DreamGlaze.glb')
