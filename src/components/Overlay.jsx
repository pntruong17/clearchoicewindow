import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { AiFillCamera, AiOutlineArrowLeft, AiFillSound, AiFillMuted } from 'react-icons/ai'
import { useSnapshot } from 'valtio'
import { playClick, playSlide } from '../SoundFx'
import { gl } from '../global'
import { state } from './store'
import Customizer from './Customizer'

import logo from '../assets/CCW-Logo.png';
import logo2 from '../assets/fa.png'
import image1 from '../assets/FreshSight.png';
import image2 from '../assets/TitanEdge.png';
import image3 from '../assets/DreamGlaze.png';
import image4 from '../assets/DreamGlaze.png';
import image5 from '../assets/TitanEdge.png';
import image6 from '../assets/DreamGlaze.png';

export function Overlay() {

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
        { id: 0, image: image1, comp: "pro1", name: 'FreshSight Series' },
        { id: 1, image: image2, comp: "pro1", name: 'DreamGlaze' },
        { id: 2, image: image3, comp: "pro1", name: 'Impervia By Pella' },
        { id: 3, image: image4, comp: "pro1", name: 'Lifestyle By Pella' },
        { id: 4, image: image5, comp: "pro1", name: 'SolidView Series' },
        { id: 5, image: image6, comp: "pro1", name: 'TitanEdge' },
    ];

    return (
        <>
            <AnimatePresence>
                {_gl.intro ? (
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
                                        gl.intro = false;
                                        gl.window = index;
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

