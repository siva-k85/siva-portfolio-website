import { useEffect, useRef } from 'react'

interface TouchGestureOptions {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onPinchZoom?: (scale: number) => void
  threshold?: number
}

export function useTouchGestures(
  ref: React.RefObject<HTMLElement | null>,
  options: TouchGestureOptions
) {
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null)
  const initialDistanceRef = useRef<number | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const threshold = options.threshold || 50

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          time: Date.now(),
        }
      } else if (e.touches.length === 2 && options.onPinchZoom) {
        const distance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        )
        initialDistanceRef.current = distance
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && initialDistanceRef.current && options.onPinchZoom) {
        const distance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        )
        const scale = distance / initialDistanceRef.current
        options.onPinchZoom(scale)
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current || e.changedTouches.length !== 1) {
        touchStartRef.current = null
        initialDistanceRef.current = null
        return
      }

      const touchEnd = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
        time: Date.now(),
      }

      const deltaX = touchEnd.x - touchStartRef.current.x
      const deltaY = touchEnd.y - touchStartRef.current.y
      const deltaTime = touchEnd.time - touchStartRef.current.time

      // Only register as swipe if it was quick enough (under 500ms)
      if (deltaTime > 500) {
        touchStartRef.current = null
        return
      }

      // Determine swipe direction
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (Math.abs(deltaX) > threshold) {
          if (deltaX > 0 && options.onSwipeRight) {
            options.onSwipeRight()
          } else if (deltaX < 0 && options.onSwipeLeft) {
            options.onSwipeLeft()
          }
        }
      } else {
        // Vertical swipe
        if (Math.abs(deltaY) > threshold) {
          if (deltaY > 0 && options.onSwipeDown) {
            options.onSwipeDown()
          } else if (deltaY < 0 && options.onSwipeUp) {
            options.onSwipeUp()
          }
        }
      }

      touchStartRef.current = null
      initialDistanceRef.current = null
    }

    element.addEventListener('touchstart', handleTouchStart)
    element.addEventListener('touchmove', handleTouchMove)
    element.addEventListener('touchend', handleTouchEnd)

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  }, [ref, options])
}
