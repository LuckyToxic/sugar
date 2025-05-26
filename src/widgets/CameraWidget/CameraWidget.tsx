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

  const squareSize = "92vw";

  return (
    <div className="relative w-full h-full flex flex-col items-center overflow-hidden bg-black">
      {/* Размытый фон */}
      <Webcam
        audio={false}
        screenshotFormat="image/webp"
        videoConstraints={{ facingMode: "environment" }}
        className="absolute inset-0 w-full h-full object-cover filter blur-[3px] scale-110"
        style={{ zIndex: 1 }}
      />

      {/* Чёткий квадрат */}
      <div
        className="absolute left-1/2 top-1/2 flex items-center justify-center rounded-2xl"
        style={{
          width: squareSize,
          height: squareSize,
          transform: "translate(-50%, -60%)",
          zIndex: 2,
        }}
      >
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/webp"
          videoConstraints={{ facingMode: "environment" }}
          className="w-full h-full object-cover rounded-xl"
        />
        {/* Рамка с 4 уголками */}
        <div className="absolute inset-0 pointer-events-none">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            className="w-full h-full"
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            {/* Верхний левый угол */}
            <path
              d="M20,0.5 L4,0.5 A3,3 0 0 0 0.5,4 L0.5,20"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Верхний правый угол */}
            <path
              d="M80,0.5 L96,0.5 A3,3 0 0 1 99.5,4 L99.5,20"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Нижний левый угол */}
            <path
              d="M0.5,80 L0.5,96 A3,3 0 0 0 4,99.5 L20,99.5"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Нижний правый угол */}
            <path
              d="M80,99.5 L96,99.5 A3,3 0 0 0 99.5,96 L99.5,80"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 z-30"
        style={{ width: squareSize, transform: "translateX(-50%)" }}
      >
        <Button onClick={capture} className="w-[91%] text-white mx-auto">
          Recognise
        </Button>
      </div>
    </div>
  );
}
