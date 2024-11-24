import { proxy } from 'valtio'

const gl = proxy({
    intro: true,
    music: false,
    camOptions: ['Presentation', 'Orbit'],
    camOption: 'Presentation',

    colors: ['#FDFFFF', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934'],
    color: '#FDFFFF',

    windows: ['FreshSight', 'DreamGlaze', 'Impervia', 'Lifestyle', 'SolidView', 'TitanEdge'],
    window: 1,

    envOptions: ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'],
    envOption: 'sunset',

    bgStyles: ['flats', 'presets'],
    bgStyle: 'presets'
})

export { gl }
