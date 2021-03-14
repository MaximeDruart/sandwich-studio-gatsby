import React, { useState, useRef, useEffect, Suspense, useMemo } from "react"
import styled from "styled-components"
import {
  Canvas,
  useFrame,
  useThree,
  extend,
  useLoader,
} from "react-three-fiber"
import * as THREE from "three"
import gsap from "gsap"
import useStore from "../../../store"

import ThreePlugin from "../../../assets/utils/GSAPTHREE"
import {
  Box,
  OrbitControls,
  RoundedBox,
  Shadow,
  useGLTF,
  useProgress,
  useTexture,
} from "drei"
import { HDRCubeTextureLoader } from "three/examples/jsm/loaders/HDRCubeTextureLoader"

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { SSAOPass } from "three/examples/jsm/postprocessing/SSAOPass"
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader"

extend({ EffectComposer, ShaderPass, RenderPass, SSAOPass })
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
  const composer = useRef(null)
  const { scene, gl, size, camera } = useThree()

  useEffect(
    () =>
      void composer.current &&
      composer.current.setSize(size.width, size.height),
    [size, composer]
  )
  useFrame(() => composer.current && composer.current.render(), 1)
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <sSAOPass
        attachArray="passes"
        args={[scene, camera, 1024, 1024]}
        kernelRadius={0.8}
        maxDistance={0.4}
      />
      <shaderPass
        attachArray="passes"
        args={[FXAAShader]}
        material-uniforms-resolution-value={[1 / size.width, 1 / size.height]}
      />
    </effectComposer>
  )
}

const Lights = () => {
  const ref = useRef()
  // useFrame(() => (ref.current.rotation.y = ref.current.rotation.z += 0.01))
  return (
    <group ref={ref}>
      <ambientLight intensity={2} />
      {/* <directionalLight intensity={1.3} position={[30, 30, 50]} /> */}
      {/* <pointLight intensity={5} position={[0, 0, 0]} /> */}
    </group>
  )
}

function Environment({ background = false }) {
  const { gl, scene } = useThree()
  const [cubeMap] = useLoader(
    HDRCubeTextureLoader,
    [["px.hdr", "nx.hdr", "py.hdr", "ny.hdr", "pz.hdr", "nz.hdr"]],
    loader => {
      loader.setDataType(THREE.UnsignedByteType)
      loader.setPath("/hdr/studio/")
    }
  )
  useEffect(() => {
    const gen = new THREE.PMREMGenerator(gl)
    gen.compileEquirectangularShader()
    const hdrCubeRenderTarget = gen.fromCubemap(cubeMap)
    cubeMap.dispose()
    gen.dispose()
    if (background) scene.background = hdrCubeRenderTarget.texture
    scene.environment = hdrCubeRenderTarget.texture
    return () => (scene.environment = scene.background = null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cubeMap])
  return null
}

const tlTopToSide = gsap.timeline({
  paused: true,
  // onStart: () => console.log("starting tl top to side"),
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

const Content = () => {
  const { camera } = useThree()

  const can = useRef()
  const brandedCan = useRef()
  const { nodes } = useGLTF("/models/can2.glb")

  const [pcTexture, mobileTexture, alphaMobileTexture] = useTexture([
    "/images/pc-mockup.jpg",
    "/images/mobile-mockup.png",
    "/images/mobile-mockup-alpha.png",
  ])
  const screens = useRef()
  const mobileScreen = useRef()
  const pcScreen = useRef()

  useEffect(() => {
    if (can.current) {
      /////////// TL TOPTOSIDE
      {
        // move from top view to center focus
        tlTopToSide.addLabel("sync0")
        tlTopToSide.fromTo(
          [can.current],
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
            onUpdate: () => camera.lookAt(0, 0.2, 0),
            duration: 3.6,
          },
          "sync0"
        )
        // move can aside for text
        tlTopToSide.to(
          [can.current, brandedCan.current],
          {
            three: { positionX: 0.3 },
            duration: 1.8,
          },
          "-=0.9"
        )
      }

      /////////// TL BRANDING

      {
        tlBranding.addLabel("sync")
        tlBranding.to(
          [can.current, brandedCan.current],
          {
            three: {
              positionX: -0.2,
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

        tlBranding.to([can.current, brandedCan.current], {
          three: { rotationY: 180, rotationZ: 30, rotationX: 30 },
          duration: 2,
        })
        tlBranding.addLabel("sync2", "-=0.8")
        tlBranding.to(
          can.current.material,
          { opacity: 0, duration: 2 },
          "sync2"
        )
        tlBranding.to(
          brandedCan.current.material,
          { opacity: 1, duration: 2 },
          "sync2"
        )
        tlBranding.to(
          [can.current, brandedCan.current],
          {
            three: { rotationX: 0, rotationY: 0, rotationZ: 0 },
            duration: 2,
          },
          "-=0.7"
        )
      }

      /////////// TL WEBSITE
      {
        tlWebsite.set(screens.current, { visible: true })
        tlWebsite.addLabel("sync")
        tlWebsite.to(
          brandedCan.current,
          {
            three: { positionX: 2.8 },
            duration: 1,
          },
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
      }
    }
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
          <meshStandardMaterial map={pcTexture} attach="material" />
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
      <mesh geometry={nodes.can_2.geometry} ref={can}>
        {/* <meshStandardMaterial roughness={1} color={"grey"} attach="material" /> */}
        <meshStandardMaterial
          transparent
          roughness={0.6}
          metalness={0.5}
          color={new THREE.Color("#1a1a1a")}
          attach="material"
        />
      </mesh>
      {/* branded doy */}
      <mesh geometry={nodes.can_2.geometry} ref={brandedCan}>
        {/* <meshStandardMaterial roughness={1} color={"grey"} attach="material" /> */}
        <meshNormalMaterial transparent opacity={0} />
        <Shadow
          scale={[0.57, 0.57, 0.57]}
          colorStop={0.5}
          opacity={0.05}
          position={[0, -0.02, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          color="white"
        />
      </mesh>
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
      })
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
          <Environment />
          <Lights />

          <Content />
          {/* <OrbitControls /> */}
          <gridHelper />
          {/* <Effects /> */}
        </Suspense>
      </Canvas>
    </StyledCanCanvas>
  )
}

export default CanCanvas
