import { Canvas } from '@react-three/fiber';
import Camera from './camera/Camera';
import { Building } from './components/Building';
import { Vector3 } from 'three';
import { useScene } from '../state/scene/hooks/useScene.hook';
import { CELL_SIZE, CHUNK_SIZE, DAY_SKY_COLOR, DEFAULT_HEIGHT } from '../core/utils/constants';
import { Terrain } from './components/Terrain';
import React from 'react';
import { seededRandomRange } from './utils/random.utils';
import { Sunlight } from './light/Sunlight';

export default function Scene() {
  const { getActiveChunks } = useScene();

  const activeChunks = getActiveChunks();

  return (
    <div id='canvas-container' className='w-full h-full'>
      <Canvas
        onCreated={({ gl }) => {
          gl.setClearColor(DAY_SKY_COLOR);
        }}
      >
        <ambientLight intensity={1} />
        <Sunlight />
        <Camera position={new Vector3((CHUNK_SIZE * CELL_SIZE) / 2, DEFAULT_HEIGHT, (CHUNK_SIZE * CELL_SIZE) / 2)} />
        <fog attach="fog" args={[DAY_SKY_COLOR, (CHUNK_SIZE * CELL_SIZE) * 0.6, (CHUNK_SIZE * CELL_SIZE) * 0.9]} />
        {activeChunks.map((chunk) => (
          <React.Fragment key={`chunk-${chunk.position.x}-${chunk.position.y}`}>
            <Terrain position={new Vector3(
              chunk.position.x * CHUNK_SIZE * CELL_SIZE + (CHUNK_SIZE * CELL_SIZE) / 2,
              -2,
              chunk.position.y * CHUNK_SIZE * CELL_SIZE + (CHUNK_SIZE * CELL_SIZE) / 2,
            )} />

            {chunk.data.map((row, rowIndex) =>
              row.map((value, colIndex) => {
                if (value === 1) {
                  const x = chunk.position.x * CHUNK_SIZE * CELL_SIZE + colIndex * CELL_SIZE;
                  const height = seededRandomRange('building-height-' + rowIndex + '-' + colIndex, CELL_SIZE / 2, CELL_SIZE * 1.5);
                  const z = chunk.position.y * CHUNK_SIZE * CELL_SIZE + rowIndex * CELL_SIZE;

                  return (
                    <Building
                      key={`${chunk.position.x}-${chunk.position.y}-${rowIndex}-${colIndex}`}
                      position={new Vector3(x, height / 2, z)}
                      size={seededRandomRange('building-size-' + rowIndex + '-' + colIndex, CELL_SIZE / 2, CELL_SIZE)}
                      height={height}
                    />
                  );
                }
                return null;
              })
            )}
          </React.Fragment>
        ))}
      </Canvas>
    </div>
  );
}