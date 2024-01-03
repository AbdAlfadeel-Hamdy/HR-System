import { Button } from "@mui/material";
import { Download } from "@mui/icons-material";
const DownloadButton = ({ onClick }) => {
    return (<div className="flex justify-center items-center">
      <Button startIcon={<Download />} onClick={onClick}>
        Download
      </Button>
    </div>);
};
export default DownloadButton;
