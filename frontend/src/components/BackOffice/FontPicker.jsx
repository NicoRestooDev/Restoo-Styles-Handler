import {useState, useEffect} from "react"

export default function FontPicker({selectedFont, setSelectedFont, setError}){
    const [query, setQuery] = useState("")
    const [fonts, setFonts] = useState([])
    const [loading, setLoading] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState(0)

    const [isOpen, setIsOpen] = useState(false)

    const API_KEY= import.meta.env.VITE_GOOGLE_FONTS_API_KEY
    const MAX_RESULTS = 5

    

    useEffect(()=>{
        const fetchFonts = async () => {
            setLoading(true)
            const res = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}`)
            const data = await res.json()
            setFonts(data.items)
            setLoading(false)
        }
        fetchFonts()
        

    },[])

    

    const filteredFonts = fonts.filter(
        font => font.family.toLowerCase().includes(query.toLowerCase())
    )

    useEffect(() => {
        if(query && filteredFonts.length === 0){
            setIsOpen(false)
            setError(prev => ({...prev, font: "No se encontró la fuente"}))
        } else {
            setError(prev => ({...prev, font: ""}))
        }
    },[query])

    useEffect(() => {
            setHighlightedIndex(0)
    }, [query])

    function handleFontClick(font){
        setSelectedFont(font)
        setQuery(font.family)
        setIsOpen(false)
    }
  
    return(
        <div>
            {/*MODELOS TIPOGRÁFICOS*/} 
            <h1 style={{fontFamily:selectedFont.family}}>Lorem ipsum dolor sit amet</h1>
            <h2 style={{fontFamily:selectedFont.family}}>Lorem ipsum dolor sit amet</h2>
            <h3 style={{fontFamily:selectedFont.family}}>Lorem ipsum dolor sit amet</h3>
            <p style={{fontFamily:selectedFont.family}}>Lorem ipsum dolor sit amet</p>

            <h3>Busca una tipografía:</h3>
            <input
                type="text"
                placeholder="Ej: Roboto"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value)
                    setIsOpen(true)
                }}
                onKeyDown={(e) => {
                    if(!isOpen) return
                    if(e.key === "ArrowDown"){
                        setHighlightedIndex((prev) => {
                            return prev < MAX_RESULTS - 1 ? prev + 1 : prev
                        })
                        e.preventDefault()
                    }else if(e.key === "ArrowUp"){
                        setHighlightedIndex((prev) => {
                            return prev > 0 ? prev - 1 : 0
                        })
                        e.preventDefault()
                    }else if(e.key === "Enter" && isOpen){
                        e.preventDefault()
                        if(filteredFonts[highlightedIndex]) {
                            return handleFontClick(filteredFonts[highlightedIndex])
                        }
                        
                    }else if(e.key === "Escape"){
                        return setIsOpen(false)
                    }

                }
            }
            />
            {isOpen && (
                <div
                    style={{
                        position:"absolute",
                        left:0,
                        right:0,
                        border:"1px solid #ccc",
                        background:"#fff",
                        maxHeight:"150px",
                        overflowY: "auto",
                        zIndex:1000
                    }}
                    >
                        {filteredFonts.slice(0, MAX_RESULTS).map((font, index) => {
                            return(
                                <div
                                    key={`${font.family}-${font.version}`}
                                    style={{padding:"5px", cursor:"pointer", background:index=== highlightedIndex ? "#eee" : "#fff"}}
                                    onClick={() => handleFontClick(font)}
                                >
                                    {font.family}
                                </div>
                            )
                            }
                        )}
                    </div>
            )}
        </div>
    )
}