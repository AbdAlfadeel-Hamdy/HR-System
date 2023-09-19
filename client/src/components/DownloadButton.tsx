import { Button } from "@mui/material";
import { Download } from "@mui/icons-material";

interface DownloadButtonProps {
  onClick: () => void;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ onClick }) => {
  return (
    <div className="flex justify-center items-center">
      <Button startIcon={<Download />} onClick={onClick}>
        Download
      </Button>
    </div>
  );
};

export default DownloadButton;
