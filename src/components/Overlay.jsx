//import { Logo } from '@pmndrs/branding'
import { motion, AnimatePresence } from 'framer-motion'
import { AiFillCamera, AiOutlineArrowLeft, AiOutlineHighlight, AiOutlineShopping } from 'react-icons/ai'
import { useSnapshot } from 'valtio'
import { state } from '../store'

import logo from '../assets/CCW-Logo1.png'; // Đảm bảo bạn có tệp logo trong thư mục assets
import image1 from '../assets/FreshSight.png'; // Thay thế bằng đường dẫn thực tế của bạn
import image2 from '../assets/TitanEdge.png';
import image3 from '../assets/DreamGlaze.png';
import image4 from '../assets/DreamGlaze.png';
import image5 from '../assets/TitanEdge.png';
import image6 from '../assets/DreamGlaze.png';

export function Overlay() {
    const snap = useSnapshot(state)
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
                        <div className="h-24 md:h-32 w-96 overflow-hidden px-5 py-4 md:py-8">
                            <img src={logo} alt="Logo" className="h-full w-full object-contain" />
                        </div>
                        <div className="mb-3 md:mb-8 text-center">
                            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tighter">Select Your Window</h1>
                            <p className='text-base font-light tracking-tighter'>Enhance your home's aesthetics</p>
                        </div>
                        <div className="grid md:grid-cols-6 gap-4 p-10">
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
                                    onClick={() => { state.intro = false; state.window = product.id }}
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
    const snap = useSnapshot(state)
    return (
        <div className="flex flex-col items-center justify-center h-full w-full mb-6 bg-[#FDFFFF]">
            <div className="absolute top-[40px] left-[30px] h-20 w-64 overflow-hidden">
                <img src={logo} alt="Logo" className="h-full w-full object-contain" />
            </div>
            <div className="absolute bottom-[40px] flex gap-2.5 mb-5">
                {snap.colors.map((color) => (
                    <div key={color} className="circle" style={{ background: color }} onClick={() => (state.color = color)}></div>
                ))}
            </div>
            <div className="matt-options">
                {snap.matcodes.map((mat, index) => (
                    <div key={mat} className="circle m-2" style={{ background: mat }} onClick={() => (state.mat = mat, console.log(mat))}>
                        <p className='ml-10'>{snap.mats[index]}</p>
                    </div>
                ))}
            </div>
            <div className="absolute left-[50px] bottom-[40px]">
                <div className="flex gap-5">
                    <div className="slide--button" onClick={() => (state.anims[0] = !state.anims[0])}>
                        {/* <img src={'three2_thumb.png'} alt="brand" /> */}
                        <p>Slides</p>
                    </div>
                    <div className="slide--button" onClick={() => (state.anims[1] = !state.anims[1])}>
                        {/* <img src={'three2_thumb.png'} alt="brand" /> */}
                        <p>Tilts</p>
                    </div>
                </div>
            </div>
            <div className="absolute right-[50px] bottom-[40px]">
                <div className="flex gap-5">
                    <div className="slide--button" onClick={() => (state.grid = true)}>
                        {/* <img src={'three2_thumb.png'} alt="brand" /> */}
                        <p>Grid</p>
                    </div>
                    <div className="slide--button" onClick={() => (state.grid = false)}>
                        {/* <img src={'three2_thumb.png'} alt="brand" /> */}
                        <p>No Grid</p>
                    </div>
                </div>
            </div>
            <button
                className="absolute top-[40px] right-[30px] back--button"
                style={{ background: snap.color }}
                onClick={() => {
                    const link = document.createElement('a')
                    link.setAttribute('download', 'canvas.png')
                    link.setAttribute('href', document.querySelector('canvas').toDataURL('image/png').replace('image/png', 'image/octet-stream'))
                    link.click()
                }}>
                DOWNLOAD
                <AiFillCamera size="1.3em" />
            </button>
            <button className="absolute top-[40px] right-[160px] back--button" style={{ background: snap.color }} onClick={() => (state.intro = true)}>
                GO BACK
                <AiOutlineArrowLeft size="1.3em" />
            </button>
        </div>
    )
}
