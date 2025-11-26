import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Eraser, PenLine } from 'lucide-react';

interface SignaturePadProps {
  label: string;
  onEnd: (dataUrl: string | null) => void;
  required?: boolean;
}

export const SignaturePad: React.FC<SignaturePadProps> = ({ onEnd }) => {
  const sigPad = useRef<SignatureCanvas>(null);

  const clear = () => {
    sigPad.current?.clear();
    onEnd(null);
  };

  const handleEnd = () => {
    if (sigPad.current && !sigPad.current.isEmpty()) {
      onEnd(sigPad.current.getTrimmedCanvas().toDataURL('image/png'));
    } else {
      onEnd(null);
    }
  };

  return (
    <div className="w-full h-full flex flex-col relative">
      <SignatureCanvas
        ref={sigPad}
        penColor="black"
        canvasProps={{
          className: 'w-full h-24 bg-transparent cursor-crosshair z-10',
        }}
        onEnd={handleEnd}
      />
      <div className="absolute top-2 right-2 z-20">
        <button
          type="button"
          onClick={clear}
          className="text-gray-400 hover:text-red-500 transition-colors bg-white/50 rounded-full p-1"
          title="清除重簽"
        >
          <Eraser size={14} />
        </button>
      </div>
      <div className="absolute bottom-1 right-2 pointer-events-none text-gray-200 flex items-center">
         <PenLine size={16} className="mr-1" /> 簽名處
      </div>
    </div>
  );
};