import React,{useRef,useState,useEffect} from "react"
export default function Loco({children,location}) {
    const mainContainerRef = useRef()
    const [scroll, setScroll] = useState(null)
    useEffect(()=>{
        import("locomotive-scroll").then(LocomotiveScroll => {
        const Loco = LocomotiveScroll.default
        const s = new Loco({
            smooth: true,
            el: mainContainerRef.current,
            tablet: { smooth: true },
            smartphone: { smooth: false },
            reloadOnContextChange: true,
            lerp: 0.07,
        })
        setScroll(s)
        })
        return () => scroll && scroll.destroy()
    },[mainContainerRef])
    useEffect(() => {
        if (scroll) {
        setTimeout(() => {
            scroll.update()
        }, 1200)
        }
    }, [mainContainerRef.current,scroll,location])
    return (
        <div data-scroll-container ref={mainContainerRef}>
            {children}
        </div>
    )
}