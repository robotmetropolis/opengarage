import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Car3DViewer({ color = '#3b82f6' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 1;
    const height = container.clientHeight || 1;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020617);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(5, 3, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const p1 = new THREE.PointLight(0xffffff, 1);
    p1.position.set(5, 5, 5);
    scene.add(p1);

    const p2 = new THREE.PointLight(new THREE.Color(color), 1.5);
    p2.position.set(-5, 2, -5);
    scene.add(p2);

    const carGroup = new THREE.Group();

    const body = new THREE.Mesh(
      new THREE.BoxGeometry(4.2, 0.6, 2),
      new THREE.MeshPhongMaterial({ color: new THREE.Color(color), shininess: 100 })
    );
    body.position.y = 0.7;
    carGroup.add(body);

    const cabin = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 0.8, 1.7),
      new THREE.MeshPhongMaterial({ color: 0x0f172a, transparent: true, opacity: 0.9 })
    );
    cabin.position.set(-0.3, 1.4, 0);
    carGroup.add(cabin);

    const wheelPositions = [
      { x: 1.3, z: 1 },
      { x: 1.3, z: -1 },
      { x: -1.3, z: 1 },
      { x: -1.3, z: -1 },
    ];
    wheelPositions.forEach((pos) => {
      const wheel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.45, 0.45, 0.4, 32),
        new THREE.MeshPhongMaterial({ color: 0x000000 })
      );
      wheel.rotation.x = Math.PI / 2;
      wheel.position.set(pos.x, 0.45, pos.z);
      carGroup.add(wheel);
    });

    scene.add(carGroup);

    const grid = new THREE.GridHelper(20, 20, 0x1e293b, 0x0f172a);
    scene.add(grid);

    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      carGroup.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose?.();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose?.());
          else obj.material.dispose?.();
        }
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [color]);

  return <div ref={containerRef} className="w-full h-full" />;
}
