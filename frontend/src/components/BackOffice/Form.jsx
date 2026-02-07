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
    const [submitResult, setSubmitResult] = useState("")

    useEffect(() => {
        if(!selectedFont){
        setError(prev => ({...prev, font: "Por favor selecciona una tipografía válida."}))
        return
        } else {
        setError(prev => ({...prev, font: ""}))
        }

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        let hasError = false

            // Validación de tipografía
    if (!selectedFont) {
        setError(prev => ({ ...prev, font: "Por favor selecciona una tipografía válida." }));
        hasError = true;
    }

    // Validación de color
    if (!color || !/^#([0-9A-F]{6})$/i.test(color)) {
        setError(prev => ({ ...prev, color: "Color inválido. Debe ser un hexadecimal de 6 dígitos, ej: #ff0000." }));
        hasError = true;
    } else {
        setError(prev => ({ ...prev, color: "" }));
    }

    // Validación de imagen
    if (image && !image.type.startsWith("image/")) {
        setError(prev => ({ ...prev, image: "Archivo no válido. Debe ser una imagen." }));
        hasError = true;
    } else {
        setError(prev => ({ ...prev, image: "" }));
    }

    if (hasError) return; // corta el submit si hay errores

        const stylesFormData = new FormData()
        stylesFormData.append("color", color)
        if(image) stylesFormData.append("image", image)
        if(selectedFont) stylesFormData.append("font", selectedFont.family)
        
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/styles`, {
                method: "POST",
                body: stylesFormData,
            })

            if (!res.ok) {
                const errorData = await res.json()
                setError(errorData)
                setSubmitResult("Error al guardar")
            }

            const data = await res.json()
            setSubmitResult("Guardado exitosamente")
        } catch (err) {
            setSubmitResult("Error de red")
        }
        
    }

    const handleTextColorChange = (e) => {
        const value = e.target.value
        setColor(value)
        if (/^#([0-9A-F]{5})$/i.test(value)) {
            setColor(value)
            setError(prev => ({...prev, color: ""}))
        } else {
            setError(prev => ({...prev, color: "Color inválido. Debe ser un código hexadecimal de 6 dígitos, por ejemplo: #ff0000"}))
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
                    {error.color && <p style={{color:"red"}}>{error.color}</p>}
                </div>
                
                <div>
                    <label>Subir imagen:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0]

                            if (!file) return
                            if (!file.type.startsWith("image/")){
                                setError(prev => ({...prev, image: "Archivo no válido. Por favor, selecciona una imagen."}))
                            }
                            
                            setImage(file)
                            setError(prev => ({...prev, image: ""}))
                        }
                    }
                    >
                    </input>
                    {error.image && <p style={{color:"red"}}>{error.image}</p>}
                </div>

                <FontPicker selectedFont={selectedFont} setSelectedFont={setSelectedFont} setError={setError}/>
                {error.font && <p style={{color:"red"}}>{error.font}</p>}
                <button type="submit">Botong</button>
                {submitResult && <p>{submitResult}</p>}
            </form>
        )
}
