import {useState, useEffect} from "react"
import FontPicker from "./FontPicker.jsx"

export default function Form(){
    const [color, setColor] = useState("#ffffff")
    const [image, setImage] = useState(null)
    const [fieldErrors, setFieldErrors] = useState({}) //{color: "...", image: "...", font: "..."}
    const [formError, setFormError] = useState(null) // string | null
    const [submitResult, setSubmitResult] = useState(null) // string | null
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [selectedFont, setSelectedFont] = useState({
        family: "Roboto",
        variants: ["100","300","400","500","700","900"],
        subsets: ["latin"]
    });
    
    const [imagePreview, setImagePreview] = useState("")

        useEffect(() => {
        const loadStyles = async () => {
            setIsLoading(true)
            setFormError(null)

            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/styles`, {
                    headers: {Accept: "application/json"},
                })

                const data = await res.json().catch(() => ({}))

                if (!res.ok) {
                    setFormError(data.message ?? "Error al cargar estilos")
                    return
                }

                setColor(data.color || "#ffffff")

                if (data.font){
                    setSelectedFont({
                        family: data.font ?? "Roboto",
                        variants: ["400"],
                        subsets: ["latin"]
                    });

                }

                setImagePreview(data.image_url || "")
                setImage(null)
            }catch (error){
                setFormError("No se pudo cargar la configuración")
            }finally {
                setIsLoading(false)
            }
            
        }

        loadStyles()
    }, [])

    useEffect(() => {
        if(!selectedFont){
        setFieldErrors(prev => ({...prev, font: "Por favor selecciona una tipografía válida."}))
        return
        } else {
        setFieldErrors(prev => ({...prev, font: ""}))
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

    // AQUÍ IRAN LOS HELPERS mapLaravelFieldErrors y clearFieldErrors
    const mapLaravelFieldErrors = (errorsObj) => {
        // errorsObj = { color: ["msg], image :["msg1", "msg2"]}
        if(!errorsObj || typeof errorsObj !== "object") return {}
        return Object.fromEntries(
            Object.entries(errorsObj).map(([k, arr]) => [k, Array.isArray(arr) ? arr[0] : String(arr)])
        )
    }

    const clearFieldErrors = (field) => {
        setFieldErrors (prev => {
            if(!prev?.[field]) return prev
            const next = {...prev}
            delete next[field]
            return next
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        //1. Reset de mensajes (cada intento es como una partida nueva)
        setSubmitResult (null)
        setFormError (null)
        setFieldErrors ({})

        //2. Validación mínima frontend
        const localErrors = {}
        if(!selectedFont?.family) localErrors.font = "Por favor, selecciona una tipografía válida."
        if(!color || !/^#[0-9A-Fa-f]{6}$/.test(color)) localErrors.color = "Color inválido. Ej: #ff0000"

        if(image){
            if(!image.type.startsWith("image/")) localErrors.image = "Archivo no válido. Por favor, selecciona una imagen."
            if(image.size > 512*1024) localErrors.image = "La imagen supera el tamaño máximo permitido (512kB)"
        }

        if(Object.keys(localErrors).length > 0){
            setFieldErrors(localErrors)
            return
        }

        // 3. Construir formData
        const stylesFormData = new FormData()
        stylesFormData.append("color", color)
        if(image) stylesFormData.append("image", image)
        if(selectedFont) stylesFormData.append("font", selectedFont.family)
        
        //4. Submit
        setIsSubmitting(true)
        console.log("IMAGE STATE", image);
        console.log("FORMDATA image", stylesFormData.get("image"));
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/styles`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
                body: stylesFormData,
            })

            const data = await res.json().catch(() => ({}))
            
            if (res.status === 422) {
                setFieldErrors(mapLaravelFieldErrors(data.errors))
                return
            }

            if (!res.ok) {
                setFormError(data.message ?? "Error interno del servidor")
                return
            }

            setSubmitResult(data.message ?? "¡Estilos guardados exitosamente!")

            if(data.color) setColor(data.color)
            if(data.font){
                setSelectedFont(prev => ({...prev, family: data.font}))
            }
            if(data.image_url) {
                setImagePreview((prev) => {
                    if(prev && prev.startsWith("blob:")) URL.revokeObjectURL(prev)
                    return data.image_url
                })
                setImage(null)
            }
        } catch (err) {
            setSubmitResult("Error de red")
        } finally {
            setIsSubmitting(false)
        }
        
    }

    const handleTextColorChange = (e) => {
        const value = e.target.value
        setColor(value)
        clearFieldErrors("color")

        if(value && !/^#[0-9A-Fa-f]{6}$/.test(value)){
            setFieldErrors((prev) => ({...prev, color: "Color inválido. Ej: #ff0000"}))
        }
    }

    

        return(
            <form onSubmit={handleSubmit}>
                {formError && <p style={{color:"red"}}>{formError}</p>}
                <h1>This is a form</h1>
                <div>
                    <label>Color de fondo:</label>
                    <input
                        type="color"
                        value={color}
                        onChange={(e)=>{
                            setColor(e.target.value)
                            clearFieldErrors("color")
                        }}
                    >
                    </input>
                    <input 
                        type="text"
                        placeholder="Ej: #ffffff"
                        value={color}
                        onChange={handleTextColorChange}
                    >
                    </input>
                    {fieldErrors.color && <p style={{color:"red"}}>{fieldErrors.color}</p>}
                </div>
                
                <div>
                    <label>Subir imagen:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0]

                            if (!file) return
                            clearFieldErrors("image")

                            if (!file.type.startsWith("image/")){
                                setFieldErrors(prev => ({...prev, image: "Archivo no válido. Por favor, selecciona una imagen."}))
                                setImage(null)
                                setImagePreview(null)
                                return
                            }

                            if(file.size > 512*1024){
                                setFieldErrors(prev => ({...prev, image: "La imagen supera el tamaño máximo permitido (512kB)"}))
                                setImage(null)
                                setImagePreview(null)
                                return
                            }

                            setImage(file)
                            
                            setImagePreview((prev) => {
                                if(prev) URL.revokeObjectURL(prev)
                                return URL.createObjectURL(file)
                            })
                        }
                    }
                    >
                    </input>
                    {fieldErrors.image && <p style={{color:"red"}}>{fieldErrors.image}</p>}
                    {imagePreview && <img src={imagePreview} style={{height:"200px", border:"1px solid black"}}/>}
                </div>

                <FontPicker selectedFont={selectedFont} setSelectedFont={setSelectedFont}/>
                {fieldErrors.font && <p style={{color:"red"}}>{fieldErrors.font}</p>}
                <button type="submit">Botong</button>
                {submitResult && <p style={{color:"green"}}>{submitResult}</p>}
            </form>
        )
}
