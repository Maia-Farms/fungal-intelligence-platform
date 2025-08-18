import React from 'react'
import CameraImage from '../assets/b98b6ab5-a5cb-4dab-863e-e8abfc31e642.png'
const VideoFeed = () => {
  return (
    <div className="bg-black rounded-lg shadow-md border border-gray-400 aspect-video flex items-center justify-center overflow-hidden">
            <img src={CameraImage} alt="Mock Camera Feed" className="object-contain" />
          </div>
  )
}

export default VideoFeed