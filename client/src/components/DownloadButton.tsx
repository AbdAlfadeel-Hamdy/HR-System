import { Button } from '@mui/material';
import { Download } from '@mui/icons-material';

interface DownloadButtonProps {
  onClick: () => void;
}

const DownloadButton = ({ onClick }: DownloadButtonProps) => {
  return (
    <div className='flex justify-center items-center'>
      <Button startIcon={<Download />} onClick={onClick}>
        Download
      </Button>
    </div>
  );
};

export default DownloadButton;
