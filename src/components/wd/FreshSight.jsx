import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { state } from '../store'
import { gl } from '../../global'

export function FreshSight(props) {
  const offsetF2 = 0.52  // điều chỉnh gốc tọa độ xoay của vật
  const offsetPosF2 = 0 // điều chỉnh vị trí trục Y của vật
  const restPosF2 = -1 * offsetF2 - offsetPosF2 // trả về vị trí ban đầu của vật 

  const frame2 = useRef()
  const fullWindow = useRef()
  const _gl = useSnapshot(gl)
  const _win = useSnapshot(state)[_gl.window]
  const { nodes, materials } = useGLTF('/FreshSight.glb')
  console.log(_win.colorSelected)

  function matInterior() {
    switch (_win.colorSelected) {
      case _win.color[0]:
        return materials.white;
      case _win.color[1]:
        return materials.clay;
      case _win.color[2]:
        return materials.sandtone;
      case _win.color[3]:
        return materials.white;
      case _win.color[4]:
        return materials.white;
      default:
        return 'Invalid value';
    }
  }

  function matExterior() {
    switch (_win.colorSelected) {
      case _win.color[0]:
        return materials.white;
      case _win.color[1]:
        return materials.clay;
      case _win.color[2]:
        return materials.sandtone;
      case _win.color[3]:
        return materials.black;
      case _win.color[4]:
        return materials.bronze;
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
      return (_op == _win.gridOption && _style == _win.gridStyle) ? true : false;
    } else {
      return (_op == _win.gridOption && style == 2 || _op == _win.gridOption && style == 3) ? true : false;
    }
  }

  useFrame((state, delta) => {
    //!_gl.intro && easing.dampE(fullWindow.current.rotation, [0, 45, 0], 0.5, delta)
    //_win.anims[0] && !_win.anims[1] ? easing.damp3(frame1.current.position, [0, restPosF1 - 0.5, 0], 0.4, delta) : easing.damp3(frame1.current.position, [0, restPosF1, 0], 0.4, delta)
    _win.anims[0] && !_win.anims[1] ? easing.damp3(frame2.current.position, [0, restPosF2 + 0.9, 0], 0.4, delta) : easing.damp3(frame2.current.position, [0, restPosF2, 0], 0.4, delta)

    _win.anims[1] ? easing.damp3(frame2.current.position, [0, restPosF2 + 0.1, 0], 0.4, delta) : easing.damp3(frame2.current.position, [0, restPosF2, 0], 0.4, delta)
    _win.anims[1] ? easing.dampE(frame2.current.rotation, [49, 0, 0], 0.3, delta) : easing.dampE(frame2.current.rotation, [0, 0.0, 0], 0.3, delta)

    //_win.anims[1] ? easing.damp3(frame1.current.position, [0, restPosF1 - 0.3, 0], 0.4, delta) : easing.damp3(frame1.current.position, [0, restPosF1, 0], 0.4, delta)
    //_win.anims[1] ? easing.dampE(frame1.current.rotation, [0, 0, 49], 0.3, delta) : easing.dampE(frame1.current.rotation, [0, 0.0, 0], 0.3, delta)
  })
  return (
    <group ref={fullWindow} {...props} dispose={null}>
      <mesh geometry={nodes.cut1021.geometry} material={matInterior()} />
      <mesh geometry={nodes.glass1005.geometry} material={materials['glass.001']} />
      <mesh geometry={nodes.bolt1001.geometry} material={materials.metal} />
      <mesh geometry={nodes.cut1028.geometry} material={matInterior()} />

      <group ref={frame2} position={[0, -1 * offsetF2, 0]}>
        <group position={[0, offsetF2, 0]}>
          <mesh geometry={nodes.frame2_1.geometry} material={matExterior()} />
          <mesh geometry={nodes.frame2_2.geometry} material={matInterior()} />
          <mesh geometry={nodes.frame2_glass.geometry} material={materials['glass.001']} />
          <mesh geometry={nodes.frame2_p1.geometry} material={matInterior()} />
          <mesh geometry={nodes.frame2_p2.geometry} material={matInterior()} />
          <mesh geometry={nodes.frame2_p3.geometry} material={matInterior()} />
          <mesh geometry={nodes.frame2_bolt.geometry} material={materials.metal} />

          <group visible={gridSwitch(1, 0)}>
            <mesh geometry={nodes.grid0_under_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.grid0_under_2.geometry} material={matInterior()} />
          </group>
          <group visible={gridSwitch(2, 0)}>
            <mesh geometry={nodes.contour0_under_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour0_under_2.geometry} material={matInterior()} />
          </group>
          <group visible={gridSwitch(3, 0)}>
            <mesh geometry={nodes.contour0_under_out_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour0_under_out_2.geometry} material={matInterior()} />
          </group>
          <group visible={gridSwitch(1, 1)}>
            <mesh geometry={nodes.grid1_under_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.grid1_under_2.geometry} material={matInterior()} />
          </group>
          <group visible={gridSwitch(2, 1)}>
            <mesh geometry={nodes.contour1_under_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour1_under_2.geometry} material={matInterior()} />
          </group>
          <group visible={gridSwitch(3, 1)}>
            <mesh geometry={nodes.contour1_under_out_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour1_under_out_2.geometry} material={matInterior()} />
          </group>
          <group visible={gridSwitch(1, 2)}>
            <mesh geometry={nodes.grid2_under_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.grid2_under_2.geometry} material={matInterior()} />
          </group>
          <group visible={gridSwitch(2, 2)}>
            <mesh geometry={nodes.contour2_under_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour2_under_2.geometry} material={matInterior()} />
          </group>
          <group visible={gridSwitch(3, 2)}>
            <mesh geometry={nodes.contour2_under_out_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour2_under_out_2.geometry} material={matInterior()} />
          </group>
          <group visible={gridSwitch(1, 3)}>
            <mesh geometry={nodes.grid3_under_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.grid3_under_2.geometry} material={matInterior()} />
          </group>
          <group visible={gridSwitch(2, 3)}>
            <mesh geometry={nodes.contour3_under_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour3_under_2.geometry} material={matInterior()} />
          </group>
          <group visible={gridSwitch(3, 3)}>
            <mesh geometry={nodes.contour3_under_out_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour3_under_out_2.geometry} material={matInterior()} />
          </group>
          <group visible={gridSwitch(1, 4)}>
            <mesh geometry={nodes.grid4_under_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.grid4_under_2.geometry} material={matInterior()} />
          </group>
          <group visible={gridSwitch(2, 4)}>
            <mesh geometry={nodes.contour4_under_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour4_under_2.geometry} material={matInterior()} />
          </group>
          <group visible={gridSwitch(3, 4)}>
            <mesh geometry={nodes.contour4_under_out_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour4_under_out_2.geometry} material={matInterior()} />
          </group>
          <group visible={gridSwitch(1, 5)}>
            <mesh geometry={nodes.grid6_under_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.grid6_under_2.geometry} material={matInterior()} />
          </group>
          <group visible={gridSwitch(2, 5)}>
            <mesh geometry={nodes.contour6_under_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour6_under_2.geometry} material={matInterior()} />
          </group>
          <group visible={gridSwitch(3, 5)}>
            <mesh geometry={nodes.contour6_under_out_1.geometry} material={matExterior()} />
            <mesh geometry={nodes.contour6_under_out_2.geometry} material={matInterior()} />
          </group>
        </group>
      </group>

      <group >
        <mesh geometry={nodes.window_1.geometry} material={matExterior()} />
        <mesh geometry={nodes.window_2.geometry} material={matInterior()} />
      </group>
      <group visible={false}>
        <mesh geometry={nodes.white.geometry} material={materials.white} />
        <mesh geometry={nodes.glass.geometry} material={materials['glass.001']} />
        <mesh geometry={nodes.clay.geometry} material={materials.clay} />
        <mesh geometry={nodes.sandtone.geometry} material={materials.sandtone} />
        <mesh geometry={nodes.bronze.geometry} material={materials.bronze} />
        <mesh geometry={nodes.black.geometry} material={materials.black} />
        <mesh geometry={nodes.metal.geometry} material={materials.metal} />
      </group>
      <mesh geometry={nodes.frame3.geometry} material={matExterior()} visible={switchScreen('Full Screen')} />
      <mesh geometry={nodes.frame3_glass.geometry} material={materials['glass.001']} visible={switchScreen('Full Screen')} />
      <mesh geometry={nodes.frame3b.geometry} material={matExterior()} visible={switchScreen('Half Screen')} />
      <mesh geometry={nodes.frame3b_glass.geometry} material={materials['glass.001']} visible={switchScreen('Half Screen')} />
      <group visible={gridSwitch(1, 0)}>
        <mesh geometry={nodes.grid0_upper_1.geometry} material={matExterior()} />
        <mesh geometry={nodes.grid0_upper_2.geometry} material={matInterior()} />
      </group>
      <group visible={gridSwitch(2, 0)}>
        <mesh geometry={nodes.contour0_upper_1.geometry} material={matExterior()} />
        <mesh geometry={nodes.contour0_upper_2.geometry} material={matInterior()} />
      </group>
      <group visible={gridSwitch(3, 0)}>
        <mesh geometry={nodes.contour0_upper_out_1.geometry} material={matExterior()} />
        <mesh geometry={nodes.contour0_upper_out_2.geometry} material={matInterior()} />
      </group>



      <group visible={gridSwitch(1, 1)}>
        <mesh geometry={nodes.grid1_upper_1.geometry} material={matExterior()} />
        <mesh geometry={nodes.grid1_upper_2.geometry} material={matInterior()} />
      </group>
      <group visible={gridSwitch(2, 1)}>
        <mesh geometry={nodes.contour1_upper_1.geometry} material={matExterior()} />
        <mesh geometry={nodes.contour1_upper_2.geometry} material={matInterior()} />
      </group>
      <group visible={gridSwitch(3, 1)}>
        <mesh geometry={nodes.contour1_upper_out_1.geometry} material={matExterior()} />
        <mesh geometry={nodes.contour1_upper_out_2.geometry} material={matInterior()} />
      </group>



      <group visible={gridSwitch(1, 2)}>
        <mesh geometry={nodes.grid2_upper_1.geometry} material={matExterior()} />
        <mesh geometry={nodes.grid2_upper_2.geometry} material={matInterior()} />
      </group>
      <group visible={gridSwitch(2, 2)}>
        <mesh geometry={nodes.contour2_upper_1.geometry} material={matExterior()} />
        <mesh geometry={nodes.contour2_upper_2.geometry} material={matInterior()} />
      </group>
      <group visible={gridSwitch(3, 2)}>
        <mesh geometry={nodes.contour2_upper_out_1.geometry} material={matExterior()} />
        <mesh geometry={nodes.contour2_upper_out_2.geometry} material={matInterior()} />
      </group>



      <group visible={gridSwitch(1, 3)}>
        <mesh geometry={nodes.grid3_upper_1.geometry} material={matExterior()} />
        <mesh geometry={nodes.grid3_upper_2.geometry} material={matInterior()} />
      </group>
      <group visible={gridSwitch(2, 3)}>
        <mesh geometry={nodes.contour3_upper_1.geometry} material={matExterior()} />
        <mesh geometry={nodes.contour3_upper_2.geometry} material={matInterior()} />
      </group>
      <group visible={gridSwitch(3, 3)}>
        <mesh geometry={nodes.contour3_upper_out_1.geometry} material={matExterior()} />
        <mesh geometry={nodes.contour3_upper_out_2.geometry} material={matInterior()} />
      </group>



      <group visible={gridSwitch(1, 4)}>
        <mesh geometry={nodes.grid4_upper_1.geometry} material={matExterior()} />
        <mesh geometry={nodes.grid4_upper_2.geometry} material={matInterior()} />
      </group>
      <group visible={gridSwitch(2, 4)}>
        <mesh geometry={nodes.contour4_upper_1.geometry} material={matExterior()} />
        <mesh geometry={nodes.contour4_upper_2.geometry} material={matInterior()} />
      </group>
      <group visible={gridSwitch(3, 4)}>
        <mesh geometry={nodes.contour4_upper_out_1.geometry} material={matExterior()} />
        <mesh geometry={nodes.contour4_upper_out_2.geometry} material={matInterior()} />
      </group>



      <group visible={gridSwitch(1, 5)}>
        <mesh geometry={nodes.grid6_upper_1.geometry} material={matExterior()} />
        <mesh geometry={nodes.grid6_upper_2.geometry} material={matInterior()} />
      </group>
      <group visible={gridSwitch(2, 5)}>
        <mesh geometry={nodes.contour6_upper_1.geometry} material={matExterior()} />
        <mesh geometry={nodes.contour6_upper_2.geometry} material={matInterior()} />
      </group>
      <group visible={gridSwitch(3, 5)}>
        <mesh geometry={nodes.contour6_upper_out_1.geometry} material={matExterior()} />
        <mesh geometry={nodes.contour6_upper_out_2.geometry} material={matInterior()} />
      </group>



    </group>
  )
}

useGLTF.preload('/FreshSight.glb')
