import { proxy } from 'valtio'

const gl = proxy({
    music: false,
    camOptions: [],

    windows: ['FreshSight', 'DreamGlaze', 'Impervia', 'Lifestyle', 'SolidView', 'TitanEdge'],
    window: undefined,

    envOptions: ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'],
    envOption: 'sunset',

    bgStyles: ['flats', 'presets'],
    bgStyle: 'flats'
})

export { gl }
