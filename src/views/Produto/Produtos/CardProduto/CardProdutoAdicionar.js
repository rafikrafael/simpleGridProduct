import React from "react";
import PropTypes from "prop-types";
import blueGrey from "@material-ui/core/colors/blueGrey";
import red from "@material-ui/core/colors/red";
import lightBlue from "@material-ui/core/colors/lightBlue";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { Field } from "redux-form";
import MaterialTextField from "components/ReduxForm/MaterialTextField";
import CardProdutoRemoveDialog from "./CardProdutoRemoveDialog";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  quantidadeContainer: {
    paddingTop: 2,
    paddingBottom: 5
  },
  adicionarContainer: {
    paddingTop: 10
  },
  quantidadeInput: {
    marginLeft: 10,
    marginRight: 10
  },
  icons: {
    color: theme.palette.getContrastText(blueGrey[500])
  },
  addRemoveButtons: {
    borderRadius: "50%",
    backgroundColor: blueGrey[500],
    "&:hover": {
      backgroundColor: blueGrey[700]
    },
    "&:disabled": {
      backgroundColor: blueGrey[500]
    }
  },
  addButton: {
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: lightBlue[500],
    "&:hover": {
      backgroundColor: lightBlue[700]
    }
  },
  removeButton: {
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700]
    }
  }
}));

const AddField = ({ disabled, input, subtrair = false }) => {
  const classes = useStyles();
  const { value, onChange } = input;
  const handleOnChange = () => {
    const valor = Number(
      subtrair === true ? Number(value || 0) - 1 : Number(value || 0) + 1
    );
    onChange(valor > 0 ? valor : 1);
  };

  const IconComp = subtrair === true ? RemoveIcon : AddIcon;
  return (
    <IconButton
      disabled={disabled}
      variant="contained"
      className={classes.addRemoveButtons}
      onClick={handleOnChange}
    >
      <IconComp fontSize="small" className={classes.icons} />
    </IconButton>
  );
};

AddField.propTypes = {
  disabled: PropTypes.bool,
  input: PropTypes.object,
  subtrair: PropTypes.bool
};

function CardProdutoAdicionar({
  visivel = false,
  fieldName,
  produtoAdicionado = false,
  onAddProduto,
  onRemoveProduto
}) {
  const classes = useStyles();
  const [showConfirmaExclusao, setShowConfirmaExclusao] = React.useState(false);
  const toggleShowConfirmaExclusao = () =>
    setShowConfirmaExclusao(value => !value);

  const handleOnRemoveProduto = () => {
    toggleShowConfirmaExclusao();
    onRemoveProduto();
  };

  const quantidadeName = `${fieldName}.quantidade`;

  return visivel === true ? (
    <CardActions className={classes.container}>
      <GridContainer
        justify="space-between"
        wrap="nowrap"
        alignItems="center"
        className={classes.quantidadeContainer}
      >
        <GridItem>
          <Field
            disabled={!produtoAdicionado}
            name={quantidadeName}
            subtrair={true}
            component={AddField}
          />
        </GridItem>

        <GridItem>
          <Field
            disabled={!produtoAdicionado}
            name={quantidadeName}
            component={MaterialTextField}
            variant="outlined"
            size="small"
            className={classes.quantidadeInput}
            inputProps={{
              type: "number",
              style: { textAlign: "center" }
            }}
          />
        </GridItem>

        <GridItem sm>
          <Field
            disabled={!produtoAdicionado}
            name={quantidadeName}
            component={AddField}
          />
        </GridItem>
      </GridContainer>

      <GridContainer
        justify="center"
        alignItems="center"
        className={classes.adicionarContainer}
      >
        <GridItem xs={12}>
          <Button
            fullWidth={true}
            type="button"
            variant="contained"
            size="large"
            className={
              produtoAdicionado === true
                ? classes.removeButton
                : classes.addButton
            }
            onClick={
              produtoAdicionado === true
                ? toggleShowConfirmaExclusao
                : onAddProduto
            }
          >
            {produtoAdicionado ? "Remover" : "Adicionar"}
          </Button>
        </GridItem>
      </GridContainer>
      <CardProdutoRemoveDialog
        showDialog={showConfirmaExclusao}
        onCancel={toggleShowConfirmaExclusao}
        onRemove={handleOnRemoveProduto}
      />
    </CardActions>
  ) : null;
}

CardProdutoAdicionar.propTypes = {
  visivel: PropTypes.bool,
  fieldName: PropTypes.string,
  produtoAdicionado: PropTypes.bool,
  onAddProduto: PropTypes.func,
  onRemoveProduto: PropTypes.func
};

export default CardProdutoAdicionar;
