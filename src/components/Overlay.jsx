import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { AiFillCamera, AiOutlineArrowLeft, AiFillSound, AiFillMuted } from 'react-icons/ai'
import { useSnapshot } from 'valtio'
import { Howler } from 'howler'
import { playClick, playSlide } from '../SoundFx'
import { gl } from '../global'
import { state } from '../store_win1'

import logo from '../assets/CCW-Logo.png';
import image1 from '../assets/FreshSight.png';
import image2 from '../assets/TitanEdge.png';
import image3 from '../assets/DreamGlaze.png';
import image4 from '../assets/DreamGlaze.png';
import image5 from '../assets/TitanEdge.png';
import image6 from '../assets/DreamGlaze.png';

export function Overlay() {
    const snap = useSnapshot(state)
    const _gl = useSnapshot(gl)
    const handleMusic = (bool) => {
        gl.music = bool
    }
    const transition = { type: 'spring', duration: 0.8 }
    const config = {
        initial: { opacity: 0, transition: { ...transition, delay: 0.5 } },
        animate: { opacity: 1, transition: { ...transition, delay: 0 } },
        exit: { opacity: 0, transition: { ...transition, delay: 0 } }
    }
    const products = [
        { id: 1, image: image1, comp: "pro1", name: 'FreshSight Series' },
        { id: 2, image: image2, comp: "pro1", name: 'DreamGlaze' },
        { id: 3, image: image3, comp: "pro1", name: 'Impervia By Pella' },
        { id: 4, image: image4, comp: "pro1", name: 'Lifestyle By Pella' },
        { id: 5, image: image5, comp: "pro1", name: 'SolidView Series' },
        { id: 6, image: image6, comp: "pro1", name: 'TitanEdge' },
    ];

    return (
        <>
            <AnimatePresence>
                {snap.intro ? (
                    <motion.section key="main" {...config} className="absolute top-0 left-0 w-full min-h-full flex flex-col items-center justify-center bg-[#FDFFFF]">
                        <div className="h-20 md:h-32 w-96 overflow-hidden px-5 py-4 md:py-8">
                            <img src={logo} alt="Logo" className="h-full w-full object-contain" />
                        </div>
                        <div className="mb-3 md:mb-8 text-center">
                            <h1 className="text-2xl md:text-5xl font-extrabold tracking-tighter">Select Your Window</h1>
                            <p className='text-base font-light tracking-tighter'>Enhance your home's aesthetics</p>
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 p-10 overflow-hidden">
                            {products.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ y: 100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 100, opacity: 0 }}
                                    whileHover={{ scale: 1.25 }}
                                    transition={{
                                        type: 'spring',
                                        damping: 20,
                                        stiffness: 100,
                                        duration: 0.6,
                                        delayChildren: 0.2,
                                    }}
                                    className="flex flex-col items-center cursor-pointer"
                                    onClick={() => {
                                        state.intro = false;
                                        state.window = product.id;
                                        playClick();
                                    }}
                                >
                                    <div className="h-10 md:h-32 w-auto overflow-hidden">
                                        <img src={product.image} alt={product.name} className="h-full w-full object-contain" />
                                    </div>
                                    <p className="text-center mt-0 md:mt-5 font-semibold">{product.name}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                ) : (
                    <motion.section key="custom" {...config}>
                        <Customizer />
                    </motion.section>
                )}
            </AnimatePresence>




        </>
    )
}

function Customizer() {
    const _snap = useSnapshot(state)
    const _gl = useSnapshot(gl)
    const handleMusic = (bool) => {
        gl.music = bool
    }
    return (
        <div className="customizer bg-[#FDFFFF]">
            <div className="absolute top-[40px] left-[30px] h-20 w-64 overflow-hidden">
                <img src={logo} alt="Logo" className="h-full w-full object-contain" />
            </div>
            <div className="bg-options">
                {_gl.bgStyle == 'flats' ?
                    (
                        _snap.colors.map((color) => (
                            <div key={color} className="circle" style={{ background: color }} onClick={() => { state.color = color; playClick() }}></div>
                        ))
                    ) : <ListSkys />
                }
            </div>
            <div className="matt-options right-5 sm:right-36">
                {_snap.matcodes.map((mat, index) => (
                    <div key={mat} className="circle m-2" style={{ background: mat }} onClick={() => { state.mat = mat; playClick() }}>
                        <p className='ml-10 hidden sm:block'>{_snap.mats[index]}</p>
                    </div>
                ))}
            </div>
            <div className="absolute left-[20px] bottom-1/2">
                <div className="flex flex-col gap-5">
                    <button className="cursor-pointer text-xs rounded-md px-1 py-5 bg-white bg-opacity-65 hover:bg-black hover:text-white ease-in-out transition-all duration-200"
                        onClick={() => (state.anims[0] = !state.anims[0], playSlide())}>
                        {/* <img src={'three2_thumb.png'} alt="brand" /> */}
                        <p className='uppercase vert--text'>Slides</p>
                    </button>
                    <button className="cursor-pointer text-xs  rounded-md px-1 py-5 bg-white bg-opacity-65 hover:bg-black hover:text-white ease-in-out transition-all duration-200"
                        onClick={() => (state.anims[1] = !state.anims[1], playSlide())}>
                        {/* <img src={'three2_thumb.png'} alt="brand" /> */}
                        <p className='uppercase vert--text'>Tilts</p>
                    </button>

                </div>
            </div>
            <div className="absolute right-[50px] bottom-[40px]">
                <div className="flex flex-col md:flex-row gap-0 md:gap-3">
                    <ListGrid />
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
                onClick={() => (state.intro = true, playClick(), handleMusic(false))}>
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

function ListGrid() {
    const _snap = useSnapshot(state)
    const handleChange = (value) => {
        state.gridOption = _snap.gridOptions[value]
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
                    className="absolute bottom-10 z-10 mt-1 w-full overflow-auto rounded-md bg-white bg-opacity-65 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
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
    const _win = useSnapshot(state)
    const handleChange = (value) => {
        state.gridStyle = _win.gridStyles[value]
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
                    className="absolute bottom-10 z-10 mt-1 w-full overflow-auto rounded-md bg-white bg-opacity-65 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
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