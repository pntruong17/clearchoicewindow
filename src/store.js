import { proxy } from 'valtio'

const state = proxy({
    intro: true,
    window: 1,
    anims: [false, false],
    grid: true,

    colors: ['#FDFFFF', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934'],
    color: '#FDFFFF',

    mats: ['White', 'Clay', 'Sandtone', 'Black/White', 'Bronze/White'],
    matcodes: ['#FEFEFE', '#8D7D73', '#CFC0A1', '#07080B', '#52462A'],
    mat: '#FEFEFE',

    decal: 'three2'
})

export { state }
