[![typescript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![react](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)<br/>

[![vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![threejs](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)

> ⚠️ **Work in Progress:** This project is under development. Some features may be incomplete.

# eterra

_eterra_ breathes life into endless low-poly worlds - a smart generator that uses WebGL and React Three Fiber to paint infinite cities that stretch beyond the horizon.
Click [here](https://alexichenskiy.github.io/eterra/) to enjoy it yourself!

<img width="1919" height="908" alt="image" src="https://github.com/user-attachments/assets/a21c9ab5-0f01-465b-a324-3fd071cc9a3b" />

_An endless, (yet) lifeless city._

_eterra_ is a chunk-based, endless city generator. Each chunk contains a unique combination of low-poly buildings, ensuring that every location in the city feels (at least a bit) different.  
Thanks to the chunk-based system, the generator can produce and navigate an infinite world without ever consuming excessive memory. Players can move freely, 
revisit previous areas, and the world will consistently render as expected.

## Controls

- **Desktop**
  - `W`, `A`, `S`, `D` – Move forward, left, backward, and right  
  - Mouse movement – Look around/rotate camera

- **Mobile**
  - Swipe **up/down** – Move forward/backward  
  - Swipe **left/right** – Rotate camera


## Future Features
- **Dynamic Weather & Time:** rain, sun, day/night cycles with user-controlled changes  
- **Advanced Building Generation:** dynamic generation of building parts for more variety  
- **Web Worker Backend:** background generation of city chunks to keep performance smooth  
- **City Life:** adding trees, bushes, and other static objects, with plans for dynamic elements like cars and airplanes  
- **Terrain Variation:** introducing hills, lakes, forests, and more diverse landscapes  
- **Procedural City Enhancements:** more dynamic and varied city layouts, responsive to player movement

## Installation

Follow these steps to run _eterra_ locally:
1. **Clone the repository**
```bash
git clone https://github.com/AlexIchenskiy/eterra.git
cd eterra
```
2. Install dependencies
```bash
npm install
```
3. Start the development server
```bash
npm run dev
```
4. Open your browser, navigate to http://localhost:5173 and enjoy!
