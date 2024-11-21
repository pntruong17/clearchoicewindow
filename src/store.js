import { proxy } from 'valtio'

const state = proxy({
    intro: true,
    window: 1,
    anims: [false, false],

    gridOptions: ['No Grid', 'Grid Style 1', 'Grid Style 2'],
    gridOption: 'Grid Style 1',

    colors: ['#FDFFFF', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934'],
    color: '#FDFFFF',

    mats: ['White', 'Clay', 'Sandtone', 'Black/White', 'Bronze/White'],
    matcodes: ['#FEFEFE', '#8D7D73', '#CFC0A1', '#07080B', '#52462A'],
    mat: '#FEFEFE',
})

export { state }
