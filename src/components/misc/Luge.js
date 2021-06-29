import React,{useRef,useState,useEffect} from "react"
import luge from '@waaark/luge'
export default function Luge({location,children}) {
    const mainContainerRef = useRef()
    let [isLoading,setIsLoading] = useState(true)
    useEffect(() => {
        if(isLoading){
            window.setTimeout(()=>{
              luge.lifecycle.refresh()
              setIsLoading(false)
            },2000)
          }
    }, [location,isLoading])
    return (
        <div data-scroll-container ref={mainContainerRef} data-lg-smooth>
          {children}
        </div>
    )
}