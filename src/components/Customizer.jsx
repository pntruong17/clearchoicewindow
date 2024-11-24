import { useSnapshot } from 'valtio'
import { gl } from '../global'
import { state } from './store'
import { AiFillCamera, AiOutlineArrowLeft, AiFillSound, AiFillMuted } from 'react-icons/ai'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { playClick, playSlide } from '../SoundFx'

import logo2 from '../assets/fa.png'

export default function Customizer() {
    const _gl = useSnapshot(gl)
    const _win = useSnapshot(state)[_gl.window]
    const handleMusic = (bool) => {
        gl.music = bool
    }
    return (
        <div className="customizer bg-[#FDFFFF]">
            <div className="absolute top-[40px] left-[30px] h-10 md:h-20 w-64 flex flex-row items-center">
                <img src={logo2} alt="Logo" className="h-full object-contain" />
                <h2 className='pl-1 md:pl-3 text-xl md:text-3xl font-bold tracking-tighter'>{_gl.windows[_gl.window]}</h2>
                <p className='pl-1 md:pl-3 text-xl md:text-3xl font-thin tracking-tighter'>Window</p>
            </div>
            <div className="bg-options">
                {_gl.bgStyle == 'flats' ?
                    (
                        _gl.colors.map((color) => (
                            <div key={color} className="circle" style={{ background: color }} onClick={() => { gl.color = color; playClick() }}></div>
                        ))
                    ) : <ListSkys />
                }
            </div>
            <div className="matt-options right-5 sm:right-36">
                {/* {_win.matcodes.map((mat, index) => (
                    <div key={mat} className="circle m-2" style={{ background: mat }} onClick={() => { state[_gl.window].mat = mat; playClick() }}>
                        <p className='ml-10 hidden sm:block'>{_win.mats[index]}</p>
                    </div>
                ))} */}
                {_win.colorInOutDiff ? <ListColor2 /> : <ListColor1 />}
            </div>
            <div className="absolute left-[20px] bottom-1/2">
                <div className="flex flex-col gap-5">
                    <button className="cursor-pointer text-xs rounded-md px-1 py-5 bg-white bg-opacity-65 hover:bg-black hover:text-white ease-in-out transition-all duration-200"
                        onClick={() => (state[_gl.window].anims[0] = !state[_gl.window].anims[0], playSlide())}>
                        {/* <img src={'three2_thumb.png'} alt="brand" /> */}
                        <p className='uppercase vert--text'>Slides</p>
                    </button>
                    <button className="cursor-pointer text-xs  rounded-md px-1 py-5 bg-white bg-opacity-65 hover:bg-black hover:text-white ease-in-out transition-all duration-200"
                        onClick={() => (state[_gl.window].anims[1] = !state[_gl.window].anims[1], playSlide())}>
                        {/* <img src={'three2_thumb.png'} alt="brand" /> */}
                        <p className='uppercase vert--text'>Tilts</p>
                    </button>

                </div>
            </div>
            <div className="absolute right-[50px] bottom-[40px]">
                <div className="flex flex-col md:flex-row gap-0 md:gap-3">
                    <ListScreen />
                    <ListGrid _snap={_win} />
                    <ListEnv />
                    <ListStyleGrid />
                </div>
            </div>
            <button className="absolute top-[40px] right-[265px]
            text-base flex rounded-md px-3 py-2 ease-in-out transition-all duration-200 hover:scale-125"
                onClick={() => (playClick(), handleMusic(!_gl.music))}>
                {_gl.music ? <AiFillMuted /> : <AiFillSound />}
            </button>
            <button
                className="absolute top-[40px] right-[30px]
                        text-xs flex rounded-md px-3 py-2 bg-white bg-opacity-65 hover:bg-black hover:text-white ease-in-out transition-all duration-200"

                onClick={() => {
                    const link = document.createElement('a')
                    link.setAttribute('download', 'canvas.png')
                    link.setAttribute('href', document.querySelector('canvas').toDataURL('image/png').replace('image/png', 'image/octet-stream'))
                    link.click()
                    playClick()
                }}>
                <p className='pr-2'>
                    DOWNLOAD
                </p>
                <AiFillCamera size="1.3em" />
            </button>
            <button className="absolute top-[40px] right-[160px]
            text-xs flex rounded-md px-3 py-2 bg-white bg-opacity-65 hover:bg-black hover:text-white ease-in-out transition-all duration-200"
                onClick={() => (gl.intro = true, playClick(), handleMusic(false))}>
                <p className='pr-2'>
                    GO BACK
                </p>
                <AiOutlineArrowLeft size="1.3em" />
            </button>

        </div>
    )
}

