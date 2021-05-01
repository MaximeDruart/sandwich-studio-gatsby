import React, { useRef, useEffect, Suspense, useMemo } from "react"
import styled from "styled-components"
import { Canvas, useThree, useFrame, extend } from "react-three-fiber"
import * as THREE from "three"
import gsap from "gsap"
import useStore from "../../../store"

import ThreePlugin from "../../../assets/utils/GSAPTHREE"
import { Shadow, useProgress, useTexture, useFBX } from "drei"
import { useMediaQuery } from "react-responsive"

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader"
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader"

extend({
  EffectComposer,
  ShaderPass,
  RenderPass,
  UnrealBloomPass,
})

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

const Effects = () => {
  const composer = useRef()
  const { scene, gl, size, camera } = useThree()
  useEffect(() => void composer.current.setSize(size.width, size.height), [
    size,
  ])
  useFrame(() => composer.current.render(), 1)
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <shaderPass
        attachArray="passes"
        args={[FXAAShader]}
        material-uniforms-resolution-value={[1 / size.width, 1 / size.height]}
      />
      <shaderPass attachArray="passes" args={[GammaCorrectionShader]} />
    </effectComposer>
  )
}

const Lights = () => {
  const ref = useRef()
  return (
    <group ref={ref}>
      <ambientLight intensity={1.4} />
      <directionalLight intensity={0.7} position={[30, 30, 50]} />
    </group>
  )
}

const tlTopToSide = gsap.timeline({
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
    doyBrandedDiffuse,
    doyNormal,
    pcTexture,
    mobileTexture,
    alphaMobileTexture,
  ] = useTexture([
    "/3d/maps/doy-branded-diffuse.jpg",
    "/3d/maps/doy-normal.jpg",
    "/images/pc-mockup.jpg",
    "/images/mobile-mockup.jpg",
    "/images/mobile-mockup-alpha.png",
  ])

  doyBrandedDiffuse.magFilter = THREE.LinearFilter
  doyBrandedDiffuse.minFilter = THREE.LinearFilter
  mobileTexture.magFilter = THREE.LinearFilter
  mobileTexture.minFilter = THREE.LinearFilter
  pcTexture.magFilter = THREE.LinearFilter
  pcTexture.minFilter = THREE.LinearFilter
  const screens = useRef()
  const mobileScreen = useRef()
  const pcScreen = useRef()

  const isMobile = useMediaQuery({ query: "(max-width: 600px)" })

  const baseMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        roughness: 0.3,
        metalness: 0.6,
        transparent: true,
        color: "#1f1f1f",
        normalMap: doyNormal,
        normalScale: new THREE.Vector2(1, 1),
      }),
    [doyNormal]
  )
  const brandedMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        roughness: 0.45,
        metalness: 0.6,
        transparent: true,
        opacity: 0,
        map: doyBrandedDiffuse,
        normalMap: doyNormal,
        normalScale: new THREE.Vector2(1, 1),
      }),
    [doyBrandedDiffuse, doyNormal]
  )

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
      tlTopToSide.addLabel("sync", "-=1.7")

      tlTopToSide.to(
        cans.current,
        {
          three: { positionX: isMobile ? 0 : 0.3 },
          duration: 2.8,
        },
        "sync"
      )

      tlTopToSide.to(
        camera,
        {
          three: {
            positionY: 0.25,
            positionZ: 0.7,
            rotationX: 0,
          },

          duration: 3,
        },
        "sync"
      )

      tlTopToSide.to(cans.current, {
        three: { rotationY: 360 },
        duration: 4,
      })

      tlTopToSide.to(
        brandedCan.current.material,
        { opacity: 1, duration: 2 },
        "-=3.2"
      )
      tlTopToSide.set(can.current.material, { opacity: 0 })

      tlTopToSide.to(
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

      tlWebsite.addLabel("sync")
      tlWebsite.to(
        brandedCan.current,
        {
          three: { positionX: isMobile ? 2.7 : 2.4, rotationZ: -90 },
          duration: 1,
          onUpdate: () => {
            if (!screens.current.visible)
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

    return () => {
      tlTopToSide.kill()
      tlWebsite.kill()
      tlFinal.kill()
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
          // onBeforeRender={gl => gl.clearDepth()}
          material={baseMat}
        />
        <mesh
          {...doy.children[0]}
          ref={brandedCan}
          scale={[2.4, 2.4, 2.4]}
          material={brandedMat}
          // https://stackoverflow.com/questions/45761324/animate-between-two-materials-on-a-mesh-three-js
          // onBeforeRender={gl => gl.clearDepth()}
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
  const { loaded, total, errors } = useProgress(state => state)
  useEffect(() => {
    setCanvasLoadStatus({ loaded, total, errors })
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
          <Effects />
        </Suspense>
      </Canvas>
    </StyledCanCanvas>
  )
}

export default CanCanvas
