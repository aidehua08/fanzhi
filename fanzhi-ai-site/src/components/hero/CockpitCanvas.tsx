import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import ThreeGlobe from 'three-globe'
import type { PointerState } from '../../hooks/usePointerParallax'

type CockpitCanvasProps = {
  pointerRef: React.RefObject<PointerState>
  reducedMotion: boolean
}

type BusinessPoint = {
  lat: number
  lng: number
  weight: number
  color: string
}

type FlowArc = {
  startLat: number
  startLng: number
  endLat: number
  endLng: number
  altitude: number
  color: string[]
}

type PulseRing = {
  lat: number
  lng: number
  radius: number
  color: string
  period: number
}

const hub = { lat: 30.27, lng: 120.15 }

const networkPoints: BusinessPoint[] = [
  { ...hub, weight: 1.25, color: '#f8fafc' },
  { lat: 31.23, lng: 121.47, weight: 0.88, color: '#5eead4' },
  { lat: 22.54, lng: 114.06, weight: 0.82, color: '#38bdf8' },
  { lat: 39.9, lng: 116.4, weight: 0.72, color: '#8b5cf6' },
  { lat: 23.13, lng: 113.26, weight: 0.66, color: '#5eead4' },
  { lat: 34.34, lng: 108.94, weight: 0.58, color: '#38bdf8' },
  { lat: 29.56, lng: 106.55, weight: 0.54, color: '#ff4d6d' },
  { lat: 25.04, lng: 102.71, weight: 0.46, color: '#5eead4' },
  { lat: 1.35, lng: 103.82, weight: 0.52, color: '#38bdf8' },
  { lat: 35.68, lng: 139.69, weight: 0.48, color: '#5eead4' },
  { lat: 37.57, lng: 126.98, weight: 0.42, color: '#8b5cf6' },
  { lat: 13.75, lng: 100.5, weight: 0.38, color: '#38bdf8' },
  { lat: 51.51, lng: -0.13, weight: 0.34, color: '#5eead4' },
  { lat: 37.77, lng: -122.42, weight: 0.36, color: '#ff4d6d' },
]

const flowArcs: FlowArc[] = networkPoints
  .filter((point) => point.lat !== hub.lat || point.lng !== hub.lng)
  .map((point, index) => ({
    startLat: hub.lat,
    startLng: hub.lng,
    endLat: point.lat,
    endLng: point.lng,
    altitude: 0.18 + (index % 4) * 0.035,
    color: ['#103746', point.color],
  }))

const pulseRings: PulseRing[] = [
  { ...hub, radius: 5.2, color: 'rgba(94, 234, 212, 0.92)', period: 1800 },
  { lat: 22.54, lng: 114.06, radius: 3.8, color: 'rgba(56, 189, 248, 0.78)', period: 2200 },
  { lat: 1.35, lng: 103.82, radius: 3.4, color: 'rgba(255, 77, 109, 0.68)', period: 2600 },
  { lat: 37.77, lng: -122.42, radius: 3.2, color: 'rgba(139, 92, 246, 0.72)', period: 3000 },
]