function ListEnv() {
    const _gl = useSnapshot(gl)
    const handleChange = (value) => {
        gl.bgStyle = _gl.bgStyles[value];
    };
    return (
        <Listbox value={_gl.bgStyle} onChange={handleChange}>
            <div className="relative mt-2 w-36">
                <ListboxButton className="relative w-full cursor-default border bg-white bg-opacity-25 py-1.5 px-2 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm/6">
                    <span className="flex items-center">
                        <span className="ml-3 block truncate uppercase text-xs">{_gl.bgStyle}</span>
                    </span>
                </ListboxButton>

                <ListboxOptions
                    transition
                    className="absolute bottom-10 z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white bg-opacity-65 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                >

                    <ListboxOption
                        key={0}
                        value={0}
                        className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                    >
                        <div className="flex items-center">
                            <span className="capitalize ml-3 block truncate text-xs font-normal group-data-[selected]:font-semibold">
                                {_gl.bgStyles[0]}
                            </span>
                        </div>

                    </ListboxOption>
                    <ListboxOption
                        key={1}
                        value={1}
                        className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                    >
                        <div className="flex items-center">
                            <span className="capitalize ml-3 block truncate text-xs font-normal group-data-[selected]:font-semibold">
                                {_gl.bgStyles[1]}
                            </span>
                        </div>

                    </ListboxOption>
                </ListboxOptions>
            </div>
        </Listbox>
    )
}

function ListGrid({ _snap }) {
    const _gl = useSnapshot(gl)
    //const _snap = useSnapshot(state)
    const handleChange = (value) => {
        state[_gl.window].gridOption = _snap.gridOptions[value]
        //console.log(_snap.gridOption + "from Overlay")
    };
    return (
        <Listbox value={_snap.gridOption} onChange={handleChange}>
            <div className="relative mt-2 w-36">
                <ListboxButton className="relative w-full cursor-default border bg-white bg-opacity-25 py-1.5 px-2 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm/6">
                    <span className="flex items-center">
                        <span className="ml-3 block truncate uppercase text-xs">{_snap.gridOption}</span>
                    </span>
                </ListboxButton>

                <ListboxOptions
                    transition
                    className="absolute bottom-10 z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white bg-opacity-65 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                >
                    {_snap.gridOptions.map((grid, index) => (
                        <ListboxOption
                            key={index}
                            value={index}
                            className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                        >
                            <div className="flex items-center">
                                <span className="capitalize ml-3 block truncate text-xs font-normal group-data-[selected]:font-semibold">
                                    {grid}
                                </span>
                            </div>

                        </ListboxOption>
                    ))}

                </ListboxOptions>
            </div>
        </Listbox>
    )
}

function ListSkys() {
    const _gl = useSnapshot(gl)
    const handleChange = (value) => {
        gl.envOption = _gl.envOptions[value]
    };
    return (
        <Listbox value={_gl.envOption} onChange={handleChange}>
            <div className="relative mt-2 w-36">
                <ListboxButton className="relative w-full cursor-default border bg-white bg-opacity-25 py-1.5 pl-8 pr-12 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm/6">
                    <span className="flex items-center">
                        <span className="ml-3 block truncate uppercase text-xs">{_gl.envOption}</span>
                    </span>
                </ListboxButton>

                <ListboxOptions
                    transition
                    className="absolute bottom-10 z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white bg-opacity-65 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                >
                    {_gl.envOptions.map((env, index) => (
                        <ListboxOption
                            key={index}
                            value={index}
                            className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                        >
                            <div className="flex items-center">
                                <span className="capitalize ml-3 block truncate text-xs font-normal group-data-[selected]:font-semibold">
                                    {env}
                                </span>
                            </div>

                        </ListboxOption>
                    ))}

                </ListboxOptions>
            </div>
        </Listbox>
    )
}

function ListStyleGrid() {
    const _gl = useSnapshot(gl)
    const _win = useSnapshot(state)[_gl.window]
    const handleChange = (value) => {
        state[_gl.window].gridStyle = _win.gridStyles[value]
    };
    return (
        <Listbox value={_win.gridStyle} onChange={handleChange}>
            <div className="relative mt-2 w-36">
                <ListboxButton className="relative w-full cursor-default border bg-white bg-opacity-25 py-1.5 px-2 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm/6">
                    <span className="flex items-center">
                        <span className="ml-3 block truncate uppercase text-xs">{_win.gridStyle}</span>
                    </span>
                </ListboxButton>

                <ListboxOptions
                    transition
                    className="absolute bottom-10 z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white bg-opacity-65 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                >
                    {_win.gridStyles.map((style, index) => (
                        <ListboxOption
                            key={index}
                            value={index}
                            className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                        >
                            <div className="flex items-center">
                                <span className="capitalize ml-3 block truncate text-xs font-normal group-data-[selected]:font-semibold">
                                    {style}
                                </span>
                            </div>

                        </ListboxOption>
                    ))}

                </ListboxOptions>
            </div>
        </Listbox>
    )
}

