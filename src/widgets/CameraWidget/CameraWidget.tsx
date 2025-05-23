import { useCallback, useRef } from "react";
import Webcam from "react-webcam";
import { Button } from "../../shared/ui/Button/Button";

interface CameraWidgetProps {
  onCapture: (imageSrc: string | null) => void;
}

export default function CameraWidget({ onCapture }: CameraWidgetProps) {
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const image = webcamRef.current.getScreenshot();
      onCapture(image);
    }
  }, [webcamRef]);
  return (
    <div
      className="w-full h-full relative flex flex-col items-center"
      style={{ aspectRatio: "4/3" }}
    >
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/webp"
        videoConstraints={{ facingMode: "user" }}
        className="w-full h-full"
      />
      <Button
        onClick={capture}
        className="absolute text-white bottom-10 w-[90%] max-w-[400px]"
      >
        Recognise
      </Button>
    </div>
  );
}
