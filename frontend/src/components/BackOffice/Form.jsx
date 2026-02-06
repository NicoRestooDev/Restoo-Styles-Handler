import {useState, useEffect} from "react"
import FontPicker from "./FontPicker.jsx"

export default function Form(){
    const [color, setColor] = useState("#ffffff")
    const [image, setImage] = useState(null)
    const [error, setError] = useState({
        color:"",
        image:"",
        font:""
    })
    const [selectedFont, setSelectedFont] = useState({
        family: "Roboto",
        variants: ["100","300","400","500","700","900"],
        subsets: ["latin"]
});

    useEffect(() => {
        if (!selectedFont) return

        const link = document.createElement("link")
        link.rel="stylesheet"
        if(selectedFont.variants && selectedFont.variants.length > 1){
            const variants = selectedFont.variants.find(v => /^\d+$/.test(v)) || "400"
            link.href=`https://fonts.googleapis.com/css2?family=${selectedFont.family.replaceAll(" ","+")}:wght@${variants}&display=swap`
        } else {
            link.href=`https://fonts.googleapis.com/css2?family=${selectedFont.family.replaceAll(" ", "+")}&display=swap`
        }
        
        link.id="dynamic-font"

        const existingLink = document.getElementById("dynamic-font")
        if(existingLink){
            existingLink.remove()
        }

        document.head.appendChild(link)

        return () => {
            link.remove()
        }
    }, [selectedFont])

    const handleSubmit = (e) => {
        e.preventDefault();

        const stylesFormData = new FormData()
        stylesFormData.append("color", color)
        if(image) stylesFormData.append("image", image)
        if(selectedFont) stylesFormData.append("font", selectedFont)

        console.log(color, image, selectedFont)
    }

    const handleTextColorChange = (e) => {
        const value = e.target.value
        setColor(value)
        if (/^#([0-9A-F]{5})$/i.test(value)) {
            setColor(value)
        }
    }
        return(
            <form onSubmit={handleSubmit}>
                <h1>This is a form</h1>
                <div>
                    <label>Color de fondo:</label>
                    <input
                        type="color"
                        value={color}
                        onChange={(e)=>setColor(e.target.value)}
                    >
                    </input>
                    <input 
                        type="text"
                        placeholder="Ej: #ffffff"
                        value={color}
                        onChange={handleTextColorChange}
                    >
                    </input>
                </div>
                
                <div>
                    <label>Subir imagen:</label>
                    <input
                        type="file"
                        onChange={(e) => {
                            const file = e.target.files[0]
                            
                            setImage(file)

                        }
                    }
                    >
                    </input>
                </div>

                <FontPicker selectedFont={selectedFont} setSelectedFont={setSelectedFont}/>
                <button type="submit">Botong</button>
            </form>
        )
}
