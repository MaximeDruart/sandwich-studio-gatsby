import React, { useState, useRef, useEffect, Suspense } from "react"
import styled from "styled-components"
import {
  Canvas,
  useFrame,
  useThree,
  extend,
  useLoader,
} from "react-three-fiber"
import * as THREE from "three"
import SimplexNoise from "simplex-noise"
import gsap from "gsap"
import useStore from "../../../store"

import ThreePlugin from "../../../assets/utils/GSAPTHREE"
import { MeshWobbleMaterial, OrbitControls, useGLTF, useProgress } from "drei"
import { HDRCubeTextureLoader } from "three/examples/jsm/loaders/HDRCubeTextureLoader"

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { SSAOPass } from "three/examples/jsm/postprocessing/SSAOPass"
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader"

extend({ EffectComposer, ShaderPass, RenderPass, SSAOPass })
gsap.registerPlugin(ThreePlugin)
const simplex = new SimplexNoise()

const StyledHeroCanvas = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: -1;
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

const Can = () => {
  const can = useRef()
  const { nodes } = useGLTF("/models/can2.glb")
  console.log(nodes)

  // intro animation
  useEffect(() => {
    gsap.fromTo(
      can.current,
      {
        three: {
          rotationZ: Math.PI * 4,
          scaleX: 0.01,
          scaleY: 0.01,
          scaleZ: 0.01,
        },
      },
      {
        three: { rotationX: 0, scaleX: 1, scaleY: 1, scaleZ: 1 },
        duration: 1,
        delay: 0.8,
      }
    )
  }, [])

  return (
    <>
      <mesh geometry={nodes.can_1.geometry} ref={can}>
        <meshStandardMaterial roughness={1} color={"grey"} attach="material" />
      </mesh>
      <mesh geometry={nodes.can_2.geometry}>
        <meshStandardMaterial roughness={1} color={"grey"} attach="material" />
      </mesh>
    </>
  )
}

const selector = state => state.setCanvasLoadStatus

// const Loader = () => {
//   const setCanvasLoadStatus = useStore(selector)
//   const progress = useProgress(state => state.progress)
//   useEffect(() => {
//     setCanvasLoadStatus({ progress })
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [progress])
//   return null
// }

const HeroCanvas = () => {
  return (
    <StyledHeroCanvas scroll-section className="canvas">
      <Canvas
        shadowMap
        colorManagement
        camera={{ position: [0, 0, 6], far: 15 }}
        onCreated={({ gl }) => {
          //   gl.setClearColor("blue")
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.outputEncoding = THREE.sRGBEncoding
        }}
      >
        <Suspense fallback={null}>
          <Environment />
          <Lights />
          <Can />
          <OrbitControls />
          <gridHelper />
          <Effects />
        </Suspense>
      </Canvas>
    </StyledHeroCanvas>
  )
}

export default HeroCanvas
