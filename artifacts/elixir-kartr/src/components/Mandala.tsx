import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import mandalaSrc from "@assets/hero-mandala-removebg-preview_1774947765714.png";
import * as THREE from "three";

function ImageMandala({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          rotateZ: 360,
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          rotateX: mouseY * 8,
          rotateY: mouseX * 8,
        }}
        className="relative"
      >
        <img
          src={mandalaSrc}
          alt="Gold Mandala"
          className="w-[680px] h-[680px] md:w-[800px] md:h-[800px] object-contain select-none"
          style={{
            filter: "drop-shadow(0 0 60px rgba(212,175,55,0.35)) drop-shadow(0 0 20px rgba(212,175,55,0.2))",
            opacity: 0.88,
          }}
        />
      </motion.div>
    </div>
  );
}

export function Mandala() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const [webglFailed, setWebglFailed] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    let renderer: THREE.WebGLRenderer;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        45,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 20;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      const goldMaterial = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        emissive: 0x4a3a10,
        roughness: 0.2,
        metalness: 0.9,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
      });

      const solidGoldMaterial = new THREE.MeshStandardMaterial({
        color: 0xc9a84c,
        roughness: 0.3,
        metalness: 0.8,
      });

      const group = new THREE.Group();
      const rings = 5;

      for (let i = 0; i < rings; i++) {
        const radius = 2 + i * 1.5;
        const tube = 0.05 + i * 0.02;
        const torusGeo = new THREE.TorusGeometry(radius, tube, 16, 64);
        const torus = new THREE.Mesh(torusGeo, goldMaterial);
        torus.rotation.x = Math.PI / 2;
        torus.rotation.y = (Math.PI / rings) * i;
        torus.userData = {
          speedX: (Math.random() - 0.5) * 0.002,
          speedY: (Math.random() - 0.5) * 0.002,
          speedZ: (Math.random() - 0.5) * 0.005,
        };
        group.add(torus);
      }

      const icoGeo = new THREE.IcosahedronGeometry(1, 1);
      const centerIco = new THREE.Mesh(icoGeo, solidGoldMaterial);
      group.add(centerIco);

      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const nodeGeo = new THREE.DodecahedronGeometry(0.5, 0);
        const node = new THREE.Mesh(nodeGeo, goldMaterial);
        const r = 8;
        node.position.x = Math.cos(angle) * r;
        node.position.y = Math.sin(angle) * r;
        node.userData = { angle, radius: r, speed: 0.005 };
        group.add(node);
      }

      scene.add(group);
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      const pointLight = new THREE.PointLight(0xd4af37, 2, 50);
      pointLight.position.set(5, 5, 10);
      scene.add(pointLight);
      const pointLight2 = new THREE.PointLight(0xffffff, 1, 50);
      pointLight2.position.set(-5, -5, -10);
      scene.add(pointLight2);

      let mouseX = 0;
      let mouseY = 0;
      const onMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 0.001;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 0.001;
      };
      document.addEventListener("mousemove", onMouseMove);

      let animationFrameId: number;
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        group.rotation.y += 0.05 * (mouseX * 0.5 - group.rotation.y);
        group.rotation.x += 0.05 * (mouseY * 0.5 - group.rotation.x);
        group.children.forEach((child, index) => {
          if (index > 0 && index <= rings) {
            child.rotation.x += child.userData.speedX;
            child.rotation.y += child.userData.speedY;
            child.rotation.z += child.userData.speedZ;
          } else if (index > rings + 1) {
            child.userData.angle += child.userData.speed;
            child.position.x = Math.cos(child.userData.angle) * child.userData.radius;
            child.position.y = Math.sin(child.userData.angle) * child.userData.radius;
            child.rotation.x += 0.01;
            child.rotation.y += 0.02;
          } else if (index === rings + 1) {
            child.rotation.x -= 0.005;
            child.rotation.y -= 0.005;
          }
        });
        group.rotation.z += 0.001;
        renderer.render(scene, camera);
      };
      animate();

      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        }
      });
      resizeObserver.observe(containerRef.current);

      return () => {
        document.removeEventListener("mousemove", onMouseMove);
        resizeObserver.disconnect();
        cancelAnimationFrame(animationFrameId);
        if (rendererRef.current && containerRef.current) {
          try { containerRef.current.removeChild(rendererRef.current.domElement); } catch {}
          rendererRef.current.dispose();
        }
      };
    } catch {
      setWebglFailed(true);
    }
  }, []);

  if (webglFailed) {
    return <ImageMandala mouseX={mouse.x} mouseY={mouse.y} />;
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full z-0 opacity-80 mix-blend-screen pointer-events-none"
    />
  );
}
