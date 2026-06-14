import { useEffect, useRef } from 'react'

type CockpitCanvasProps = {
  parallax: { x: number; y: number }
  reducedMotion: boolean
}

type Particle = {
  x: number
  y: number
  z: number
  speed: number
}

function createParticles(count: number, width: number, height: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: height * 0.32 + Math.random() * height * 0.72,
    z: Math.random(),
    speed: 0.18 + Math.random() * 0.42,
  }))
}

export function CockpitCanvas({ parallax, reducedMotion }: CockpitCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const parallaxRef = useRef(parallax)

  useEffect(() => {
    parallaxRef.current = parallax
  }, [parallax])

  useEffect(() => {
    const canvasElement = canvasRef.current
    if (!canvasElement) return
    const canvas: HTMLCanvasElement = canvasElement

    const drawingContext = canvas.getContext('2d')
    if (!drawingContext) return
    const ctx: CanvasRenderingContext2D = drawingContext

    let animationFrame = 0
    let particles: Particle[] = []
    let width = 0
    let height = 0
    let time = 0

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.floor(width * ratio)
      canvas.height = Math.floor(height * ratio)
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      particles = createParticles(width < 760 ? 90 : 180, width, height)
    }

    function drawGrid(offsetX: number, offsetY: number) {
      ctx.save()
      ctx.globalAlpha = 0.22
      ctx.strokeStyle = 'rgba(94, 234, 212, 0.18)'
      ctx.lineWidth = 1

      const gap = 38
      for (let x = -gap; x < width + gap; x += gap) {
        ctx.beginPath()
        ctx.moveTo(x + offsetX * 18, height * 0.36)
        ctx.lineTo(width / 2 + (x - width / 2) * 0.62 + offsetX * 8, height + 120)
        ctx.stroke()
      }

      for (let y = height * 0.42; y < height + gap; y += gap) {
        ctx.beginPath()
        ctx.moveTo(-40, y + offsetY * 14)
        ctx.lineTo(width + 40, y + offsetY * 14)
        ctx.stroke()
      }

      ctx.restore()
    }

    function drawParticles(offsetX: number, offsetY: number) {
      ctx.save()
      for (const particle of particles) {
        if (!reducedMotion) {
          particle.y += particle.speed
          if (particle.y > height + 10) particle.y = height * 0.34
        }

        const size = 0.8 + particle.z * 1.7
        ctx.globalAlpha = 0.18 + particle.z * 0.52
        ctx.fillStyle = particle.z > 0.72 ? '#5eead4' : '#dffcff'
        ctx.beginPath()
        ctx.arc(
          particle.x + offsetX * 24 * particle.z,
          particle.y + offsetY * 18 * particle.z,
          size,
          0,
          Math.PI * 2,
        )
        ctx.fill()
      }
      ctx.restore()
    }

    function drawLightTrail(offsetX: number, offsetY: number) {
      ctx.save()
      ctx.lineWidth = 3
      ctx.shadowBlur = 24
      ctx.shadowColor = 'rgba(94, 234, 212, 0.7)'

      const gradient = ctx.createLinearGradient(0, 0, width, 0)
      gradient.addColorStop(0, 'rgba(255, 59, 87, 0)')
      gradient.addColorStop(0.22, 'rgba(255, 59, 87, 0.85)')
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)')
      gradient.addColorStop(0.78, 'rgba(94, 234, 212, 0.85)')
      gradient.addColorStop(1, 'rgba(94, 234, 212, 0)')
      ctx.strokeStyle = gradient

      const baseY = height * 0.68 + offsetY * 18
      ctx.beginPath()
      ctx.moveTo(-80, baseY + Math.sin(time * 0.015) * 16)
      ctx.bezierCurveTo(
        width * 0.28,
        baseY - 90 + offsetX * 20,
        width * 0.56,
        baseY + 80 - offsetX * 16,
        width + 80,
        baseY - 28,
      )
      ctx.stroke()
      ctx.restore()
    }

    function drawCore(offsetX: number, offsetY: number) {
      const cx = width * 0.5 + offsetX * 16
      const cy = height * 0.47 + offsetY * 12
      const radius = Math.min(width, height) * 0.15

      ctx.save()
      ctx.translate(cx, cy)
      ctx.strokeStyle = 'rgba(94, 234, 212, 0.55)'
      ctx.lineWidth = 1.2
      ctx.shadowBlur = 34
      ctx.shadowColor = 'rgba(94, 234, 212, 0.36)'

      for (let i = 0; i < 4; i += 1) {
        ctx.beginPath()
        ctx.arc(0, 0, radius * (0.45 + i * 0.22), 0, Math.PI * 2)
        ctx.stroke()
      }

      ctx.rotate(time * 0.004)
      ctx.beginPath()
      ctx.arc(0, 0, radius * 0.88, -0.45, Math.PI * 0.85)
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.82)'
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.fillStyle = 'rgba(94, 234, 212, 0.24)'
      ctx.beginPath()
      ctx.arc(0, 0, radius * 0.22, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    function frame() {
      const { x, y } = parallaxRef.current
      time += reducedMotion ? 0 : 1
      ctx.clearRect(0, 0, width, height)
      drawGrid(x, y)
      drawParticles(x, y)
      drawLightTrail(x, y)
      drawCore(x, y)
      animationFrame = window.requestAnimationFrame(frame)
    }

    resize()
    frame()
    window.addEventListener('resize', resize)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
    }
  }, [reducedMotion])

  return <canvas ref={canvasRef} className="cockpit-canvas" aria-hidden="true" />
}
