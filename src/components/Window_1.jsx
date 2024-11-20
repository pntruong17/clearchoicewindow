
import { useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, AccumulativeShadows, RandomizedLight, Decal, Environment, Center } from '@react-three/drei'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { state } from '../store'
import { FreshSight } from './wd/FreshSight'


function Window_1(props) {

    return (
        <>
            <FreshSight />
        </>
    )
}


export default Window_1