import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import ShowXqq from "../component/show_xqq/show_xqq.jsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/ShowXqq">
                <ShowXqq/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews
