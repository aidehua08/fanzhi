import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import type { PointerState } from '../../hooks/usePointerParallax'

type CockpitCanvasProps = {
  pointerRef: React.RefObject<PointerState>
  reducedMotion: boolean
}

function makeRing(radius: number, color: number, opacity: number) {
  const geometry = new THREE.TorusGeometry(radius, 0.012, 10, 160)
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
  })
  return new THREE.Mesh(geometry, material)
}

function makeLightTrail(color: number, y: number, z: number) {
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-6.8, y - 0.32, z),
    new THREE.Vector3(-3.4, y + 0.24, z - 0.5),
    new THREE.Vector3(-0.4, y - 0.08, z + 0.2),
    new THREE.Vector3(2.8, y - 0.24, z - 0.35),
    new THREE.Vector3(6.8, y + 0.16, z),
  ])
  const geometry = new THREE.TubeGeometry(curve, 96, 0.018, 8, false)
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.78,
    blending: THREE.AdditiveBlending,
  })
  return new THREE.Mesh(geometry, material)
}

export function CockpitCanvas({ pointerRef, reducedMotion }: CockpitCanvasProps) {
  const hostRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const hostElement = hostRef.current
    if (!hostElement) return
    const host: HTMLDivElement = hostElement

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
    renderer.setClearColor(0x000000, 0)
    host.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 120)
    camera.position.set(0, 1.35, 8.6)

    const root = new THREE.Group()
    scene.add(root)

    const coreGroup = new THREE.Group()
    coreGroup.position.set(0, 0.25, 0)
    root.add(coreGroup)

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.72, 3),
      new THREE.MeshStandardMaterial({
        color: 0x5eead4,
        emissive: 0x128b86,
        emissiveIntensity: 1.8,
        roughness: 0.28,
        metalness: 0.42,
        transparent: true,
        opacity: 0.92,
      }),
    )
    coreGroup.add(core)

    const wireCore = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.05, 2),
      new THREE.MeshBasicMaterial({
        color: 0x9ffff6,
        wireframe: true,
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
      }),
    )
    coreGroup.add(wireCore)

    const rings = [
      makeRing(1.6, 0x5eead4, 0.52),
      makeRing(2.25, 0x38bdf8, 0.34),
      makeRing(3.0, 0x5eead4, 0.2),
    ]
    rings.forEach((ring, index) => {
      ring.rotation.x = Math.PI / 2 + index * 0.18
      ring.rotation.y = index * 0.28
      coreGroup.add(ring)
    })

    const grid = new THREE.GridHelper(15, 34, 0x5eead4, 0x14323a)
    grid.position.set(0, -2.35, -1.4)
    grid.rotation.x = 0.18
    const gridMaterial = grid.material as THREE.Material
    gridMaterial.transparent = true
    gridMaterial.opacity = 0.24
    root.add(grid)

    const starCount = 850
    const starPositions = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i += 1) {
      const i3 = i * 3
      starPositions[i3] = (Math.random() - 0.5) * 18
      starPositions[i3 + 1] = (Math.random() - 0.25) * 8
      starPositions[i3 + 2] = -Math.random() * 12
    }
    const starGeometry = new THREE.BufferGeometry()
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    const stars = new THREE.Points(
      starGeometry,
      new THREE.PointsMaterial({
        color: 0xbffefa,
        size: 0.026,
        transparent: true,
        opacity: 0.78,
        blending: THREE.AdditiveBlending,
      }),
    )
    root.add(stars)

    const redTrail = makeLightTrail(0xff3b57, -1.55, 0.3)
    const cyanTrail = makeLightTrail(0x5eead4, -1.7, 0.1)
    root.add(redTrail, cyanTrail)

    const light = new THREE.PointLight(0x5eead4, 3.4, 12)
    light.position.set(0, 1.4, 3.5)
    scene.add(light)
    scene.add(new THREE.AmbientLight(0x77b9ff, 0.52))

    let width = 0
    let height = 0
    let frame = 0
    let animationFrame = 0

    function resize() {
      width = host.clientWidth
      height = host.clientHeight
      renderer.setSize(width, height, false)
      camera.aspect = width / Math.max(height, 1)
      camera.updateProjectionMatrix()
      const mobile = width < 760
      root.scale.setScalar(mobile ? 0.78 : 1)
      root.position.y = mobile ? -0.45 : -0.1
      redTrail.visible = !mobile
      cyanTrail.visible = !mobile
    }

    function animate() {
      const pointer = pointerRef.current ?? { x: 0, y: 0 }
      if (!reducedMotion) frame += 1
      const t = frame * 0.012

      root.rotation.y += (pointer.x * 0.16 - root.rotation.y) * 0.045
      root.rotation.x += (-pointer.y * 0.08 - root.rotation.x) * 0.045
      camera.position.x += (pointer.x * 0.55 - camera.position.x) * 0.035
      camera.position.y += (1.35 - pointer.y * 0.24 - camera.position.y) * 0.035
      camera.lookAt(0, 0, 0)

      core.rotation.x = t * 0.9
      core.rotation.y = t * 1.2
      wireCore.rotation.y = -t * 0.65
      rings[0].rotation.z = t * 0.55
      rings[1].rotation.z = -t * 0.42
      rings[2].rotation.z = t * 0.28
      stars.rotation.y = pointer.x * 0.04 + t * 0.018
      grid.position.z = -1.4 + Math.sin(t * 0.8) * 0.06
      redTrail.rotation.z = Math.sin(t * 0.7) * 0.025
      cyanTrail.rotation.z = Math.cos(t * 0.7) * 0.025

      renderer.render(scene, camera)
      animationFrame = window.requestAnimationFrame(animate)
    }

    resize()
    animate()
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      window.cancelAnimationFrame(animationFrame)
      renderer.dispose()
      host.removeChild(renderer.domElement)
      starGeometry.dispose()
      core.geometry.dispose()
      ;(core.material as THREE.Material).dispose()
      wireCore.geometry.dispose()
      ;(wireCore.material as THREE.Material).dispose()
      rings.forEach((ring) => {
        ring.geometry.dispose()
        ;(ring.material as THREE.Material).dispose()
      })
      redTrail.geometry.dispose()
      ;(redTrail.material as THREE.Material).dispose()
      cyanTrail.geometry.dispose()
      ;(cyanTrail.material as THREE.Material).dispose()
    }
  }, [pointerRef, reducedMotion])

  return <div ref={hostRef} className="cockpit-canvas" aria-hidden="true" />
}
