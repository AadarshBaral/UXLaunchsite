"use client";

import { useRef, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { Camera, X } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { getCroppedImage } from "@/lib/image/cropImage";

export default function AvatarPicker({
  value,
  name,
  onChange,
}: {
  value?: string;
  name: string;
  onChange: (dataUrl: string | undefined) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [rawImage, setRawImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);

  function handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      setRawImage(String(reader.result));
      setCrop({ x: 0, y: 0 });
      setZoom(1);
    };
    reader.readAsDataURL(file);
  }

  async function handleSaveCrop() {
    if (!rawImage || !croppedArea) return;
    const dataUrl = await getCroppedImage(rawImage, croppedArea);
    onChange(dataUrl);
    setRawImage(null);
  }

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <Avatar src={value} name={name} size={56} />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-ink text-background flex items-center justify-center cursor-pointer border border-background"
          aria-label="Upload photo"
        >
          <Camera size={12} />
        </button>
      </div>
      <div className="flex flex-col gap-1">
        <Button type="button" variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()}>
          Upload photo
        </Button>
        {value && (
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className="text-xs text-ink-muted hover:text-status-red text-left cursor-pointer"
          >
            Remove photo
          </button>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />

      <Modal open={!!rawImage} onClose={() => setRawImage(null)} title="Crop photo">
        {rawImage && (
          <div className="flex flex-col gap-4">
            <div className="relative h-64 w-full bg-surface rounded-md overflow-hidden">
              <Cropper
                image={rawImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(_, pixels) => setCroppedArea(pixels)}
              />
            </div>
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full accent-accent"
              aria-label="Zoom"
            />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setRawImage(null)}>
                <X size={14} /> Cancel
              </Button>
              <Button type="button" variant="primary" onClick={handleSaveCrop}>
                Save photo
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
