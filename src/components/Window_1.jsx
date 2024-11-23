
import { FreshSight } from './wd/FreshSight'
import { DreamGlaze } from './wd/DreamGlaze'
import { gl } from '../global'
import { useSnapshot } from 'valtio'
function Window_1(props) {
    const _gl = useSnapshot(gl)

    function pickWindow() {
        switch (_gl.window) {
            case 0:
                return <FreshSight />
            case 1:
                return <DreamGlaze />
            default:
                return <FreshSight />
        }
    }


    return (
        <>
            {pickWindow()}
        </>
    )
}
export default Window_1