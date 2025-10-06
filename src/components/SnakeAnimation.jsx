import { useEffect, useRef } from 'react'

const SnakeAnimation = () => {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const snakeRef = useRef([])
  const targetRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let segments = []
    const maxSegments = 80
    const segmentLength = 8
    const speed = 0.015
    const mouseInfluence = 0.3

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      if (segments.length === 0) {
        segments = Array.from({ length: maxSegments }, (_, i) => ({
          x: canvas.width / 2,
          y: canvas.height / 2,
          vx: 0,
          vy: 0
        }))

        targetRef.current = {
          x: canvas.width / 2 + Math.random() * 400 - 200,
          y: canvas.height / 2 + Math.random() * 400 - 200
        }
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      ctx.fillStyle = 'rgba(3, 7, 18, 0.15)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const head = segments[0]

      const distanceToTarget = Math.hypot(
        targetRef.current.x - head.x,
        targetRef.current.y - head.y
      )

      if (distanceToTarget < 50) {
        targetRef.current = {
          x: Math.random() * (canvas.width - 200) + 100,
          y: Math.random() * (canvas.height - 200) + 100
        }
      }

      const angleToTarget = Math.atan2(
        targetRef.current.y - head.y,
        targetRef.current.x - head.x
      )

      const distanceToMouse = Math.hypot(
        mouseRef.current.x - head.x,
        mouseRef.current.y - head.y
      )

      let finalAngle = angleToTarget

      if (distanceToMouse < 300) {
        const angleToMouse = Math.atan2(
          mouseRef.current.y - head.y,
          mouseRef.current.x - head.x
        )

        const influenceFactor = Math.max(0, 1 - distanceToMouse / 300) * mouseInfluence
        finalAngle = angleToTarget * (1 - influenceFactor) + angleToMouse * influenceFactor
      }

      head.vx += Math.cos(finalAngle) * speed
      head.vy += Math.sin(finalAngle) * speed

      const velocityMag = Math.hypot(head.vx, head.vy)
      const maxVelocity = 3
      if (velocityMag > maxVelocity) {
        head.vx = (head.vx / velocityMag) * maxVelocity
        head.vy = (head.vy / velocityMag) * maxVelocity
      }

      head.x += head.vx
      head.y += head.vy

      if (head.x < 50) head.vx += 0.5
      if (head.x > canvas.width - 50) head.vx -= 0.5
      if (head.y < 50) head.vy += 0.5
      if (head.y > canvas.height - 50) head.vy -= 0.5

      for (let i = 1; i < segments.length; i++) {
        const segment = segments[i]
        const prevSegment = segments[i - 1]

        const dx = prevSegment.x - segment.x
        const dy = prevSegment.y - segment.y
        const distance = Math.hypot(dx, dy)

        if (distance > 0) {
          const ratio = (segmentLength / distance - 1) * 0.3
          segment.x -= dx * ratio
          segment.y -= dy * ratio
        }
      }

      for (let i = 0; i < segments.length - 1; i++) {
        const segment = segments[i]
        const nextSegment = segments[i + 1]

        const progress = 1 - i / segments.length
        const baseSize = 2 + progress * 4
        const opacity = 0.3 + progress * 0.7

        const gradient = ctx.createRadialGradient(
          segment.x, segment.y, 0,
          segment.x, segment.y, baseSize * 3
        )

        gradient.addColorStop(0, `rgba(0, 255, 170, ${opacity})`)
        gradient.addColorStop(0.5, `rgba(0, 255, 255, ${opacity * 0.5})`)
        gradient.addColorStop(1, `rgba(0, 255, 255, 0)`)

        ctx.strokeStyle = gradient
        ctx.lineWidth = baseSize
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'

        ctx.beginPath()
        ctx.moveTo(segment.x, segment.y)
        ctx.lineTo(nextSegment.x, nextSegment.y)
        ctx.stroke()

        if (i === 0) {
          ctx.shadowBlur = 30
          ctx.shadowColor = '#00FFAA'
          ctx.fillStyle = `rgba(0, 255, 170, ${opacity})`
          ctx.beginPath()
          ctx.arc(segment.x, segment.y, baseSize * 2, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0
        }
      }

      snakeRef.current = segments
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ filter: 'blur(0.5px)' }}
    />
  )
}

export default SnakeAnimation
