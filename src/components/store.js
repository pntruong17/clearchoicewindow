import { proxy } from 'valtio'

const state = proxy([
    {
        id: 0,
        name: 'FreshSight',
        anims: [false, false, false], //0: under frame slides, 1: under frame tilts, 2: upper frame slide

        gridStyles: ['Flat btw Glass', 'Contour outside Glass'],
        gridStyle: 'Contour outside Glass',

        gridOptions: ['No Grid', '1V1H', '1V1Hx2', '2V1Hx2', '2V1H', '2V1HT', '2V2Hx2T', '2V1Hx2T', '2V0Hx2', '2V0H', '1V0Hx2', '1V0H'],
        gridOption: 'No Grid',

        screenOptions: ['No Screen', 'Half Screen'], //['No Screen', 'Half Screen', 'Full Screen'],
        screenOption: 'No Screen',

        colorInOutDiff: false,
        color: ['White', 'Clay', 'Sandtone', 'Black/White', 'Bronze/White'],
        colorSelected: 'White',

        exColor: [],
        inColor: [],
        excolorSelected: '',
        incolorSelected: '',
    },
    {
        id: 1,
        name: 'DreamGraze',
        anims: [false, false, false], //0: under frame slides, 1: under frame tilts, 2: upper frame slide

        gridStyles: ['Contour btw Glass', 'Contour outside Glass'],
        gridStyle: 'Contour outside Glass',

        gridOptions: ['No Grid', '1V1H', '1V1Hx2', '2V1Hx2', '2V1H', '2V1HT', '2V2Hx2T', '2V1Hx2T', '2V0Hx2', '2V0H', '1V0Hx2', '1V0H'],
        gridOption: 'No Grid',

        screenOptions: ['No Screen', 'Half Screen', 'Full Screen'],
        screenOption: 'No Screen',

        colorInOutDiff: true,
        color: [],
        colorSelected: '',

        exColor: ['Cashmere', ' Ivory', 'Wicker', 'Sandalwood', 'Clay', 'Sandstone', 'American Brown', 'Universal Brown', 'Wedgewood Blue', 'Old World Blue', 'Forest Green', 'Sable Bronze', 'True Black', 'Cranberry', 'Burgandy'],
        inColor: ['White', 'Beige', 'Medium Oak', 'Cherry woodgrain', 'Brazilian Cherry wood grain'],

        excolorSelected: 'Cashmere',
        incolorSelected: 'White',

    },
    {
        id: 2,
        name: 'Impervia',
        anims: [false, false, false], //0: under frame slides, 1: under frame tilts, 2: upper frame slide

        gridStyles: ['Contour btw Glass', 'Contour outside Glass'],
        gridStyle: 'Contour outside Glass',

        gridOptions: ['No Grid', '1V1H', '1V1Hx2', '2V1Hx2', '2V1H', '2V1HT', '2V2Hx2T', '2V1Hx2T', '2V0Hx2', '2V0H', '1V0Hx2', '1V0H'],
        gridOption: 'No Grid',

        screenOptions: ['No Screen', 'Half Screen', 'Full Screen'],
        screenOption: 'No Screen',

        colorInOutDiff: false,
        color: ['White', 'Brown', 'Black', 'Tan', 'Morning Sky', 'Brown/White', 'Black/White', 'Tan/White', 'Morning Sky/White'],
        colorSelected: 'White',
        exColor: [],
        inColor: [],
        excolorSelected: '',
        incolorSelected: '',

    },
    {
        id: 3,
        name: 'Lifestyle',
        anims: [false, false, false], //0: under frame slides, 1: under frame tilts, 2: upper frame slide

        gridStyles: ['Contour btw Glass', 'Contour outside Glass'],
        gridStyle: 'Contour outside Glass',

        gridOptions: ['No Grid', '1V1H', '1V1Hx2', '2V1Hx2', '2V1H', '2V1HT', '2V2Hx2T', '2V1Hx2T', '2V0Hx2', '2V0H', '1V0Hx2', '1V0H'],
        gridOption: 'No Grid',

        screenOptions: ['No Screen', 'Half Screen', 'Full Screen'],
        screenOption: 'No Screen',

        colorInOutDiff: true,
        color: [],
        colorSelected: '',
        exColor: ['Black', 'White', 'Brown', 'Fossil', 'Iron Ore', 'Portabello', 'Putty', 'Almond', 'Brick Red', 'Hartford Green', 'Wolf Gray'],
        inColor: ['pine', 'White', 'Bright white', 'Linen White', 'Golden Oak Stain', 'Early American Stain', 'Provincial Stain', 'Black'],
        excolorSelected: 'Black',
        incolorSelected: 'pine',

    },
    {
        id: 4,
        name: 'SolidView',
        anims: [false, false, false], //0: under frame slides, 1: under frame tilts, 2: upper frame slide

        gridStyles: ['Flat btw Glass', 'Contour btw Glass'],
        gridStyle: 'Flat btw Glass',

        gridOptions: ['No Grid', '1V1H', '1V1Hx2', '2V1Hx2', '2V1H', '2V1HT', '2V2Hx2T'],
        gridOption: 'No Grid',

        screenOptions: ['No Screen', 'Half Screen', 'Full Screen'],
        screenOption: 'No Screen',

        colorInOutDiff: false,
        color: ['White', 'Beige'],
        colorSelected: 'White',

        exColor: [],
        inColor: [],
        excolorSelected: '',
        incolorSelected: '',
    },
    {
        id: 5,
        name: 'TitanEdge',
        anims: [false, false, false], //0: under frame slides, 1: under frame tilts, 2: upper frame slide

        gridStyles: ['Flat btw Glass', 'Contour btw Glass'],
        gridStyle: 'Flat btw Glass',

        gridOptions: ['No Grid', '1V1H', '1V1Hx2', '2V1Hx2', '2V1H', '2V1HT', '2V2Hx2T', '2V1Hx2T', '2V0Hx2', '2V0H', '1V0Hx2', '1V0H'],
        gridOption: 'No Grid',

        screenOptions: ['No Screen', 'Half Screen', 'Full Screen'],
        screenOption: 'No Screen',

        colorInOutDiff: true,
        color: [],
        colorSelected: '',
        exColor: ['White', 'Beige', 'Cashmere', 'Ivory', 'Wicker', 'Sandalwood', 'Clay', 'Sandstone', 'American Brown', 'Universal Brown', 'Wedgewood Blue', 'Old World Blue', 'Forest Green', 'Sable', 'Bronze', 'True Black', 'Cranberry', 'Burgandy'],
        inColor: ['White', 'Beige'],
        excolorSelected: 'White',
        incolorSelected: 'White',
    },
]
)

export { state }