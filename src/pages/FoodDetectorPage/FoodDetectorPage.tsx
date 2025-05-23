import { useState } from "react";
import CameraWidget from "../../widgets/CameraWidget/CameraWidget";

export default function FoodDetectorPage() {
  const [photo, setPhoto] = useState<string | null>(null);

  return (
    <div style={{ height: "calc(100vh - 70px)" }}>
      {!photo && <CameraWidget onCapture={setPhoto} />}
      {photo && <div><img src={photo} /></div>}
    </div>
  );
}
