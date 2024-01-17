import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

const ParticleSystem = () => {
  const canvasRef = useRef(null);
  const [particleSize, setParticleSize] = useState(0.02);
  const [particleAmount, setParticleAmount] = useState(300); // 초기 입자 양

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 650 / 450, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(650, 450); // Canvas 크기 수정

    const backgroundTexture = new THREE.TextureLoader().load('111.jpg');
    const backgroundMaterial = new THREE.MeshBasicMaterial({ map: backgroundTexture });
    const backgroundGeometry = new THREE.PlaneGeometry(10, 7);
    const background = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
    scene.add(background);

    const particles = new THREE.Group();
    scene.add(particles);

    const createParticle = () => {
      const particleMaterial = new THREE.MeshBasicMaterial({ color: '#696969' });
      const particleGeometry = new THREE.SphereGeometry(particleSize, 3, 0.1);
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      particle.position.x = Math.random() * 10 - 5;
      particle.position.y = Math.random() * 7 - 3.5;
      particle.position.z = Math.random() * 2 - 1;
      particles.add(particle);
    };

    for (let i = 0; i < particleAmount; i++) { // 사용자가 조절 가능한 입자 양
      createParticle();
    }

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      particles.children.forEach((particle) => {
        particle.position.z += 0.005;
        particle.position.x += Math.random() * Math.PI * 0.0001;
        if (particle.position.z > 1) {
          particle.position.z = -1;
        }
      });
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      // Clean up Three.js scene
      scene.remove(background);
      scene.remove(particles);
      // Other cleanup code as needed
    };
  }, [particleSize, particleAmount]);

    const handleParticleSizeChange = (event) => {
        setParticleSize(parseFloat(event.target.value));
    };

    const handleParticleAmountChange = (event) => {
        setParticleAmount(parseInt(event.target.value));
    };

  return (
    <div>
        <label htmlFor="particleSizeRange">미세먼지 입자 크기:</label>
        <input
            type="range"
            min="0.001"
            max="0.02"
            step="0.001"
            value={particleSize}
            onChange={handleParticleSizeChange}
        />
        <label htmlFor="particleAmountRange">미세먼지 양:</label>
        <input 
            type="range"
            min="30"
            max="5000"
            step="10"
            value={particleAmount}
            onChange={handleParticleAmountChange}
        />
      <canvas  width="650" height="450" ref={canvasRef}></canvas>
    </div>
  );
};

export default ParticleSystem;
