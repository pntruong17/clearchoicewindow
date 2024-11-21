import { proxy } from 'valtio'

const gl = proxy({
    music: false,
    camOptions: [],

    envOptions: ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'],
    envOption: 'sunset',

    bgStyles: ['flats', 'presets'],
    bgStyle: 'flats'
})

export { gl }
