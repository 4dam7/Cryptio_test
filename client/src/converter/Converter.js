import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import "./Converter.css"

const axios = require("axios")

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
}));

const Converter = () => {
    const classes = useStyles();
    const [baseISO, setBase] = useState("EUR")
    const [quoteISO, setQuote] = useState("USD")
    const [value, setValue] = useState(0)
    const [result, setResult] = useState(0)
    const [rate, setRate] = useState(0)
    const [errorStatus, setErrorStatus] = useState(false)

    const handleChangeBase = (event) => {
        setBase(event.target.value)
    }
    const handleChangeQuote = (event) => {
        setQuote(event.target.value)
    }
    const handleChangeValue = (event) => {
        setValue(event.target.value)
    }

    const onClick = () => { 
        const payload = {
            base_currency: baseISO.toLocaleUpperCase(), 
            value: value, 
            quote_currency: quoteISO.toUpperCase()
        }
        axios.post("http://localhost:5000/convert", payload)
        .then((resp) => {
            console.log(resp)
            if (resp.status !== 200) {
                setErrorStatus(true)
                return
            }
            setResult(resp.data.res)
            setRate(resp.data.rate)
            setErrorStatus(false)
        }).catch((err) => {
            console.log(err)
            setErrorStatus(true)
            return
        })
    }
   
    return (
        <div className="converterRoot">
            <Container maxWidth="md" className="container">
                <TextField error={errorStatus}
                id="standard-name"
                label="Base currency ISO"
                className={classes.textField}
                value={baseISO}
                onChange={handleChangeBase}
                margin="normal"
                variant="outlined"/>
                
                <TextField
                id="standard-number"
                label="Value"
                value={value}
                onChange={handleChangeValue}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                margin="normal"
                variant="outlined"/>
                
                <TextField error={errorStatus}
                id="standard-name"
                label="Quote currency ISO"
                className={classes.textField}
                value={quoteISO}
                onChange={handleChangeQuote}
                margin="normal"
                variant="outlined"/> <br/>

                <Button
                size="large"
                onClick={onClick}
                variant="outlined" 
                color="inherit" 
                className={classes.button}>
                CONVERT
                </Button> <br/>
                <text className="txt">.</text>
                <span className="resDiv">
                    <text className="result">{Number((result).toFixed(2)) + " "}</text><text className="resISO">{quoteISO}</text>
                </span> 
                <span className="rate">
                    <text className="rateTxt">{quoteISO} Rate : </text><text className="result">{Number((rate).toFixed(5)) + " "}</text>
                </span>
            </Container>
        </div>
    )
}

export default Converter