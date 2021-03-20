import React, { useRef, useEffect, Suspense } from "react"
import styled from "styled-components"
import { Canvas, useFrame, useThree, useLoader } from "react-three-fiber"
import * as THREE from "three"
import SimplexNoise from "simplex-noise"
import gsap from "gsap"
import useStore from "../../../store"

import ThreePlugin from "../../../assets/utils/GSAPTHREE"
import { MeshWobbleMaterial, useProgress } from "drei"
import { HDRCubeTextureLoader } from "three/examples/jsm/loaders/HDRCubeTextureLoader"
import {
  EffectComposer,
  Vignette,
  Noise,
  SSAO,
} from "@react-three/postprocessing"
import { useMediaQuery } from "react-responsive"

gsap.registerPlugin(ThreePlugin)
const simplex = new SimplexNoise()

const StyledHeroCanvas = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: -1;
  /* z-index: 10000; */
`

const Effects = () => {
  return (
    <EffectComposer>
      {/* <DepthOfField
        focusDistance={0}
        focalLength={0.02}
        bokehScale={2}
        height={480}
      /> */}

      <SSAO />
      <Noise opacity={0.01} />
      <Vignette eskil={false} offset={0.1} darkness={0.7} />
    </EffectComposer>
  )
}

const Lights = () => {
  const ref = useRef()
  // useFrame(() => (ref.current.rotation.y = ref.current.rotation.z += 0.01))
  return (
    <group ref={ref}>
      {/* <ambientLight intensity={0.45} /> */}
      <directionalLight intensity={0.8} position={[30, 30, 50]} />
      {/* <pointLight intensity={5} position={[0, 0, 0]} /> */}
      <hemisphereLight args={["#FFB23E", "#4d330e", 1]} />
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
        metalness={0.5}
        // color={"#3cc1c2"}
        color={"#ffdead"}
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
          // gl.setClearColor("#32a899")
          gl.setClearColor("#0b0b0b")
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
