import {
    AnimationAction,
    AnimationMixer,
    Audio,
    AudioListener, BoxGeometry,
    HemisphereLight, Mesh, MeshPhysicalMaterial,
    PerspectiveCamera,
    PointLight,
    Scene,
    WebGLRenderer
} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

class MainScene {

    renderer: WebGLRenderer;
    scene: Scene;
    camera: PerspectiveCamera;

    orbitControls: OrbitControls;

    constructor(renderer: WebGLRenderer) {
        this.renderer = renderer;
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(45, 1, 1, 100);
        this.scene.add(this.camera);

        this.camera.position.set(0, 1, 5);
        this.camera.rotation.set(Math.PI / 180 * -13, 0, 0);

        this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
        this.orbitControls.minDistance = 2;
        this.orbitControls.maxDistance = 20;

        let hemisphereLight = new HemisphereLight("#fff", "#666", 1);
        this.scene.add(hemisphereLight);
        let pointLight = new PointLight("#fcf3e5", 15, 10);
        this.camera.add(pointLight);
        pointLight.position.set(0, 0, 0);


    }

    public async initialize() {
        let cube = new Mesh(new BoxGeometry(), new MeshPhysicalMaterial({
            color: "#10e7cc"
        }))
        this.scene.add(cube);
    };

    public render(deltaTime: number) {
        this.orbitControls.update();

        this.renderer.render(this.scene, this.camera);
    }

    public setSize(width: number, height: number) {
        const aspect = width / height;
        if (this.camera.aspect !== aspect) {
            this.camera.aspect = aspect;
            this.camera.updateProjectionMatrix();
        }
    }

}

export default MainScene;