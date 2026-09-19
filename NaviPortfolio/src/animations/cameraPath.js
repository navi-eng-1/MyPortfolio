import * as THREE from 'three';

/**
 * 12-SHOT MASTER CINEMATIC DRONE TRAJECTORY
 * Utilizes CatmullRom spline curves with tension 0.35 to guarantee
 * continuous C1 curvature, preventing mechanical or jerky camera steps.
 */

// Camera Position Waypoints (x, y, z) mapped across [0, 1]
const posWaypoints = [
  new THREE.Vector3(0.0, 3.0, 22.0),   // 0.00: Shot 01 - System Init / Void
  new THREE.Vector3(0.5, 2.8, 17.0),   // 0.08: Shot 01 -> 02 transition
  new THREE.Vector3(1.2, 2.5, 12.0),   // 0.16: Shot 02 - Approach
  new THREE.Vector3(1.0, 2.0, 8.0),    // 0.26: Shot 03 - Hero Reveal (ASCII Avatar)
  new THREE.Vector3(0.2, 3.2, 2.0),    // 0.34: Shot 04 - Bank and fly past Avatar
  new THREE.Vector3(-2.0, 4.0, -5.0),  // 0.44: Shot 05 - Engineering World entrance
  new THREE.Vector3(-1.0, 2.8, -15.0), // 0.54: Shot 06 - IBIS Data Pipeline (Files/Regex)
  new THREE.Vector3(1.5, 2.4, -25.0),  // 0.62: Shot 06 - IBIS Calculations & Corners
  new THREE.Vector3(0.0, 2.2, -36.0),  // 0.70: Shot 07 - Project Deep Dive Pause
  new THREE.Vector3(2.0, 3.5, -48.0),  // 0.78: Shot 08 - Experience (Dubai -> Bangalore)
  new THREE.Vector3(0.0, 5.8, -66.0),  // 0.86: Shot 09 - Skills Constellation High Angle
  new THREE.Vector3(-1.0, 2.4, -80.0), // 0.92: Shot 10 - Education Quiet Space
  new THREE.Vector3(0.8, 2.0, -90.0),  // 0.95: Shot 11 - Certifications & Languages
  new THREE.Vector3(0.0, 1.6, -100.0)  // 1.00: Shot 12 - Final Descent & Contact
];

// Camera LookAt / Focus Target Waypoints
const lookAtWaypoints = [
  new THREE.Vector3(0.0, 2.0, 0.0),    // 0.00: Shot 01 LookAt
  new THREE.Vector3(0.2, 2.0, 0.0),    // 0.08: Shot 01 -> 02
  new THREE.Vector3(0.5, 2.0, 0.0),    // 0.16: Shot 02 LookAt
  new THREE.Vector3(0.0, 1.8, 2.0),    // 0.26: Shot 03 LookAt Hero
  new THREE.Vector3(-0.8, 2.4, -6.0),  // 0.34: Shot 04 LookAt forward-left
  new THREE.Vector3(-0.5, 2.5, -16.0), // 0.44: Shot 05 LookAt engineering depth
  new THREE.Vector3(0.0, 2.0, -26.0),  // 0.54: Shot 06 LookAt IBIS nodes
  new THREE.Vector3(0.5, 2.0, -35.0),  // 0.62: Shot 06 LookAt corner checks
  new THREE.Vector3(0.0, 2.0, -42.0),  // 0.70: Shot 07 LookAt GUI plane
  new THREE.Vector3(-0.5, 2.5, -58.0), // 0.78: Shot 08 LookAt Experience
  new THREE.Vector3(0.0, 2.2, -74.0),  // 0.86: Shot 09 LookAt Skills Core
  new THREE.Vector3(0.0, 2.0, -86.0),  // 0.92: Shot 10 LookAt Education
  new THREE.Vector3(0.0, 1.8, -95.0),  // 0.95: Shot 11 LookAt Certifications
  new THREE.Vector3(0.0, 1.6, -110.0)  // 1.00: Shot 12 LookAt Contact Terminal
];

// FOV Keyframes [progress, fov]
const fovKeyframes = [
  { t: 0.00, fov: 52 },
  { t: 0.16, fov: 50 },
  { t: 0.26, fov: 48 },
  { t: 0.34, fov: 50 },
  { t: 0.44, fov: 51 },
  { t: 0.62, fov: 47 },
  { t: 0.70, fov: 45 },
  { t: 0.86, fov: 52 },
  { t: 1.00, fov: 46 }
];

export const cameraPositionSpline = new THREE.CatmullRomCurve3(posWaypoints, false, 'catmullrom', 0.35);
export const cameraLookAtSpline = new THREE.CatmullRomCurve3(lookAtWaypoints, false, 'catmullrom', 0.35);

/**
 * Calculates camera parameters for a normalized progress [0..1]
 */
export function getCameraState(progress) {
  const p = Math.min(Math.max(progress, 0), 1);

  // Position & LookAt from CatmullRom splines
  const pos = cameraPositionSpline.getPointAt(p);
  const lookAt = cameraLookAtSpline.getPointAt(p);

  // Dynamic FOV interpolation
  let fov = 50;
  for (let i = 0; i < fovKeyframes.length - 1; i++) {
    const kf1 = fovKeyframes[i];
    const kf2 = fovKeyframes[i + 1];
    if (p >= kf1.t && p <= kf2.t) {
      const alpha = (p - kf1.t) / (kf2.t - kf1.t);
      fov = kf1.fov + alpha * (kf2.fov - kf1.fov);
      break;
    }
  }

  // Cinematic Banking (roll angle z) based on tangent curvature
  const tangent = cameraPositionSpline.getTangentAt(p);
  // Roll slightly into the direction of lateral movement (banking turn)
  const bank = -tangent.x * 0.12;

  return { pos, lookAt, fov, bank };
}
