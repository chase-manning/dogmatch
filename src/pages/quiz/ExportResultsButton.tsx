import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { DogRatings, CoupleRatings } from "../../app/dog-rating";
import { DogType } from "../../components/DogContext";
import { QuizType } from "./quiz-data";
import PrintableResults from "./PrintableResults";
import loadingIcon from "../../assets/ui/loading.svg";

const StyledExportButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 6rem;
  padding: 0 2.6rem;
  border-radius: 1rem;
  background: var(--bg);
  border: solid 2px var(--main);
  color: var(--main);
  font-family: "Jost", sans-serif;
  font-size: 2rem;
  font-weight: 600;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.15s ease, color 0.15s ease;

  &:hover:not(:disabled) {
    background: var(--main);
    color: var(--bg);
    svg {
      stroke: var(--bg);
    }
  }

  &:disabled {
    cursor: progress;
    opacity: 0.7;
  }
`;

const DownloadIcon = styled.svg`
  width: 2.2rem;
  height: 2.2rem;
  stroke: var(--main);
  transition: stroke 0.15s ease;
`;

const Spinner = styled.img`
  height: 2.8rem;
`;

const HiddenWrapper = styled.div`
  position: fixed;
  top: 0;
  left: -100000px;
  pointer-events: none;
  opacity: 0;
  z-index: -1;
`;

const Toast = styled.div<{ $isError: boolean }>`
  position: fixed;
  left: 50%;
  bottom: 3rem;
  transform: translateX(-50%);
  background: ${({ $isError }) => ($isError ? "#DC2660" : "var(--main)")};
  color: var(--bg);
  padding: 1.4rem 2.4rem;
  border-radius: 1rem;
  font-family: "Jost", sans-serif;
  font-size: 1.8rem;
  font-weight: 500;
  z-index: 10000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const IMAGE_WAIT_TIMEOUT_MS = 8000;

const waitForImages = (element: HTMLElement): Promise<void> => {
  const images = Array.from(element.querySelectorAll("img"));
  const pending = images
    .filter((img) => !img.complete)
    .map(
      (img) =>
        new Promise<void>((resolve) => {
          const done = () => resolve();
          img.addEventListener("load", done, { once: true });
          img.addEventListener("error", done, { once: true });
        })
    );
  const allLoaded = Promise.all(pending).then(() => undefined);
  const timeout = new Promise<void>((resolve) =>
    setTimeout(resolve, IMAGE_WAIT_TIMEOUT_MS)
  );
  return Promise.race([allLoaded, timeout]);
};

interface Props {
  ratings: DogRatings;
  quiz: QuizType;
  coupleRatings?: CoupleRatings | null;
  dogs: DogType[];
  topBreedName: string;
}

const ExportResultsButton = ({
  ratings,
  quiz,
  coupleRatings,
  dogs,
  topBreedName,
}: Props) => {
  const printableRef = useRef<HTMLDivElement>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [rendering, setRendering] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [toast, setToast] = useState<{ message: string; isError: boolean } | null>(
    null
  );

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  const showToast = (message: string, isError = false) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ message, isError });
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
      toastTimeoutRef.current = null;
    }, 3500);
  };

  const handleExport = async () => {
    if (generating) return;
    setGenerating(true);
    setRendering(true);

    try {
      await new Promise((r) => requestAnimationFrame(() => r(null)));
      await new Promise((r) => requestAnimationFrame(() => r(null)));

      const node = printableRef.current;
      if (!node) throw new Error("Printable node not ready");

      await waitForImages(node);
      await new Promise((r) => setTimeout(r, 150));

      const [{ default: html2canvas }, jspdfModule] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);
      const { jsPDF } = jspdfModule;

      const canvas = await html2canvas(node, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const canvasRatio = canvas.height / canvas.width;
      const pageRatio = pageHeight / pageWidth;

      let imgWidth: number;
      let imgHeight: number;
      if (canvasRatio > pageRatio) {
        imgHeight = pageHeight;
        imgWidth = pageHeight / canvasRatio;
      } else {
        imgWidth = pageWidth;
        imgHeight = pageWidth * canvasRatio;
      }
      const xOffset = (pageWidth - imgWidth) / 2;
      const yOffset = (pageHeight - imgHeight) / 2;

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      pdf.addImage(imgData, "JPEG", xOffset, yOffset, imgWidth, imgHeight);

      const filename = `dogmatch-${slugify(topBreedName) || "results"}.pdf`;
      pdf.save(filename);
      showToast("Your results PDF is ready!");
    } catch (err) {
      console.error("Failed to export results:", err);
      showToast("Couldn't generate PDF. Please try again.", true);
    } finally {
      setGenerating(false);
      setRendering(false);
    }
  };

  return (
    <>
      <StyledExportButton
        onClick={handleExport}
        disabled={generating}
        aria-label="Download your match results"
      >
        {generating ? (
          <>
            <Spinner src={loadingIcon} alt="loading" />
            Preparing...
          </>
        ) : (
          <>
            <DownloadIcon
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3v12" />
              <path d="m7 10 5 5 5-5" />
              <path d="M5 21h14" />
            </DownloadIcon>
            Download
          </>
        )}
      </StyledExportButton>

      {rendering && (
        <HiddenWrapper aria-hidden>
          <PrintableResults
            ref={printableRef}
            ratings={ratings}
            quiz={quiz}
            coupleRatings={coupleRatings}
            dogs={dogs}
          />
        </HiddenWrapper>
      )}

      {toast && (
        <Toast
          $isError={toast.isError}
          role={toast.isError ? "alert" : "status"}
          aria-live={toast.isError ? "assertive" : "polite"}
          aria-atomic="true"
        >
          {toast.message}
        </Toast>
      )}
    </>
  );
};

export default ExportResultsButton;
