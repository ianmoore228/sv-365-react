// App.js
import React, { useRef, useEffect, useState } from "react";
import "./modalGame.css";
import { motion } from "framer-motion";
import * as THREE from "three";
import { useDispatch, useSelector } from "react-redux";
import { closeDoomModal } from "../../../../../../redux/deleteModalSlice.jsx";
import img from "../../../../../../assets/images/doom/priroda.jpg";
import { World, Body, Box, Vec3 } from "cannon-es";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import map from "../../../../../../assets/images/doom/testbox.glb";
// import {  Quaternion, Trimesh } from '@dimforge/cannon-es';
import * as CANNON from "cannon-es";
import CannonDebugger from "cannon-es-debugger";
import { ConvexGeometry } from "three/examples/jsm/geometries/ConvexGeometry.js";
// import { initScene } from "./gamecode/threeScene.js"


const ModalGame = () => {
  const [isRendered, setIsRendered] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);

  const dispatch = useDispatch();
  const isDeleteModalOpen = useSelector(
    (state) => state.deleteModal.isDeleteModalOpen
  );

  const mountRef = useRef(null);

  let model = null;
  let body = null;
  let meshModel = null;

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

 
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    scene.add(light);


    const world = new World();
    world.gravity.set(0, -9.82, 0); 


    const platformGeometry = new THREE.BoxGeometry(10, 1, 10);
    const platformMaterial = new THREE.MeshStandardMaterial({
      color: 0x808080,
    });
    const platformMesh = new THREE.Mesh(platformGeometry, platformMaterial);
    platformMesh.position.y = -0.5; 
    scene.add(platformMesh);


    const platformShape = new Box(new Vec3(5, 0.5, 5)); 
    const platformBody = new Body({
      mass: 0, 
      shape: platformShape,
    });
    platformBody.position.set(0, -0.5, 0);
    world.addBody(platformBody);

    const loader = new GLTFLoader();
    loader.load(
      map, 
      (gltf) => {
        model = gltf.scene;
        model.position.set(0, 0, 0); 
      

        let vertices = [];
        let indices = [];

        model.traverse((child) => {
          if (child.isMesh) {
            const { position } = child.geometry.attributes;
            const index = child.geometry.index;

            child.material.wireframe = true;

            if (position && index) {
              const getFaceNormal = (v1, v2, v3) => {
                const edge1 = new CANNON.Vec3().copy(v2).vsub(v1); 
                const edge2 = new CANNON.Vec3().copy(v3).vsub(v1); 
                const normal = new CANNON.Vec3().copy(edge1).cross(edge2); 
                normal.normalize(); 
                return normal;
              };

       
              const vertices = [];
              for (let i = 0; i < position.count; i++) {
                const x = position.getX(i);
                const y = position.getY(i);
                const z = position.getZ(i);
                vertices.push(new CANNON.Vec3(x, y, z));
              }

           
              const faces = [];

              for (let i = 0; i < index.count; i += 3) {
                const idx1 = index.getX(i);
                const idx2 = index.getX(i + 1);
                const idx3 = index.getX(i + 2);
                faces.push([idx1, idx2, idx3]);
              }

              faces.forEach((face, index) => {
                const [i1, i2, i3] = face;
                const v1 = vertices[i1];
                const v2 = vertices[i2];
                const v3 = vertices[i3];

                const normal = getFaceNormal(v1, v2, v3);

                const center = new CANNON.Vec3(
                  (v1.x + v2.x + v3.x) / 3,
                  (v1.y + v2.y + v3.y) / 3,
                  (v1.z + v2.z + v3.z) / 3
                );

                if (normal.dot(center) < 0) {
                  faces[index] = [i1, i3, i2]; 
                }
              });

        
              const shape = new CANNON.ConvexPolyhedron({ vertices, faces });

       
              body = new CANNON.Body({
                mass: 0, 
                shape: shape,
              });
              body.position.set(3, -8, 3);
              world.addBody(body);


        
              const geometry = new THREE.BufferGeometry();
              geometry.setAttribute(
                "position",
                new THREE.BufferAttribute(position.array, 3)
              );
              geometry.setIndex(new THREE.BufferAttribute(index.array, 1));
              const material = new THREE.MeshStandardMaterial({
                color: 0x00ff00,
              });
              meshModel = new THREE.Mesh(geometry, material);
              scene.add(meshModel);

              meshModel.position.set(3, -8, 3);

              // console.log("Vertices:", vertices);
              // console.log("Faces:", faces);
              // console.log("mesh model", meshModel.position);
              // console.log("body", body.position);
              // console.log("body", body)
              // console.log("mesh model", meshModel)

              console.log("Model loaded:", model);
              console.log("Model visibility:", model.visible);
              console.log("Model position:", model.position);
              console.log("Model scale:", model.scale);
              console.log("Scene objects:", scene.children);
            } else {
              console.error(
                "Геометрия объекта не содержит позиции или индексов."
              );
            }
          }
        });
      },
      (xhr) => {
        console.log(
          `Модель загружается: ${((xhr.loaded / xhr.total) * 100).toFixed(2)}%`
        );
      },
      (error) => {
        console.error("Ошибка загрузки модели:", error);
      }
    );

    const playerGeometry = new THREE.BoxGeometry(1, 1, 1);
    const playerMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const playerMesh = new THREE.Mesh(playerGeometry, playerMaterial);
    playerMesh.position.y = 20; 
    scene.add(playerMesh);

    const playerShape = new Box(new Vec3(0.5, 0.5, 0.5));
    const playerBody = new Body({
      mass: 1, 
      shape: playerShape,
    });
    playerBody.position.set(-4, 20, -4);
    world.addBody(playerBody);

    const canvas = renderer.domElement;
    canvas.addEventListener("click", () => {
      canvas.requestPointerLock();
      console.log("click");
    });

    const textureLoader = new THREE.TextureLoader();

    scene.background = img;

    textureLoader.load(img, (texture) => {
      scene.background = texture;
    });

    let rotation = { x: 0, y: 0 };

    document.addEventListener("mousemove", (event) => {
      if (document.pointerLockElement === canvas) {
        const sensitivity = 0.002;
        rotation.x -= event.movementY * sensitivity;
        rotation.y -= event.movementX * sensitivity;

        console.log("rotate");

        rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotation.x));;

        camera.rotation.x = rotation.x;
        camera.rotation.y = rotation.y;
      }
    });

    const keys = {
      w: false,
      s: false,
      a: false,
      d: false,
    };

    document.addEventListener("keydown", (event) => {
      if (keys.hasOwnProperty(event.key)) {
        keys[event.key] = true;
        console.log(event.key);
      }
      console.log("keydown");
      console.log(keys);
    });

    document.addEventListener("keyup", (event) => {
      if (keys.hasOwnProperty(event.key)) {
        keys[event.key] = false;
      }
      console.log("keyup");
    });

    const speed = 5; 

    const clock = new THREE.Clock();

    const cannonDebugger = new CannonDebugger(scene, world, {
      color: 0xff0000,
    });

    const animate = () => {
      requestAnimationFrame(animate);

      const deltaTime = clock.getDelta();

      world.step(1 / 60, deltaTime, 3);

      const forward = new THREE.Vector3(); 
      camera.getWorldDirection(forward);
      forward.y = 0; 
      forward.normalize();

      const right = new THREE.Vector3(); 
      right.crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();

      const velocity = new THREE.Vector3();
      if (keys["w"] || keys["ArrowUp"] || keys["W"] || keys["ц"] || keys["Ц"]) 
        velocity.add(forward.clone().multiplyScalar(speed * deltaTime));
      if (keys["s"] || keys["ArrowDown"] || keys["S"] || keys["ы"] || keys["Ы"])
        velocity.add(forward.clone().multiplyScalar(-speed * deltaTime));
      if (keys["a"] || keys["ArrowLeft"] || keys["A"] || keys["ф"] || keys["Ф"])
        velocity.add(right.clone().multiplyScalar(-speed * deltaTime)); 
      if (keys["d"] || keys["ArrowRight"] || keys["D"] || keys["в"] || keys["В"])
        velocity.add(right.clone().multiplyScalar(speed * deltaTime)); 

      playerBody.position.x += velocity.x;
      playerBody.position.z += velocity.z;

      playerMesh.position.copy(playerBody.position);
      playerMesh.quaternion.copy(playerBody.quaternion);

      camera.position.copy(playerBody.position);
      camera.position.y += 1.5;

      if (meshModel && body) {
        meshModel.position.copy(body.position);
        meshModel.quaternion.copy(body.quaternion);
      }

      if (cannonDebugger) {
        cannonDebugger.update();
      }

      // playerBody.addEventListener('collide', (event) => {
      //   console.log('Коллизия!');

      //   console.log('Скорость столкновения:', event.contact.getImpactVelocityAlongNormal());

      //   console.log('Объект текущего тела:', event.body); 
      //   console.log('Объект, который столкнулся:', event.target); 

      //   console.log('Точка контакта:', event.contact.bi.position, event.contact.bj.position);
      // });

      camera.position.y += 0.5;
      camera.rotation.x = -Math.PI / 45;
      renderer.render(scene, camera);
  
    };
   
    camera.position.copy(playerBody.position);
    camera.position.y += 1.5; 
    camera.lookAt(
      playerBody.position.x,
      playerBody.position.y,
      playerBody.position.z
    );

    animate();
   


    setIsLoaded(true);



    // if (mountRef.current) {
    //   initScene(mountRef.current);
    // }

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
        setIsLoaded(false);
      }
    };

    

    
  }, [isLoaded]);




  return (
    <motion.div
      className="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="modal__wrapper">
        <motion.div
          initial={{ transform: "translateY(-100%)" }}
          animate={{ transform: "translateY(0%)" }}
          transition={{ duration: 0.5, type: "spring" }}
          className="modal__content"
        >
         {/* <button
            // onClick={() => {
            //  renderScene()
            // }}
            className="modal__button-redraw"
          >
            =
          </button> */}
          <button
            onClick={() => {
              dispatch(closeDoomModal());
            }}
            className="modal__button-close"
          >
            ×
          </button>
          {/* <img src={img} /> */}
          <div ref={mountRef} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ModalGame;
