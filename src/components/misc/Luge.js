import React,{useRef,useState,useEffect} from "react"
export default function Luge({location,children}) {
    const mainContainerRef = useRef()
    let [isLoading,setIsLoading] = useState(true)
    let [lugeModule,setLuge] = useState(null)
    useEffect(()=>{
      console.log('INIT')
      import("@waaark/luge")
      .then((luge) => {
        setLuge(luge)
      })
      .catch((error) => console.error(error));
    },[mainContainerRef])
    useEffect(() => {
        if(isLoading){
            window.setTimeout(()=>{
              if(lugeModule!= null){
                console.log(lugeModule)
                lugeModule.default.lifecycle.refresh()
                setIsLoading(false)
              }
            },2000)
          }
    }, [location,isLoading,lugeModule])
    return (
        <div data-scroll-container ref={mainContainerRef} data-lg-smooth>
          {children}
        </div>
    )
}