function ListColor1() {
    const _gl = useSnapshot(gl)
    const _win = useSnapshot(state)[_gl.window]


    const handleChange = (value) => {
        state[_gl.window].colorSelected = _win.color[value]
    };


    return (
        <Listbox value={_win.colorSelected} onChange={handleChange}>
            <div className="relative mt-2 w-36">
                <ListboxButton className="relative w-full cursor-default border bg-white bg-opacity-25 py-1.5 pl-8 pr-12 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm/6">
                    <span className="flex items-center">
                        <span className="ml-3 block truncate uppercase text-xs">{_win.colorSelected}</span>
                    </span>
                </ListboxButton>

                <ListboxOptions
                    transition
                    className="absolute bottom-10 z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white bg-opacity-65 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                >
                    {_win.color.map((color, index) => (
                        <ListboxOption
                            key={index}
                            value={index}
                            className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                        >
                            <div className="flex items-center">
                                <span className="capitalize ml-3 block truncate text-xs font-normal group-data-[selected]:font-semibold">
                                    {color}
                                </span>
                            </div>

                        </ListboxOption>
                    ))}

                </ListboxOptions>
            </div>
        </Listbox>
    )
}

function ListColor2() {
    const _gl = useSnapshot(gl)
    const _win = useSnapshot(state)[_gl.window]


    const handleChangeEx = (value) => {
        state[_gl.window].excolorSelected = _win.exColor[value]
    };
    const handleChangeIn = (value) => {
        state[_gl.window].incolorSelected = _win.inColor[value]
    };

    return (
        <>
            <Listbox value={_win.excolorSelected} onChange={handleChangeEx}>
                <div className="relative mt-2 w-36">
                    <ListboxButton className="relative w-full cursor-default border bg-white bg-opacity-25 py-1.5 pl-8 pr-12 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm/6">
                        <span className="flex items-center">
                            <span className="ml-3 block truncate uppercase text-xs">{_win.excolorSelected}</span>
                        </span>
                    </ListboxButton>

                    <ListboxOptions
                        transition
                        className="absolute bottom-10 z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white bg-opacity-65 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                    >
                        {_win.exColor.map((excolor, index) => (
                            <ListboxOption
                                key={index}
                                value={index}
                                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                            >
                                <div className="flex items-center">
                                    <span className="capitalize ml-3 block truncate text-xs font-normal group-data-[selected]:font-semibold">
                                        {excolor}
                                    </span>
                                </div>

                            </ListboxOption>
                        ))}

                    </ListboxOptions>
                </div>
            </Listbox>
            <Listbox value={_win.incolorSelected} onChange={handleChangeIn}>
                <div className="relative mt-2 w-36">
                    <ListboxButton className="relative w-full cursor-default border bg-white bg-opacity-25 py-1.5 pl-8 pr-12 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm/6">
                        <span className="flex items-center">
                            <span className="ml-3 block truncate uppercase text-xs">{_win.incolorSelected}</span>
                        </span>
                    </ListboxButton>

                    <ListboxOptions
                        transition
                        className="absolute bottom-10 z-10 mt-1 w-full overflow-auto rounded-md bg-white bg-opacity-65 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                    >
                        {_win.inColor.map((incolor, index) => (
                            <ListboxOption
                                key={index}
                                value={index}
                                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                            >
                                <div className="flex items-center">
                                    <span className="capitalize ml-3 block truncate text-xs font-normal group-data-[selected]:font-semibold">
                                        {incolor}
                                    </span>
                                </div>

                            </ListboxOption>
                        ))}

                    </ListboxOptions>
                </div>
            </Listbox>
        </>
    )
}

function ListScreen() {
    const _gl = useSnapshot(gl)
    const _win = useSnapshot(state)[_gl.window]
    const handleChange = (value) => {
        state[_gl.window].screenOption = _win.screenOptions[value]
    };


    return (
        <Listbox value={_win.screenOption} onChange={handleChange}>
            <div className="relative mt-2 w-36">
                <ListboxButton className="relative w-full cursor-default border bg-white bg-opacity-25 py-1.5 pl-8 pr-12 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm/6">
                    <span className="flex items-center">
                        <span className="ml-3 block truncate uppercase text-xs">{_win.screenOption}</span>
                    </span>
                </ListboxButton>

                <ListboxOptions
                    transition
                    className="absolute bottom-10 z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white bg-opacity-65 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                >
                    {_win.screenOptions.map((screen, index) => (
                        <ListboxOption
                            key={index}
                            value={index}
                            className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                        >
                            <div className="flex items-center">
                                <span className="capitalize ml-3 block truncate text-xs font-normal group-data-[selected]:font-semibold">
                                    {screen}
                                </span>
                            </div>

                        </ListboxOption>
                    ))}

                </ListboxOptions>
            </div>
        </Listbox>
    )
}