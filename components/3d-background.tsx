"use client"

import { useRef, useEffect, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import * as THREE from "three"

function Particles({ count = 100, mouse }) {
  const mesh = useRef()
  const light = useRef()
  const { size, viewport } = useThree()
  const aspect = size.width / viewport.width

  // Create a dummy object for matrix calculations
  const dummy = useMemo(() => new THREE.Object3D(), [])

  // Generate random positions for particles
  const particles = useMemo(
    () =>
      [...Array(count)].map(() => ({
        time: Math.random() * 100,
        speed: Math.random() * 0.02 + 0.01,
        scale: Math.random() * 0.2 + 0.05,
        distance: Math.random() * 1.5 + 0.5,
        offset: Math.random() * Math.PI * 2,
        yFactor: Math.random() * 2 - 1,
        xFactor: Math.random() * 2 - 1,
        zFactor: Math.random() * 2 - 1,
      })),
    [count],
  )

  useFrame((state) => {
    // Update light position based on mouse
    if (light.current) {
      light.current.position.x = mouse.current[0] / aspect / 15
      light.current.position.y = -mouse.current[1] / aspect / 15
    }

    // Update particles
    if (mesh.current) {
      particles.forEach((particle, i) => {
        particle.time += particle.speed
        const s = Math.cos(particle.time + particle.offset) * particle.distance
        const x = s * particle.xFactor
        const y = s * particle.yFactor
        const z = s * particle.zFactor

        dummy.position.set(x, y, z)
        dummy.scale.setScalar(particle.scale)
        dummy.updateMatrix()
        mesh.current.setMatrixAt(i, dummy.matrix)
      })
      mesh.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <>
      <pointLight ref={light} distance={8} intensity={2} color="#6366f1" />
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.4} />
      </instancedMesh>
    </>
  )
}

function FloatingShape({ position, rotation, scale, color, speed = 1 }) {
  const mesh = useRef()

  useFrame((state) => {
    if (mesh.current) {
      const time = state.clock.getElapsedTime()
      mesh.current.rotation.x = rotation[0] + Math.cos(time * speed) * 0.1
      mesh.current.rotation.y = rotation[1] + Math.sin(time * speed) * 0.1
      mesh.current.rotation.z = rotation[2] + Math.sin(time * speed * 0.5) * 0.1

      // Subtle floating movement
      mesh.current.position.y = position[1] + Math.sin(time * speed * 0.5) * 0.1
    }
  })

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshLambertMaterial color={color} transparent opacity={0.6} />
    </mesh>
  )
}

function Scene({ mouse }) {
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} color="#f8fafc" />

      {/* Directional light */}
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#e2e8f0" />

      {/* Particles */}
      <Particles mouse={mouse} count={80} />

      {/* Floating shapes */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
        <FloatingShape position={[-2, -1, -3]} rotation={[0.5, 0.5, 0]} scale={0.4} color="#6366f1" speed={0.6} />
      </Float>

      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        <FloatingShape position={[2, 1, -2]} rotation={[0.2, 0.3, 0.1]} scale={0.3} color="#8b5cf6" speed={0.8} />
      </Float>

      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.2}>
        <FloatingShape position={[0, -2, -1]} rotation={[0.1, 0.2, 0.3]} scale={0.25} color="#06b6d4" speed={1.0} />
      </Float>
    </>
  )
}

export default function ThreeDBackground() {
  const mouse = useRef([0, 0])

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouse.current = [(event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1]
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-60 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  )
}
