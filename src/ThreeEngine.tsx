import React from "react";
import {Clock, WebGLRenderer} from "three";
import MainScene from "./MainScene";

class ThreeEngine extends React.PureComponent {
    canvasContainerRef = React.createRef<HTMLDivElement>();

    renderer: WebGLRenderer | null = null;

    width: number = 0;
    height: number = 0;

    needsUpdateSize: boolean = true;

    clock: Clock = new Clock();

    mainScene: MainScene | null = null;

    render() {
        return (
            <div ref={this.canvasContainerRef}
                 style={{
                     position: "absolute",
                     top: 0,
                     left: 0,
                     right: 0,
                     bottom: 0,
                     width: "100%",
                     height: "100%",
                     pointerEvents: "auto"
                 }}>
            </div>
        );
    }

    componentDidMount() {
        this.initialize().then();
    }

    private initialize = async () => {
        if (this.renderer !== null) return;

        if (!this.canvasContainerRef.current) return;

        this.renderer = new WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
        });

        this.renderer.setPixelRatio(window.devicePixelRatio);

        await this.initializeScene();

        this.canvasContainerRef.current.appendChild(this.renderer.domElement);

        this.renderer.setAnimationLoop(this.rendererAnimationLoop);

        new ResizeObserver(entries => {
            entries.forEach(entry => {
                const width = entry.contentRect.width;
                const height = entry.contentRect.height;
                if (this.width === width && this.height === height) return;
                this.width = width;
                this.height = height;
                this.needsUpdateSize = true;
            });
        }).observe(this.canvasContainerRef.current);
    }

    private initializeScene = async () => {
        this.mainScene = new MainScene(this.renderer!);
        await this.mainScene.initialize();
    };

    private rendererAnimationLoop = (time: number, frame: XRFrame) => {
        const deltaTime = this.clock.getDelta();
        // Game._deltaTime = this.clock.getDelta();

        if (this.needsUpdateSize) {
            this.setSize(this.width, this.height);
            this.needsUpdateSize = false;
        }

        if (this.renderer) {
            this.onRender(deltaTime)
        }
    };

    private setSize(width: number, height: number): void {
        this.renderer?.setSize(width, height);
        this.onResize(width, height);
    }

    protected onRender(deltaTime: number) {
        this.mainScene?.render(deltaTime);
    }

    protected onResize(width: number, height: number) {
        this.mainScene?.setSize(width, height);
    }
}

export default ThreeEngine;