import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import type { PointerState } from '../../hooks/usePointerParallax'

type CockpitCanvasProps = {
  pointerRef: React.RefObject<PointerState>
  reducedMotion: boolean
}

function makeParticleField(count: number) {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const palette = [
    new THREE.Color('#dffdf9'),
    new THREE.Color('#7dd3fc'),
    new THREE.Color('#5eead4'),
    new THREE.Color('#ff8aa0'),
  ]

  for (let i = 0; i < count; i += 1) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * 18
    positions[i3 + 1] = (Math.random() - 0.35) * 8
    positions[i3 + 2] = -2 - Math.random() * 18

    const color = palette[i % palette.length]
    colors[i3] = color.r
    colors[i3 + 1] = color.g
    colors[i3 + 2] = color.b
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const material = new THREE.PointsMaterial({
    size: 0.026,
    vertexColors: true,
    transparent: true,
    opacity: 0.82,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })

  return new THREE.Points(geometry, material)
}

function makeBeamTexture(color: string) {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 128
  const context = canvas.getContext('2d')
  if (!context) return null

  const gradient = context.createLinearGradient(0, 0, canvas.width, 0)
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
  gradient.addColorStop(0.45, color)
  gradient.addColorStop(0.55, color)
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
  context.fillStyle = gradient
  context.fillRect(0, 0, canvas.width, canvas.height)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

function makeLightPlane(texture: THREE.Texture | null, width: number, height: number, opacity: number) {
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    color: '#ffffff',
    transparent: true,
    opacity,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  })
  return new THREE.Mesh(new THREE.PlaneGeometry(width, height), material)
}

function makeConstellation() {
  const geometry = new THREE.BufferGeometry()
  const points: number[] = []

  for (let i = 0; i < 18; i += 1) {
    const x = -5.8 + Math.random() * 11.6
    const y = -2.8 + Math.random() * 5.6
    const z = -5 - Math.random() * 8
    points.push(x, y, z, x + (Math.random() - 0.5) * 1.4, y + (Math.random() - 0.5) * 0.8, z - 0.8)
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
  const material = new THREE.LineBasicMaterial({
    color: '#5eead4',
    transparent: true,
    opacity: 0.18,
    blending: THREE.AdditiveBlending,
  })

  return new THREE.LineSegments(geometry, material)
}

export function CockpitCanvas({ pointerRef, reducedMotion }: CockpitCanvasProps) {
  const hostRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const hostElement = hostRef.current
    if (!hostElement) return
    const host: HTMLDivElement = hostElement

    const testCanvas = document.createElement('canvas')
    const hasWebGl = Boolean(testCanvas.getContext('webgl2') ?? testCanvas.getContext('webgl'))

    if (!hasWebGl) {
      host.classList.add('cockpit-canvas--fallback')
      return () => host.classList.remove('cockpit-canvas--fallback')
    }

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      })
    } catch {
      host.classList.add('cockpit-canvas--fallback')
      return () => host.classList.remove('cockpit-canvas--fallback')
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.55))
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    host.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
    camera.position.set(0, 0.25, 9)

    const root = new THREE.Group()
    scene.add(root)

    const cyanTexture = makeBeamTexture('rgba(94, 234, 212, 0.68)')
    const blueTexture = makeBeamTexture('rgba(56, 189, 248, 0.48)')
    const redTexture = makeBeamTexture('rgba(255, 77, 109, 0.35)')

    const particles = makeParticleField(760)
    const constellation = makeConstellation()
    const cyanBeam = makeLightPlane(cyanTexture, 12, 1.2, 0.28)
    const blueBeam = makeLightPlane(blueTexture, 10, 1.5, 0.18)
    const redBeam = makeLightPlane(redTexture, 8.5, 1, 0.16)

    cyanBeam.position.set(2.4, 0.6, -6.4)
    cyanBeam.rotation.set(-0.18, -0.28, 0.08)
    blueBeam.position.set(-2.4, -1.7, -7.8)
    blueBeam.rotation.set(0.32, 0.36, -0.16)
    redBeam.position.set(3.8, -2.1, -5.2)
    redBeam.rotation.set(0.08, -0.44, -0.34)

    const grid = new THREE.GridHelper(18, 34, '#5eead4', '#15313b')
    grid.position.set(0, -3.1, -6.8)
    grid.rotation.x = 0.34
    const gridMaterial = grid.material as THREE.Material
    gridMaterial.transparent = true
    gridMaterial.opacity = 0.15

    root.add(particles, constellation, cyanBeam, blueBeam, redBeam, grid)
    scene.add(new THREE.AmbientLight('#a7f3ff', 0.55))

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
      root.scale.setScalar(mobile ? 0.82 : 1)
      root.position.y = mobile ? -0.4 : 0
      constellation.visible = !mobile
    }

    function animate() {
      const pointer = pointerRef.current ?? { x: 0, y: 0 }
      if (!reducedMotion) frame += 1
      const t = frame * 0.01

      root.rotation.y += (pointer.x * 0.08 - root.rotation.y) * 0.04
      root.rotation.x += (-pointer.y * 0.045 - root.rotation.x) * 0.04
      camera.position.x += (pointer.x * 0.36 - camera.position.x) * 0.035
      camera.position.y += (0.25 - pointer.y * 0.18 - camera.position.y) * 0.035
      camera.lookAt(0, -0.1, -4)

      particles.rotation.y = t * 0.018 + pointer.x * 0.02
      particles.rotation.x = -pointer.y * 0.012
      constellation.rotation.y = -t * 0.03
      cyanBeam.position.x = 2.4 + Math.sin(t * 0.8) * 0.28
      blueBeam.position.x = -2.4 + Math.cos(t * 0.62) * 0.22
      redBeam.position.y = -2.1 + Math.sin(t * 0.9) * 0.14
      grid.position.z = -6.8 + Math.sin(t * 0.7) * 0.08

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
      cyanTexture?.dispose()
      blueTexture?.dispose()
      redTexture?.dispose()
      particles.geometry.dispose()
      ;(particles.material as THREE.Material).dispose()
      constellation.geometry.dispose()
      ;(constellation.material as THREE.Material).dispose()
      ;(cyanBeam.geometry as THREE.BufferGeometry).dispose()
      ;(cyanBeam.material as THREE.Material).dispose()
      ;(blueBeam.geometry as THREE.BufferGeometry).dispose()
      ;(blueBeam.material as THREE.Material).dispose()
      ;(redBeam.geometry as THREE.BufferGeometry).dispose()
      ;(redBeam.material as THREE.Material).dispose()
    }
  }, [pointerRef, reducedMotion])

  return <div ref={hostRef} className="cockpit-canvas" aria-hidden="true" />
}
