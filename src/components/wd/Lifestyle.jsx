import React, { useRef } from 'react'
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { state } from '../store'
import { gl } from '../../global'

export function Lifestyle(props) {
  const { nodes, materials } = useGLTF('/Lifestyle.glb')
  const offsetF2 = 0.38  // điều chỉnh gốc tọa độ xoay của vật
  const offsetPosF2 = 0 // điều chỉnh vị trí trục Y của vật
  const restPosF2 = -1 * offsetF2 - offsetPosF2 // trả về vị trí ban đầu của vật 

  const offsetF1 = 0.0
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
        return materials.PineWood;
      case _win.inColor[1]:
        return materials.White;
      case _win.inColor[2]:
        return materials.LinenWhite;
      case _win.inColor[3]:
        return materials.GoldenOak;
      case _win.inColor[4]:
        return materials.AmericanStainAKAPlywood;
      case _win.inColor[5]:
        return materials.Provincial;
      case _win.inColor[6]:
        return materials.Black;
      default:
        return 'Invalid value';
    }
  }

  function matExterior() {
    switch (_win.excolorSelected) {
      case _win.exColor[0]:
        return materials.Black;
      case _win.exColor[1]:
        return materials.White;
      case _win.exColor[2]:
        return materials.Brown;
      case _win.exColor[3]:
        return materials.Fossil;
      case _win.exColor[4]:
        return materials.IronOre;
      case _win.exColor[5]:
        return materials.Portobello;
      case _win.exColor[6]:
        return materials.Putty;
      case _win.exColor[7]:
        return materials.Almond;
      case _win.exColor[8]:
        return materials.BrickRed;
      case _win.exColor[9]:
        return materials.HartfordGreen;
      case _win.exColor[10]:
        return materials.WolfGray;
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
    let _style = _win.gridStyles[style - 2];
    //console.log(_op + " " + _style)
    //return (_op == _win.gridOption && _style == _win.gridStyle || style == 1 && _win.gridStyle == state.gridStyles[2]) ? true : false;
    return (_op == _win.gridOption && _style == _win.gridStyle) ? true : false;
  }

  useFrame((state, delta) => {
    !_gl.intro && easing.dampE(fullWindow.current.rotation, [0, 45, 0], 0.5, delta)
    _win.anims[0] && !_win.anims[1] ? easing.damp3(frame1.current.position, [0, restPosF1 - 0.5, 0], 0.4, delta) : easing.damp3(frame1.current.position, [0, restPosF1, 0], 0.4, delta)
    _win.anims[0] && !_win.anims[1] ? easing.damp3(frame2.current.position, [0, restPosF2 + 0.5, 0], 0.4, delta) : easing.damp3(frame2.current.position, [0, restPosF2, 0], 0.4, delta)

    _win.anims[1] ? easing.damp3(frame2.current.position, [0, restPosF2 + 0.1, 0], 0.4, delta) : easing.damp3(frame2.current.position, [0, restPosF2, 0], 0.4, delta)
    _win.anims[1] ? easing.dampE(frame2.current.rotation, [0, 0, 49], 0.3, delta) : easing.dampE(frame2.current.rotation, [0, 0.0, 0], 0.3, delta)

    _win.anims[1] ? easing.damp3(frame1.current.position, [0, restPosF1 - 0.3, 0], 0.4, delta) : easing.damp3(frame1.current.position, [0, restPosF1, 0], 0.4, delta)
    _win.anims[1] ? easing.dampE(frame1.current.rotation, [0, 0, 49], 0.3, delta) : easing.dampE(frame1.current.rotation, [0, 0.0, 0], 0.3, delta)
  })
  return (
    <group ref={fullWindow} {...props} dispose={null}>
      <group ref={frame1} position={[0, -1 * offsetF1, 0]}>
        <group position={[0, offsetF1, 0]}>

          <group position={[-0.026, 0.006, 0]}>
            <mesh geometry={nodes.frame1_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.frame1_2.geometry} material={matInterior()} />
          </group>
          <mesh geometry={nodes.frame1_glass.geometry} material={materials['glass.001']} position={[-0.004, 0.195, 0]} scale={[1, 1.04, 1.03]} />
          <group position={[-0.004, 0.195, 0]} scale={1.065} visible={gridSwitch(2, 0)}>
            <mesh geometry={nodes.contour0_up_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour0_up_2.geometry} material={matInterior()} />
          </group>

          <group position={[-0.004, 0.195, 0]} scale={1.065} visible={gridSwitch(2, 1)}>
            <mesh geometry={nodes.contour1_up_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour1_up_2.geometry} material={matInterior()} />
          </group>
          <group position={[-0.017, 0.195, 0]} scale={1.065} visible={gridSwitch(3, 1)}>
            <mesh geometry={nodes.contour1_up_out_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour1_up_out_2.geometry} material={matInterior()} />
          </group>
          <group position={[-0.004, 0.195, 0]} scale={1.065} visible={gridSwitch(2, 2)}>
            <mesh geometry={nodes.contour2_up_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour2_up_2.geometry} material={matInterior()} />
          </group>
          <group position={[-0.017, 0.195, 0]} scale={1.065} visible={gridSwitch(3, 2)}>
            <mesh geometry={nodes.contour2_up_out_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour2_up_out_2.geometry} material={matInterior()} />
          </group>
          <group position={[-0.004, 0.195, 0]} scale={1.065} visible={gridSwitch()}>
            <mesh geometry={nodes.contour3_up_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour3_up_2.geometry} material={matInterior()} />
          </group>
          <group position={[-0.017, 0.195, 0]} scale={1.065} visible={gridSwitch(3, 3)}>
            <mesh geometry={nodes.contour3_up_out_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour3_up_out_2.geometry} material={matInterior()} />
          </group>
          <group position={[-0.004, 0.195, 0]} scale={1.065} visible={gridSwitch(2, 4)}>
            <mesh geometry={nodes.contour4_up_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour4_up_2.geometry} material={matInterior()} />
          </group>
          <group position={[-0.017, 0.195, 0]} scale={1.065} visible={gridSwitch(3, 4)}>
            <mesh geometry={nodes.contour4_up_out_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour4_up_out_2.geometry} material={matInterior()} />
          </group>
          <group position={[-0.004, 0.195, 0]} scale={1.065} visible={gridSwitch(2, 5)}>
            <mesh geometry={nodes.contour5_up_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour5_up_2.geometry} material={matInterior()} />
          </group>
          <group position={[-0.017, 0.195, 0]} scale={1.065} visible={gridSwitch(3, 5)}>
            <mesh geometry={nodes.contour5_up_out_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour5_up_out_2.geometry} material={matInterior()} />
          </group>
          <group position={[-0.004, 0.195, 0]} scale={1.065} visible={gridSwitch(2, 6)}>
            <mesh geometry={nodes.contour6_up_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour6_up_2.geometry} material={matInterior()} />
          </group>
          <group position={[-0.017, 0.195, 0]} scale={1.065} visible={gridSwitch(3, 6)}>
            <mesh geometry={nodes.contour6_up_out_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour6_up_out_2.geometry} material={matInterior()} />
          </group>
          <group position={[-0.004, 0.195, 0]} scale={1.065} visible={gridSwitch(2, 7)}>
            <mesh geometry={nodes.contour7_up_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour7_up_2.geometry} material={matInterior()} />
          </group>
          <group position={[-0.017, 0.195, 0]} scale={1.065} visible={gridSwitch(3, 7)}>
            <mesh geometry={nodes.contour7_up_out_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour7_up_out_2.geometry} material={matInterior()} />
          </group>
          <group position={[-0.004, 0.195, 0]} scale={1.065} visible={gridSwitch(2, 8)}>
            <mesh geometry={nodes.contour8_up_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour8_up_2.geometry} material={matInterior()} />
          </group>
          <group position={[-0.017, 0.195, 0]} scale={1.065} visible={gridSwitch(3, 8)}>
            <mesh geometry={nodes.contour8_up_out_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour8_up_out_2.geometry} material={matInterior()} />
          </group>
          <group position={[-0.004, 0.195, 0]} scale={1.065} visible={gridSwitch(2, 9)}>
            <mesh geometry={nodes.contour9_up_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour9_up_2.geometry} material={matInterior()} />
          </group>
          <group position={[-0.017, 0.195, 0]} scale={1.065} visible={gridSwitch(3, 9)}>
            <mesh geometry={nodes.contour9_up_out_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour9_up_out_2.geometry} material={matInterior()} />
          </group>
        </group>
      </group>
      <group ref={frame2} position={[0, -1 * offsetF2, 0]}>
        <group position={[0, offsetF2, 0]}>

          <group position={[-0.001, 0.006, 0]}>
            <mesh geometry={nodes.frame2_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.frame2_2.geometry} material={matInterior()} />
          </group>
          <mesh geometry={nodes.frame2_glass.geometry} material={materials['glass.001']} position={[0.021, -0.139, 0]} />
          <mesh geometry={nodes.frame2_p1.geometry} material={matInterior()} position={[0.015, 0.056, 0]} />
          <mesh geometry={nodes.frame2_p2.geometry} material={matInterior()} position={[0.015, 0.056, 0]} />
          <group position={[0.023, -0.183, 0]} scale={1.065} visible={gridSwitch(2, 1)}>
            <mesh geometry={nodes.contour1_down_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour1_down_2.geometry} material={matInterior()} />
          </group>
          <group position={[0.008, -0.183, 0]} scale={1.065} visible={gridSwitch(3, 1)}>
            <mesh geometry={nodes.contour1_down_out_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour1_down_out_2.geometry} material={matInterior()} />
          </group>
          <group position={[0.023, -0.183, 0]} scale={1.065} visible={gridSwitch(2, 2)}>
            <mesh geometry={nodes.contour2_down_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour2_down_2.geometry} material={matInterior()} />
          </group>
          <group position={[0.008, -0.183, 0]} scale={1.065} visible={gridSwitch(3, 2)}>
            <mesh geometry={nodes.contour2_down_out_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour2_down_out_2.geometry} material={matInterior()} />
          </group>
          <group position={[0.023, -0.183, 0]} scale={1.065} visible={gridSwitch(2, 4)}>
            <mesh geometry={nodes.contour4_down_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour4_down_2.geometry} material={matInterior()} />
          </group>
          <group position={[0.008, -0.183, 0]} scale={1.065} visible={gridSwitch(3, 4)}>
            <mesh geometry={nodes.contour4_down_out_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour4_down_out_2.geometry} material={matInterior()} />
          </group>
          <group position={[0.023, -0.183, 0]} scale={1.065} visible={gridSwitch(2, 6)}>
            <mesh geometry={nodes.contour6_down_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour6_down_2.geometry} material={matInterior()} />
          </group>
          <group position={[0.008, -0.183, 0]} scale={1.065} visible={gridSwitch(3, 6)}>
            <mesh geometry={nodes.contour6_down_out_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour6_down_out_2.geometry} material={matInterior()} />
          </group>
          <group position={[0.023, -0.183, 0]} scale={1.065} visible={gridSwitch(2, 8)}>
            <mesh geometry={nodes.contour8_down_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour8_down_2.geometry} material={matInterior()} />
          </group>
          <group position={[0.008, -0.183, 0]} scale={1.065} visible={gridSwitch(3, 8)}>
            <mesh geometry={nodes.contour8_down_out_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour8_down_out_2.geometry} material={matInterior()} />
          </group>
        </group>
      </group>
      <group position={[0, 0.006, 0]}>
        <mesh geometry={nodes.window1_1.geometry} material={matExterior()} />
        <mesh geometry={nodes.window1_2.geometry} material={matInterior()} />
      </group>
      <group position={[-0.017, 0.195, 0]} scale={1.065}>
        <mesh geometry={nodes.frame3_half_up_glass001.geometry} material={materials['glass.001']} visible={switchScreen('Half Screen T')} />
        <mesh geometry={nodes.frame3_half_up_glass001_1.geometry} material={materials['glass.001']} visible={switchScreen('Half Screen T')} />
      </group>
      <group position={[-0.064, 0.014, 0]}>
        <mesh geometry={nodes.frame3_full_1.geometry} material={matExterior()} visible={switchScreen('Full Screen')} />
        <mesh geometry={nodes.frame3_full_2.geometry} material={matInterior()} visible={switchScreen('Full Screen')} />
      </group>
      <group position={[-0.064, 0.014, 0]}>
        <mesh geometry={nodes.frame3_half_down_1.geometry} material={matExterior()} visible={switchScreen('Half Screen D')} />
        <mesh geometry={nodes.frame3_half_down_2.geometry} material={matInterior()} visible={switchScreen('Half Screen D')} />
      </group>
      <group position={[-0.064, 0.014, 0]}>
        <mesh geometry={nodes.frame3_half_up_1.geometry} material={matExterior()} visible={switchScreen('Half Screen T')} />
        <mesh geometry={nodes.frame3_half_up_2.geometry} material={matInterior()} visible={switchScreen('Half Screen T')} />
      </group>
      <mesh geometry={nodes.frame3_full_glass.geometry} material={materials['glass.001']} position={[-0.061, 0.014, 0]} visible={switchScreen('Full Screen')} />
      <mesh geometry={nodes.frame3_half_up_glass.geometry} material={materials['glass.001']} position={[-0.061, 0.014, 0]} visible={switchScreen('Half Screen T')} />
      <mesh geometry={nodes.frame3_half_down_glass.geometry} material={materials['glass.001']} position={[-0.061, 0.014, 0]} visible={switchScreen('Half Screen D')} />
      <group visible={false}>
        <mesh geometry={nodes.Almond.geometry} material={materials.Almond} position={[0.09, -0.443, 0]} />
        <mesh geometry={nodes.Black.geometry} material={materials.Black} position={[0, 0.006, 0]} />
        <mesh geometry={nodes.BrickRed.geometry} material={materials.BrickRed} position={[0.09, -0.443, 0]} />
        <mesh geometry={nodes.Brown.geometry} material={materials.Brown} position={[0.09, -0.443, 0]} />
        <mesh geometry={nodes.Fossil.geometry} material={materials.Fossil} position={[0.09, -0.443, 0]} />
        <mesh geometry={nodes.HartfordGreen.geometry} material={materials.HartfordGreen} position={[0.09, -0.443, 0]} />
        <mesh geometry={nodes.IronOre.geometry} material={materials.IronOre} position={[0.09, -0.443, 0]} />
        <mesh geometry={nodes.Portobello.geometry} material={materials.Portobello} position={[0.09, -0.443, 0]} />
        <mesh geometry={nodes.Putty.geometry} material={materials.Putty} position={[0.09, -0.443, 0]} />
        <mesh geometry={nodes.White.geometry} material={materials['White.001']} position={[0, 0.006, 0]} />
        <mesh geometry={nodes.WolfGray.geometry} material={materials.WolfGray} position={[0.09, -0.443, 0]} />
        <mesh geometry={nodes.AmericanStainAKAPlywood.geometry} material={materials.AmericanStainAKAPlywood} position={[0.09, -0.443, 0]} />
        <mesh geometry={nodes.GoldenOak.geometry} material={materials.GoldenOak} position={[0.09, -0.443, 0]} />
        <mesh geometry={nodes.LinenWhite.geometry} material={materials.LinenWhite} position={[0.09, -0.443, 0]} />
        <mesh geometry={nodes.PineWood.geometry} material={materials.PineWood} position={[0.09, -0.443, 0]} />
        <mesh geometry={nodes.Provincial.geometry} material={materials.Provincial} position={[0.09, -0.443, 0]} />
      </group>
    </group>
  )
}

useGLTF.preload('/Lifestyle.glb')
