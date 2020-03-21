import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import grey from "@material-ui/core/colors/grey";
import orange from "@material-ui/core/colors/orange";
import blue from "@material-ui/core/colors/blue";
import blueGrey from "@material-ui/core/colors/blueGrey";
import { useTheme } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { get, isNull } from "lodash";
import { Redirect } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { CardActions, Button, Container } from "@material-ui/core";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import ReaisFormatText from "components/CustomNumberFormat/ReaisFormatText";
import actionsCompraFinalizada from "redux/compraFinalizada/actions";

const useStyles = makeStyles(() => ({
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  containerBackgrounColor: {
    backgroundColor: blueGrey[100]
  },
  cardContainer: {
    width: 320,
    heigh: "auto"
  },
  card: {
    height: "auto",
    display: "flex",
    flexDirection: "column",
    boxShadow: "none !important"
  },
  cardBoxNoShadow: {
    boxShadow: "none !important"
  },
  cardMedia: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "auto",
    height: "50%"
    // paddingTop: '56.25%', // 16:9
  },
  cardContent: {},
  nomeCliente: {
    color: grey[600],
    fontWeight: "bold"
  },
  textoValor: {
    color: grey[600],
    fontWeight: "bold",
    textAlign: "center"
  },
  valor: {
    color: blue[600]
  },
  overloadPanel: {
    backgroundColor: "rgba(255,255,255,0.6)",
    position: "relative",
    marginTop: "-120px"
  },
  btnFinalizar: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
    backgroundColor: orange[500],
    "&:hover": {
      backgroundColor: orange[700]
    }
  }
}));

function CompraFinalizada({ history }) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const containerClasses = classNames({
    [classes.container]: true,
    [classes.containerBackgrounColor]: matches
  });

  const compraEfetivada = useSelector(state =>
    get(state.compraFinalizada, "compraEfetivada", null)
  );

  const dispatch = useDispatch();

  const handleIniciarNovaCompra = () => {
    dispatch({
      type: actionsCompraFinalizada.COMPRA_FINALIZADA_LIMPAR
    });
    history.push("/produto");
  };

  const renderValorCompra = valor => {
    const renderValor = valorTratado => (
      <Typography
        gutterBottom
        variant="subtitle2"
        component="strong"
        className={[classes.textoValor, classes.valor]}
      >
        {valorTratado}
      </Typography>
    );
    return <ReaisFormatText value={valor} renderText={renderValor} />;
  };

  const { clienteNome, valorTotal } = compraEfetivada || {};
  return !compraEfetivada || isNull(compraEfetivada) ? (
    <Redirect to="/produto" />
  ) : (
    <div className={containerClasses}>
      <Container maxWidth="xs" className={classes.cardContainer}>
        <Card classes={{ root: classes.card }}>
          <CardContent className={classes.cardContent}>
            <GridContainer justify="center" maxWidth="xs">
              <GridItem>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  className={classes.nomeCliente}
                >
                  {clienteNome},
                </Typography>
              </GridItem>
            </GridContainer>
            <GridContainer justify="center">
              <GridItem>
                <Typography
                  gutterBottom
                  variant="subtitle2"
                  component="p"
                  className={classes.textoValor}
                >
                  Sua compra no valor {renderValorCompra(valorTotal)}, foi
                  finalizada com sucesso
                </Typography>
              </GridItem>
            </GridContainer>
          </CardContent>
          <CardMedia
            className={classes.cardMedia}
            image={"/assets/img/purchase.png"}
            title={"Compra finalizada"}
            component="img"
          />
          <CardActions>
            <Button
              size="large"
              fullWidth={true}
              className={classes.btnFinalizar}
              onClick={handleIniciarNovaCompra}
            >
              Iniciar Nova Compra
            </Button>
          </CardActions>
        </Card>
      </Container>
    </div>
  );
}

CompraFinalizada.propTypes = {
  history: PropTypes.object
};

export default CompraFinalizada;
