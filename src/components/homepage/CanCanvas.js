import React, { useRef, useEffect, Suspense } from "react"
import styled from "styled-components"
import { Canvas, useThree } from "react-three-fiber"
import * as THREE from "three"
import gsap from "gsap"
import useStore from "../../../store"

import ThreePlugin from "../../../assets/utils/GSAPTHREE"
import { Shadow, useProgress, useTexture, useFBX } from "drei"
import { useMediaQuery } from "react-responsive"

gsap.registerPlugin(ThreePlugin)

const StyledCanCanvas = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: -1;
  position: fixed;
  top: 0;
  left: 0;
  /* z-index: 10000; */
`

const Lights = () => {
  const ref = useRef()
  return (
    <group ref={ref}>
      <ambientLight intensity={2} />
      <directionalLight intensity={1.3} position={[30, 30, 50]} />
    </group>
  )
}

const tlTopToSide = gsap.timeline({
  paused: true,
  defaults: { ease: "Power2.easeInOut" },
})
const tlBranding = gsap.timeline({
  paused: true,
  defaults: { ease: "Power2.easeInOut" },
})
const tlWebsite = gsap.timeline({
  paused: true,
  defaults: { ease: "Power2.easeInOut" },
})
const tlFinal = gsap.timeline({
  paused: true,
  defaults: { ease: "Power2.easeInOut", duration: 1 },
})

const Content = () => {
  const { camera } = useThree()

  const can = useRef()
  const brandedCan = useRef()
  const cans = useRef()
  const shadow = useRef()

  const doy = useFBX("/3d/models/doy.fbx")

  const [
    doyDiffuse,
    doyBrandedDiffuse,
    doyNormal,
    pcTexture,
    mobileTexture,
    alphaMobileTexture,
  ] = useTexture([
    "/3d/maps/doy-diffuse.png",
    "/3d/maps/doy-branded-diffuse.png",
    "/3d/maps/doy-normal.png",
    "/images/pc-mockup.jpg",
    "/images/mobile-mockup.png",
    "/images/mobile-mockup-alpha.png",
  ])
  const screens = useRef()
  const mobileScreen = useRef()
  const pcScreen = useRef()

  const isMobile = useMediaQuery({ query: "(max-width: 600px)" })

  useEffect(() => {
    if (can.current) {
      /////////// TL TOPTOSIDE

      // move from top view to center focus
      tlTopToSide.addLabel("sync0")
      tlTopToSide.fromTo(
        cans.current,
        {
          three: { scaleX: 0.0001, scaleY: 0.0001, scaleZ: 0.0001 },
        },
        { three: { scaleX: 1, scaleY: 1, scaleZ: 1 }, duration: 1.9 },
        "sync0"
      )
      tlTopToSide.fromTo(
        [can.current.material],
        { opacity: 0 },
        { opacity: 1, duration: 1.9 },
        "sync0"
      )
      tlTopToSide.to(
        camera,
        {
          three: {
            positionY: 0.5,
            positionZ: 0.7,
          },
          onUpdate: () => camera.lookAt(0, 0.28, 0),
          duration: 3.6,
        },
        "sync0"
      )
      tlTopToSide.fromTo(
        shadow.current,
        {
          three: {
            scaleX: 0,
            scaleY: 0,
            scaleZ: 0,
          },
        },
        {
          three: {
            scaleX: 0.4,
            scaleY: 0.4,
            scaleZ: 0.4,
          },
          duration: 3.6,
        },
        "-=2.5"
      )
      // move can aside for text
      tlTopToSide.to(
        cans.current,
        {
          three: { positionX: isMobile ? 0 : 0.3 },
          duration: 1.8,
        },
        "-=0.9"
      )

      /////////// TL BRANDING

      tlBranding.addLabel("sync")
      tlBranding.to(
        cans.current,
        {
          three: {
            positionX: isMobile ? 0 : -0.2,
          },
          duration: 2,
        },
        "sync"
      )
      tlBranding.to(
        camera,
        {
          three: {
            positionY: 0.25,
            positionZ: 0.7,
            rotationX: 0,
          },

          duration: 2,
        },
        "sync"
      )

      // tlBranding.to(cans.current, {
      //   three: { rotationY: 180, rotationZ: 30, rotationX: 30 },
      //   duration: 2,
      // })
      tlBranding.addLabel("sync2", "-=0.8")
      tlBranding.to(can.current.material, { opacity: 0, duration: 1 }, "sync2")
      tlBranding.to(
        can.current,
        { three: { positionY: -1 }, duration: 2 },
        "sync2"
      )
      tlBranding.to(
        shadow.current,
        { three: { scaleX: 0, scaleY: 0, scaleZ: 0 }, duration: 1 },
        "sync2"
      )
      tlBranding.addLabel("sync3", "-=1")

      tlBranding.to(
        brandedCan.current.material,
        { opacity: 1, duration: 2 },
        "sync3"
      )
      tlBranding.fromTo(
        brandedCan.current,
        { three: { positionY: -1 } },
        { three: { positionY: 0 }, duration: 1 },
        "sync3"
      )
      tlBranding.to(
        shadow.current,
        {
          three: { scaleX: 0.4, scaleY: 0.4, scaleZ: 0.4 },
          duration: 1,
          onUpdate: () => {
            if (screens.current.visible)
              gsap.set(screens.current, { visible: false })
          },
        },
        "-=0.2"
      )

      /////////// TL WEBSITE

      // tlWebsite.set(screens.current, { visible: true })
      tlWebsite.addLabel("sync")
      tlWebsite.to(
        brandedCan.current,
        {
          three: { positionX: 2.8, rotationZ: -90 },
          duration: 1,
          onStart: () => {
            gsap.set(screens.current, { visible: true })
          },
        },
        "sync"
      )
      tlWebsite.to(
        shadow.current.material,
        { opacity: 0, duration: 0.6 },
        "sync"
      )
      tlWebsite.to(
        camera,
        {
          three: {
            positionZ: 0.6,
            positionX: 2.05,
            rotationY: -45,
          },
          duration: 1,
        },
        "sync"
      )

      /////////// TL FINAL

      tlFinal.addLabel("sync")
      tlFinal.to(brandedCan.current, { three: { positionY: 1.3 } }, "sync")
      tlFinal.to(brandedCan.current.material, { opacity: 0 }, "sync")
      tlFinal.addLabel("sync2", "-=0.8")
      tlFinal.to(pcScreen.current, { three: { positionY: 1.3 } }, "sync2")
      tlFinal.to(pcScreen.current.material, { opacity: 0 }, "sync2")
      tlFinal.addLabel("sync3", "-=0.8")
      tlFinal.to(mobileScreen.current, { three: { positionY: 1.3 } }, "sync3")
      tlFinal.to(mobileScreen.current.material, { opacity: 0 }, "sync3")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <group
        scale={[0.7, 0.7, 0.7]}
        ref={screens}
        visible={false}
        position={[3, 0.5, 0]}
      >
        <mesh
          ref={pcScreen}
          receiveShadow
          castShadow
          rotation-y={-Math.PI / 2.5}
        >
          <planeBufferGeometry args={[2.207, 1.387]} attach="geometry" />
          <meshStandardMaterial transparent map={pcTexture} attach="material" />
          <mesh
            ref={mobileScreen}
            castShadow
            receiveShadow
            position={[0.4, -0.35, 0.2]}
          >
            <planeBufferGeometry args={[0.621, 1.138]} attach="geometry" />
            <meshStandardMaterial
              transparent
              alphaMap={alphaMobileTexture}
              map={mobileTexture}
              attach="material"
            />
          </mesh>
        </mesh>
      </group>
      {/* normal doy */}
      <group ref={cans}>
        <mesh
          {...doy.children[0]}
          ref={can}
          scale={[2.4, 2.4, 2.4]}
          material={
            new THREE.MeshStandardMaterial({
              roughness: 0.6,
              metalness: 0.6,
              transparent: true,
              color: "#1f1f1f",
              map: doyDiffuse,
              normalMap: doyNormal,
              normalScale: new THREE.Vector2(1, 1),
            })
          }
        />
        <mesh
          {...doy.children[0]}
          ref={brandedCan}
          scale={[2.4, 2.4, 2.4]}
          material={
            new THREE.MeshStandardMaterial({
              transparent: true,
              opacity: 0,
              map: doyBrandedDiffuse,
            })
          }
          material-transparent
          material-opacity={0}
        />
        <Shadow
          ref={shadow}
          scale={[0.4, 0.4, 0.4]}
          colorStop={0.5}
          opacity={0.01}
          position={[0, -0.02, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          color="#fafafa"
        />
      </group>
    </>
  )
}

const selector = state => state.setCanvasLoadStatus

const Loader = () => {
  const setCanvasLoadStatus = useStore(selector)
  const { loaded, total } = useProgress(state => state)
  useEffect(() => {
    setCanvasLoadStatus({ loaded, total })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded])
  return null
}

const CanCanvas = ({ scroll }) => {
  const $canvasWrap = useRef()

  useEffect(() => {
    if (scroll) {
      scroll.on("scroll", _scroll => {
        typeof _scroll.currentElements["tl-top-to-side"] === "object" &&
          tlTopToSide.progress(
            _scroll.currentElements["tl-top-to-side"].progress
          )
        typeof _scroll.currentElements["tl-branding"] === "object" &&
          tlBranding.progress(_scroll.currentElements["tl-branding"].progress)
        typeof _scroll.currentElements["tl-website"] === "object" &&
          tlWebsite.progress(_scroll.currentElements["tl-website"].progress)
        typeof _scroll.currentElements["tl-final"] === "object" &&
          tlFinal.progress(_scroll.currentElements["tl-final"].progress)
      })
    }
    return () => {
      if (scroll) scroll.destroy()
    }
  }, [scroll])

  return (
    <StyledCanCanvas ref={$canvasWrap} className="canvas">
      <Canvas
        // orthographic
        shadowMap
        colorManagement
        camera={{ position: [0, 5, 0], far: 15 }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.outputEncoding = THREE.sRGBEncoding
        }}
      >
        <Suspense fallback={<Loader />}>
          <Lights />

          <Content />
          {/* <OrbitControls /> */}
          {/* <gridHelper /> */}
          {/* <Effects /> */}
        </Suspense>
      </Canvas>
    </StyledCanCanvas>
  )
}

export default CanCanvas
