import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ClassificationResult {
  class_name: string;
  confidence: number;
}

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedImage: string | null;
  classificationResult: ClassificationResult | null;
}

export const ImageClassificationDrawer = ({
  isOpen,
  onClose,
  selectedImage,
  classificationResult,
}: DrawerProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="inset-0 backdrop-blur-[6px] blured-window"
            style={{ pointerEvents: "all" }}
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="popup-side bg-white z-50"
            style={{ pointerEvents: "all" }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={onClose}
                  className="hover:bg-gray-100 close-btn transition-colors"
                >
                  <X size={24} />
                </button>
                <h3 className="text-xl font-semibold text-center mb-4 fs-2 fw-bold">Classification Result</h3>
              </div>

              <div className="d-flex justify-content-center align-items-center">
                {selectedImage && (
                  <div className="mb-6 d-flex justify-content-center align-items-center">
                    <img
                      src={selectedImage}
                      alt="Selected waste"
                      className="trash-img-by-user h-auto rounded-lg shadow-md my-2 me-4"
                    />
                  </div>
                )}

                {classificationResult && (
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg d-flex flex-column justify-content-center align-items-center">
                      <h4 className="fs-2 mb-2 fw-medium">Classification</h4>
                      <p className="text-lg fs-2 text-danger font-semibold capitalize d-flex">
                        {classificationResult.class_name}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg d-flex flex-column justify-content-center align-items-center">
                      <h4 className="fs-2 mb-2 fw-medium">Confidence</h4>
                      <p className="text-lg fs-2 text-danger font-semibold d-flex">
                        {(classificationResult.confidence).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};