function makeStarField(count: number) {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const palette = [
    new THREE.Color('#dffdf9'),
    new THREE.Color('#8bdff8'),
    new THREE.Color('#f1f5f9'),
    new THREE.Color('#ff8aa0'),
  ]

  for (let i = 0; i < count; i += 1) {
    const i3 = i * 3
    const radius = 8 + Math.random() * 10
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    positions[i3] = Math.sin(phi) * Math.cos(theta) * radius
    positions[i3 + 1] = Math.cos(phi) * radius * 0.58 + 0.4
    positions[i3 + 2] = Math.sin(phi) * Math.sin(theta) * radius - 3.2

    const color = palette[i % palette.length]
    colors[i3] = color.r
    colors[i3 + 1] = color.g
    colors[i3 + 2] = color.b
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const material = new THREE.PointsMaterial({
    size: 0.028,
    vertexColors: true,
    transparent: true,
    opacity: 0.74,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })

  return new THREE.Points(geometry, material)
}

function makeGlobeTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512
  const context = canvas.getContext('2d')
  if (!context) return null

  const gradient = context.createLinearGradient(0, 0, 0, canvas.height)
  gradient.addColorStop(0, '#03121d')
  gradient.addColorStop(0.52, '#061a24')
  gradient.addColorStop(1, '#020711')
  context.fillStyle = gradient
  context.fillRect(0, 0, canvas.width, canvas.height)

  const landGradient = context.createRadialGradient(512, 220, 16, 512, 220, 520)
  landGradient.addColorStop(0, 'rgba(94, 234, 212, 0.34)')
  landGradient.addColorStop(0.46, 'rgba(56, 189, 248, 0.16)')
  landGradient.addColorStop(1, 'rgba(94, 234, 212, 0)')
  context.fillStyle = landGradient

  const regions = [
    [660, 190, 178, 92, -0.28],
    [720, 265, 112, 70, 0.42],
    [585, 238, 124, 58, 0.12],
    [480, 185, 116, 64, -0.35],
    [310, 190, 112, 62, 0.2],
    [245, 270, 68, 118, -0.18],
    [842, 320, 72, 46, 0.55],
  ]

  regions.forEach(([x, y, width, height, rotate]) => {
    context.save()
    context.translate(x, y)
    context.rotate(rotate)
    context.beginPath()
    context.ellipse(0, 0, width, height, 0, 0, Math.PI * 2)
    context.fill()
    context.restore()
  })

  context.globalCompositeOperation = 'screen'
  for (let i = 0; i < 260; i += 1) {
    const x = Math.random() * canvas.width
    const y = 80 + Math.random() * 330
    const radius = Math.random() * 1.35 + 0.3
    context.fillStyle = i % 7 === 0 ? 'rgba(255, 77, 109, 0.45)' : 'rgba(177, 255, 248, 0.36)'
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  texture.needsUpdate = true
  return texture
}

function makeGlassShell(radius: number, color: string, opacity: number) {
  return new THREE.Mesh(
    new THREE.SphereGeometry(radius, 96, 64),
    new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  )
}

function makeScanDisc() {
  const geometry = new THREE.CircleGeometry(2.55, 128)
  const material = new THREE.MeshBasicMaterial({
    color: '#5eead4',
    transparent: true,
    opacity: 0.055,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
  const disc = new THREE.Mesh(geometry, material)
  disc.rotation.x = Math.PI * 0.5
  return disc
}

function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  )
}

function makeDataCore(texture: THREE.Texture | null) {
  const group = new THREE.Group()
  const radius = 2.05

  const surface = new THREE.Mesh(
    new THREE.SphereGeometry(radius, 128, 80),
    new THREE.MeshStandardMaterial({
      color: '#102638',
      map: texture,
      emissive: '#0d5560',
      emissiveIntensity: 0.8,
      roughness: 0.24,
      metalness: 0.52,
      transparent: true,
      opacity: 0.82,
    }),
  )
  group.add(surface)

  const nodeGeometry = new THREE.SphereGeometry(1, 24, 16)
  const surfaceDotGeometry = new THREE.SphereGeometry(1, 12, 8)
  for (let i = 0; i < 86; i += 1) {
    const lat = -42 + Math.random() * 86
    const lng = 78 + Math.random() * 174
    const dot = new THREE.Mesh(
      surfaceDotGeometry.clone(),
      new THREE.MeshBasicMaterial({
        color: i % 6 === 0 ? '#ff8aa0' : i % 3 === 0 ? '#7dd3fc' : '#99f6e4',
        transparent: true,
        opacity: i % 5 === 0 ? 0.3 : 0.18,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    )
    dot.position.copy(latLngToVector3(lat, lng, radius + 0.065))
    dot.scale.setScalar(0.011 + Math.random() * 0.018)
    group.add(dot)
  }

  networkPoints.forEach((point) => {
    const node = new THREE.Mesh(
      nodeGeometry.clone(),
      new THREE.MeshBasicMaterial({
        color: point.color,
        transparent: true,
        opacity: 0.92,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    )
    const position = latLngToVector3(point.lat, point.lng, radius + 0.05)
    node.position.copy(position)
    node.scale.setScalar(0.032 + point.weight * 0.045)
    group.add(node)

    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(1, 24, 16),
      new THREE.MeshBasicMaterial({
        color: point.color,
        transparent: true,
        opacity: 0.12,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    )
    halo.position.copy(position)
    halo.scale.setScalar(0.14 + point.weight * 0.08)
    group.add(halo)
  })

  flowArcs.slice(0, 9).forEach((arc, index) => {
    const start = latLngToVector3(arc.startLat, arc.startLng, radius + 0.08)
    const end = latLngToVector3(arc.endLat, arc.endLng, radius + 0.08)
    const middle = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(radius + 0.72 + index * 0.018)
    const curve = new THREE.QuadraticBezierCurve3(start, middle, end)
    const geometry = new THREE.TubeGeometry(curve, 72, 0.009, 8, false)
    const material = new THREE.MeshBasicMaterial({
      color: arc.color[1],
      transparent: true,
      opacity: index < 5 ? 0.62 : 0.36,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    group.add(new THREE.Mesh(geometry, material))
  })

  return group
}

export function CockpitCanvas({ pointerRef, reducedMotion }: CockpitCanvasProps) {
  const hostRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const hostElement = hostRef.current
    if (!hostElement) return
    const host: HTMLDivElement = hostElement

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.55))
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.18
    host.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 120)
    camera.position.set(0, 1.05, 8.7)

    const root = new THREE.Group()
    root.position.set(0, 0.15, 0)
    scene.add(root)

    const surfaceTexture = makeGlobeTexture()
    const globeMaterial = new THREE.MeshStandardMaterial({
      color: '#07131f',
      map: surfaceTexture,
      emissive: '#0c4b58',
      emissiveIntensity: 0.9,
      roughness: 0.28,
      metalness: 0.72,
      transparent: true,
      opacity: 0.9,
    })

    const globe = new ThreeGlobe({ waitForGlobeReady: false, animateIn: !reducedMotion })
      .showAtmosphere(true)
      .atmosphereColor('#5eead4')
      .atmosphereAltitude(0.18)
      .showGraticules(false)
      .globeCurvatureResolution(4)
      .globeMaterial(globeMaterial)
      .pointsData(networkPoints)
      .pointLat((point: object) => (point as BusinessPoint).lat)
      .pointLng((point: object) => (point as BusinessPoint).lng)
      .pointColor((point: object) => (point as BusinessPoint).color)
      .pointAltitude((point: object) => 0.035 + (point as BusinessPoint).weight * 0.032)
      .pointRadius((point: object) => 0.12 + (point as BusinessPoint).weight * 0.075)
      .pointResolution(16)
      .pointsMerge(true)
      .arcsData(flowArcs)
      .arcStartLat((arc: object) => (arc as FlowArc).startLat)
      .arcStartLng((arc: object) => (arc as FlowArc).startLng)
      .arcEndLat((arc: object) => (arc as FlowArc).endLat)
      .arcEndLng((arc: object) => (arc as FlowArc).endLng)
      .arcColor((arc: object) => (arc as FlowArc).color)
      .arcAltitude((arc: object) => (arc as FlowArc).altitude)
      .arcStroke(0.34)
      .arcDashLength(0.62)
      .arcDashGap(1.15)
      .arcDashAnimateTime(reducedMotion ? 0 : 2600)
      .arcsTransitionDuration(0)
      .ringsData(pulseRings)
      .ringLat((ring: object) => (ring as PulseRing).lat)
      .ringLng((ring: object) => (ring as PulseRing).lng)
      .ringColor((ring: object) => (ring as PulseRing).color)
      .ringMaxRadius((ring: object) => (ring as PulseRing).radius)
      .ringPropagationSpeed(1.25)
      .ringRepeatPeriod((ring: object) => (reducedMotion ? 900000 : (ring as PulseRing).period))

    globe.scale.setScalar(0.022)
    globe.rotation.y = -0.72
    globe.rotation.x = -0.18
    root.add(globe)

    const innerGlow = makeGlassShell(1.7, '#38bdf8', 0.05)
    const outerGlow = makeGlassShell(2.78, '#5eead4', 0.078)
    const magentaGlow = makeGlassShell(3.1, '#ff4d6d', 0.035)
    const scanDisc = makeScanDisc()
    const stars = makeStarField(620)
    const dataCore = makeDataCore(surfaceTexture)
    dataCore.rotation.y = -0.72
    dataCore.rotation.x = -0.18
    root.add(innerGlow, outerGlow, magentaGlow, scanDisc, dataCore, stars)

    const keyLight = new THREE.PointLight('#5eead4', 4.8, 14)
    keyLight.position.set(-2.8, 2.8, 4.6)
    const rimLight = new THREE.PointLight('#ff4d6d', 2.8, 12)
    rimLight.position.set(3.2, -1.4, 3.8)
    const blueLight = new THREE.DirectionalLight('#9bdcff', 1.2)
    blueLight.position.set(2, 3.5, 4.5)
    scene.add(keyLight, rimLight, blueLight, new THREE.AmbientLight('#b9f7ff', 0.48))

    let width = 0
    let height = 0
    let frame = 0
    let animationFrame = 0

    function resize() {
      width = host.clientWidth
      height = host.clientHeight
      renderer.setSize(width, height, false)
      globe.rendererSize(new THREE.Vector2(width, height))
      camera.aspect = width / Math.max(height, 1)
      camera.updateProjectionMatrix()

      const mobile = width < 760
      root.scale.setScalar(mobile ? 0.68 : 1)
      root.position.y = mobile ? -0.64 : 0.12
      root.position.x = mobile ? 0.05 : 0
      stars.visible = !mobile
      scanDisc.visible = !mobile
    }

    function animate() {
      const pointer = pointerRef.current ?? { x: 0, y: 0 }
      if (!reducedMotion) frame += 1
      const t = frame * 0.01

      root.rotation.y += (pointer.x * 0.18 - root.rotation.y) * 0.038
      root.rotation.x += (-pointer.y * 0.07 - root.rotation.x) * 0.038
      camera.position.x += (pointer.x * 0.48 - camera.position.x) * 0.032
      camera.position.y += (1.05 - pointer.y * 0.2 - camera.position.y) * 0.032
      camera.lookAt(0, 0, 0)

      globe.rotation.y = -0.72 + t * 0.16
      globe.rotation.x = -0.18 + Math.sin(t * 0.45) * 0.025
      dataCore.rotation.y = -0.72 + t * 0.16
      dataCore.rotation.x = -0.18 + Math.sin(t * 0.45) * 0.025
      innerGlow.rotation.y = -t * 0.18
      outerGlow.rotation.y = t * 0.12
      magentaGlow.rotation.x = t * 0.08
      scanDisc.rotation.z = t * 0.22
      scanDisc.position.y = Math.sin(t * 0.85) * 0.12
      stars.rotation.y = pointer.x * 0.035 + t * 0.01
      stars.rotation.x = -pointer.y * 0.02

      renderer.render(scene, camera)
      animationFrame = window.requestAnimationFrame(animate)
    }

    resize()
    animate()
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      window.cancelAnimationFrame(animationFrame)
      globe._destructor()
      renderer.dispose()
      host.removeChild(renderer.domElement)
      globeMaterial.dispose()
      surfaceTexture?.dispose()
      ;(stars.geometry as THREE.BufferGeometry).dispose()
      ;(stars.material as THREE.Material).dispose()
      ;(innerGlow.geometry as THREE.BufferGeometry).dispose()
      ;(innerGlow.material as THREE.Material).dispose()
      ;(outerGlow.geometry as THREE.BufferGeometry).dispose()
      ;(outerGlow.material as THREE.Material).dispose()
      ;(magentaGlow.geometry as THREE.BufferGeometry).dispose()
      ;(magentaGlow.material as THREE.Material).dispose()
      ;(scanDisc.geometry as THREE.BufferGeometry).dispose()
      ;(scanDisc.material as THREE.Material).dispose()
      dataCore.traverse((object) => {
        const mesh = object as THREE.Mesh
        mesh.geometry?.dispose()
        const material = mesh.material
        if (Array.isArray(material)) {
          material.forEach((item) => item.dispose())
        } else {
          material?.dispose()
        }
      })
    }
  }, [pointerRef, reducedMotion])

  return <div ref={hostRef} className="cockpit-canvas" aria-hidden="true" />
}
