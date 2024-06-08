import { css } from '@emotion/css';
import React, { useCallback, useEffect, useRef, VFC } from 'react';
import { Camera } from '@mediapipe/camera_utils';
import { POSE_CONNECTIONS, NormalizedLandmarkList, Pose, Results } from '@mediapipe/pose';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import Webcam from 'react-webcam';

export const drawCanvas = (ctx: CanvasRenderingContext2D, results: Results) => {

}


export default function Training() {
    const webcamRef = useRef<Webcam>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const resultsRef = useRef<any>(null)

    const onResults = useCallback((results: Results) => {
        resultsRef.current = results
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;
        // drawCanvas(canvasCtx, results)

        const width = ctx.canvas.width
        const height = ctx.canvas.height
        ctx.save()
        ctx.clearRect(0, 0, width, height)
        // canvas の左右反転
        ctx.scale(-1, 1)
        ctx.translate(-width, 0)

        // ctx.drawImage(results.image, 0, 0, width, height)

        // 手の描画
        if (results.poseLandmarks) {
            // 骨格の描画
            drawConnectors(ctx, results.poseLandmarks, POSE_CONNECTIONS, { color: '#000000', lineWidth: 1 })

            drawLandmarks(ctx, results.poseLandmarks, { color: '#000000', lineWidth: 1, radius: 1 })

            drawLandmarks(ctx, [results.poseLandmarks[19], results.poseLandmarks[20]], { color: '#0082cf', lineWidth: 1, radius: 1 })
        }
        ctx.restore()
    }, [])

    // 初期設定
    useEffect(() => {
        const pose = new Pose({
            locateFile: file => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
        })

        pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            enableSegmentation: false,
            smoothSegmentation: false,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        pose.onResults(onResults)

        if (typeof webcamRef.current !== 'undefined' && webcamRef.current !== null) {
            const camera = new Camera(webcamRef.current.video!, {
                onFrame: async () => {
                    await pose.send({ image: webcamRef.current!.video! })
                },
                width: 1280,
                height: 720
            })
            camera.start()
        }
    }, [onResults])

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: 'user'
    }

    return <>
        <div className={styles.container}>
            {/* capture */}
            <Webcam
                audio={false}
                style={{ visibility: 'hidden' }}
                width={1280}
                height={720}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
            />
            <canvas ref={canvasRef} className={styles.canvas} />
        </div>
    </>
}

// ==============================================
// styles

const styles = {
    container: css`
        position: relative;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    `,
    canvas: css`
        position: absolute;
        width: 1280px;
        height: 720px;
        background-color: #fff;
    `,
    buttonContainer: css`
        position: absolute;
        top: 20px;
        left: 20px;
    `,
    button: css`
        color: #fff;
        background-color: #0082cf;
        font-size: 1rem;
        border: none;
        border-radius: 5px;
        padding: 10px 10px;
        cursor: pointer;
    `
}
