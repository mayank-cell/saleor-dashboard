import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import { commonMessages } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";

export interface FileUploadFieldProps {
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  className?: string;
  disabled: boolean;
  fileName?: string;
  error?: boolean;
  helperText?: string;
  onFileUpload: (file: File) => void;
  onFileDelete: () => void;
}

const useStyles = makeStyles(
  theme => ({
    errorText: {
      color: theme.palette.error.light
    },
    fileField: {
      display: "none"
    },
    uploadFileContent: {
      color: theme.palette.primary.main,
      fontSize: "1rem"
    }
  }),
  { name: "FileUploadField" }
);

const FileUploadField: React.FC<FileUploadFieldProps> = props => {
  const {
    disabled,
    fileName,
    className,
    error,
    helperText,
    onFileUpload,
    onFileDelete,
    inputProps
  } = props;
  const classes = useStyles({});
  const intl = useIntl();

  const fileInputAnchor = React.createRef<HTMLInputElement>();
  const clickFileInput = () => fileInputAnchor.current.click();

  return (
    <>
      <div className={className}>
        {fileName ? (
          <div className={classes.uploadFileContent}>
            {fileName}
            <IconButton
              color="primary"
              onClick={onFileDelete}
              disabled={disabled}
              data-test="button-delete-file"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ) : (
          <div>
            <Button
              onClick={clickFileInput}
              disabled={disabled}
              variant="outlined"
              color="primary"
              data-test="button-upload-file"
            >
              {intl.formatMessage(commonMessages.chooseFile)}
            </Button>
          </div>
        )}
        {error && (
          <Typography variant="caption" className={classes.errorText}>
            {helperText}
          </Typography>
        )}
      </div>
      <input
        className={classes.fileField}
        id="fileUpload"
        onChange={event => onFileUpload(event.target.files[0])}
        type="file"
        data-test="upload-file-input"
        ref={fileInputAnchor}
        {...inputProps}
      />
    </>
  );
};
FileUploadField.displayName = "FileUploadField";
export default FileUploadField;
