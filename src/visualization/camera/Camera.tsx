import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import { useScene } from "../../state/scene/hooks/useScene.hook"
import { MathUtils, Vector3 } from "three"

const VELOCITY = 0.5;
const ROTATION_SPEED = 0.005;
const DEFAULT_HEIGHT = 20;

export default function Camera() {
  const { camera, gl } = useThree();

  const [isDragging, setIsDragging] = useState(false);
  const [cameraPos, setCameraPos] = useState({ x: 0, y: 0 });

  const lastMousePos = useRef({ x: 0, y: 0 });
  const keysPressed = useRef<{ [key: string]: boolean }>({});

  const targetPosition = useRef(new Vector3(0, DEFAULT_HEIGHT, 0));
  const targetYaw = useRef(0);
  const currentYaw = useRef(0);

  const { state, updateCameraPosition, getActiveChunks } = useScene();

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      setIsDragging(true);
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    }
    const onPointerUp = () => setIsDragging(false)
    const onPointerMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - lastMousePos.current.x;
      targetYaw.current -= deltaX * ROTATION_SPEED;

      lastMousePos.current = { x: e.clientX, y: e.clientY };
    }

    const onKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true
    }
    const onKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false
    }

    const canvas = gl.domElement;
    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)

    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [isDragging, gl.domElement]);

  useEffect(() => {
    updateCameraPosition(cameraPos);
  }, [cameraPos]);

  useFrame(() => {
    currentYaw.current = MathUtils.lerp(currentYaw.current, targetYaw.current, 0.05);

    const direction = new Vector3(
      -Math.sin(currentYaw.current),
      0,
      -Math.cos(currentYaw.current)
    ).normalize()

    const right = new Vector3().crossVectors(direction, new Vector3(0, 1, 0)).normalize()

    if (keysPressed.current['w']) {
      targetPosition.current.addScaledVector(direction, -VELOCITY)
    }
    if (keysPressed.current['s']) {
      targetPosition.current.addScaledVector(direction, VELOCITY)
    }
    if (keysPressed.current['a']) {
      targetPosition.current.addScaledVector(right, VELOCITY)
    }
    if (keysPressed.current['d']) {
      targetPosition.current.addScaledVector(right, -VELOCITY)
    }

    targetPosition.current.y = DEFAULT_HEIGHT;

    const distance = camera.position.distanceTo(targetPosition.current);

    if (distance > 0.1) {
      camera.position.lerp(targetPosition.current, 0.05);
    }
    camera.position.y = DEFAULT_HEIGHT;

    const distanceAhead = 10;
    const pitchAngle = 15 * (Math.PI / 180);
    const lookAtPos = camera.position.clone();

    const offsetX = Math.sin(currentYaw.current) * distanceAhead * Math.cos(pitchAngle);
    const offsetZ = Math.cos(currentYaw.current) * distanceAhead * Math.cos(pitchAngle);
    const offsetY = -Math.sin(pitchAngle) * distanceAhead;

    lookAtPos.x += offsetX;
    lookAtPos.z += offsetZ;
    lookAtPos.y += offsetY;

    camera.lookAt(lookAtPos);

    if (camera.position.x !== cameraPos.x || camera.position.z !== cameraPos.y) {
      setCameraPos({ x: camera.position.x, y: camera.position.z });
    }
  })

  return null;
}