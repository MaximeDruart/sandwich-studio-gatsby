import React, { useRef, useEffect, Suspense, useMemo } from "react"
import styled from "styled-components"
import { Canvas, useFrame, useThree, extend } from "react-three-fiber"
import * as THREE from "three"
import SimplexNoise from "simplex-noise"
import gsap from "gsap"
import useStore from "../../../store"

import ThreePlugin from "../../../assets/utils/GSAPTHREE"
import { MeshWobbleMaterial, useCubeTexture, useProgress } from "drei"
import { useMediaQuery } from "react-responsive"

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader"
import { VignetteShader } from "three/examples/jsm/shaders/VignetteShader"
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader"
import { FilmShader } from "three/examples/jsm/shaders/FilmShader"

extend({
  EffectComposer,
  ShaderPass,
  RenderPass,
  UnrealBloomPass,
})

gsap.registerPlugin(ThreePlugin)
const simplex = new SimplexNoise()

const StyledHeroCanvas = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: -1;
  /* z-index: 10000; */
`

const Effects = () => {
  const composer = useRef()
  const { scene, gl, size, camera } = useThree()
  const aspect = useMemo(() => new THREE.Vector2(400, 400), [])
  useEffect(() => void composer.current.setSize(size.width, size.height), [
    size,
  ])
  useFrame(() => composer.current.render(), 1)
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <unrealBloomPass attachArray="passes" args={[aspect, 0.5, 1, 0.8]} />
      <shaderPass
        attachArray="passes"
        args={[FXAAShader]}
        material-uniforms-resolution-value={[1 / size.width, 1 / size.height]}
      />
      <shaderPass attachArray="passes" args={[GammaCorrectionShader]} />
      <shaderPass
        material-uniforms-grayscale={0}
        material-uniforms-sIntensity={0}
        material-uniforms-nIntensity={0.05}
        attachArray="passes"
        args={[FilmShader]}
      />
      <shaderPass
        material-uniforms-darkness-value={1}
        material-uniforms-offset-value={1}
        attachArray="passes"
        args={[VignetteShader]}
      />
    </effectComposer>
  )
}

const Lights = () => {
  const ref = useRef()
  // useFrame(() => (ref.current.rotation.y = ref.current.rotation.z += 0.01))
  return (
    <group ref={ref}>
      {/* <ambientLight intensity={0.45} /> */}
      <directionalLight intensity={0.3} position={[30, 30, 50]} />
      <hemisphereLight args={["#FFB23E", "#4d330e", 0.2]} />
    </group>
  )
}

function Environment({ background = false }) {
  const { gl, scene } = useThree()

  const cubeMap = useCubeTexture(
    ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
    { path: "/3d/environment/" }
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

let scalar = 0.6
const Blob = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" })

  const sphere = useRef()

  // intro animation
  useEffect(() => {
    gsap.fromTo(
      sphere.current,
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

  const clickHandler = () => {
    if (sphere.current.material.factor === 0) {
      const tl = gsap.timeline()
      tl.fromTo(sphere.current.material, { factor: 0 }, { factor: 0.3 })
      tl.to(sphere.current.material, { factor: 0, delay: 0.8 })
    }
  }

  useFrame(({ clock, mouse }) => {
    let time = clock.getElapsedTime() / 5
    const k = 0.8

    // 'lerping' from last scalar value to the next one to create a smooth animation if mousepos changes violently

    scalar = THREE.MathUtils.lerp(
      scalar,
      gsap.utils.clamp(0.2, 0.7, 0.4 / (Math.abs(mouse.x) + Math.abs(mouse.y))),
      0.1
    )

    for (let i = 0; i < sphere.current.geometry.vertices.length; i++) {
      const p = sphere.current.geometry.vertices[i]
      p.normalize().multiplyScalar(
        sphere.current.geometry.parameters.radius +
          (isMobile ? 0.4 : scalar) *
            simplex.noise3D(p.x * k + time, p.y * k + time, p.z * k + time)
      )
    }
    sphere.current.geometry.computeVertexNormals()
    sphere.current.geometry.normalsNeedUpdate = true
    sphere.current.geometry.verticesNeedUpdate = true
  })

  return (
    <mesh onClick={clickHandler} position-y={0} ref={sphere}>
      <sphereGeometry attach="geometry" args={[isMobile ? 1.4 : 2.5, 64, 64]} />

      <MeshWobbleMaterial
        roughness={0}
        metalness={0.3}
        color={"#FFB23E"}
        attach="material"
        factor={0}
        speed={10}
      />
    </mesh>
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

const HeroCanvas = () => {
  return (
    <StyledHeroCanvas className="canvas">
      <Canvas
        shadowMap
        colorManagement
        camera={{ position: [0, 0, 6], far: 15 }}
        onCreated={({ gl }) => {
          gl.setClearColor("#0b0b0b")
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.outputEncoding = THREE.sRGBEncoding
        }}
      >
        <Suspense fallback={<Loader />}>
          <Environment />
          <Lights />
          <Blob />
          <Effects />
        </Suspense>
      </Canvas>
    </StyledHeroCanvas>
  )
}

export default HeroCanvas