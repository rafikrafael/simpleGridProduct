import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";

const useStyles = makeStyles(theme => ({
  cancelarButton: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    "&:hover": {
      backgroundColor: blue[700]
    },
    "&:disabled": {
      backgroundColor: blue[500]
    }
  },
  confirmarButton: {
    color: theme.palette.getContrastText(red[500]),
    fontWeight: "bold",
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700]
    }
  }
}));

export default function CardProdutoRemoveDialog({
  onCancel,
  onRemove,
  showDialog
}) {
  const classes = useStyles();
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={showDialog}
    >
      <DialogTitle id="confirmation-dialog-title">
        Deseja remover o produto selecionado?
      </DialogTitle>
      <DialogActions>
        <Button
          onClick={onRemove}
          variant="contained"
          className={classes.confirmarButton}
        >
          Sim
        </Button>
        <Button
          onClick={onCancel}
          variant="contained"
          className={classes.cancelarButton}
        >
          Não
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CardProdutoRemoveDialog.propTypes = {
  onCancel: PropTypes.func,
  onRemove: PropTypes.func,
  showDialog: PropTypes.bool
};
