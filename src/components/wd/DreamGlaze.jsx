import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { state } from '../store'
import { gl } from '../../global'

export function DreamGlaze(props) {
    const frame2 = useRef()
    const fullWindow = useRef()
    const _gl = useSnapshot(gl)
    const _win = useSnapshot(state)[_gl.window]
    const { nodes, materials } = useGLTF('/FreshSight2.glb')

    function matInterior() {
        switch (_win.mat) {
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

    function matExterior() {
        switch (_win.mat) {
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
            <mesh visible={true} geometry={nodes.cut1021.geometry} material={matInterior()} position={[-0.039, -0.003, 0]} />
            <mesh visible={true} geometry={nodes.glass1005.geometry} material={materials['glass.001']} position={[0.023, 0.25, 0]} />
            <mesh visible={true} geometry={nodes.bolt1001.geometry} material={materials.metal} position={[0.015, -0.006, -0.024]} />
            <mesh visible={true} geometry={nodes.cut1028.geometry} material={matInterior()} position={[0.008, -0.006, 0]} />
            <group ref={frame2}>
                <mesh visible={true} geometry={nodes.cut1024.geometry} material={matInterior()} position={[-0.014, -0.014, 0]} />
                <mesh visible={true} geometry={nodes.cut1025.geometry} material={matInterior()} position={[-0.014, -0.014, 0]} />
                <mesh visible={true} geometry={nodes.cut1027.geometry} material={matInterior()} position={[-0.014, -0.014, 0]} />
                <mesh visible={true} geometry={nodes.cut1026.geometry} material={matInterior()} position={[-0.014, -0.014, 0]} />
                <mesh geometry={nodes.bolt2001.geometry} material={materials.metal} position={[-0.014, -0.014, 0]} />
                <mesh geometry={nodes.glass2005.geometry} material={materials['glass.001']} position={[-0.014, -0.014, 0]} />
                <group position={[-0.014, -0.014, 0]} visible={gridSwitch(1, 1)}>
                    <mesh geometry={nodes.grid1_under_1.geometry} material={matExterior()} />
                    <mesh geometry={nodes.grid1_under_2.geometry} material={matInterior()} />
                </group>
                <group position={[-0.014, -0.014, 0]} visible={gridSwitch(2, 1)}>
                    <mesh geometry={nodes.contour1_under_1.geometry} material={matInterior()} />
                    <mesh geometry={nodes.contour1_under_2.geometry} material={matExterior()} />
                </group>
                <group position={[-0.014, -0.014, 0]} visible={gridSwitch(3, 1)}>
                    <mesh geometry={nodes.contour1_under_out_1.geometry} material={matInterior()} />
                    <mesh geometry={nodes.contour1_under_out_2.geometry} material={matExterior()} />
                </group>
                <group position={[-0.014, -0.014, 0]} visible={gridSwitch(1, 2)}>
                    <mesh geometry={nodes.grid2_under_1.geometry} material={matExterior()} />
                    <mesh geometry={nodes.grid2_under_2.geometry} material={matInterior()} />
                </group>
                <group position={[-0.014, -0.014, 0]} visible={gridSwitch(2, 2)}>
                    <mesh geometry={nodes.contour2_under_1.geometry} material={matInterior()} />
                    <mesh geometry={nodes.contour2_under_2.geometry} material={matExterior()} />
                </group>
                <group position={[-0.014, -0.014, 0]} visible={gridSwitch(3, 2)}>
                    <mesh geometry={nodes.contour2_under_out_1.geometry} material={matInterior()} />
                    <mesh geometry={nodes.contour2_under_out_2.geometry} material={matExterior()} />
                </group>
                <group position={[-0.014, -0.014, 0]} visible={gridSwitch(1, 5)}>
                    <mesh geometry={nodes.Grid5_under_1.geometry} material={matExterior()} />
                    <mesh geometry={nodes.Grid5_under_2.geometry} material={matInterior()} />
                </group>
                <group position={[-0.014, -0.014, 0]} visible={gridSwitch(3, 5)}>
                    <mesh geometry={nodes.contour5_under_out_1.geometry} material={matInterior()} />
                    <mesh geometry={nodes.contour5_under_out_2.geometry} material={matExterior()} />
                </group>
                <group position={[-0.014, -0.014, 0]} visible={gridSwitch(2, 5)}>
                    <mesh geometry={nodes.contour5_under_1.geometry} material={matInterior()} />
                    <mesh geometry={nodes.contour5_under_2.geometry} material={matExterior()} />
                </group>
                <group position={[-0.014, -0.014, 0]} visible={gridSwitch(1, 6)}>
                    <mesh geometry={nodes.Grid6_under_1.geometry} material={matExterior()} />
                    <mesh geometry={nodes.Grid6_under_2.geometry} material={matInterior()} />
                </group>
                <group position={[-0.014, -0.014, 0]} visible={gridSwitch(3, 6)}>
                    <mesh geometry={nodes.contour6_under_out_1.geometry} material={matInterior()} />
                    <mesh geometry={nodes.contour6_under_out_2.geometry} material={matExterior()} />
                </group>
                <group position={[-0.014, -0.014, 0]} visible={gridSwitch(2, 6)}>
                    <mesh geometry={nodes.contour6_under_1.geometry} material={matInterior()} />
                    <mesh geometry={nodes.contour6_under_2.geometry} material={matExterior()} />
                </group>
                <group position={[-0.014, -0.014, 0]} visible={gridSwitch(1, 7)}>
                    <mesh geometry={nodes.Grid7_under_1.geometry} material={matExterior()} />
                    <mesh geometry={nodes.Grid7_under_2.geometry} material={matInterior()} />
                </group>
                <group position={[-0.014, -0.014, 0]} visible={gridSwitch(2, 7)}>
                    <mesh geometry={nodes.contour7_under_1.geometry} material={matInterior()} />
                    <mesh geometry={nodes.contour7_under_2.geometry} material={matExterior()} />
                </group>
                <group position={[-0.014, -0.014, 0]} visible={gridSwitch(3, 7)}>
                    <mesh geometry={nodes.contour7_under_out_1.geometry} material={matInterior()} />
                    <mesh geometry={nodes.contour7_under_out_2.geometry} material={matExterior()} />
                </group>
                <group position={[-0.014, -0.014, 0]} visible={gridSwitch(1, 9)}>
                    <mesh geometry={nodes.grid9_under_1.geometry} material={matExterior()} />
                    <mesh geometry={nodes.grid9_under_2.geometry} material={matInterior()} />
                </group>
                <group position={[-0.014, -0.014, 0]} visible={gridSwitch(2, 9)}>
                    <mesh geometry={nodes.contour9_under_1.geometry} material={matInterior()} />
                    <mesh geometry={nodes.contour9_under_2.geometry} material={matExterior()} />
                </group>
                <group position={[-0.014, -0.014, 0]} visible={gridSwitch(3, 9)}>
                    <mesh geometry={nodes.contour9_under_out_1.geometry} material={matInterior()} />
                    <mesh geometry={nodes.contour9_under_out_2.geometry} material={matExterior()} />
                </group>
            </group>
            <group position={[0.019, -0.003, 0]}>
                <mesh geometry={nodes.window_1.geometry} material={matExterior()} />
                <mesh geometry={nodes.window_2.geometry} material={matInterior()} />
            </group>
            <group visible={false}>
                <mesh geometry={nodes.white.geometry} material={materials.white} position={[0, -0.003, 0]} />
                <mesh geometry={nodes.glass.geometry} material={materials['glass.001']} position={[0, -0.003, 0]} />
                <mesh geometry={nodes.clay.geometry} material={materials.clay} position={[0, -0.003, 0]} />
                <mesh geometry={nodes.sandtone.geometry} material={materials.sandtone} position={[0, -0.003, 0]} />
                <mesh geometry={nodes.bronze.geometry} material={materials.bronze} position={[0, -0.003, 0]} />
                <mesh geometry={nodes.black.geometry} material={materials.black} position={[0, -0.003, 0]} />
                <mesh geometry={nodes.metal.geometry} material={materials.metal} position={[0, -0.003, 0]} />
            </group>
            <group position={[-0.014, -0.014, 0]} visible={gridSwitch(1, 0)}>
                <mesh geometry={nodes.grid0_upper_2.geometry} material={matExterior()} />
                <mesh geometry={nodes.grid0_upper_1.geometry} material={matInterior()} />
            </group>
            <group position={[-0.014, -0.014, 0]} visible={gridSwitch(2, 0)}>
                <mesh geometry={nodes.contour0_upper_1.geometry} material={matInterior()} />
                <mesh geometry={nodes.contour0_upper_2.geometry} material={matExterior()} />
            </group>
            <group position={[-0.014, -0.014, 0]} visible={gridSwitch(3, 0)}>
                <mesh geometry={nodes.contour0_upper_out_1.geometry} material={matInterior()} />
                <mesh geometry={nodes.contour0_upper_out_2.geometry} material={matExterior()} />
            </group>
            <group position={[-0.014, -0.014, 0]} visible={gridSwitch(1, 1)}>
                <mesh geometry={nodes.grid1_upper_2.geometry} material={matExterior()} />
                <mesh geometry={nodes.grid1_upper_1.geometry} material={matInterior()} />
            </group>

            <group position={[-0.014, -0.014, 0]} visible={gridSwitch(2, 1)}>
                <mesh geometry={nodes.contour1_upper_1.geometry} material={matInterior()} />
                <mesh geometry={nodes.contour1_upper_2.geometry} material={matExterior()} />
            </group>


            <group position={[-0.014, -0.014, 0]} visible={gridSwitch(3, 1)}>
                <mesh geometry={nodes.contour1_upper_out_1.geometry} material={matInterior()} />
                <mesh geometry={nodes.contour1_upper_out_2.geometry} material={matExterior()} />
            </group>
            <group position={[-0.014, -0.014, 0]} visible={gridSwitch(1, 2)}>
                <mesh geometry={nodes.grid2_upper_2.geometry} material={matExterior()} />
                <mesh geometry={nodes.grid2_upper_1.geometry} material={matInterior()} />
            </group>


            <group position={[-0.014, -0.014, 0]} visible={gridSwitch(2, 2)}>
                <mesh geometry={nodes.contour2_upper_1.geometry} material={matInterior()} />
                <mesh geometry={nodes.contour2_upper_2.geometry} material={matExterior()} />
            </group>

            <group position={[-0.014, -0.014, 0]} visible={gridSwitch(3, 2)}>
                <mesh geometry={nodes.contour2_upper_out_1.geometry} material={matInterior()} />
                <mesh geometry={nodes.contour2_upper_out_2.geometry} material={matExterior()} />
            </group>
            <group position={[-0.014, -0.014, 0]} visible={gridSwitch(1, 3)}>
                <mesh geometry={nodes.Grid3_upper_2.geometry} material={matExterior()} />
                <mesh geometry={nodes.Grid3_upper_1.geometry} material={matInterior()} />
            </group>
            <group position={[-0.014, -0.014, 0]} visible={gridSwitch(2, 3)}>
                <mesh geometry={nodes.contour3_upper_1.geometry} material={matInterior()} />
                <mesh geometry={nodes.contour3_upper_2.geometry} material={matExterior()} />
            </group>
            <group position={[-0.014, -0.014, 0]} visible={gridSwitch(3, 3)}>
                <mesh geometry={nodes.contour3_upper_out_1.geometry} material={matInterior()} />
                <mesh geometry={nodes.contour3_upper_out_2.geometry} material={matExterior()} />
            </group>
            <group position={[-0.014, -0.014, 0]} visible={gridSwitch(1, 4)}>
                <mesh geometry={nodes.Grid4_upper_2.geometry} material={matExterior()} />
                <mesh geometry={nodes.Grid4_upper_1.geometry} material={matInterior()} />
            </group>
            <group position={[-0.014, -0.014, 0]} visible={gridSwitch(2, 4)}>
                <mesh geometry={nodes.contour4_upper_1.geometry} material={matInterior()} />
                <mesh geometry={nodes.contour4_upper_2.geometry} material={matExterior()} />
            </group>
            <group position={[-0.014, -0.014, 0]} visible={gridSwitch(3, 4)}>
                <mesh geometry={nodes.contour4_upper_out_1.geometry} material={matInterior()} />
                <mesh geometry={nodes.contour4_upper_out_2.geometry} material={matExterior()} />
            </group>
            <group position={[-0.014, -0.014, 0]} visible={gridSwitch(1, 5)}>
                <mesh geometry={nodes.Grid5_upper_2.geometry} material={matExterior()} />
                <mesh geometry={nodes.Grid5_upper_1.geometry} material={matInterior()} />
            </group>

            <group position={[-0.014, -0.014, 0]} visible={gridSwitch(2, 5)}>
                <mesh geometry={nodes.contour5_upper_1.geometry} material={matInterior()} />
                <mesh geometry={nodes.contour5_upper_2.geometry} material={matExterior()} />
            </group>


            <group position={[-0.014, -0.014, 0]} visible={gridSwitch(3, 5)}>
                <mesh geometry={nodes.contour5_upper_out_1.geometry} material={matInterior()} />
                <mesh geometry={nodes.contour5_upper_out_2.geometry} material={matExterior()} />
            </group>
            <group position={[-0.014, -0.014, 0]} visible={gridSwitch(1, 6)}>
                <mesh geometry={nodes.Grid6_upper_2.geometry} material={matExterior()} />
                <mesh geometry={nodes.Grid6_upper_1.geometry} material={matInterior()} />
            </group>

            <group position={[-0.014, -0.014, 0]} visible={gridSwitch(2, 6)}>
                <mesh geometry={nodes.contour6_upper_1.geometry} material={matInterior()} />
                <mesh geometry={nodes.contour6_upper_2.geometry} material={matExterior()} />
            </group>


            <group position={[-0.014, -0.014, 0]} visible={gridSwitch(3, 6)}>
                <mesh geometry={nodes.contour6_upper_out_1.geometry} material={matInterior()} />
                <mesh geometry={nodes.contour6_upper_out_2.geometry} material={matExterior()} />
            </group>
            <group position={[-0.014, -0.014, 0]} visible={gridSwitch(1, 7)}>
                <mesh geometry={nodes.Grid7_upper_2.geometry} material={matExterior()} />
                <mesh geometry={nodes.Grid7_upper_1.geometry} material={matInterior()} />
            </group>

            <group position={[-0.014, -0.014, 0]} visible={gridSwitch(2, 7)}>
                <mesh geometry={nodes.contour7_upper_1.geometry} material={matInterior()} />
                <mesh geometry={nodes.contour7_upper_2.geometry} material={matExterior()} />
            </group>


            <group position={[-0.014, -0.014, 0]} visible={gridSwitch(3, 7)}>
                <mesh geometry={nodes.contour7_upper_out_1.geometry} material={matInterior()} />
                <mesh geometry={nodes.contour7_upper_out_2.geometry} material={matExterior()} />
            </group>
            <group position={[-0.014, -0.014, 0]} visible={gridSwitch(1, 8)}>
                <mesh geometry={nodes.Grid8_upper_2.geometry} material={matExterior()} />
                <mesh geometry={nodes.Grid8_upper_1.geometry} material={matInterior()} />
            </group>
            <group position={[-0.014, -0.014, 0]} visible={gridSwitch(2, 8)}>
                <mesh geometry={nodes.contour8_upper_1.geometry} material={matInterior()} />
                <mesh geometry={nodes.contour8_upper_2.geometry} material={matExterior()} />
            </group>
            <group position={[-0.014, -0.014, 0]} visible={gridSwitch(3, 8)}>
                <mesh geometry={nodes.contour8_upper_out_1.geometry} material={matInterior()} />
                <mesh geometry={nodes.contour8_upper_out_2.geometry} material={matExterior()} />
            </group>
            <group position={[-0.014, -0.014, 0]} visible={gridSwitch(1, 9)}>
                <mesh geometry={nodes.grid9_upper_2.geometry} material={matExterior()} />
                <mesh geometry={nodes.grid9_upper_1.geometry} material={matInterior()} />
            </group>


            <group position={[-0.014, -0.014, 0]} visible={gridSwitch(2, 9)}>
                <mesh geometry={nodes.contour9_upper_1.geometry} material={matInterior()} />
                <mesh geometry={nodes.contour9_upper_2.geometry} material={matExterior()} />
            </group>

            <group position={[-0.014, -0.014, 0]} visible={gridSwitch(3, 9)}>
                <mesh geometry={nodes.contour9_upper_out_1.geometry} material={matInterior()} />
                <mesh geometry={nodes.contour9_upper_out_2.geometry} material={matExterior()} />
            </group>
            <group position={[-0.014, -0.014, 0]} visible={gridSwitch(1, 10)}>
                <mesh geometry={nodes.grid10_upper_2.geometry} material={matExterior()} />
                <mesh geometry={nodes.grid10_upper_1.geometry} material={matInterior()} />
            </group>
            <group position={[-0.014, -0.014, 0]} visible={gridSwitch(2, 10)}>
                <mesh geometry={nodes.contour10_upper_1.geometry} material={matInterior()} />
                <mesh geometry={nodes.contour10_upper_2.geometry} material={matExterior()} />
            </group>
            <group position={[-0.014, -0.014, 0]} visible={gridSwitch(3, 10)}>
                <mesh geometry={nodes.contour10_upper_out_1.geometry} material={matInterior()} />
                <mesh geometry={nodes.contour10_upper_out_2.geometry} material={matExterior()} />
            </group>
        </group>
    )
}

useGLTF.preload('/FreshSight2.glb')
