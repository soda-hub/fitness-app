import * as posenet from '@tensorflow-models/posenet';
import '@tensorflow/tfjs';

export default class GameScene extends Phaser.Scene {
  private video!: HTMLVideoElement;
  private net!: posenet.PoseNet;
  private graphics!: Phaser.GameObjects.Graphics;

  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.image('background', 'path/to/your/background/image.png');
  }

  async create() {
    // this.add.image(400, 300, 'background');
    this.video = document.createElement('video');
    this.video.width = 400;
    this.video.height = 300;
    this.video.autoplay = true;
    this.video.hidden = true;

    this.video.style.position = 'absolute';
    this.video.style.left = '50%';
    this.video.style.top = '50%';
    this.video.style.transform = 'translate(-50%, -50%)';
    this.video.style.scale = 'scaleX(-1)';

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true
    });
    this.video.srcObject = stream;

    this.net = await posenet.load();
    this.time.addEvent({
      delay: 100,
      callback: this.updatePose,
      callbackScope: this,
      loop: true
    });

    this.graphics = this.add.graphics();
  }

  private updatePose = async () => {
    const pose = await this.net.estimateSinglePose(this.video, {
      flipHorizontal: false
    });

    this.clearGraphics();
    this.drawKeypoints(pose.keypoints);
    this.drawSkeleton(pose.keypoints);
  };

  private clearGraphics() {
    this.graphics.clear();
  }

  private drawKeypoints(keypoints: posenet.Keypoint[]) {
    keypoints.forEach(keypoint => {
      if (keypoint.score > 0.5) {
        this.graphics.fillStyle(0xff0000, 1);
        this.graphics.fillCircle(keypoint.position.x, keypoint.position.y, 5);
      }
    });
  }

  private drawSkeleton(keypoints: posenet.Keypoint[]) {
    const adjacentKeyPoints = posenet.getAdjacentKeyPoints(keypoints, 0.5);

    adjacentKeyPoints.forEach((keypoints) => {
      this.graphics.lineStyle(2, 0xff0000);
      this.graphics.beginPath();
      this.graphics.moveTo(keypoints[0].position.x, keypoints[0].position.y);
      this.graphics.lineTo(keypoints[1].position.x, keypoints[1].position.y);
      this.graphics.strokePath();
    });
  }
}
