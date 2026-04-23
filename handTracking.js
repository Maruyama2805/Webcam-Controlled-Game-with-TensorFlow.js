// Hand tracking state
let detector = null;
let video = null;
let isDetecting = false;
let sendHandsCallback = null;

/**
 * Setup hand tracking with MediaPipe Hands
 * @param {HTMLVideoElement} videoElement - Video element for webcam
 * @param {Function} sendHands - Called with hand positions [{x, y}]
 */
async function setupHandTracking(videoElement, sendHands) {
  video = videoElement;
  sendHandsCallback = sendHands;

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ 
      //browser tries to match, but may use diferent resolution based on device capabilities
      video: { width: 640, height: 480 } 
    });

    //connect webcam stream to video element
    video.srcObject = stream;
    await video.play();

    // Load MediaPipe Hands Model
    const model = window.handPoseDetection.SupportedModels.MediaPipeHands;
    const detectorConfig = {
      runtime: "mediapipe", // ModelPipe is more effcieny than tfjs
      solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/hands", // URL where model files are hosted
      maxHands: 2,
      modelType: "full", // "lite" is faster but less accurate
    };

    // Create the detector: 
    detector = await window.handPoseDetection.createDetector(model, detectorConfig);

    console.log("Hand tracking initialized successfully");
    return true;
  } catch (error) {
    console.error("Error setting up hand tracking:", error);
    alert(
      "Could not access webcam. Please ensure you have granted camera permissions.",
    );
    return false;
  }
}

/**
 * Start hand detection loop
 */
function startDetection() {
  if (!detector || !video) {
    console.error("Hand tracking not initialized");
    return;
  }

  isDetecting = true;
  detectHands();
}

/**
 * Stop hand detection loop
 */
function stopDetection() {
  isDetecting = false;
}

/**
 * Detect hands and call sendHandsCallback with positions
 */
async function detectHands() {
  if (!isDetecting) {
    console.log("Hand detection not active, stopping detection loop");
    return;
  };

  try {
    // Run hand detection on current video frame:
    const hands = await detector.estimateHands(video);
    console.log("Detected hands:", hands);

    // Transform hand landmarks to canvas coordinates:
    const handPositions = hands.map((hand) => {
      //Get Palm center (average of wrists and thumb)
      const palmBase = [0, 5, 9, 13, 17].map((idx) => hand.keypoints[idx]); //palm base points
      const avgX = palmBase.reduce((sum, kp) => sum + kp.x, 0) / palmBase.length; 
      const avgY = palmBase.reduce((sum, kp) => sum + kp.y, 0) / palmBase.length;

      return {
        x: 640 - avgX, // Mirror X coordinate for natural interaction
        y: avgY,
      }
    });

    // Call sendHandsCallback with hand positions:
    if (sendHandsCallback) {
      sendHandsCallback(handPositions);
    }

  } catch (error) {
    console.error("Error detecting hands:", error);
  }

  // Continue detection loop (~30 FPS)
  setTimeout(() => detectHands(), 33);
}

// Export functions (if using modules, otherwise they're global)
window.handTracking = {
  setupHandTracking,
  startDetection,
  stopDetection,
};
