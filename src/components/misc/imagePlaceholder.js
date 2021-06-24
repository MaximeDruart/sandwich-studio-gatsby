import React, {useState} from "react"
import styled from "styled-components"

const StyledImage = styled.div`
  ${props => props.absolute ? "position:absolute;" : null}
  width: ${props => props.iWidth};
  height: ${props => props.iHeight};
  ${props => props.ratio ? "aspect-ratio:"+props.ratio+";" : null}
  display: flex;
  justify-content: center;
  overflow: hidden;
  align-items: center;
    .placeholder{
      width: ${props => props.iWidth};
      height: ${props => props.iHeight};
      ${props => props.ratio ? "aspect-ratio:"+props.ratio+";" : null}
      background:#1b1b1b;
    }
    img{
      height:100%;
      &.loaded{
        animation: fadeIn linear 0.2s;
      }
    }
    @keyframes fadeIn {
      0% {opacity:0;}
      100% {opacity:1;}
    }
`

const PlaceHolder = ({width,height,absolute,ratio,src}) => {
  let [isLoading,setIsLoading] = useState(true)

  let handleLoad = () =>{
    if(isLoading){
    setIsLoading(false)
    }
  }

  return (
    <StyledImage absolute={absolute} iWidth={width} iHeight={height} ratio={ratio}>
      <img
        src={src}
        alt=""
        onLoad={handleLoad}
        style={isLoading ? {display:"none"} : null}
        className={isLoading ? null : "loaded"}
        onDragStart={(e)=>{e.preventDefault()}}
      >
      </img>
      {isLoading ? (
        <div className="placeholder"></div>
      ) : null}
    </StyledImage>
  )
}

export default PlaceHolder
