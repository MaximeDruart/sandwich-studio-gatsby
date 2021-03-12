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
import { MeshWobbleMaterial, OrbitControls, useProgress } from "drei"
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
      <ambientLight intensity={0.45} />
      <directionalLight intensity={1.3} position={[30, 30, 50]} />
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

const Blob = () => {
  const sphere = useRef()
  const [wobbleFactor, setWobbleFactor] = useState(0)
  const mousePos = useRef([0, 0])

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

  const clickHandler = async () => {
    if (sphere.current.material.factor === 0) {
      await gsap.fromTo(sphere.current.material, { factor: 0 }, { factor: 0.5 })
      await gsap.to(sphere.current.material, { factor: 0, delay: 0.8 })
    }
  }

  const mousemoveHandler = event => {
    const x = -1.0 + (2.0 * event.x) / window.innerWidth
    const y = 1.0 - (2.0 * event.y) / window.innerHeight
    mousePos.current = [x, y]
  }

  useEffect(() => {
    window.addEventListener("mousemove", mousemoveHandler)
    return () => window.removeEventListener("mousemove", mousemoveHandler)
  }, [])

  useFrame(({ clock }) => {
    let time = clock.getElapsedTime() / 5
    const k = 0.8

    for (let i = 0; i < sphere.current.geometry.vertices.length; i++) {
      const p = sphere.current.geometry.vertices[i]
      p.normalize().multiplyScalar(
        sphere.current.geometry.parameters.radius +
          0.6 * simplex.noise3D(p.x * k + time, p.y * k + time, p.z * k + time)
      )
    }
    sphere.current.geometry.computeVertexNormals()
    sphere.current.geometry.normalsNeedUpdate = true
    sphere.current.geometry.verticesNeedUpdate = true
  })

  return (
    <mesh onClick={clickHandler} position-y={0} ref={sphere}>
      <sphereGeometry attach="geometry" args={[2.5, 64, 64]} />
      {/* <meshStandardMaterial
        roughness={0}
        metalness={0.5}
        color={"#3cc1c2"}
        attach="material"
      /> */}
      <MeshWobbleMaterial
        roughness={0}
        metalness={0.5}
        color={"#3cc1c2"}
        attach="material"
        factor={0}
        speed={10}
      />
      {/* <meshNormalMaterial /> */}
    </mesh>
  )
}

const selector = state => state.setCanvasLoadStatus

const Loader = () => {
  const setCanvasLoadStatus = useStore(selector)
  const progress = useProgress(state => state.progress)
  useEffect(() => {
    setCanvasLoadStatus({ progress })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress])
  return null
}

const HeroCanvas = () => {
  return (
    <StyledHeroCanvas scroll-section className="canvas">
      <Canvas
        shadowMap
        colorManagement
        camera={{ position: [0, 0, 6], far: 15 }}
        onCreated={({ gl }) => {
          gl.setClearColor("#32a899")
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.outputEncoding = THREE.sRGBEncoding
        }}
      >
        <Suspense fallback={<Loader />}>
          <Environment />
          <Lights />
          <Blob />
          {/* <OrbitControls /> */}
          {/* <gridHelper /> */}
          <Effects />
        </Suspense>
      </Canvas>
    </StyledHeroCanvas>
  )
}

export default HeroCanvas
