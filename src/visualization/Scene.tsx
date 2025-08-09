import { Canvas } from '@react-three/fiber'
import Camera from './camera/Camera';
import { Building } from './components/Building';
import { Vector3 } from 'three';
import { useScene } from '../state/scene/hooks/useScene.hook';
import { CHUNK_SIZE } from '../core/utils/constants';
import { Terrain } from './components/Terrain';
import React from 'react';
import { seededRandomRange } from './utils/random.utils';

export default function Scene() {
  const { state, updateCameraPosition, getActiveChunks } = useScene();

  const activeChunks = getActiveChunks();

  return (
    <div id='canvas-container' className='w-full h-full'>
      <Canvas
        onCreated={({ gl }) => {
          gl.setClearColor('#87CEEB');
        }}
      >
        <ambientLight intensity={1} />
        <Camera />
        {activeChunks.map((chunk) => (
          <React.Fragment key={`chunk-${chunk.position.x}-${chunk.position.y}`}>
            <Terrain position={new Vector3(
              chunk.position.x * CHUNK_SIZE * 10 + (CHUNK_SIZE * 10) / 2,
              -2,
              chunk.position.y * CHUNK_SIZE * 10 + (CHUNK_SIZE * 10) / 2,
            )} />

            {chunk.data.map((row, rowIndex) =>
              row.map((value, colIndex) => {
                if (value === 1) {
                  const x = chunk.position.x * CHUNK_SIZE * 10 + colIndex * 10;
                  const height = seededRandomRange('building-height-' + rowIndex + '-' + colIndex, 5, 15);
                  const z = chunk.position.y * CHUNK_SIZE * 10 + rowIndex * 10;

                  return (
                    <Building
                      key={`${chunk.position.x}-${chunk.position.y}-${rowIndex}-${colIndex}`}
                      position={new Vector3(x, height / 2, z)}
                      size={seededRandomRange('building-size-' + rowIndex + '-' + colIndex, 5, 10)}
                      height={height}
                    />
                  )
                }
                return null
              })
            )}
          </React.Fragment>
        ))}
      </Canvas>
    </div>
  );
}