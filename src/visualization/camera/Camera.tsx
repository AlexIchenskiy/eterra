import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { useScene } from "../../state/scene/hooks/useScene.hook";
import { MathUtils, Vector3 } from "three";
import { CELL_SIZE, CHUNK_SIZE, DEFAULT_HEIGHT } from "../../core/utils/constants";

const VELOCITY = 0.5;
const ROTATION_SPEED = 0.005;

interface CameraProps {
  position?: Vector3;
}

const Camera: React.FC<CameraProps> = (props: CameraProps) => {
  const { camera, gl } = useThree();

  const [isDragging, setIsDragging] = useState(false);

  const lastMousePos = useRef({ x: 0, y: 0 });
  const keysPressed = useRef<{ [key: string]: boolean }>({});

  const targetPosition = useRef(new Vector3(0, DEFAULT_HEIGHT, 0));
  const targetYaw = useRef(0);
  const currentYaw = useRef(0);

  const { state, updateCameraPosition } = useScene();

  useEffect(() => {
    if (props.position) {
      targetPosition.current.set(props.position.x, props.position.y, props.position.z);
      camera.position.setX(props.position.x);
      camera.position.setY(props.position.y);
      camera.position.setZ(props.position.z);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      setIsDragging(true);
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };
    const onPointerUp = () => setIsDragging(false);
    const onPointerMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - lastMousePos.current.x;
      targetYaw.current -= deltaX * ROTATION_SPEED;

      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true;
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };

    const canvas = gl.domElement;
    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [isDragging, gl.domElement]);

  useFrame(() => {
    currentYaw.current = MathUtils.lerp(currentYaw.current, targetYaw.current, 0.05);

    const direction = new Vector3(
      -Math.sin(currentYaw.current),
      0,
      -Math.cos(currentYaw.current)
    ).normalize();

    const right = new Vector3().crossVectors(direction, new Vector3(0, 1, 0)).normalize();

    if (keysPressed.current['w']) {
      targetPosition.current.addScaledVector(direction, -VELOCITY);
    }
    if (keysPressed.current['s']) {
      targetPosition.current.addScaledVector(direction, VELOCITY);
    }
    if (keysPressed.current['a']) {
      targetPosition.current.addScaledVector(right, VELOCITY);
    }
    if (keysPressed.current['d']) {
      targetPosition.current.addScaledVector(right, -VELOCITY);
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

    if ((state.position.x === 0 || state.position.y === 0)
      || (Math.abs(state.position.x - Math.floor(camera.position.x)) > (CHUNK_SIZE * CELL_SIZE) / 4)
      || (Math.abs(state.position.y - Math.floor(camera.position.z)) > (CHUNK_SIZE * CELL_SIZE) / 4)) {
      updateCameraPosition({ x: camera.position.x, y: camera.position.z });
    }
  });

  return null;
};

export default Camera;