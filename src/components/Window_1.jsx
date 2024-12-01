
import { FreshSight } from './wd/FreshSight'
import { DreamGraze } from './wd/DreamGraze'
import { SolidView } from './wd/SolidView'
import { TitanEdge } from './wd/TitanEdge'
import { Lifestyle } from './wd/Lifestyle'
import { Impervia } from './wd/Impervia'
import { gl } from '../global'
import { useSnapshot } from 'valtio'

function Window_1(props) {

    const _gl = useSnapshot(gl)

    function pickWindow() {
        switch (_gl.window) {
            case 0:
                return <FreshSight />
            case 1:
                return <DreamGraze />
            case 2:
                return <Impervia />
            case 3:
                return <Lifestyle />
            case 4:
                return <SolidView />
            case 5:
                return <TitanEdge />
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